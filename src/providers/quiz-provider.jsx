import { QuizContext } from "@/context/quiz-context";
import { useTimer } from "@/hooks/use-timer";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
  shuffleArray,
} from "@/libs/utils";
import React, { useCallback, useEffect, useState } from "react";

export default function QuizProvider({ children }) {
  const [Questions, setQuestions] = useState([]);
  const [QuestionCategories, setQuestionCategories] = useState([]);

  const [isQuestionsLoading, setisQuestionsLoading] = useState(false);
  const [isCategoryLoading, setisCategoryLoading] = useState(false);

  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  // Quiz State Progress
  const [CurrentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [Answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Final Quiz State
  const [Result, setResult] = useState(null);

  // Resume State
  const [hasSavedQuiz, setHasSavedQuiz] = useState(false);
  const [savedSession, setSavedSession] = useState(null);

  // ================= TIMER =================
  useTimer(isQuizActive, timeRemaining, setTimeRemaining, () => {
    completeQuiz();
  });

  // ================= LOAD CATEGORY =================
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setisCategoryLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api_category.php`,
      );
      const data = await res.json();
      setQuestionCategories(data.trivia_categories);
    } finally {
      setisCategoryLoading(false);
    }
  };

  // ================= CHECK SESSION (FIXED) =================
  useEffect(() => {
    const raw = getLocalStorage("quiz_session");

    if (raw) {
      const session = JSON.parse(raw);

      setHasSavedQuiz(true);
      setSavedSession(session);
    } else {
      setHasSavedQuiz(false);
      setSavedSession(null);
    }
  }, []);

  // ================= SAVE SESSION =================
  useEffect(() => {
    if (!isQuizActive) return;

    const session = {
      questions: Questions,
      answers: Answers,
      currentQuestionIndex: CurrentQuestionIndex,
      timeRemaining,
    };

    setLocalStorage("quiz_session", JSON.stringify(session));
    setHasSavedQuiz(true);
    setSavedSession(session);
  }, [Questions, Answers, CurrentQuestionIndex, timeRemaining, isQuizActive]);

  // ================= FETCH QUESTIONS =================
  const fetchQuestions = async ({
    amount = "10",
    category = "",
    difficulty = "",
    type = "",
  }) => {
    setisQuestionsLoading(true);

    try {
      let url = `${import.meta.env.VITE_API_URL}/api.php?amount=${amount}`;
      if (category) url += `&category=${category}`;
      if (difficulty) url += `&difficulty=${difficulty}`;
      if (type) url += `&type=${type}`;

      const res = await fetch(url);
      const data = await res.json();

      const formatted = data.results.map((q, i) => ({
        id: i + 1,
        category: q.category,
        difficulty: q.difficulty,
        question: q.question,
        options: shuffleArray([
          { text: q.correct_answer, isCorrect: true },
          ...q.incorrect_answers.map((a) => ({
            text: a,
            isCorrect: false,
          })),
        ]),
      }));

      setQuestions(formatted);
      return { success: true, message: "Selamat Mengerjakan Quiz" };
    } finally {
      setisQuestionsLoading(false);
    }
  };

  // ================= START =================
  const startQuiz = (config) => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsQuizComplete(false);

    setTimeRemaining(config.duration * 60);
    setIsQuizActive(true);

    removeLocalStorage("quiz_session");
    setHasSavedQuiz(false);
    setSavedSession(null);
  };

  // ================= ANSWER =================
  const answerQuestion = (questionId, answer) => {
    const updated = {
      ...Answers,
      [questionId]: answer,
    };

    setAnswers(updated);

    if (CurrentQuestionIndex < Questions.length - 1) {
      setCurrentQuestionIndex((p) => p + 1);
    } else {
      completeQuiz(updated);
    }
  };

  // ================= RESULT =================
  const buildResult = useCallback(
    (answers) => {
      const values = Object.values(answers);

      const correct = values.filter((answer) => answer.isCorrect).length;
      const incorrect = values.length - correct;
      const unanswered = Questions.length - values.length;

      const score =
        Questions.length === 0
          ? 0
          : Math.round((correct / Questions.length) * 100);

      return {
        score,
        correct,
        incorrect,
        answered: values.length,
        unanswered,
        total: Questions.length,
        answers,
        questions: Questions,
        completedAt: new Date(),
        timeRemaining,
      };
    },
    [Questions, timeRemaining],
  );

  const completeQuiz = useCallback(
    (answers = Answers) => {
      setResult(buildResult(answers));

      setIsQuizActive(false);
      setIsQuizComplete(true);

      removeLocalStorage("quiz_session");
      setHasSavedQuiz(false);
      setSavedSession(null);
    },
    [Answers, buildResult],
  );

  // ================= RESUME =================
  const resumeQuiz = () => {
    const raw = getLocalStorage("quiz_session");
    if (!raw) return false;

    const session = JSON.parse(raw);

    if (session.timeRemaining <= 0) {
      removeLocalStorage("quiz_session");
      return false;
    }

    setQuestions(session.questions);
    setAnswers(session.answers);
    setCurrentQuestionIndex(session.currentQuestionIndex);
    setTimeRemaining(session.timeRemaining);

    setIsQuizActive(true);
    setIsQuizComplete(false);

    setHasSavedQuiz(false);
    setSavedSession(null);

    return true;
  };

  // ================= RESET =================
  const resetQuiz = () => {
    removeLocalStorage("quiz_session");

    setQuestions([]);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setTimeRemaining(0);

    setIsQuizActive(false);
    setIsQuizComplete(false);
    setResult(null);

    setHasSavedQuiz(false);
    setSavedSession(null);
  };

  return (
    <QuizContext.Provider
      value={{
        Questions,
        QuestionCategories,
        isQuestionsLoading,
        isCategoryLoading,
        CurrentQuestionIndex,
        Answers,
        timeRemaining,
        isQuizActive,
        isQuizComplete,
        Result,
        hasSavedQuiz,
        savedSession, // 🔥 IMPORTANT BUAT DIALOG
        fetchQuestions,
        startQuiz,
        answerQuestion,

        resumeQuiz,
        resetQuiz,
        completeQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

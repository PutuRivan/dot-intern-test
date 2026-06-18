import { QuizContext } from "@/context/quiz-context";
import { useTimer } from "@/hooks/use-timer";
import { shuffleArray } from "@/libs/utils";
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

  useTimer(isQuizActive, timeRemaining, setTimeRemaining, () => {
    completeQuiz();
  });

  const fetchCategories = async () => {
    setisCategoryLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api_category.php`,
      );
      const data = await response.json();
      setQuestionCategories(data.trivia_categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setisCategoryLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchQuestions = async ({
    amount = "10",
    category = "",
    difficulty = "",
    type = "",
  }) => {
    setisQuestionsLoading(true);
    try {
      let url = `${import.meta.env.VITE_API_URL}/api.php?`;
      if (amount) url += `amount=${amount}`;
      if (category) url += `&category=${category}`;
      if (difficulty) url += `&difficulty=${difficulty}`;
      if (type) url += `&type=${type}`;

      const response = await fetch(url);
      const data = await response.json();

      const formattedQuestions = data.results.map((question, index) => ({
        id: index + 1,
        category: question.category,
        difficulty: question.difficulty,
        question: question.question,
        options: shuffleArray([
          {
            text: question.correct_answer,
            isCorrect: true,
          },
          ...question.incorrect_answers.map((answer) => ({
            text: answer,
            isCorrect: false,
          })),
        ]),
      }));

      setQuestions(formattedQuestions);
      return { success: true, message: "Selamat Mengerjakan Quiz" };
    } catch (error) {
      console.error("Errors: ", error);
    } finally {
      setisQuestionsLoading(false);
    }
  };

  const startQuiz = (config) => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsQuizComplete(false);
    const timeInSeconds = config.duration * 60;
    setTimeRemaining(timeInSeconds);
    setIsQuizActive(true);
  };

  const answerQuestion = (questionId, answer) => {
    const nextAnswers = {
      ...Answers,
      [questionId]: answer,
    };

    setAnswers(nextAnswers);

    if (CurrentQuestionIndex < Questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      completeQuiz(nextAnswers);
    }
  };

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
    },
    [Answers, buildResult],
  );

  return (
    <QuizContext.Provider
      value={{
        Questions,
        QuestionCategories,
        isCategoryLoading,
        isQuestionsLoading,
        CurrentQuestionIndex,
        Answers,
        timeRemaining,
        isQuizComplete,
        Result,
        startQuiz,
        fetchQuestions,
        answerQuestion,
        completeQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

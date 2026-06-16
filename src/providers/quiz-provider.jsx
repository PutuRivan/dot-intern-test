import { QuizContext } from "@/context/quiz-context";
import { shuffleArray } from "@/libs/utils";
import React, { useCallback, useEffect, useState } from "react";

export default function QuizProvider({ children }) {
  const [Questions, setQuestions] = useState([]);
  const [QuestionCategories, setQuestionCategories] = useState([]);
  const [isQuestionsLoading, setisQuestionsLoading] = useState(false);
  const [isCategoryLoading, setisCategoryLoading] = useState(false);

  // Quiz State Progress
  const [CurrentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [Answers, setAnswers] = useState([]);

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

  const startQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  return (
    <QuizContext.Provider
      value={{
        Questions,
        QuestionCategories,
        isCategoryLoading,
        isQuestionsLoading,
        CurrentQuestionIndex,
        Answers,
        startQuiz,
        fetchQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

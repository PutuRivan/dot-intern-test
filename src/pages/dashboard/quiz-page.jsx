import QuizHeaderContainer from "@/components/quiz/quiz-header-container";
import QuizQuestionContainer from "@/components/quiz/quiz-question-container";
import { useQuiz } from "@/context/quiz-context";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";

export default function QuizPage() {
  const navigate = useNavigate();
  const {
    questions,
    currentQuestionIndex,
    answers,
    answerQuestion,
    isQuizComplete,
    timeRemaining,
  } = useQuiz();
  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;

  useEffect(() => {
    if (isQuizComplete) {
      navigate("/result", { replace: true });
    }
  }, [isQuizComplete, navigate]);

  if (!currentQuestion) return null;

  return (
    <main className="max-w-2xl mx-auto p-5 space-y-5">
      <QuizHeaderContainer
        answeredCount={answeredCount}
        questionCount={questions.length}
        currentQuestionIndex={currentQuestionIndex}
        timeRemaining={timeRemaining}
      />
      <QuizQuestionContainer
        question={currentQuestion}
        answerQuestion={answerQuestion}
      />
    </main>
  );
}

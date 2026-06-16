import QuizHeaderContainer from "@/components/quiz/quiz-header-container";
import QuizQuestionContainer from "@/components/quiz/quiz-question-container";
import { useQuiz } from "@/context/quiz-context";
import React from "react";

export default function QuizPage() {
  const { Questions, CurrentQuestionIndex, Answers, answerQuestion } =
    useQuiz();
  const currentQuestion = Questions[CurrentQuestionIndex];
  const answeredCount = Object.keys(Answers).length;

  return (
    <main className="max-w-2xl mx-auto p-5 space-y-5">
      <QuizHeaderContainer
        answeredCount={answeredCount}
        questionCount={Questions.length}
        CurrentQuestionIndex={CurrentQuestionIndex}
      />
      <QuizQuestionContainer
        question={currentQuestion}
        answerQuestion={answerQuestion}
      />
    </main>
  );
}

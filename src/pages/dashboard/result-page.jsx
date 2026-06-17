import QuestionReviewContainer from "@/components/result/question-review-container";
import StatsReviewContainer from "@/components/result/stats-review-container";
import { useQuiz } from "@/context/quiz-context";
import { Navigate } from "react-router";

export default function ResultPage() {
  const { Result } = useQuiz();

  if (!Result) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="max-w-4xl mx-auto p-5 min-h-svh space-y-5">
      <StatsReviewContainer Result={Result} />
      <QuestionReviewContainer Result={Result} />
    </main>
  );
}

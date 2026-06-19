import Header from "@/components/home/header";
import QuizOptionContainer from "@/components/home/quiz-option-container";
import ResumeQuizDialog from "@/components/home/resume-quiz-dialog";
import { useQuiz } from "@/context/quiz-context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();
  const {
    isQuestionsLoading,
    fetchQuestions,
    questionCategories,
    startQuiz,
    hasSavedQuiz,
    savedSession,
    resumeQuiz,
    resetQuiz,
  } = useQuiz();

  const [showResumeDialog, setShowResumeDialog] = useState(false);

  useEffect(() => {
    if (hasSavedQuiz && savedSession) {
      setShowResumeDialog(true);
    }
  }, [hasSavedQuiz, savedSession]);

  const handleResumeQuiz = () => {
    const success = resumeQuiz();

    if (success) {
      setShowResumeDialog(false);
      navigate("/quiz");
    }
  };

  const handleStartFresh = () => {
    resetQuiz();
    setShowResumeDialog(false);
  };

  return (
    <main className="h-svh max-w-3xl mx-auto space-y-5">
      <Header />

      <QuizOptionContainer
        startQuiz={startQuiz}
        fetchQuestions={fetchQuestions}
        questionCategories={questionCategories}
        isQuestionsLoading={isQuestionsLoading}
      />

      <ResumeQuizDialog
        open={showResumeDialog}
        setOpen={setShowResumeDialog}
        handleResumeQuiz={handleResumeQuiz}
        handleStartFresh={handleStartFresh}
      />
    </main>
  );
}

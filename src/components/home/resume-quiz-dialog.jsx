import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogDescription,
} from "../ui/alert-dialog";

import { useQuiz } from "@/context/quiz-context";
import { formatTime } from "@/libs/utils";

export default function ResumeQuizDialog({
  open,
  setOpen,
  handleResumeQuiz,
  handleStartFresh,
}) {
  const { savedSession } = useQuiz();

  if (!savedSession) return null;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Resume Quiz?</AlertDialogTitle>

          <AlertDialogDescription>
            You have an unfinished quiz
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="p-4 bg-muted rounded-lg space-y-2">
          <div className="flex justify-between">
            <span>Progress : </span>
            <span>
              Question {savedSession.currentQuestionIndex + 1} of {" "}
              {savedSession.questions.length}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Answered : </span>
            <span>{Object.keys(savedSession.answers).length} Question</span>
          </div>

          <div className="flex justify-between">
            <span>Time Remaining : </span>
            <span>{formatTime(savedSession.timeRemaining)}</span>
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleStartFresh}>
            Start Fresh
          </AlertDialogCancel>

          <AlertDialogAction onClick={handleResumeQuiz}>
            Resume
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

export default function QuestionReviewCard({ question, selectedAnswer }) {
  const correctAnswer = question.options.find((option) => option.isCorrect);

  const isCorrect = selectedAnswer?.isCorrect;

  return (
    <Card>
      <CardContent className="space-y-4">
        {/* Header */}
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold">
            {question.id}
          </span>

          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-semibold">{question.question}</h3>

            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary">{question.category}</Badge>

              <Badge variant={isCorrect ? "default" : "destructive"}>
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="mr-1 h-4 w-4" />
                    Correct
                  </>
                ) : (
                  <>
                    <XCircle className="mr-1 h-4 w-4" />
                    Incorrect
                  </>
                )}
              </Badge>
            </div>
          </div>
        </div>

        {/* Answers */}
        <div className="ml-13 space-y-3">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Your Answer</p>

            <div
              className={`rounded-lg border p-3 ${
                isCorrect ? "border-green-500" : "border-red-500"
              }`}
            >
              {selectedAnswer?.text ?? "Not Answered"}
            </div>
          </div>

          {!isCorrect && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                Correct Answer
              </p>

              <div className="rounded-lg border border-green-500 p-3">
                {correctAnswer.text}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

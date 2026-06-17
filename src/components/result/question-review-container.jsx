import React from "react";
import QuestionReviewCard from "./question-review-card";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function QuestionReviewContainer({ Result }) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-start">
            Review
          </CardTitle>
        </CardHeader>

        <CardContent className={"space-y-5 p-5 max-h-125 overflow-y-auto"}>
          {Result.questions.map((question) => (
            <QuestionReviewCard
              key={question.id}
              question={question}
              selectedAnswer={Result.answers[question.id]}
            />
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

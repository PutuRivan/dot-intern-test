import React from "react";
import { Card, CardContent } from "../ui/card";

export default function QuestionReviewCard() {
  return (
    <Card>
      <CardContent className={"flex flex-col"}>
        <div className="flex gap-2 items-center">
          <span className="bg-accent p-1.5 rounded-xl aspect-square">1</span>
          <h3 className="text-xl font-bold">What is the Zodiac symbol for Gemini?</h3>
        </div>
        <div className="flex flex-col ml-8 gap-2">
          <p>Category</p>
          <p>Your Answer</p>
          <p>Correct Answer</p>
        </div>
      </CardContent>
    </Card>
  );
}

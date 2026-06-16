import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function QuizQuestionContainer({ question, answerQuestion }) {
  return (
    <Card>
      <CardContent className={"space-y-5"}>
        <div className="flex items-center gap-5">
          <Badge>{question.category}</Badge>
          <Badge>{question.difficulty}</Badge>
        </div>
        <div className="space-y-5">
          <h2 className="text-3xl">{question.question}</h2>
          {question.options.map((option, index) => (
            <Button
              variant="outline"
              onClick={() => answerQuestion(question.id, option)}
              className="w-full h-16 text-lg font-medium text-start justify-start"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold">
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option.text}</span>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

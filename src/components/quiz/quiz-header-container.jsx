import React from "react";
import { Card, CardContent } from "../ui/card";
import { Progress } from "../ui/progress";

export default function QuizHeaderContainer({
  answeredCount,
  questionCount,
  CurrentQuestionIndex,
}) {
  const progress = (answeredCount / questionCount) * 100;

  return (
    <Card>
      <CardContent className={"space-y-5"}>
        <div className="grid grid-cols-4 gap-5">
          <QuizHeaderContent
            title={"Questions"}
            content={`${CurrentQuestionIndex + 1}/${questionCount}`}
          />
          <QuizHeaderContent title={"Answered"} content={answeredCount} />
          <QuizHeaderContent title={"Remaining"} content={"10"} />
          <QuizHeaderContent title={"Time Left"} content={"10:00"} />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </div>
      </CardContent>
    </Card>
  );
}

function QuizHeaderContent({ title, content }) {
  return (
    <div className="text-center">
      <p className="text-muted-foreground text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold">{content}</p>
    </div>
  );
}

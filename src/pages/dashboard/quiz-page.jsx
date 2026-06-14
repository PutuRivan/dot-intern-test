import HeaderContent from "@/components/quiz/header-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import React from "react";

export default function QuizPage() {
  return (
    <main className="max-w-2xl mx-auto p-5 space-y-5">
      <Card>
        <CardContent className={"space-y-5"}>
          <div className="grid grid-cols-4 gap-5">
            <HeaderContent title={"Questions"} content={"1/10"} />
            <HeaderContent title={"Answered"} content={"10"} />
            <HeaderContent title={"Remaining"} content={"10"} />
            <HeaderContent title={"Time Left"} content={"10:00"} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm font-medium">10%</span>
            </div>
            <Progress value={10} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className={"space-y-5"}>
          <div className="flex items-center gap-5">
            <h1 className="text-xl">Question 1</h1>
            <Badge>General Knowledge</Badge>
            <Badge>Easy</Badge>
          </div>
          <div className="space-y-5">
            <h2 className="text-3xl">What is the Zodiac symbol for Gemini?</h2>
            <Button
              variant="outline"
              className="w-full h-16 text-lg font-medium text-start justify-start"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold">
                  A
                </div>
                <span>Maiden</span>
              </div>
            </Button> 
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

import PieChartContainer from "@/components/result/pie-chart";
import QuestionReviewCard from "@/components/result/question-review-card";
import StatsCard from "@/components/result/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown } from "lucide-react";
import React from "react";

export default function ResultPage() {
  return (
    <main className="max-w-4xl mx-auto p-5 min-h-svh space-y-5">
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center">
              Quiz Result!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PieChartContainer />
            <div className="grid grid-cols-4 gap-5">
              <StatsCard value={10} label="Correct" />
              <StatsCard value={10} label="Incorrect" />
              <StatsCard value={10} label="Answered" />
              <StatsCard value={10} label="Unanswered" />
            </div>
          </CardContent>
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>Scroll down to review your answers</span>
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </div>

            <Button>Take Another Quiz</Button>
          </div>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-start">
              Review
            </CardTitle>
          </CardHeader>

          <CardContent className={"space-y-5 p-5 max-h-125 overflow-y-auto"}>
            <QuestionReviewCard />
            <QuestionReviewCard />
            <QuestionReviewCard />
            <QuestionReviewCard />
            <QuestionReviewCard />
            <QuestionReviewCard />
            <QuestionReviewCard />
            <QuestionReviewCard />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

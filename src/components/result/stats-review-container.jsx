import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import PieChartContainer from "./pie-chart";
import StatsCard from "./stats-card";
import { ArrowDown } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";

export default function StatsReviewContainer({ result }) {
  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">
            Quiz Result!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PieChartContainer
            correct={result.correct}
            incorrect={result.incorrect}
            score={result.score}
          />
          <div className="grid grid-cols-4 gap-5">
            <StatsCard value={result.correct} label="Correct" />
            <StatsCard value={result.incorrect} label="Incorrect" />
            <StatsCard value={result.answered} label="Answered" />
            <StatsCard value={result.unanswered} label="Unanswered" />
          </div>
        </CardContent>
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Scroll down to review your answers</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </div>

          <Link to={"/home"}>
            <Button>Take Another Quiz</Button>
          </Link>
        </div>
      </Card>
    </section>
  );
}

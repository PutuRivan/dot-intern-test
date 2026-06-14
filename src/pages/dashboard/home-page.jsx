import Header from "@/components/home/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/quiz");
  };

  return (
    <main className="h-svh px-50 py-10 space-y-5">
      <Header />
      {/* Quiz Option */}
      <Card>
        <CardHeader>
          <CardTitle className={"text-xl"}>Start New Quiz</CardTitle>
          <CardDescription>
            Choose your settings and start a new quiz
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action="" className="space-y-5">
            <FieldGroup className={"grid grid-cols-2 gap-5"}>
              {/* Questions */}
              <Field>
                <FieldLabel>Number of Questions</FieldLabel>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of questions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              {/* Duration */}
              <Field>
                <FieldLabel>Duration</FieldLabel>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Quiz Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              {/* Category */}
              <Field>
                <FieldLabel>Category</FieldLabel>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Questions Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              {/* Difficulty */}
              <Field>
                <FieldLabel>Difficulty</FieldLabel>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Quiz Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </FieldGroup>
            {/* Type */}
            <Field>
              <FieldLabel>Type</FieldLabel>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Questions Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="multiple">Multiple Choice</SelectItem>
                  <SelectItem value="boolean">True/False</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Button className={"w-full"} size="lg" onClick={handleSubmit}>
              Start Quiz
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

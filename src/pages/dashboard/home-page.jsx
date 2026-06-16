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
import { useQuiz } from "@/context/quiz-context";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function HomePage() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      amount: "10",
      duration: "10",
      category: "9",
      difficulty: "easy",
      type: "multiple",
    },
  });
  const { isQuestionsLoading, fetchQuestions, QuestionCategories, startQuiz } =
    useQuiz();

  const onSubmit = async (data) => {
    const response = await fetchQuestions(data);
    if (!response.success) {
      toast.error("Kesalahan saat membuat soal");
    }
    startQuiz(data)
    toast.success(response.message);
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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <FieldGroup className={"grid grid-cols-2 gap-5"}>
              {/* Questions */}
              <Controller
                name="amount"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Number of Questions</FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                )}
              />
              {/* Duration */}
              <Controller
                name="duration"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Duration</FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                )}
              />
              {/* Category */}
              <Controller
                name="category"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Category</FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Questions Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {QuestionCategories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={String(category.id)}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
              {/* Difficulty */}
              <Controller
                name="difficulty"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Difficulty</FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Quiz Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </FieldGroup>
            {/* Type */}
            <Controller
              name="type"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Type</FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Questions Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple">Multiple Choice</SelectItem>
                      <SelectItem value="boolean">True/False</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
            <Button
              className={"w-full"}
              size="lg"
              type="submit"
              disabled={isQuestionsLoading}
            >
              {isQuestionsLoading ? "Loading..." : "Start Quiz"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

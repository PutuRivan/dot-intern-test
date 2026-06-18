import React from "react";
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
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export default function QuizOptionContainer({
  isQuestionsLoading,
  fetchQuestions,
  questionCategories,
  startQuiz,
}) {
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

  const onSubmit = async (data) => {
    const response = await fetchQuestions(data);
    if (!response.success) {
      toast.error("Kesalahan saat membuat soal");
    }
    startQuiz(data);
    toast.success(response.message);
    navigate("/quiz");
  };
  return (
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
                      <SelectItem value="5">5 Questions</SelectItem>
                      <SelectItem value="10">10 Questions</SelectItem>
                      <SelectItem value="15">15 Questions</SelectItem>
                      <SelectItem value="20">20 Questions</SelectItem>
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
                      <SelectItem value="1">1 Minutes</SelectItem>
                      <SelectItem value="5">5 Minutes</SelectItem>
                      <SelectItem value="10">10 Minutes</SelectItem>
                      <SelectItem value="15">15 Minutes</SelectItem>
                      <SelectItem value="20">20 Minutes</SelectItem>
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
                      {questionCategories.map((category) => (
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
  );
}

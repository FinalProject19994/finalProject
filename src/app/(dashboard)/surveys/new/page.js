"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ComboBox from "@/components/ui/ComboBox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/lib/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// TODO: Change the IDs
export default function Component() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [courses, setCourses] = useState([]);

  // Fetching data from the database
  useEffect(() => {
    const getCourses = async () => {
      const coursesCollection = collection(db, "courses");
      const coursesSnapshot = await getDocs(coursesCollection);
      const coursesList = coursesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(coursesList);
    };
    getCourses();
  }, []);

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      text: "",
      type: "radio",
      groups: [
        {
          id: Date.now() + 1,
          title: "Group 1",
          options: Array(7)
            .fill("")
            .map((_, i) => ({ id: i, text: `${i + 1}` })),
        },
      ],
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestionText = (id, text) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, text } : q)));
  };

  const updateQuestionType = (id, type) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === id) {
          if (type === "radio") {
            return {
              ...q,
              type,
              groups: [
                {
                  id: Date.now(),
                  title: "Group 1",
                  options: Array(7)
                    .fill("")
                    .map((_, i) => ({ id: i, text: `${i + 1}` })),
                },
              ],
            };
          } else {
            return { ...q, type, groups: [] };
          }
        }
        return q;
      }),
    );
  };

  const addGroup = (questionId) => {
    setQuestions(
      // TODO: Rename group to something else
      questions.map((q) => {
        if (q.id === questionId) {
          const newGroup = {
            id: Date.now(),
            title: `Group ${q.groups.length + 1}`,
            options: Array(7)
              .fill("")
              .map((_, i) => ({ id: i, text: `${i + 1}` })),
          };
          return { ...q, groups: [...q.groups, newGroup] };
        }
        return q;
      }),
    );
  };

  const updateGroupTitle = (questionId, groupId, title) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          const updatedGroups = q.groups.map((g) =>
            g.id === groupId ? { ...g, title } : g,
          );
          return { ...q, groups: updatedGroups };
        }
        return q;
      }),
    );
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const removeGroup = (questionId, groupId) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return { ...q, groups: q.groups.filter((g) => g.id !== groupId) };
        }
        return q;
      }),
    );
  };

  const goBack = () => {
    router.push("/surveys");
  };

  const handleSubmit = () => {
    // TODO: Create an ID from course code
    // TODO: Add validation
    setDoc(doc(db, "surveys", Date.now().toString()), {
      title,
      description,
      // activities,
      // courses,
      questions,
    });

    router.push("/surveys");
  };

  return (
    <div className="m-4 mt-0 h-[90dvh] flex-1 overflow-y-scroll rounded-md bg-white p-4 shadow-md">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-600">New Survey</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button className="cursor-pointer rounded-full p-2 hover:bg-gray-200">
              <X />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure you want to leave?</DialogTitle>
              <DialogDescription>
                Your progress will be lost if you leave this page.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={goBack}>
                Leave
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mx-auto max-w-2xl space-y-6 p-4">
        <Card>
          <CardHeader className="rounded-t-md bg-gradient-to-r from-primary_purple from-10% to-primary_purple_table to-50% p-6">
            <CardTitle className="text-2xl font-semibold text-white">
              Survey Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="my-2">
              <Label htmlFor="title">Survey Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Survey title"
              />
            </div>
            {/* TODO: Add onSelect for activities and courses */}
            <div className="flex flex-col space-y-1">
              {/* TODO: Change the courses to activities */}
              <Label htmlFor="activity">Activity</Label>
              <ComboBox options={courses} title="activity" />
            </div>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="course">Course</Label>
              <ComboBox options={courses} title="course" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="title"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Survey title"
              />
            </div>
          </CardContent>
        </Card>

        {questions.map((question, index) => (
          <Card key={question.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-primary_purple">
                Question {index + 1}
              </CardTitle>
              <Trash2
                onClick={() => removeQuestion(question.id)}
                size={37}
                className="cursor-pointer rounded-full p-2 hover:bg-gray-200"
              />
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={question.text}
                onChange={(e) =>
                  updateQuestionText(question.id, e.target.value)
                }
                placeholder="Enter question text"
              />
              <Select
                value={question.type}
                onValueChange={(value) =>
                  updateQuestionType(question.id, value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="radio">Radio Buttons</SelectItem>
                  <SelectItem value="open">Open Text</SelectItem>
                </SelectContent>
              </Select>
              {question.type === "radio" && (
                <div>
                  <Accordion type="single" collapsible className="w-full">
                    {question.groups.map((group, groupIndex) => (
                      <AccordionItem value={`item-${group.id}`} key={group.id}>
                        <AccordionTrigger className="text-left">
                          <Input
                            value={group.title}
                            onChange={(e) =>
                              updateGroupTitle(
                                question.id,
                                group.id,
                                e.target.value,
                              )
                            }
                            onClick={(e) => e.stopPropagation()}
                            className="w-full"
                          />
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2">
                            <div className="flex justify-between px-2 text-sm text-muted-foreground">
                              <span>1 - Not at all</span>
                              <span>7 - Always</span>
                            </div>
                            <div className="flex justify-between">
                              {group.options.map((option) => (
                                <div
                                  key={option.id}
                                  className="flex flex-col items-center"
                                >
                                  <div className="mb-1 h-4 w-4 rounded-full bg-primary" />
                                  <span className="text-sm">{option.text}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          {question.groups.length > 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeGroup(question.id, group.id)}
                              className="mt-2"
                            >
                              Remove Group
                            </Button>
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                  <Button
                    onClick={() => addGroup(question.id)}
                    className="mt-2"
                    variant="outline"
                  >
                    {/* TODO: Rename the button */}
                    Add Group
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        <button
          onClick={addQuestion}
          className="flex h-12 w-full items-center justify-center rounded-md border border-dashed border-gray-300 bg-white text-gray-600 transition-colors duration-200 hover:border-primary hover:text-primary"
        >
          <Plus className="mr-2" />
          Add Question
        </button>
        <div className="flex gap-6">
          <Button
            onClick={handleSubmit}
            className="mx-auto mt-10 w-1/3 bg-primary_purple"
          >
            Submit Survey
          </Button>
        </div>
      </div>
    </div>
  );
}

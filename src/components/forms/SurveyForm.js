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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/lib/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// TODO: Change the IDs
export default function SurveyForm({ closeModal }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);

  const [courses, setCourses] = useState([]);
  const [activities, setActivities] = useState([]);

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesSnapshot = await getDocs(collection(db, "courses"));
        const activitiesSnapshot = await getDocs(collection(db, "activities"));

        setCourses(
          coursesSnapshot.docs.map((doc) => ({
            id: doc.id,
            value: doc.id,
            label: doc.data().title,
          })),
        );

        setActivities(
          activitiesSnapshot.docs.map((doc) => ({
            id: doc.id,
            value: doc.id,
            label: doc.data().title,
          })),
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
    // Remove the `id` from each question
    const questionsWithoutIds = questions.map(({ id, ...rest }) => rest);

    // Save the survey data to the database without the question IDs
    setDoc(doc(db, "surveys", Date.now().toString()), {
      title,
      description,
      activity: selectedActivity,
      course: selectedCourse,
      questions: questionsWithoutIds, // Save the questions without IDs
    });

    closeModal();
    router.refresh();
  };

  // const handleSubmit = () => {
  //   // TODO: Create an ID from course code
  //   setDoc(doc(db, "surveys", Date.now().toString()), {
  //     title,
  //     description,
  //     activity: selectedActivity,
  //     course: selectedCourse,
  //     questions,
  //   });

  //   closeModal();
  //   router.refresh();
  // };

  return (
    <div className="mx-8 mt-0 h-[90dvh] flex-1 overflow-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-600">New Survey</h1>
      </div>
      <div className="mx-auto max-w-6xl space-y-6 p-4">
        <Card>
          <CardContent className="space-y-3">
            <div className="my-2 flex flex-col space-y-1">
              <Label htmlFor="title">Survey Title</Label>
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Survey title"
                className="w-full rounded-md border p-2 text-sm"
              />
            </div>
            {/* TODO: Add onSelect for activities and courses */}
            <div className="flex flex-col space-y-1">
              <Label htmlFor="activity">Activity</Label>
              <ComboBox
                options={activities}
                onSelect={(selectedOption) =>
                  setSelectedActivity(selectedOption)
                }
                title="activity"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="course">Course</Label>
              <ComboBox
                options={courses}
                onSelect={(selectedOption) => setSelectedCourse(selectedOption)}
                title="course"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
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
              <input
                value={question.text}
                onChange={(e) =>
                  updateQuestionText(question.id, e.target.value)
                }
                placeholder="Enter question text"
                className="w-full rounded-md border p-2 text-sm"
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
                          <input
                            value={group.title}
                            onChange={(e) =>
                              updateGroupTitle(
                                question.id,
                                group.id,
                                e.target.value,
                              )
                            }
                            onClick={(e) => e.stopPropagation()}
                            className="w-full rounded-md border p-2 text-sm"
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
        <Button
          onClick={handleSubmit}
          className="mx-auto flex w-fit bg-primary_purple"
        >
          Submit Survey
        </Button>
      </div>
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import DateRangePicker from "@/components/ui/DateRangePicker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MultipleSelector from "@/components/ui/MultipleSelector";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MultipleSelectionComboBox from "@/components/ui/MultipleSelectionComboBox";

export default function Component() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courses, setCourses] = useState([]);
  const [weekNumber, setWeekNumber] = useState("");
  const [skills, setSkills] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [reflection, setReflection] = useState("");
  const [images, setImages] = useState([]);

  const goBack = () => {
    router.push("/courses");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="m-4 mt-0 h-[90dvh] flex-1 overflow-y-scroll rounded-md bg-white p-4 shadow-md">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-600">New Activity</h1>
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
      <div className="mx-auto max-w-6xl space-y-6 p-4">
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Activity Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="w-full text-sm">
              <Label htmlFor="description">Description</Label>
              <Textarea />
            </div>

            <div className="flex gap-8">
              <div className="w-full">
                <Label htmlFor="weekNumber">Course</Label>
                <MultipleSelector
                  options={[
                    {
                      value: "Software Engineering",
                      label: "Software Engineering",
                    },
                    { value: "Computer Science", label: "Computer Science" },
                    { value: "Mathematics", label: "Mathematics" },
                    { value: "Physics", label: "Physics" },
                    { value: "Chemistry", label: "Chemistry" },
                    { value: "Biology", label: "Biology" },
                    { value: "Geography", label: "Geography" },
                    { value: "History", label: "History" },
                    { value: "Economics", label: "Economics" },
                    { value: "Psychology", label: "Psychology" },
                  ]}
                  selection="course"
                  onSelect={setCourses}
                />
              </div>

              <div className="w-full">
                <Label htmlFor="weekNumber">Week number</Label>
                <Input
                  type="number"
                  min={1}
                  max={13}
                  id="weekNumber"
                  value={weekNumber}
                  onChange={(e) => setId(e.target.value)}
                  required
                  className=""
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Skills</Label>
              <MultipleSelector
                options={[
                  { value: "Teamwork", label: "Teamwork" },
                  { value: "Communication", label: "Communication" },
                  { value: "Time Management", label: "Time Management" },
                  { value: "Problem Solving", label: "Problem Solving" },
                  { value: "Leadership", label: "Leadership" },
                  { value: "Adaptability", label: "Adaptability" },
                  { value: "Creativity", label: "Creativity" },
                  { value: "Critical Thinking", label: "Critical Thinking" },
                  {
                    value: "Emotional Intelligence",
                    label: "Emotional Intelligence",
                  },
                ]}
                selection="skills"
                onSelect={setSkills}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lecturer">Lecturers</Label>
              <MultipleSelector
                options={[
                  { value: "lecturer1", label: "Lecturer 1" },
                  { value: "lecturer2", label: "Lecturer 2" },
                  { value: "lecturer3", label: "Lecturer 3" },
                ]}
                onSelect={setLecturer}
                selection="lecturer"
              />
            </div>
            <div className="w-full text-sm">
              <Label htmlFor="reflection">Reflection</Label>
              <Textarea />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Upload Images</Label>
              <Input
                multiple
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => setImages(e.target.files?.[0] || null)}
              />
            </div>

            <Button
              type="submit"
              className="mx-auto mt-10 flex w-1/3 bg-primary_purple"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </div>
    </div>
  );
}

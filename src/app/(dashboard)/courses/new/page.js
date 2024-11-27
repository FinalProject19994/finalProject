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
  const [id, setId] = useState("");
  const [lecturer, setLecturer] = useState("");
  const [department, setDepartment] = useState("");
  const [description, setDescription] = useState("");
  const [selectedWeekDays, setSelectedWeekDays] = useState([]);

  const goBack = () => {
    router.push("/courses");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="m-4 mt-0 h-[90dvh] flex-1 overflow-y-scroll rounded-md bg-white p-4 shadow-md">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-gray-600">New Course</h1>
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
              <Label htmlFor="title">Course Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Course ID</Label>
              <Input
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Department</Label>
              <MultipleSelector
                options={[
                  { value: "department1", label: "Department 1" },
                  { value: "department2", label: "Department 2" },
                  { value: "department3", label: "Department 3" },
                ]}
                selection="department"
                onSelect={setDepartment}
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
              <Label htmlFor="lecturer">Date Range</Label>
              <DateRangePicker />
            </div>

            <div className="w-full text-sm">
              <Label htmlFor="weekDays">Week Days</Label>
              <MultipleSelectionComboBox options={weekDays} />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary_purple hover:bg-primary_purple_table"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </div>
    </div>
  );
}

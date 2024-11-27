"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import MultipleSelector from "../ui/MultipleSelector";
import { useState } from "react";
import DatePickerWithRange from "../ui/DateRangePicker";
import MultipleSelectionComboBox from "../ui/MultipleSelectionComboBox";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  category: z
    .string()
    .min(3, { message: "Category must be at least 3 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" })
    .optional(),
});

const weekDays = [
  { id: "1", label: "Sunday" },
  { id: "2", label: "Monday" },
  { id: "3", label: "Tuesday" },
  { id: "4", label: "Wednesday" },
  { id: "5", label: "Thursday" },
  { id: "6", label: "Friday" },
];

const ActivityForm = ({ type, data }) => {
  const [department, setDepartment] = useState([]);
  const [lecturers, setLecturers] = useState([]);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submit = handleSubmit(async (data) => {
    try {
      await setDoc(doc(db, "courses", Date.now().toString()), {
        name: data.name,
        category: data.category,
        description: data.description,
      });
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={submit}>
      <h1 className="text-xl font-semibold">Add a new Course</h1>
      <InputField
        label="Name"
        register={register}
        name="name"
        error={errors.name}
      />
      <InputField
        type="number"
        label="ID"
        register={register}
        name="id"
        error={errors.category}
      />
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Department</label>
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
        <label className="text-sm text-gray-400">Lecturers</label>
        <MultipleSelector
          options={[
            { value: "lecturer1", label: "Lecturer 1" },
            { value: "lecturer2", label: "Lecturer 2" },
            { value: "lecturer3", label: "Lecturer 3" },
          ]}
          onSelect={setLecturers}
          selection="lecturer"
        />
      </div>

      <div className="text-sm">
        <label className="text-sm text-gray-400">Date Range</label>
        <DatePickerWithRange />
      </div>

      <div className="w-full text-sm">
        <label className="text-sm text-gray-400">Week days</label>
        <MultipleSelectionComboBox options={weekDays} />
      </div>

      <button className="w-1/4 self-center rounded-md bg-primary_purple p-2 text-white">
        Add
      </button>
    </form>
  );
};

export default ActivityForm;

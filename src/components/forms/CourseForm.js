"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import MultipleSelector from "../ui/MultipleSelector";

const schema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  id: z.string().min(5, { message: "ID must be at least 5 characters" }),
  departments: z
    .array(z.string())
    .min(1, { message: "Select at least one department" }),
  lecturers: z
    .array(z.string())
    .nonempty({ message: "At least one lecturer must be selected" }),
  semester: z
    .string()
    .nonempty({ message: "Semester is required" })
    .refine((val) => ["winter", "spring", "summer"].includes(val), {
      message: "Invalid semester selected",
    }),
});

const weekDays = [
  { id: "1", label: "Sunday" },
  { id: "2", label: "Monday" },
  { id: "3", label: "Tuesday" },
  { id: "4", label: "Wednesday" },
  { id: "5", label: "Thursday" },
  { id: "6", label: "Friday" },
];

const CourseForm = ({ type, data, closeModal }) => {
  const [departments, setDepartments] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [selectedWeekdays, setSelectedWeekdays] = useState([]);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Fetch data
  useEffect(() => {
    const fetchDepartmentsAndLecturers = async () => {
      try {
        // Fetch departments
        const departmentSnapshot = await getDocs(collection(db, "departments"));
        const fetchedDepartments = departmentSnapshot.docs.map((doc) => ({
          id: doc.id,
          value: doc.id,
          label: doc.data().title,
        }));
        setDepartments(fetchedDepartments);

        // Fetch users
        const userSnapshot = await getDocs(collection(db, "users"));
        const fetchedLecturers = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          value: doc.id,
          label: doc.data().name,
        }));
        setLecturers(fetchedLecturers);
      } catch (error) {
        console.error("Error fetching departments or lecturers:", error);
      }
    };

    fetchDepartmentsAndLecturers();
  }, []);

  const submit = handleSubmit(async (formData) => {
    try {
      await setDoc(doc(db, "courses", formData.id), {
        title: formData.title,
        id: formData.id,
        departments: formData.departments.map((departmentId) =>
          doc(db, "departments", departmentId),
        ),
        lecturers: formData.lecturers.map((lecturerId) =>
          doc(db, "users", lecturerId),
        ),
        semester: formData.semester,
      });
      closeModal();
      router.refresh();
    } catch (error) {
      console.error("Error adding course:", error);
    }
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={submit}>
      <h1 className="text-xl font-semibold">Add a new Course</h1>
      <InputField label="Title" register={register} name="title" />
      <InputField
        type="number"
        label="ID"
        register={register}
        name="id"
        error={errors.id}
      />
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Department</label>
        <MultipleSelector
          options={departments}
          selection="department"
          onSelect={(selected) => {
            setValue(
              "department",
              selected.map((department) => department.value),
            );
          }}
        />
        {errors.department && (
          <p className="text-xs text-red-500">
            {errors.department.message.toString()}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">Lecturers</label>
        <MultipleSelector
          options={lecturers}
          selection="lecturers"
          onSelect={(selected) => {
            setValue(
              "lecturers",
              selected.map((lecturer) => lecturer.value),
            );
          }}
        />
        {errors.lecturers && (
          <p className="text-xs text-red-500">
            {errors.lecturers.message.toString()}
          </p>
        )}
      </div>
      <div>
        <label className="text-sm text-gray-400">Semester</label>
        <Select
          onValueChange={(value) => {
            setValue("semester", value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key={"Winter"} value="winter">
              Winter
            </SelectItem>
            <SelectItem key={"Spring"} value="spring">
              Spring
            </SelectItem>
            <SelectItem key={"Summer"} value="summer">
              Summer
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.semester && (
          <p className="text-xs text-red-500">
            {errors.semester.message.toString()}
          </p>
        )}
      </div>

      <div className="text-sm">
        <label className="text-sm text-gray-400">Date Range</label>
      </div>

      <div className="w-full text-sm">
        <label className="text-sm text-gray-400">Weekdays</label>
        {/* <MultipleSelectionComboBox
          options={weekDays}
          onSelect={(selected) => {
            setSelectedWeekdays(selected.map((day) => day.id));
          }}
        /> */}
      </div>

      <button className="w-1/4 self-center rounded-md bg-primary_purple p-2 text-white">
        Add
      </button>
    </form>
  );
};

export default CourseForm;

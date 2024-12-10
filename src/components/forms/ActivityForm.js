"use client";
import currentDate from "@/components/currentDate";
import { db } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import MultipleSelector from "../ui/MultipleSelector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

// Define the schema for form validation
const schema = z.object({
  title: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" })
    .optional(),
  course: z.string().nonempty({ message: "Course is required" }),
  weekNumber: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Week number must be a positive number",
    }),
  skills: z.array(z.string()).min(1, { message: "Select at least one skill" }),
  lecturers: z
    .array(z.string())
    .nonempty({ message: "At least one lecturer must be selected" }),
  reflection: z
    .string()
    .min(3, { message: "Reflection must be at least 3 characters" })
    .optional(),
});

const ActivityForm = ({ closeModal }) => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [skills, setSkills] = useState([]);
  const [lecturers, setLecturers] = useState([]);

  // Fetch courses
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch courses
        const querySnapshot = await getDocs(collection(db, "courses"));
        const fetchedCourses = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(fetchedCourses);

        // Fetch skills
        const skillsSnapshot = await getDocs(collection(db, "skills"));
        const fetchedSkills = skillsSnapshot.docs.map((doc) => ({
          id: doc.id,
          value: doc.id,
          label: doc.data().name,
        }));
        setSkills(fetchedSkills);

        // Fetch lecturers
        const lecturersSnapshot = await getDocs(collection(db, "users"));
        const fetchedLecturers = lecturersSnapshot.docs.map((doc) => ({
          id: doc.id,
          value: doc.id,
          label: doc.data().name,
        }));
        setLecturers(fetchedLecturers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Set up React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Submit handler
  const submit = handleSubmit(async (formData) => {
    try {
      // Generate activity ID
      const querySnapshot = await getDocs(collection(db, "activities"));
      const nextNumber = querySnapshot.docs.length + 1;
      const activityId = `${formData.course}-${nextNumber}`;
      const activityDocRef = doc(db, "activities", activityId);

      // Save activity data
      await setDoc(activityDocRef, {
        title: formData.title,
        description: formData.description,
        course: doc(db, "courses", formData.course),
        weekNumber: formData.weekNumber,
        skills: formData.skills.map((skillId) => doc(db, "skills", skillId)),
        lecturers: formData.lecturers.map(
          (lecturerId) => doc(db, "users", lecturerId),
          doc(db, "users", lecturerId),
        ),
        reflection: formData.reflection,
        date: currentDate,
      });

      // Close modal and refresh page
      closeModal();
      router.refresh();
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  });

  return (
    <form className="flex flex-col gap-4 p-4" onSubmit={submit}>
      <h1 className="text-xl font-semibold">Add a New Activity</h1>

      {/* Name Field */}
      <InputField
        label="Title"
        register={register}
        name="title"
        error={errors.title}
      />

      {/* Description Field */}
      <div>
        <label className="text-sm text-gray-400">Description</label>
        <Textarea
          placeholder="Enter a Description..."
          {...register("description")}
        />
        {errors.description && (
          <span className="text-sm text-red-500">
            {errors.description.message}
          </span>
        )}
      </div>

      {/* Course Select */}
      <div>
        <label className="text-sm text-gray-400">Course</label>
        <Select
          onValueChange={(id) => {
            setValue("course", id);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course.id} value={course.id}>
                {course.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.course && (
          <span className="text-sm text-red-500">{errors.course.message}</span>
        )}
      </div>

      {/* Week Number Field */}
      <InputField
        label="Week Number"
        type="number"
        register={register}
        name="weekNumber"
        error={errors.weekNumber}
      />

      {/* Skills Selector */}
      <div>
        <label className="text-sm text-gray-400">Skills</label>
        <MultipleSelector
          options={skills}
          name="skills"
          selection="skills"
          onSelect={(selected) => {
            setValue(
              "skills",
              selected.map((skill) => skill.value),
            );
          }}
        />
        {errors.skills && (
          <span className="text-sm text-red-500">{errors.skills.message}</span>
        )}
      </div>

      {/* Lecturers Selector */}
      <div>
        <label className="text-sm text-gray-400">Lecturers</label>
        <MultipleSelector
          options={lecturers}
          name="lecturers"
          selection="lecturers"
          onSelect={(selected) => {
            setValue(
              "lecturers",
              selected.map((lecturer) => lecturer.value),
            );
          }}
        />
        {errors.lecturers && (
          <span className="text-sm text-red-500">
            {errors.lecturers.message}
          </span>
        )}
      </div>

      {/* Reflection Textarea */}
      <div>
        <label className="text-sm text-gray-400">Reflection</label>
        <Textarea
          placeholder="Enter a Reflection..."
          {...register("reflection")}
        />
        {errors.reflection && (
          <span className="text-sm text-red-500">
            {errors.reflection.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="self-center rounded-md bg-primary_purple px-4 py-2 text-white"
      >
        Create
      </button>
    </form>
  );
};

export default ActivityForm;

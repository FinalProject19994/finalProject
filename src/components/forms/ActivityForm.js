"use client";
import { db } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import MultipleSelector from "../ui/MultipleSelector";
import { Textarea } from "../ui/textarea";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" })
    .optional(),
  courses: z
    .string()
    .min(3, { message: "Course must be at least 3 characters" }),
  weekNumber: z.string().transform((val) => Number(val)),
  skills: z
    .string()
    .min(3, { message: "Skills must be at least 3 characters" }),
  lecturers: z
    .string()
    .min(3, { message: "Lecturers must be at least 3 characters" }),
  reflection: z
    .string()
    .min(3, { message: "Reflection must be at least 3 characters" })
    .optional(),
  image: z.instanceof(File, { message: "Image format is invalid" }).optional(),
});

const ActivityForm = ({ type, data }) => {
  const router = useRouter();

  const [courses, setCourses] = useState([]);
  const [skills, setSkills] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submit = handleSubmit(async (data) => {
    try {
      const id = `${data.courses}-${courses.length + 1}`;
      await setDoc(doc(db, "activities", id), {
        name: data.name,
        description: data.description,
        courses: data.courses,
        weekNumber: data.weekNumber,
        skills: data.skills,
        lecturers: data.lecturers,
        reflection: data.reflection,
        image: data.image,
      });
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  });

  return (
    <form className="flex flex-col gap-2" onSubmit={submit}>
      <h1 className="text-xl font-semibold">Add a new activity</h1>
      <InputField
        label="Name"
        register={register}
        name="name"
        error={errors.name}
      />
      <InputField
        label="Description"
        register={register}
        name="description"
        error={errors.description}
      />
      <div>
        <label className="text-sm text-gray-400">Course</label>
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
          selection="courses"
          onSelect={setCourses}
        />
      </div>
      <InputField
        label="Week number"
        type="number"
        register={register}
        name="weekNumber"
        error={errors.weekNumber}
      />
      <div>
        <label className="text-sm text-gray-400">Skills</label>
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

      <div>
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

      <div>
        <label className="text-sm text-gray-400">Reflection</label>
        <Textarea
          placeholder="Enter a Reflection..."
          {...register("reflection")}
        />
      </div>

      <label className="text-sm text-gray-400">Upload Images</label>
      <input
        type="file"
        multiple
        id="image"
        accept="image/*"
        {...register("image")}
      />

      <button className="w-max self-center rounded-md bg-primary_purple p-2 text-white">
        Create
      </button>
    </form>
  );
};

export default ActivityForm;

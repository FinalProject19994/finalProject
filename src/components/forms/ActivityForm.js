"use client";
import { db } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import MultipleSelector from "../ui/MultipleSelector";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" })
    .optional(),
  courses: z
    .array(z.string())
    .nonempty({ message: "At least one course must be selected" }),
  weekNumber: z
    .string()
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Week number must be a positive number",
    }),
  // skills: z.array(z.string()).min(1, { message: "Select at least one skill" }),
  // lecturers: z
  //   .array(z.string())
  //   .nonempty({ message: "At least one lecturer must be selected" }),
  reflection: z
    .string()
    .min(3, { message: "Reflection must be at least 3 characters" })
    .optional(),
  // image: z.any().optional(), // Modify to handle files manually
});

const ActivityForm = ({ type, data, closeModal }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submit = handleSubmit(async (formData) => {
    console.log("Submit function triggered");
    alert("Work in progress...");
    try {
      // const id = `${data.courses}${courses.length + 1}`;
      const id = `${Math.floor(Math.random() * 1000)}`;
      await setDoc(doc(db, "activities", id), {
        name: formData.name,
        description: formData.description,
        courses: formData.courses,
        weekNumber: formData.weekNumber,
        // skills: formData.skills,
        // lecturers: formData.lecturers,
        reflection: formData.reflection,
        // image: imageUrl,
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
        <div className="flex flex-col gap-2">
          <Select
            onValueChange={(value) => {
              setValue("category", value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select question type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="emotional quotient">
                Emotional quotient
              </SelectItem>
              <SelectItem value="thinking development">
                Thinking development
              </SelectItem>
              <SelectItem value="mindset">Mindset</SelectItem>
              <SelectItem value="professional self">
                Professional self
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.category && (
            <span className="text-sm text-red-500">
              {errors.category.message}
            </span>
          )}
        </div>
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
            { id: 1, value: "Teamwork", label: "Teamwork" },
            { id: 2, value: "Communication", label: "Communication" },
            { id: 3, value: "Time Management", label: "Time Management" },
            { id: 4, value: "Problem Solving", label: "Problem Solving" },
            { id: 5, value: "Leadership", label: "Leadership" },
            { id: 6, value: "Adaptability", label: "Adaptability" },
            { id: 7, value: "Creativity", label: "Creativity" },
            { id: 8, value: "Critical Thinking", label: "Critical Thinking" },
            {
              id: 9,
              value: "Emotional Intelligence",
              label: "Emotional Intelligence",
            },
          ]}
          name="skills"
          selection="skills"
          onSelect={(value) => {
            console.log("Selected skills:", value);
            setValue("skills", value);
          }}
        />
      </div>
      <div>
        <label className="text-sm text-gray-400">Lecturers</label>
        <MultipleSelector
          options={[
            { id: 1, value: "lecturer1", label: "Lecturer 1" },
            { id: 2, value: "lecturer2", label: "Lecturer 2" },
            { id: 3, value: "lecturer3", label: "Lecturer 3" },
          ]}
          selection="lecturer"
          onSelect={(value) => {
            console.log("Selected lecturers:", value);
            setValue("lecturers", value);
          }}
        />
      </div>
      <div>
        <label className="text-sm text-gray-400">Reflection</label>
        <Textarea
          placeholder="Enter a Reflection..."
          name="reflection"
          {...register("reflection")}
        />
      </div>
      <label className="text-sm text-gray-400">Upload Images</label>
      {/* <input
        type="file"
        multiple
        id="image"
        accept="image/*"
        {...register("image")}
      /> */}
      <button className="w-max self-center rounded-md bg-primary_purple p-2 text-white">
        Create
      </button>
    </form>
  );
};

export default ActivityForm;

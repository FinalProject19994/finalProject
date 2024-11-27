"use client";
import { db } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";
import MultipleSelectorComboBox from "../ui/MultipleSelectionComboBox";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  category: z.string().nonempty({ message: "Category is required" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" })
    .optional(),
  code: z
    .string()
    .min(2, { message: "Code must be 2 characters" })
    .max(2, { message: "Code must be 2 characters" }),
  // properties: z.string().nonempty({ message: "Properties are required" }),
});

// TODO: Add Properties to the form

const SkillForm = ({ type, data, closeModal }) => {
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
    try {
      await setDoc(doc(db, "skills", formData.code), {
        name: formData.name,
        category: formData.category,
        code: formData.code,
        description: formData.description,
      });
      closeModal();
      router.refresh();
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={submit}>
      <h1 className="text-xl font-semibold">Add a new skill</h1>
      <InputField
        label="Name"
        register={register}
        name="name"
        error={errors.name}
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">Category</label>
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
            <SelectItem value="professional self">Professional self</SelectItem>
          </SelectContent>
        </Select>
        {errors.category && (
          <span className="text-sm text-red-500">
            {errors.category.message}
          </span>
        )}
      </div>

      <InputField
        label="Code"
        register={register}
        name="code"
        error={errors.code}
      />

      {/* <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">Properties</label>
        <MultipleSelectorComboBox
          options={[{ label: "Self" }, { label: "Team" }, { label: "Course" }]}
        />
      </div> */}

      <InputField
        label="Description"
        register={register}
        name="description"
        error={errors.description}
      />
      <button className="w-max self-center rounded-md bg-primary_purple p-2 text-white">
        Create
      </button>
    </form>
  );
};

export default SkillForm;

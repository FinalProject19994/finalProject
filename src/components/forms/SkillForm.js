"use client";
import { db } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  category: z.string().nonempty({ message: "Category is required" }),
  code: z
    .string()
    .min(2, { message: "Code must be 2 characters" })
    .max(2, { message: "Code must be 2 characters" }),
});

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

  useEffect(() => {
    if (type === "edit" && data) {
      setValue("name", data.name);
      setValue("category", data.category);
      setValue("code", data.id);
    }
  }, [type, data, setValue]);

  const submit = handleSubmit(async (formData) => {
    try {
      if (type === "edit") {
        // Check if the code is being updated
        if (data.id !== formData.code) {
          // Delete the old document
          const oldSkillDocRef = doc(db, "skills", data.id);
          await deleteDoc(oldSkillDocRef);

          // Create a new document with the new code as ID
          const newSkillDocRef = doc(db, "skills", formData.code);
          await setDoc(newSkillDocRef, {
            name: formData.name,
            category: formData.category,
            code: formData.code, // Use the new code
          });
        } else {
          // Update existing skill without changing the ID
          const skillDocRef = doc(db, "skills", data.id);
          await updateDoc(skillDocRef, {
            name: formData.name,
            category: formData.category,
            code: formData.code, // Ensure code is still updated
          });
        }
      } else {
        // Create new skill
        await setDoc(doc(db, "skills", formData.code), {
          name: formData.name,
          category: formData.category,
          code: formData.code,
        });
      }
      closeModal();
      router.refresh();
    } catch (error) {
      console.error("Error saving skill:", error);
    }
  });

  return (
    <form className="flex flex-col gap-8" onSubmit={submit}>
      <h1 className="text-xl font-semibold">
        {type === "edit" ? "Edit Skill" : "Add a new skill"}
      </h1>
      <InputField
        label="Name"
        register={register}
        name="name"
        error={errors.name}
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">Category</label>
        <Select
          onValueChange={(value) => setValue("category", value)}
          defaultValue={data?.category}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Emotional quotient">
              Emotional quotient
            </SelectItem>
            <SelectItem value="Thinking development">
              Thinking development
            </SelectItem>
            <SelectItem value="Mindset">Mindset</SelectItem>
            <SelectItem value="Professional self">Professional self</SelectItem>
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
        disabled={type === "edit"}
      />

      <button
        className="w-max self-center rounded-md bg-primary_purple p-2 text-white"
        type="submit"
      >
        {type === "edit" ? "Save Changes" : "Create"}
      </button>
    </form>
  );
};

export default SkillForm;

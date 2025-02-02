"use client";
import { db } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
  properties: z.string().nonempty({ message: "Properties are required" }),
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
      setValue("properties", data.properties);
    }
  }, [type, data, setValue]);

  const submit = handleSubmit(async (formData) => {
    try {
      if (type === "edit") {
        // Check if the code is being updated
        if (data.id !== formData.code) {
          // Check if a skill with the new code already exists
          const newCodeRef = doc(db, "skills", formData.code);
          const newCodeSnap = await getDoc(newCodeRef);
          if (newCodeSnap.exists()) {
            toast.error("A skill with this code already exists");
            return;
          }

          // Delete the old document
          const oldSkillDocRef = doc(db, "skills", data.id);
          await deleteDoc(oldSkillDocRef);

          // Create a new document with the new code as ID
          await setDoc(newCodeRef, {
            name: formData.name,
            category: formData.category,
            code: formData.code,
            properties: formData.properties,
          });
          toast.success("Skill updated and moved to new code successfully");
        } else {
          // Update existing skill without changing the ID
          const skillDocRef = doc(db, "skills", data.id);
          await updateDoc(skillDocRef, {
            name: formData.name,
            category: formData.category,
            code: formData.code,
            properties: formData.properties,
          });
          toast.success("Skill updated successfully");
        }
      } else {
        // Check if a skill with the entered code already exists
        const codeRef = doc(db, "skills", formData.code);
        const codeSnap = await getDoc(codeRef);
        if (codeSnap.exists()) {
          toast.error("A skill with this code already exists");
          return;
        }

        // Create new skill
        await setDoc(doc(db, "skills", formData.code), {
          name: formData.name,
          category: formData.category,
          code: formData.code,
          properties: formData.properties,
        });
        toast.success("Skill created successfully");
      }
      closeModal();
      router.refresh();
    } catch (error) {
      console.error("Error saving skill:", error);
      toast.error("Failed to save skill");
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
      />

      <InputField
        label="Properties"
        register={register}
        name="properties"
        error={errors.properties}
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

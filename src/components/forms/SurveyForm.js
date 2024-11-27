"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, setDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

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

const SkillForm = ({ type, data }) => {
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
      await setDoc(doc(db, "skills", Date.now().toString()), {
        name: data.name,
        category: data.category,
        description: data.description,
      });
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
      <InputField
        label="Category"
        register={register}
        name="category"
        error={errors.category}
      />
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

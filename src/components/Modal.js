"use client";
import { Plus } from "lucide-react";
import { useState } from "react";
import { X } from "lucide-react";
import SkillForm from "./forms/SkillForm";
import ActivityForm from "./forms/ActivityForm";
import CourseForm from "./forms/CourseForm";
import SurveyForm from "./forms/SurveyForm";

const forms = {
  skill: (type, data, closeModal) => (
    <SkillForm type={type} data={data} closeModal={closeModal} />
  ),
  activity: (type, data, closeModal) => (
    <ActivityForm type={type} data={data} closeModal={closeModal} />
  ),
  course: (type, data, closeModal) => (
    <CourseForm type={type} data={data} closeModal={closeModal} />
  ),
  survey: (type, data, closeModal) => (
    <SurveyForm type={type} data={data} closeModal={closeModal} />
  ),
};
const Modal = ({ table, type, data, id }) => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const Form = () => {
    return type === "delete" && id ? (
      <form action="" className="flex flex-col gap-4 p-4">
        <span className="text-center font-medium">
          All data will be deleted. Are you sure you want to delete this {table}
          ?
        </span>
        <button className="w-max self-center rounded-md border-none bg-red-700 px-4 py-2 text-white">
          delete
        </button>
      </form>
    ) : type === "create" || type === "edit" ? (
      forms[table](type, data, closeModal)
    ) : (
      "Form not found"
    );
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border border-gray-200 p-2 duration-150 hover:bg-gray-100"
      >
        <Plus />
        Create new {table}
      </button>
      {open && (
        <div className="absolute left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-60">
          <div className="relative w-11/12 rounded-md bg-white p-4 md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute right-4 top-4 cursor-pointer"
              onClick={closeModal}
            >
              <X />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;

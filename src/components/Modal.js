"use client";
import { X } from "lucide-react";
import ActivityForm from "./forms/ActivityForm";
import CourseForm from "./forms/CourseForm";
import SkillForm from "./forms/SkillForm";
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

const Modal = ({ table, type, data, closeModal }) => {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-11/12 rounded-md bg-white p-4 dark:bg-gray-500 md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]"
      >
        {forms[table](type, data, closeModal)}
        <button
          onClick={closeModal}
          className="absolute right-4 top-4 cursor-pointer rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default Modal;

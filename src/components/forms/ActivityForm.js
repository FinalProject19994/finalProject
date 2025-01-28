"use client";
import ComboBox from "@/components/ui/ComboBox";
import currentDate from "@/lib/currentDate";
import { db } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import MultipleSelector from "../ui/MultipleSelector";
import { Textarea } from "../ui/textarea";

// Define the schema for form validation
const schema = z.object({
  title: z.string().min(3, { message: "Name must be at least 3 characters" }),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" })
    .optional(),
  course: z.string().nonempty({ message: "Course is required" }),
  weekNumber: z.coerce
    .number()
    .min(1, { message: "Week number must be a positive number" }),
  skills: z.array(z.string()).min(1, { message: "Select at least one skill" }),
  lecturers: z
    .array(z.string())
    .nonempty({ message: "At least one lecturer must be selected" }),
  reflection: z
    .string()
    .min(3, { message: "Reflection must be at least 3 characters" })
    .optional(),
});
const ActivityForm = ({ type, data, closeModal }) => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [skills, setSkills] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [defaultSelectedSkills, setDefaultSelectedSkills] = useState([]);
  const [defaultSelectedLecturers, setDefaultSelectedLecturers] = useState([]);

  // Fetch courses, skills, and lecturers
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch courses
        const querySnapshot = await getDocs(collection(db, "courses"));
        const fetchedCourses = querySnapshot.docs.map((doc) => {
          const courseData = doc.data();
          return {
            id: doc.id,
            value: doc.id,
            label: `${courseData.title} - ${courseData.semester} ${courseData.year}`,
            ...courseData,
          };
        });
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

  useEffect(() => {
    if (type === "edit" && data) {
      let defaultSkills = []; // Initialize defaultSkills as empty array

      if (Array.isArray(data.skills)) {
        // --- CHECK if data.skills is an array (outer check) ---
        defaultSkills = data.skills
          .map((skill, index) => {
            // Iterate only IF data.skills is an array
            if (typeof skill === "object" && skill !== null) {
              // --- ADDED: CHECK if skill item is an object ---
              if (
                typeof skill.name === "string" &&
                typeof skill.id === "string"
              ) {
                // --- ADDED: CHECK if skill.name and skill.id are strings ---
                return {
                  // Only create object if skill, skill.name, and skill.id are valid
                  label: skill.name,
                  value: skill.id,
                  id: skill.id,
                };
              } else {
                console.warn(
                  `ActivityForm - useEffect - Invalid skill object (missing name or id string) at index ${index}:`,
                  skill,
                ); // Warn if skill object is missing name or id string
                return null; // Skip invalid skill object
              }
            } else {
              console.warn(
                `ActivityForm - useEffect - Invalid skill item (not an object) at index ${index}:`,
                skill,
              ); // Warn if skill item is not an object
              return null; // Skip invalid skill item
            }
          })
          .filter(Boolean); // Filter out any null values from mapping
      } else {
        console.warn(
          "ActivityForm - useEffect - data.skills is NOT an array or is undefined:",
          data.skills,
        ); // Warn if data.skills is not an array
      }

      setDefaultSelectedSkills(defaultSkills);
      console.log("Default Skills (Robust Handling):", defaultSkills); // Log robustly handled defaultSkills

      let defaultLecturers = []; // Initialize defaultLecturers as empty array

      if (Array.isArray(data.lecturers)) {
        // --- ADDED: CHECK if data.lecturers is an array ---
        defaultLecturers = data.lecturers
          .map((lecturer, index) => {
            // Iterate only IF data.lecturers is an array
            if (typeof lecturer === "object" && lecturer !== null) {
              // --- ADDED: CHECK if lecturer item is an object ---
              if (
                typeof lecturer.name === "string" &&
                typeof lecturer.id === "string"
              ) {
                // --- ADDED: CHECK if lecturer.name and lecturer.id are strings ---
                return {
                  // Only create object if lecturer, lecturer.name, and lecturer.id are valid
                  label: lecturer.name,
                  value: lecturer.id,
                  id: lecturer.id,
                };
              } else {
                console.warn(
                  `ActivityForm - useEffect - Invalid lecturer object (missing name or id string) at index ${index}:`,
                  lecturer,
                ); // Warn if lecturer object is missing name or id string
                return null; // Skip invalid lecturer object
              }
            } else {
              console.warn(
                `ActivityForm - useEffect - Invalid lecturer item (not an object) at index ${index}:`,
                lecturer,
              ); // Warn if lecturer item is not an object
              return null; // Skip invalid lecturer item
            }
          })
          .filter(Boolean); // Filter out any null values from mapping
      } else {
        console.warn(
          "ActivityForm - useEffect - data.lecturers is NOT an array or is undefined:",
          data.lecturers,
        ); // Warn if data.lecturers is not an array
      }
      setDefaultSelectedLecturers(defaultLecturers);
      console.log("Default Lecturers (Robust Handling):", defaultLecturers); // Log robustly handled defaultLecturers

      setValue("title", data.title);
      setValue("description", data.description || "");
      setValue("course", data.course.id);
      setValue("weekNumber", data.weekNumber);
      setValue(
        "skills",
        data.skills.map((skill) => skill.id),
      );
      setValue(
        "lecturers",
        data.lecturers.map((lecturer) => lecturer.id),
      );
      setValue("reflection", data.reflection);
    }
    if (type === "duplicate" && data) {
      const defaultSkills = data.skills.map((skill) => {
        return {
          label: skill.name,
          value: skill.id,
          id: skill.id,
        };
      });
      setDefaultSelectedSkills(defaultSkills);
      setValue(
        "skills",
        data.skills.map((skill) => skill.id),
      );

      setValue("title", data.title);
      setValue("description", data.description || "");
      setValue("course", data.course.id);
      setValue("reflection", data.reflection);
    }
  }, [type, data, setValue]);

  // Submit handler
  const submit = handleSubmit(async (formData) => {
    try {
      const activityData = {
        title: formData.title,
        description: formData.description,
        course: formData.course ? doc(db, "courses", formData.course) : null, // Handle null course if not selected
        weekNumber: formData.weekNumber,
        skills: formData.skills.map((skillId) => doc(db, "skills", skillId)),
        lecturers: formData.lecturers.map((lecturerId) =>
          doc(db, "users", lecturerId),
        ),
        reflection: formData.reflection,
      };

      if (type === "edit") {
        const activityDocRef = doc(db, "activities", data.id);
        await updateDoc(activityDocRef, activityData);
      } else if (type === "duplicate" || type === "create") {
        // --- Handle "duplicate" and "create" types together ---
        const querySnapshot = await getDocs(collection(db, "activities"));
        const nextNumber = querySnapshot.docs.length + 1;
        const activityId = `${formData.course}-${nextNumber}`;
        const activityDocRef = doc(db, "activities", activityId);

        await setDoc(activityDocRef, {
          ...activityData,
          date: currentDate,
        });
      }

      closeModal();
      router.refresh();
    } catch (error) {
      console.error("Error handling activity:", error);
    }
  });

  return (
    <form
      className="flex max-h-[85vh] flex-col gap-4 overflow-auto p-4"
      onSubmit={submit}
    >
      <h1 className="text-xl font-semibold">
        {type === "edit" ? "Edit Activity" : "Add a New Activity"}
      </h1>

      {/* Name Field */}
      <InputField
        label="Title"
        register={register}
        name="title"
        error={errors.title}
      />

      {/* Description Field */}
      <div>
        <label className="text-sm text-gray-600 dark:text-gray-50">
          Description
        </label>
        <Textarea
          className="rounded-md border p-2 text-sm text-gray-700 outline-none dark:bg-gray-400 dark:placeholder-slate-700"
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
        <label className="text-sm text-gray-600 dark:text-gray-50">
          Course
        </label>
        <ComboBox
          options={courses} // Pass the 'courses' array as options
          onSelect={(selectedCourse) => {
            // Handle selected course
            setValue("course", selectedCourse?.value); // Set form value to selected course ID
          }}
          title="course"
          defaultValue={data?.course?.id} // Pass default course ID for edit mode
        />
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
        <label className="text-sm text-gray-600 dark:text-gray-50">
          Skills
        </label>
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
          defaultValues={defaultSelectedSkills}
        />
        {errors.skills && (
          <span className="text-sm text-red-500">{errors.skills.message}</span>
        )}
      </div>

      {/* Lecturers Selector */}
      <div>
        <label className="text-sm text-gray-600 dark:text-gray-50">
          Lecturers
        </label>
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
          defaultValues={defaultSelectedLecturers}
        />
        {errors.lecturers && (
          <span className="text-sm text-red-500">
            {errors.lecturers.message}
          </span>
        )}
      </div>

      {/* Reflection Textarea */}
      <div>
        <label className="text-sm text-gray-600 dark:text-gray-50">
          Reflection
        </label>
        <Textarea
          placeholder="Enter a Reflection..."
          className="rounded-md border p-2 text-sm text-gray-800 outline-none dark:bg-gray-400 dark:placeholder-slate-700"
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
        {type === "edit" ? "Save Changes" : "Create"}
      </button>
    </form>
  );
};

export default ActivityForm;

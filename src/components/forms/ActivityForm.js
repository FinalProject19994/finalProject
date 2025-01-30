"use client";
import ComboBox from "@/components/ui/ComboBox";
import currentDate from "@/lib/currentDate";
import { auth, db } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Set the current user as the default selected lecturer
        const userRef = doc(db, "users", user.uid);
        getDoc(userRef).then((doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setDefaultSelectedLecturers([
              {
                label: userData.name,
                value: user.uid,
                id: user.uid,
              },
            ]);
            // Also set the value in the form
            setValue("lecturers", [user.uid]);
          }
        });
      }
    });

    return () => unsubscribe();
  }, []);

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
      let defaultSkills = [];

      if (Array.isArray(data.skills)) {
        defaultSkills = data.skills
          .map((skill, index) => {
            if (typeof skill === "object" && skill !== null) {
              if (
                typeof skill.name === "string" &&
                typeof skill.id === "string"
              ) {
                return {
                  label: skill.name,
                  value: skill.id,
                  id: skill.id,
                };
              } else {
                console.warn(
                  `ActivityForm - useEffect - Invalid skill object (missing name or id string) at index ${index}:`,
                  skill,
                );
                return null;
              }
            } else {
              console.warn(
                `ActivityForm - useEffect - Invalid skill item (not an object) at index ${index}:`,
                skill,
              );
              return null;
            }
          })
          .filter(Boolean); // Filter out any null values from mapping
      } else {
        console.warn(
          "ActivityForm - useEffect - data.skills is NOT an array or is undefined:",
          data.skills,
        );
      }

      setDefaultSelectedSkills(defaultSkills);

      let defaultLecturers = [];

      if (Array.isArray(data.lecturers)) {
        defaultLecturers = data.lecturers
          .map((lecturer, index) => {
            if (typeof lecturer === "object" && lecturer !== null) {
              if (
                typeof lecturer.name === "string" &&
                typeof lecturer.id === "string"
              ) {
                return {
                  label: lecturer.name,
                  value: lecturer.id,
                  id: lecturer.id,
                };
              } else {
                console.warn(
                  `ActivityForm - useEffect - Invalid lecturer object (missing name or id string) at index ${index}:`,
                  lecturer,
                );
                return null;
              }
            } else {
              console.warn(
                `ActivityForm - useEffect - Invalid lecturer item (not an object) at index ${index}:`,
                lecturer,
              );
              return null;
            }
          })
          .filter(Boolean);
      } else {
        console.warn(
          "ActivityForm - useEffect - data.lecturers is NOT an array or is undefined:",
          data.lecturers,
        );
      }
      setDefaultSelectedLecturers(
        data.lecturers.map((lecturer) => ({
          label: lecturer.name,
          value: lecturer.id,
        })),
      );

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
    setUploadProgress({});
    setLoading(true);
    try {
      // 1. Determine Activity ID:
      let activityId;
      if (type === "edit") {
        activityId = data.id;
      } else {
        const querySnapshot = await getDocs(collection(db, "activities"));
        const nextNumber = querySnapshot.docs.length + 1;
        activityId = `${formData.course}-${nextNumber}`;
      }

      // 2. Upload Images (if any):
      const storage = getStorage();
      const imageUrls = [];

      if (selectedFiles.length > 0) {
        const uploadPromises = Array.from(selectedFiles).map((file) => {
          const storageRef = ref(
            storage,
            `activity-images/${activityId}/${file.name}`,
          );
          const uploadTask = uploadBytesResumable(storageRef, file);

          return new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress((prev) => ({
                  ...prev,
                  [file.name]: progress,
                }));
              },
              (error) => {
                console.error("Error uploading image:", error);
                reject(error);
              },
              async () => {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref,
                );
                imageUrls.push(downloadURL);
                resolve();
              },
            );
          });
        });

        await Promise.all(uploadPromises);
      }

      // 3. Prepare Activity Data:
      const activityData = {
        title: formData.title,
        description: formData.description,
        course: formData.course ? doc(db, "courses", formData.course) : null,
        weekNumber: formData.weekNumber,
        skills: formData.skills.map((skillId) => doc(db, "skills", skillId)),
        lecturers: formData.lecturers.map((lecturerId) =>
          doc(db, "users", lecturerId),
        ),
        reflection: formData.reflection,
        images: imageUrls,
      };

      // 4. Update or Create Activity in Firestore:
      if (type === "edit") {
        const activityDocRef = doc(db, "activities", data.id);
        await updateDoc(activityDocRef, activityData);
      } else if (type === "duplicate" || type === "create") {
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
    } finally {
      setLoading(false);
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
          options={courses}
          onSelect={(selectedCourse) => {
            // Handle selected course
            setValue("course", selectedCourse?.value);
          }}
          title="course"
          defaultValue={data?.course?.id}
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

      <div>
        <label className="text-sm text-gray-600 dark:text-gray-50">
          Images (Optional)
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(event) => {
            setSelectedFiles(event.target.files);
            setUploadProgress({});
          }}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      {Object.entries(uploadProgress).map(([fileName, progress]) => (
        <div key={fileName} className="mt-2">
          <div className="text-sm">{fileName}</div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-primary_purple"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      ))}

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

"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  collection,
  doc,
  getDoc,
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

const schema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  id: z.string().min(5, { message: "ID must be at least 5 characters" }),
  departments: z
    .array(z.string())
    .nonempty({ message: "Select at least one department" }),
  lecturers: z
    .array(z.string())
    .nonempty({ message: "At least one lecturer must be selected" }),
  semester: z
    .string()
    .nonempty({ message: "Semester is required" })
    .refine((val) => ["winter", "spring", "summer"].includes(val), {
      message: "Invalid semester selected",
    }),
});

const CourseForm = ({ type, data, closeModal }) => {
  const [departments, setDepartments] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [defaultSelectedDepartments, setDefaultSelectedDepartments] = useState(
    [],
  );
  const [defaultSelectedLecturers, setDefaultSelectedLecturers] = useState([]);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // Fetch data
  useEffect(() => {
    const fetchDepartmentsAndLecturers = async () => {
      try {
        // Fetch departments
        const departmentSnapshot = await getDocs(collection(db, "departments"));
        const fetchedDepartments = departmentSnapshot.docs.map((doc) => ({
          id: doc.id,
          value: doc.id,
          label: doc.data().title,
        }));
        setDepartments(fetchedDepartments);

        // Fetch users
        const userSnapshot = await getDocs(collection(db, "users"));
        const fetchedLecturers = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          value: doc.id,
          label: doc.data().name,
        }));
        setLecturers(fetchedLecturers);
      } catch (error) {
        console.error("Error fetching departments or lecturers:", error);
      }
    };

    fetchDepartmentsAndLecturers();
  }, []);

  useEffect(() => {
    if (type === "edit" && data) {
      setValue("title", data.title);
      setValue("id", data.id.split("-")[0]);
      setValue("semester", data.semester.split(" ")[0]);

      // Set default selected departments for editing
      const defaultDepartments = data.departments
        .filter(
          (department) =>
            department &&
            typeof department === "object" &&
            department.hasOwnProperty("id") &&
            department.hasOwnProperty("title"),
        )
        .map((department) => ({
          label: department.title,
          value: department.id,
          id: department.id,
        }));
      setDefaultSelectedDepartments(defaultDepartments); // Set default selected departments

      // Set default selected lecturers for editing
      const defaultLecturers = data.lecturers
        .filter(
          (lecturer) =>
            lecturer &&
            typeof lecturer === "object" &&
            lecturer.hasOwnProperty("id") &&
            lecturer.hasOwnProperty("name"),
        )
        .map((lecturer) => ({
          label: lecturer.name,
          value: lecturer.id,
          id: lecturer.id,
        }));
      setDefaultSelectedLecturers(defaultLecturers); // Set default selected lecturers

      setValue(
        "departments",
        data.departments.map((department) => department.id),
      );
      setValue(
        "lecturers",
        data.lecturers.map((lecturer) => lecturer.id),
      );
    }
  }, [type, data, setValue]);

  const submit = handleSubmit(async (formData) => {
    try {
      let courseId;
      let courseDocRef;

      if (type === "edit") {
        courseId = data.id;
        courseDocRef = doc(db, "courses", courseId);
      } else {
        courseId = `${formData.id}-${formData.semester}-${new Date().getFullYear()}`;
        courseDocRef = doc(db, "courses", courseId);
      }

      if (type === "edit") {
        // Fetch the current course data to merge with new data
        const courseSnap = await getDoc(courseDocRef);
        if (!courseSnap.exists()) {
          throw new Error("Course not found");
        }
        const currentCourseData = courseSnap.data();

        // Merge the current department and lecturer references with the new ones
        const updatedDepartments = formData.departments.map((departmentId) =>
          typeof departmentId === "string"
            ? doc(db, "departments", departmentId)
            : departmentId,
        );
        const updatedLecturers = formData.lecturers.map((lecturerId) =>
          typeof lecturerId === "string"
            ? doc(db, "users", lecturerId)
            : lecturerId,
        );

        // Update the document with merged data
        await updateDoc(courseDocRef, {
          title: formData.title,
          id: formData.id.trim(),
          departments: updatedDepartments,
          lecturers: updatedLecturers,
          semester: formData.semester,
          year: new Date().getFullYear(),
        });
      } else {
        // Create a new course
        await setDoc(courseDocRef, {
          title: formData.title,
          id: courseId.trim(),
          departments: formData.departments.map((departmentId) =>
            doc(db, "departments", departmentId),
          ),
          lecturers: formData.lecturers.map((lecturerId) =>
            doc(db, "users", lecturerId),
          ),
          semester: formData.semester,
          year: new Date().getFullYear(),
        });
      }

      closeModal();
      router.refresh();
    } catch (error) {
      console.error("Error handling course:", error);
    }
  });

  return (
    <form className="flex flex-col gap-4" onSubmit={submit}>
      <h1 className="text-xl font-semibold">
        {type === "edit" ? "Edit Course" : "Create a new Course"}
      </h1>
      <InputField
        label="Title"
        register={register}
        name="title"
        error={errors.title}
      />
      <InputField
        type="text"
        label="course ID"
        register={register}
        name="id"
        error={errors.id}
        disabled={type === "edit" || type === "create"}
      />
      <div className="space-y-2">
        <label className="text-sm text-gray-600 dark:text-gray-50">
          Department
        </label>
        <MultipleSelector
          options={departments}
          selection="departments"
          onSelect={(selected) => {
            setValue(
              "departments",
              selected.map((department) => department.value),
            );
          }}
          defaultValues={defaultSelectedDepartments}
        />
        {errors.departments && (
          <p className="text-xs text-red-500">
            {errors.departments.message.toString()}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-600 dark:text-gray-50">
          Lecturers
        </label>
        <MultipleSelector
          options={lecturers}
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
          <p className="text-xs text-red-500">
            {errors.lecturers.message.toString()}
          </p>
        )}
      </div>
      <div>
        <label className="text-sm text-gray-600 dark:text-gray-50">
          Semester
        </label>
        <Select
          onValueChange={(value) => setValue("semester", value)}
          defaultValue={data?.semester.split(" ")[0]}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key={"Winter"} value="winter">
              Winter
            </SelectItem>
            <SelectItem key={"Spring"} value="spring">
              Spring
            </SelectItem>
            <SelectItem key={"Summer"} value="summer">
              Summer
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.semester && (
          <p className="text-xs text-red-500">
            {errors.semester.message.toString()}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-1/4 self-center rounded-md bg-primary_purple p-2 text-white"
      >
        {type === "edit" ? "Save Changes" : "Create"}
      </button>
    </form>
  );
};

export default CourseForm;

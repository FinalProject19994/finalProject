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
    .min(1, { message: "Select at least one department" }),
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
  const [defaultDepartments, setDefaultDepartments] = useState([]);
  const [defaultLecturers, setDefaultLecturers] = useState([]);

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
      setValue("id", data.id);
      setValue("semester", data.semester.split(" ")[0]);

      // --- Default Departments - CREATE OBJECTS with label, value, id CORRECTLY ---
      const defaultDepartments = data.departments.map((department) => {
        // Iterate over data.departments (ASSUME array of department OBJECTS now)
        return {
          // Explicitly RETURN an object for each department
          label: department.title, // Get label from department.title
          value: department.id, // Get value (ID) from department.id
          id: department.id, // Get id from department.id
        };
      });
      setDefaultDepartments(defaultDepartments);

      // --- Default Lecturers - CREATE OBJECTS with label, value, id CORRECTLY ---
      const defaultLecturers = data.lecturers.map((lecturer) => {
        // Iterate over data.lecturers (ASSUME array of lecturer OBJECTS)
        return {
          // Explicitly RETURN an object for each lecturer
          label: lecturer.name, // Get label from lecturer.name
          value: lecturer.id, // Get value (ID) from lecturer.id
          id: lecturer.id, // Get id from lecturer.id
        };
      });
      setDefaultLecturers(defaultLecturers);

      setValue(
        "departments",
        data.departments.map((department) => department.id), // Set form values to DEPARTMENT IDs
      );
      setValue(
        "lecturers",
        data.lecturers.map((lecturer) => lecturer.id), // Set form values to LECTURER IDs
      );
      setValue("semester", data.semester.split(" ")[0]);
    }
  }, [type, data, setValue]);

  const submit = handleSubmit(async (formData) => {
    try {
      const courseId = `${formData.id}-${formData.semester}-${new Date().getFullYear()}`;
      const courseDocRef = doc(db, "courses", courseId);

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
          id: formData.id,
          departments: updatedDepartments,
          lecturers: updatedLecturers,
          semester: formData.semester,
          year: new Date().getFullYear(),
        });
      } else {
        // Create a new course
        await setDoc(courseDocRef, {
          title: formData.title,
          id: courseId, // Save composite courseId as document ID and in 'id' field
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
        {type === "edit" ? "Edit Course" : "Add a new Course"}
      </h1>
      <InputField
        label="Title"
        register={register}
        name="title"
        error={errors.title}
      />
      <InputField
        type="text"
        label="ID"
        register={register}
        name="id"
        error={errors.id}
        disabled={type === "edit" || type === "create"}
      />
      <div className="space-y-2">
        <label className="text-sm text-gray-400">Department</label>
        <MultipleSelector
          options={departments}
          selection="departments"
          onSelect={(selected) => {
            setValue(
              "departments",
              selected.map((department) => department.value),
            );
          }}
          defaultValues={
            type === "edit"
              ? data?.departments.map((department) => ({
                  label: String(department?.title || department), // Force string conversion, handle potential undefined
                  value: String(department?.id || department), // Force string conversion, handle potential undefined
                  id: String(department?.id || department), // Ensure 'id' is also a string
                }))
              : []
          }
        />
        {errors.department && (
          <p className="text-xs text-red-500">
            {errors.department.message.toString()}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400">Lecturers</label>
        <MultipleSelector
          options={lecturers}
          selection="lecturers"
          onSelect={(selected) => {
            setValue(
              "lecturers",
              selected.map((lecturer) => lecturer.value),
            );
          }}
          defaultValues={
            type === "edit"
              ? data?.lecturers.map((lecturer) => ({
                  label: String(lecturer?.name || lecturer), // Force string conversion, handle potential undefined
                  value: String(lecturer?.id || lecturer), // Force string conversion, handle potential undefined
                  id: String(lecturer?.id || lecturer), // Ensure 'id' is also a string
                }))
              : []
          }
        />
        {errors.lecturers && (
          <p className="text-xs text-red-500">
            {errors.lecturers.message.toString()}
          </p>
        )}
      </div>
      <div>
        <label className="text-sm text-gray-400">Semester</label>
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

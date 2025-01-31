"use client";
import { auth, db } from "@/lib/firebase";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth"; // Import password update functions
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define Zod schema for form validation (including password fields)
const settingsSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    phone: z.string().optional(),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      // Only proceed with password validation if any password field is filled
      if (data.currentPassword || data.newPassword || data.confirmPassword) {
        // Check if current password is provided
        if (!data.currentPassword) {
          return false;
        }
        return true;
      }
      return true;
    },
    {
      message: "Current password is required to change password",
      path: ["currentPassword"],
    },
  )
  .refine(
    (data) => {
      // Validate new password length only if it's provided
      if (data.newPassword) {
        return data.newPassword.length >= 6;
      }
      return true;
    },
    {
      message: "New password must be at least 6 characters",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      // Only check if passwords match if both are provided
      if (data.newPassword || data.confirmPassword) {
        return data.newPassword === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  );

const Settings = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset, // Add reset function
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(settingsSchema),
  });
  const nameValue = watch("name");
  const phoneValue = watch("phone");

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const user = auth.currentUser;
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const userDataFromFirestore = docSnap.data();
            setUserData(userDataFromFirestore);
            setValue("name", userDataFromFirestore.name || "");
            setValue("phone", userDataFromFirestore.phone || "");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setErrorMessage("Error loading profile settings. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [setValue]);

  const onSubmit = async (formData) => {
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);
    let passwordUpdated = false;

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      const userDocRef = doc(db, "users", user.uid);
      const updateData = {};
      console.log("Current Password:", formData.currentPassword);

      // Update Name and Phone (Personal Settings)
      if (formData.name !== userData?.name) {
        updateData.name = formData.name;
      }
      if (formData.phone !== userData?.phone) {
        updateData.phone = formData.phone;
      }

      // Update Password (Privacy Settings) only if newPassword field is filled
      if (formData.newPassword) {
        if (!formData.currentPassword) {
          setErrorMessage(
            "Please enter your current password to change password",
          );
          setLoading(false);
          return; // Stop the submission if current password is not provided
        }

        // Re-authenticate user before password change
        try {
          const credential = EmailAuthProvider.credential(
            user.email,
            formData.currentPassword,
          );
          await reauthenticateWithCredential(user, credential);
        } catch (authError) {
          console.error("Reauthentication error:", authError);
          setErrorMessage("Error re-authenticating. Please try again.");
          setLoading(false);
          return;
        }
        // Update password after re-authentication
        try {
          await updatePassword(user, formData.newPassword);
          passwordUpdated = true;
          setSuccessMessage("Password updated successfully!");
          reset({ currentPassword: "", newPassword: "", confirmPassword: "" }); // Clear password fields on success
        } catch (passwordUpdateError) {
          console.error("Password update error:", passwordUpdateError);
          setErrorMessage("Failed to update password. Please try again.");
          setLoading(false);
          return;
        }
      }

      if (Object.keys(updateData).length > 0) {
        // Update other profile data if there are changes
        await updateDoc(userDocRef, updateData);
        setUserData({ ...userData, ...updateData });
        setSuccessMessage("Profile settings updated successfully!");
      } else if (!passwordUpdated) {
        // Only show "No changes" message if no changes and no password update
        setSuccessMessage("No changes to save.");
      }
    } catch (error) {
      console.error("Error handling profile settings:", error);
      setErrorMessage(
        "Incorrect current password or failed to update password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-4 my-2 flex h-[98%] max-h-screen flex-col gap-4 rounded-md bg-white p-4 text-gray-500 shadow-md dark:bg-gray-500"
    >
      <h1 className="mb-8 text-center text-3xl font-bold text-primary_purple dark:text-primary_purple_table">
        Profile Settings
      </h1>
      <div className="mx-auto w-1/2 lg:w-1/3">
        <h2 className="mb-2 text-lg font-bold text-gray-600 dark:text-gray-400">
          Personal Settings
        </h2>
        {/* Full name */}
        <div className="my-2 flex flex-col text-sm">
          <div className="flex flex-col text-sm">
            <label className="font-semibold dark:text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              placeholder={userData?.name}
              className="rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-700"
              {...register("name")}
              defaultValue={userData?.name}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name?.message}</p>
            )}
          </div>
        </div>

        {/* Phone Number */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold dark:text-gray-300">
            Phone number
          </label>
          <input
            type="text"
            placeholder={userData?.phone}
            className="rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-700"
            {...register("phone")}
            defaultValue={userData?.phone}
          />
          {errors.phone && (
            <p className="text-xs text-red-500">{errors.phone?.message}</p>
          )}
        </div>

        <div className="my-8 h-px bg-gray-300" />
        <h2 className="mb-2 mt-8 text-lg font-bold text-gray-600 dark:text-gray-400">
          Privacy Settings
        </h2>
        {/* Email */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold dark:text-gray-300">Email</label>
          <input
            type="Email"
            placeholder={userData?.email}
            className="rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-700"
            value={userData?.email}
            readOnly
          />
        </div>

        {/* Current Password */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold dark:text-gray-300">
            Current Password
          </label>
          <input
            type="Password"
            placeholder="Current Password"
            className="rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-700"
            {...register("currentPassword")} // Register currentPassword
          />
          {errors.currentPassword && (
            <p className="text-xs text-red-500">
              {errors.currentPassword?.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold dark:text-gray-300">
            New Password
          </label>
          <input
            type="Password"
            placeholder="New Password"
            className="rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-700"
            {...register("newPassword")} // Register newPassword
          />
          {errors.newPassword && (
            <p className="text-xs text-red-500">
              {errors.newPassword?.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="my-2 flex flex-col text-sm">
          <label className="font-semibold dark:text-gray-300">
            Confirm New Password
          </label>
          <input
            type="Password"
            placeholder="Confirm New Password"
            className="rounded-md border p-2 outline-none dark:bg-gray-400 dark:text-gray-700 dark:placeholder-slate-700"
            {...register("confirmPassword")} // Register confirmPassword
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword?.message}
            </p>
          )}
        </div>
      </div>

      {/* Success and Error Messages */}
      {successMessage && (
        <p className="mt-2 text-center text-green-500">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="mt-2 text-center text-red-500">{errorMessage}</p>
      )}

      <button
        type="submit"
        className="mt-8 w-1/12 self-center rounded-md bg-primary_purple p-2 font-bold text-white hover:bg-purple-500"
        disabled={loading || isSubmitting}
      >
        {loading || isSubmitting ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default Settings;

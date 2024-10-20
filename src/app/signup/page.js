"use client";
import Image from "next/image";
import { useState } from "react";
import FormInput from "../components/form/FormInput";

const Page = () => {
  const [value, setValues] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
    },
    { id: 2, name: "firstName", type: "text", placeholder: "First Name" },
    { id: 3, name: "lastName", type: "text", placeholder: "Last Name" },
    { id: 4, name: "password", type: "password", placeholder: "Password" },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
  };

  const handleChange = (e) => {
    setValues({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  console.log(value);
  return (
    <div className="flex h-[100vh] items-center justify-center">
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={value[input.name]}
            onChange={handleChange}
          />
        ))}

        <button>NEXT</button>
      </form>
    </div>
  );
};

export default Page;
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const handleShowPassword = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleShowConfirmPassword = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   <div className="flex items-center gap-4">
//     <Image src="/menuIcons/tick.png" alt="tick" width={20} height={20} />
//     <p>Step 1: Personal information</p>
//   </div>
//   <div className="flex items-center gap-4">
//     <Image src="/menuIcons/step.png" alt="step" width={20} height={20} />
//     <p>Step 2: Academic information</p>
//   </div>
//   <div className="flex items-center gap-4">
//     <Image src="/menuIcons/step.png" alt="step" width={20} height={20} />
//     <p>Step 3: Review and submit</p>
//   </div>

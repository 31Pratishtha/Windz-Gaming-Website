import { React, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "/src/contexts/AuthContext";

export default function Signup() {
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();

  async function handleSave(data) {
    if (data.password !== data.passwordConfirmation) {
      return setError("Passwords do not match");
    }
  
    try {
      setError("");
      setLoading(true);
      await signUp(data.email, data.password);
    } catch (error) {
      setError("Failed to create an account");
      console.error("Error signing up:", error.message);
    }
  
    setLoading(false);
  }

  return (
    <div className="p-16">
      <div className="flex flex-col justify-center items-center max-w-lg bg-white m-auto rounded-2xl">
        <div className="font-bold text-mywhite text-2xl py-10 w-full text-center bg-blueText rounded-t-2xl">
          <h1>Sign Up</h1>
        </div>
        
        {error && <div className="text-myblack">{error}</div>}

        <form onSubmit={handleSubmit(handleSave)} className="flex flex-col gap-3 pt-10">
          <label htmlFor="email" className="text-myblack">
            Email
          </label>
        
          <input type="email" {...register("email", {required: true})} className="rounded-lg px-3 py-1 bg-slate-200"/>
        

          <label htmlFor="password" className="text-myblack">
            Password
          </label>
        
          <input
            type="password"
            {...register("password", {required: true})}
            className="rounded-lg px-3 py-1 bg-slate-200"/>
        

          <label htmlFor="passwordConfirmation" className="text-myblack">
            Confirm Password
          </label>
        
          <input
            type="password"
            {...register("passwordConfirmation", {required: true})}
            className="rounded-lg px-3 py-1 bg-slate-200"/>
        

          <button disabled={loading} type="submit" className="text-mywhite bg-blueText p-2 w-4/5 m-auto mt-10 rounded-2xl">
            Save
          </button>
        </form>

        <div className="font-normal text-myblack py-10">
          <p>Alread have an account ? Log In</p>
        </div>
      </div>
    </div>
  );
}

import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "/src/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { GoogleButton } from "react-google-button";

export default function Signup() {
  const { signUp, googleSignUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  async function handleSave(data) {
    if (data.password !== data.passwordConfirmation) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(data.email, data.password);
      navigate("/", { replace: true });
    } catch (error) {
      setError(`Failed to create an account.`);
      console.error("Error signing up:", error.message);
    }

    setLoading(false);
  }

  async function handleGoogleSignUp(data) {
    try {
      setError("");
      setLoading(true);
      await googleSignUp();
      navigate("/", { replace: true });
    } catch (error) {
      setError(`Failed to create an account with Google.`);
      console.error("Error signing up with Google:", error.message);
    }

    setLoading(false);
  }

  return (
    <div className="bg-[url('/src/assets/Images/signup-bg-lg.png')]">
      <div className="p-16">
        <div className="flex flex-col justify-center items-center max-w-lg bg-white m-auto rounded-2xl bg-opacity-20 shadow-3xl border-l border-t border-opacity-30 border-neutral-50 backdrop-blur-xs overflow-hidden relative">
          <div className="w-full">
            <div className="font-bold text-mywhite text-2xl py-10 text-center bg-blueText">
              <h1>Sign Up</h1>
            </div>
          </div>

          {error && <div className="text-mywhite">{error}</div>}

          <form
            onSubmit={handleSubmit(handleSave)}
            className="flex flex-col gap-3 pt-10"
          >
            <label htmlFor="email" className="text-gray-300">
              Email
            </label>

            <input
              type="email"
              {...register("email", { required: true })}
              className="rounded-lg px-3 py-1 bg-slate-200"
            />

            <label htmlFor="password" className="text-gray-300">
              Password
            </label>

            <input
              type="password"
              {...register("password", { required: true })}
              className="rounded-lg px-3 py-1 bg-slate-200"
            />

            <label htmlFor="passwordConfirmation" className="text-gray-300">
              Confirm Password
            </label>

            <input
              type="password"
              {...register("passwordConfirmation", { required: true })}
              className="rounded-lg px-3 py-1 bg-slate-200"
            />

            <button
              disabled={loading}
              type="submit"
              className="text-mywhite bg-blueText p-2 w-4/5 m-auto mt-10 rounded-2xl"
            >
              Save
            </button>
          </form>

          <p className="py-4 text-gray-300">OR</p>

          <div>
            <GoogleButton onClick={handleGoogleSignUp} />
          </div>

          <div className="font-normal text-mywhite py-10">
            <p>
              Alread have an account ?{" "}
              <Link to="/login" className="text-blueText underline">
                LogIn
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "/src/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { GoogleButton } from "react-google-button";

export default function Signup() {
  const { logIn, googleSignUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  async function handleSave(data) {
    try {
      setError("");
      setLoading(true);
      await logIn(data.email, data.password);
      navigate("/", { replace: true });
    } catch (error) {
      setError("Failed to log in");
      console.error("Error signing in:", error.message);
    }

    setLoading(false);
  }

  async function handleGoogleLogIn(data) {
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
    <div className="p-16">
      <div className="flex flex-col justify-center items-center max-w-lg bg-white m-auto rounded-2xl">
        <div className="font-bold text-mywhite text-2xl py-10 w-full text-center bg-blueText rounded-t-2xl">
          <h1>Log In</h1>
        </div>

        {error && <div className="text-myblack">{error}</div>}

        <form
          onSubmit={handleSubmit(handleSave)}
          className="flex flex-col gap-3 pt-10"
        >
          <label htmlFor="email" className="text-myblack">
            Email
          </label>

          <input
            type="email"
            {...register("email", { required: true })}
            className="rounded-lg px-3 py-1 bg-slate-200"
          />

          <label htmlFor="password" className="text-myblack">
            Password
          </label>

          <input
            type="password"
            {...register("password", { required: true })}
            className="rounded-lg px-3 py-1 bg-slate-200"
          />

          <button
            disabled={loading}
            type="submit"
            className="text-mywhite bg-blueText p-2 w-4/5 m-auto mt-10 rounded-2xl"
          >
            Log In
          </button>
        </form>

        <p className="py-4">OR</p>

        <div>
          <GoogleButton onClick={handleGoogleLogIn} />
        </div>

        <div className="font-normal text-myblack py-10">
          <p>
            Need an account? Let's get you onboard !{" "}
            <Link to="/signup" className="text-blueText underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

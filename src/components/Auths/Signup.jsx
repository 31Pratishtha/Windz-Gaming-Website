import { React, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "/src/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import { AuthTypeContext } from "../../contexts/AuthTypeContext";

export default function Signup() {
  const { signUp, googleSignUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { switchToLogIn } = useContext(AuthTypeContext);

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
    <>
      {error && <div className="text-gray-300 z-10 my-6">{error}</div>}
      <form
        onSubmit={handleSubmit(handleSave)}
        className="flex flex-col gap-3 pt-6"
      >
        <label htmlFor="email" className="text-gray-300">
          Email
        </label>

        <input
          type="email"
          {...register("email", { required: true })}
          className="rounded-lg px-3 py-1 bg-slate-200 outline outline-offset-0 outline-2 outline-blueText "
        />

        <label htmlFor="password" className="text-gray-300">
          Password
        </label>

        <input
          type="password"
          {...register("password", { required: true })}
          className="rounded-lg px-3 py-1 bg-slate-200 outline outline-offset-0 outline-2 outline-blueText "
        />

        <label htmlFor="passwordConfirmation" className="text-gray-300">
          Confirm Password
        </label>

        <input
          type="password"
          {...register("passwordConfirmation", { required: true })}
          className="rounded-lg px-3 py-1 bg-slate-200 outline outline-offset-0 outline-2 outline-blueText "
        />

        <button
          disabled={loading}
          type="submit"
          className="text-mywhite bg-blueText p-2 w-4/5 m-auto mt-4 rounded-2xl"
        >
          Save
        </button>
      </form>

      <p className="py-4 text-gray-300">OR</p>

      <div>
        <GoogleButton onClick={handleGoogleSignUp} />
      </div>

      <div className="font-normal text-mywhite py-2 text-lg">
        Already have an account?{" "}
        <span
          className="text-blueText underline font-bold"
          onClick={switchToLogIn}
        >
          LogIn
        </span>
      </div>
    </>
  );
}

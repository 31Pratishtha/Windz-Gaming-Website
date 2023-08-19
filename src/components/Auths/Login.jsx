import { React, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "/src/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import { AuthTypeContext } from "../../contexts/AuthTypeContext";

export default function Signup() {
  const { logIn, googleSignUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { switchToSignUp } = useContext(AuthTypeContext);

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
    <>
      {error && <div className="text-mywhite z-10 my-6">{error}</div>}

      <form
        onSubmit={handleSubmit(handleSave)}
        className="flex flex-col gap-3 pt-4"
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

        <button
          disabled={loading}
          type="submit"
          className="text-mywhite bg-blueText p-2 w-4/5 m-auto mt-4 rounded-2xl"
        >
          Log In
        </button>
      </form>

      <p className="py-4 text-gray-300">OR</p>

      <div>
        <GoogleButton onClick={handleGoogleLogIn} />
      </div>

      <div className="font-normal text-mywhite py-10 text-lg">
        Don't have an account? <span
          className="text-blueText underline font-bold"
          onClick={switchToSignUp}
        >
             SignUp
        </span>
      </div>
    </>
  );
}

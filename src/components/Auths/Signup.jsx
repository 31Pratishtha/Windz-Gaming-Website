import { React, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "/src/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoogleButton } from "react-google-button";
import { AuthTypeContext } from "../../contexts/AuthTypeContext";
import { useUser } from "/src/contexts/UserContext";
import { motion } from "framer-motion";

export default function Signup() {
  const { signUp, googleSignUp, setError, error } = useAuth();
  const [loading, setLoading] = useState(false);
  const { switchToLogIn } = useContext(AuthTypeContext);
  const { createUser } = useUser();

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  async function handleSave(data) {
    if (data.password !== data.passwordConfirmation) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      const user = await signUp(data.email, data.password);
      console.log("newUserSignup: ", user);
      await createUser(user);
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
      const user = await googleSignUp();
      await createUser(user);
      navigate("/", { replace: true });
    } catch (error) {
      setError(`Failed to create an account with Google.`);
      console.error("Error signing up with Google:", error.message);
    }

    setLoading(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, transition: { duration: 0.3 } }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <form
        onSubmit={handleSubmit(handleSave)}
        className="flex flex-col gap-2 pt-6"
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
          className="text-blueText underline font-bold cursor-pointer"
          onClick={switchToLogIn}
        >
          LogIn
        </span>
      </div>
    </motion.div>
  );
}

import { React, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "/src/contexts/AuthContext";

export default function Signup() {
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  async function handleSave(data) {
    if (data.password !== data.passwordConfirmation) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(data.email, data.password);
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <div className="p-9 align-center">
        <div className="font-semibold text-mywhite">
          <h2>Sign Up</h2>
        </div>

        {error && <div className="text-mywhite">{error}</div>}

        <form onSubmit={handleSubmit(handleSave)}>
          <label htmlFor="email" className="text-mywhite">
            Email
          </label>
          <br />
          <input type="email" {...register("email", {required: true})} />
          <br />

          <label htmlFor="password" className="text-mywhite">
            Password
          </label>
          <br />
          <input
            type="password"
            {...register("password", {required: true})}
            />
          <br />

          <label htmlFor="passwordConfirmation" className="text-mywhite">
            Confirm Password
          </label>
          <br />
          <input
            type="password"
            {...register("passwordConfirmation", {required: true})}
            />
          <br />

          <button disabled={loading} type="submit" className="text-mywhite">
            Save
          </button>
        </form>

        <div className="font-normal text-mywhite">
          <p>Alread have an account ? Log In</p>
        </div>
      </div>
    </>
  );
}

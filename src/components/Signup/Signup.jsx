import { React, useRef } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "/src/contexts/AuthContext"

export default function Signup() {
  const { signup } = useAuth();
  const rhf = useForm();
  console.log(rhf);

  const { register, handleSubmit } = useForm();

  const handleSave = (formValues) => {
    console.log(formValues);
  };

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  return (
    <>
      <div className="p-9 align-center ">
        <div className="font-semibold text-mywhite">
          <h2>Sign Up</h2>
        </div>

        <form onSubmit={handleSubmit(handleSave)}>
          <label htmlFor="email" className="text-mywhite">
            Email
          </label>
          <br />
          <input ref={emailRef} type="email" required {...register("email")} />
          <br />

          <label htmlFor="password" className="text-mywhite">
            Password
          </label>
          <br />
          <input ref={passwordRef} type="password" required {...register("password")} />
          <br />

          <label htmlFor="passwordConfirmation" className="text-mywhite">
            Confirm Password
          </label>
          <br />
          <input ref={passwordConfirmationRef}
            type="password"
            required
            {...register("passwordConfirmation")}
          />
          <br />

          <button type="submit" onClick={handleSave} className="text-mywhite">
            Save
          </button>
          {console.log(register)}
        </form>

        <div className="font-normal text-mywhite">
          <p>Alread have an account ? Log In</p>
        </div>
      </div>
    </>
  );
}

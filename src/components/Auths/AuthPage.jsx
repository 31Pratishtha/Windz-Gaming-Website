import { React, useState } from "react";
import { motion } from "framer-motion";
import Signup from "./Signup";
import Login from "./Login";
import { AuthTypeContext } from "../../contexts/AuthTypeContext";
import { useAuth } from "/src/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Authentication() {
  const [expanded, setExpanded] = useState(false); //for backdrop animation
  const [authType, setAuthType] = useState("signup"); //for switching between login and signup
  const { demoAccLogIn, error, setError } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const backdropVariants = {
    expanded: {
      width: "160%",
      height: "1700px",
      borderRadius: "20%",
    },

    collapsed: {
      width: "150%",
      height: "700px",
      borderRadius: "50%",
      transform: "rotate(0deg)",
    },
  };

  const expandingTransition = {
    type: "spring",
    duration: 2.3,
    stiffness: 30,
  };

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  };

  const switchToSignUp = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setAuthType("signup");
      setError("");
    }, 400);
  };

  const switchToLogIn = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setAuthType("login");
      setError("");
    }, 400);
  };

  const handleDemoAcc = () => {
    try {
      setError("");
      setLoading(true);
      demoAccLogIn();
      navigate("/", { replace: true });
    } catch (error) {
      setError("Failed to log in with the Demo Account");
      console.error("Error signing in:", error.message);
    }

    setLoading(false);
  };

  const contextValue = { switchToLogIn, switchToSignUp };

  return (
    <AuthTypeContext.Provider value={contextValue}>
      <div className="bg-[url('/src/assets/Images/signup-bg-lg.png')]">
        <div className="p-10">
          <div className="max-w-md h-[750px] m-auto rounded-2xl relative">
            <button
              className="w-24 h-24 rounded-full bg-amber-500 absolute bg-opacity-70 overflow-visible p-3 -right-12 top-36 z-20 font-semibold text-sm hover:bg-opacity-100 transition hover:scale-110 "
              onClick={handleDemoAcc}
              disabled={loading}
              type="submit"
            >
              Try with Demo Account
            </button>

            <div className="flex flex-col justify-start items-center max-w-md h-[750px] bg-mywhite m-auto rounded-2xl bg-opacity-20 shadow-3xl border-l border-t border-opacity-30 border-neutral-50 backdrop-blur-xs overflow-hidden relative">
              <div className="w-full h-52 flex relative">
                <motion.div
                  initial={false}
                  animate={expanded ? "expanded" : "collapsed"}
                  variants={backdropVariants}
                  transition={expandingTransition}
                  className="w-[150%] h-[700px] absolute bg-blueText bg-gradient-to-l from-[rgba(25,91,179,1)-95%] to-[rgba(13,64,132,1)] rounded-[50%] flex flex-col -left-44 -top-[500px]"
                ></motion.div>
                <div className="font-bold text-mywhite text-3xl z-10 pl-20 pt-16">
                  {authType === "signup" ? <h1>Sign Up</h1> : <h1>Log In</h1>}
                </div>
              </div>

              {error && <div className="text-mywhite z-10 my-6">{error}</div>}

              {authType === "signup" ? <Signup /> : <Login />}
            </div>
          </div>
        </div>
      </div>
    </AuthTypeContext.Provider>
  );
}

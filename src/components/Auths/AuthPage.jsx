import { React, useState } from "react";
import { motion } from "framer-motion";
import Signup from "./Signup";
import Login from "./Login";
import { AuthTypeContext } from "../../contexts/AuthTypeContext";

export default function Authentication() {
  const [expanded, setExpanded] = useState(false); //for backdrop animation
  const [authType, setAuthType] = useState("signup"); //for switching between login and signup

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
    }, 400);
  };

  const switchToLogIn = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setAuthType("login");
    }, 400);
  };

  const contextValue = { switchToLogIn, switchToSignUp };

  return (
    <AuthTypeContext.Provider value={contextValue}>
      <div className="bg-[url('/src/assets/Images/signup-bg-lg.png')]">
        <div className="p-10">
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
                {authType === "signup" ? (<h1>Sign Up</h1>) :( <h1>Log In</h1>)}
              </div>
            </div>

            {authType === "signup" ? <Signup /> : <Login />}

          </div>
        </div>
      </div>
    </AuthTypeContext.Provider>
  );
}

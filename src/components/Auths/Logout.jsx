import { React, useState } from "react";
import { useAuth } from "/src/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Authentication() {
  const { logOut, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSave() {
    try {
      setError("");
      setLoading(true);
      await logOut();
      navigate("/", { replace: true });
    } catch (error) {
      setError("Failed to log out");
      console.error("Error logging out:", error.message);
    }

    setLoading(false);
  }

  return (
    <motion.div
      className="bg-[url('/assets/Images/signup-bg-lg.png')] h-screen"
      initial={{ opacity: 0, transition: { duration: 0.3 } }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <div className="px-14 py-8 md:p-16">
        <div className="flex flex-col justify-start items-center max-w-md h-[400px] bg-slate-50 m-auto rounded-2xl bg-opacity-20 shadow-3xl border-l border-t border-opacity-30 border-neutral-50 backdrop-blur-xs overflow-hidden relative">
          <div className="w-full h-52 flex relative">
            <div className="w-[200%] h-[650px] md:w-[150%] md:h-[700px] absolute bg-blueText bg-gradient-to-l from-[rgba(25,91,179,1)-95%] to-[rgba(13,64,132,1)] rounded-[50%] flex flex-col -left-44 -top-[500px]"></div>
            <div className="font-bold text-mywhite text-3xl z-10 pl-10 md:pl-20 pt-16">
              <h1>Profile</h1>
            </div>
          </div>
          <div>
            {currentUser ? (
              <h2 className="text-gray-300 pt-8 font-semibold text-xs text-center md:text-base md:text-left px-10 md:px-0">
                Email: {currentUser.email}
              </h2>
            ) : (
              <h2 className="text-gray-300 pt-8 font-semibold"></h2>
            )}
          </div>
          <button
            disabled={loading}
            type="submit"
            onClick={handleSave}
            className="text-gray-300 bg-blueText p-2 w-4/5 m-auto mt-10 rounded-2xl"
          >
            Log Out
          </button>
        </div>
      </div>
    </motion.div>
  );
}
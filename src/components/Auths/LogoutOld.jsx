import { React, useState } from "react";
import { useAuth } from "/src/contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
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
    <div className="p-16">
      <div className="flex flex-col justify-center items-center max-w-lg bg-white m-auto rounded-2xl">
        {error && <div className="text-myblack">{error}</div>}

        <h2>Email: {currentUser.email}</h2>
        <button
          disabled={loading}
          type="submit"
          onClick={handleSave}
          className="text-mywhite bg-blueText p-2 w-4/5 m-auto mt-10 rounded-2xl"
        >
          Log Out
        </button>

      </div>
    </div>
  );
}

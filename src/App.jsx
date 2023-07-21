import React from "react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer/Footer";
export default function App() {
  return (
    <div className="bg-myblack min-h-screen">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

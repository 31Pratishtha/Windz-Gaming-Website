import React from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <motion.div
      className="text-lightText"
      initial={{ opacity: 0, transition: { duration: 0.3 } }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      AboutUs
    </motion.div>
  );
}
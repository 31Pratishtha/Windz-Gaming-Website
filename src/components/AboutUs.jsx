import React from "react";
import { motion } from "framer-motion";

export default function AboutUs() {
  const fadeInAnimationVarients = {
    initial: { opacity: 0, y: 150 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };
  return (
    <motion.div
      className="bg-mywhite text-myblack min-h-screen flex flex-col items-center font-montserrat"
      initial={{ opacity: 0, transition: { duration: 0.3 } }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <div className="bg-[url('/public/assets/Images/cartBanner.png')] bg-slate-200 justify-center items-center flex w-screen py-6">
        <header className="text-mywhite font-bold text-3xl">
          About WindzGaming
        </header>
      </div>
      <div className="px-28 py-14 flex flex-col gap-44">
        <motion.section
          className="flex justify-center items-center gap-10"
          variants={fadeInAnimationVarients}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl">Our Mission</h2>
            <p className="text-xl font-montserrat text-justify font-light">
              Our mission is to empower gaming enthusiasts by providing a
              platform transcending traditional experiences. We believe in the
              power of gaming to connect people, foster creativity, and unlock
              new realms of imagination, uniting a diverse community in
              unparalleled gaming adventures.
            </p>
          </div>
          <img src="/assets/Images/ourMission.png" alt="" className="w-1/2" />
        </motion.section>

        <motion.section
          className="flex flex-row-reverse justify-center items-center gap-10"
          variants={fadeInAnimationVarients}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px 0px -100px 0px" }}
        >
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl">Our Values</h2>
            <p className="text-xl font-montserrat text-justify font-light">
              At WindzGaming, innovation fuels our gaming technology, pushing
              boundaries to create immersive experiences. Beyond hardware, we're
              a vibrant community amplifying the joy of gaming.
              <br />
              <br />
              Quality is our core—crafted from design to performance,
              WindzGaming delivers a console exceeding expectations. Join us in
              shaping the future of gaming with the best in innovation,
              community, and craftsmanship.
            </p>
          </div>
          <img src="/assets/Images/ourValues.png" alt="" className="w-1/2" />
        </motion.section>

        <motion.section
          className="flex justify-center items-center gap-10"
          variants={fadeInAnimationVarients}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl">Our Story</h2>
            <p className="text-xl font-montserrat text-justify font-light">
              WindzGaming started with a simple yet ambitious idea — to redefine
              the gaming experience. Founded by passionate gamers, our journey
              began with a commitment to creating a gaming console that combines
              performance, aesthetics, and a sense of community.
              <br />
              <br />
              As we grow, our story evolves with each gamer who joins us on this
              exciting adventure. WindzGaming is not just a product; it's a
              narrative that unfolds with every gaming session, every shared
              moment, and every triumph in the gaming universe.
            </p>
          </div>
          <img src="/assets/Images/ourStory.webp" alt="" />
        </motion.section>
      </div>
    </motion.div>
  );
}

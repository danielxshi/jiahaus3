"use client";
import React, { useState, useEffect } from "react";
import styles from "../sidenav/style.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "../sidenav/nav/nav";
import Link from "next/link";
import Content from "./navContent";
import Links from "./navLinks";
import { Variants } from "framer-motion";

export const background: Variants = {
  initial: { height: 0 },
  open: {
    height: "100%",
    transition: { duration: 0.5, ease: "easeInOut" },
  },
  closed: {
    height: 0,
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

const Navbar: React.FC = () => {
  const [isActive, setIsActive] = useState(false); // Menu state
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 100; // Adjust based on navbar height
      setScrolledPast(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsActive((prev) => !prev);

  return (
    <>
      {/* Main Navbar */}
      <div
        className={`z-[99] ${
          styles.header
        } transition-colors duration-300 ease-in-out px-4 pt-4 ${
          isActive ? "bgTest fixed" : "bg-transparent text-white fixed"
        }`}
      >
        <div className={`styles.bar `}>
          <div className={`grid grid-cols-12 gap-x-8 `}>
            <div
              className={`col-start-1 col-end-4 flex items-center space-x-12 *:mt-0 *:mb-auto ${
                isActive ? "hidden" : ""
              }`}
            >
              <Content></Content>
            </div>

            <div className="col-start-7 col-end-11">
              <Links
                scrolledPast={scrolledPast}
                isActive={isActive}
                toggleMenu={toggleMenu}
              />
            </div>

            <div className="col-start-12 col-end-13 *:right-0 flex flex-row-reverse">
              <div
                className={`h-full top-4 right-4 z-[100] ${
                  scrolledPast ? "invisible" : "flex"
                } *:mt-0 *:mb-auto h-full ${styles.el} ${
                  isActive ? "fixed pr-4" : ""
                }`}
              >
                <button
                  className="flex flex-col space-y-1.5 cursor-pointer p-2 rounded "
                  onClick={toggleMenu}
                >
                  <motion.span
                    className={`block w-6 h-0.5 transition-transform ${
                      isActive
                        ? "rotate-45 translate-y-2.5 bg-black"
                        : "bg-white"
                    }`}
                  ></motion.span>
                  <motion.span
                    className={`block w-6 h-0.5 ${
                      isActive ? "opacity-0 bg-black" : "bg-white"
                    }`}
                  ></motion.span>
                  <motion.span
                    className={`block w-6 h-0.5 transition-transform ${
                      isActive
                        ? "-rotate-45 -translate-y-1.5 bg-black"
                        : "bg-white"
                    }`}
                  ></motion.span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Animated Background */}
      <div
        className={`z-[90] col-start-6 col-end-10 ${
          styles.header
        } transition-colors duration-300 ease-in-out ${
          isActive
            ? "bg-[#f4f0ea] bgTest fixed"
            : "bg-transparent text-white fixed"
        }`}
      >
        {" "}
        <motion.div
          variants={background}
          initial="initial"
          animate={isActive ? "open" : "closed"}
          exit="exit"
          className={styles.background}
        />
        {/* Side Navigation */}
        <>
          {isActive ? (
            <motion.div
              key="nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Nav />
            </motion.div>
          ) : null}
        </>
      </div>

      {/* Fixed Hamburger Menu */}
      <div className={`z-[100] ${scrolledPast ? "" : "hidden"}`}>
        <button
          className="flex flex-col space-y-1.5 cursor-pointer bg-black  pt-3 px-2 pb-2 rounded"
          onClick={toggleMenu}
          // animate={!isActive ? "open" : "closed"}
        >
          <span
            className={`block w-6 h-0.5 transition-transform bg-white ${
              isActive ? "rotate-45 translate-y-1.5 " : " "
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-white ${
              isActive ? "opacity-0 " : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5  transition-transform bg-white ${
              isActive ? "-rotate-45 -translate-y-2.5 " : ""
            }`}
          ></span>
        </button>
      </div>
    </>
  );
};

export default Navbar;

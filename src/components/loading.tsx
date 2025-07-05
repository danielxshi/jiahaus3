"use client";
import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/modules/_landing.module.scss";
import Image from "next/image";
// import bg from "./lrglogo.png";
import { CustomEase } from "gsap/CustomEase";
import localFont from "next/font/local";
// import test from "../fonts/PragatiNarrow-Bold.ttf";

// const pragati = localFont({
//   src: [
//     {
//       path: "../fonts/Dinamit_Bold_Trial_A.ttf",
//       // path: "../fonts/PragatiNarrow-Bold.ttf",
//       weight: "400",
//       style: "normal",
//     },
//   ],
// });

export default function Loader() {
  const [show, setShow] = useState(true);

  function splitTextIntoSpans(selector: any) {
    let elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      let text = element.innerText;
      let splitText = text
        .split("")
        .map(function (char: string) {
          return `<span className="text-center mx-auto">${
            char === " " ? "&nbsp;&nbsp;" : char
          }</span>`;
        })
        .join("");
      element.innerHTML = splitText;
    });
  }

  useEffect(() => {
    splitTextIntoSpans(".header h1");

    const tl = gsap.timeline({});
    tl.to(".hero", {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%) ",
      duration: 0.35,
      ease: "expoScale(0.5,7, none)",
    });

    tl.to(".hero-img", {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%) ",
      duration: 1,
      y: 0,
      // ease: "expoScale(0.5,7, none)",
      ease: CustomEase.create(
        "custom",
        "M0,0 C0.126,0.382 0.204,0.59 0.362,0.738 0.554,0.918 0.61,0.963 1,1 "
      ),
    });

    tl.to(".header h1 span", {
      y: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: CustomEase.create(
        "custom",
        "M0,0 C0.126,0.382 0.204,0.59 0.362,0.738 0.554,0.918 0.61,0.963 1,1 "
      ),
    });

    tl.to(".hero-img", {
      scale: 1.2,
    });

    tl.to(".overlay", {
      width: "100%",
      duration: 0.7,
      ease: CustomEase.create(
        "custom",
        "M0,0 C0.126,0.382 0.204,0.59 0.362,0.738 0.554,0.918 0.61,0.963 1,1 "
      ),
      delay: ".1",
    });

    tl.to(".overlay", {
      background: "#fff,",
      opacity: "1",
      transform: "translate(0%, 0%) scale(1)",
      duration: 0.8,
      ease: CustomEase.create(
        "custom",
        "M0,0 C0.126,0.382 0.204,0.59 0.362,0.738 0.554,0.918 0.61,0.963 1,1 "
      ),

      delay: ".1",

      onComplete: () => setShow(false),
    });
  }); // <-- scope is f
  return (
    <div className="landing-container ">
      {show && (
        <section className="hero ">
          <div className="overlay shadow-lg opacity-50"></div>

          <div className="header flex flex-col space-x-8 align-middle justify-center *:text-center *:mx-auto">
            <h1 className={`$ lowercase`}>JENNY</h1>
            <h1 className="*:text-3xl tracking-wider sub-height">hyowon cha</h1>
          </div>

          <div className="hero-img h-full">
            {/* <Image
              objectFit="contain"
              style={{
                objectFit: "contain",
                width: "fit-content",
                minWidth: "fit-content",
                maxWidth: "fit-content",
              }}
              src={bg}
              alt=""
            /> */}
          </div>
        </section>
      )}
    </div>
  );
}

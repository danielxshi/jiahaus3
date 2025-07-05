import React, { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import gsap from "gsap";
// import Magnetic from '../Magnetic';

interface ButtonProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  backgroundColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  backgroundColor = "#455CE9",
  ...attributes
}) => {
  const circle = useRef<HTMLDivElement | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (circle.current) {
      timeline.current = gsap.timeline({ paused: true });
      timeline.current
        .to(
          circle.current,
          { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" },
          "enter"
        )
        .to(
          circle.current,
          { top: "-150%", width: "125%", duration: 0.25 },
          "exit"
        );
    }
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeline.current?.tweenFromTo("enter", "exit");
  };

  const manageMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      timeline.current?.play();
    }, 300);
  };

  return <></>;
};

export default Button;

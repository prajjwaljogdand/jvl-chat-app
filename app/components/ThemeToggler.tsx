"use client";
import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useDarkMode from "../hooks/useDarkMode";
import Button from "./buttons/Button";
import { MdSunny, MdBedtime } from "react-icons/md";

export default function ThemeToggler() {
  const { colorTheme, setTheme } = useDarkMode();
  const [darkMode, setDarkMode] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme);
    setDarkMode(checked);
  };

  return (
    <>
      <div className="py-4">
        <Button secondary rounded onClick={() => toggleDarkMode(!darkMode)}>
          {darkMode ? <MdSunny size={32} /> : <MdBedtime size={32} />}
        </Button>
      </div>
    </>
  );
}

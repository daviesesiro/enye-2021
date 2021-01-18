import { useRef } from "react";

export const Button = ({
  type = "primary",
  ...otherProps
}: {
  type: "primary" | "secondary";
  [key: string]: any;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleHover = () => {
    const beep = document.getElementById("beep") as HTMLAudioElement;
    beep.volume = 0.14;
    beep.currentTime = 0;
    beep.play();
  };

  const isPrimary = type === "primary" ? true : false;
  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleHover}
      {...otherProps}
      className={`${
        isPrimary ? "btn-primary" : "btn-secondary"
      } hover:scale-105 transform btn  ${otherProps.className}`}
    >
      {otherProps.children}
    </button>
  );
};

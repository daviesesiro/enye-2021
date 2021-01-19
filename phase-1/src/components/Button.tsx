import { useRef } from "react";

export const Button = ({
  type = "primary",
  ...otherProps
}: {
  type: "primary" | "secondary";
  [key: string]: any;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (cb: any) => {
    const beep = document.getElementById("beep") as HTMLAudioElement;
    beep.volume = 0.14;
    beep.currentTime = 0;
    beep.play();

    cb();
  };

  const isPrimary = type === "primary" ? true : false;
  return (
    <button
      ref={buttonRef}
      {...otherProps}
      onClick={() => handleClick(otherProps.onClick)}
      className={`${
        isPrimary ? "btn-primary" : "btn-secondary"
      } hover:scale-105 transform focus:outline-none active:scale-95 active:shadow-sm hover:shadow-lg btn ${
        otherProps.className ?? ""
      }`}
    >
      {otherProps.children}
    </button>
  );
};

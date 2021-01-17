export const Button = ({
  type = "primary",
  ...otherProps
}: {
  type: "primary" | "secondary";
  [key: string]: any;
}) => {
  const isPrimary = type === "primary" ? true : false;
  return (
    <button
      {...otherProps}
      className={`${isPrimary ? "btn-primary" : "btn-secondary"} btn ${
        otherProps.className
      }`}
    >
      {otherProps.children}
    </button>
  );
};

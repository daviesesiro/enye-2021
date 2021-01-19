module.exports = {
  purge: ["./public/**/*.html", "./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
      gridTemplateColumns: {
        flexible: "repeat(auto-fit, minmax(270px, 450px))",
        "flexible-xl": "repeat(auto-fit, minmax(350px,500px))",
      },
      minHeight: {
        ".9screen": "90vh",
        ".8screen": "80vh",
      },
      width: {
        card: "calc(100vh - 15rem)",
      },
      height: {
        ".9screen": "90vh",
        ".8screen": "80vh",
      },
      maxHeight: {
        card: "45rem",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["responsive", "hover", "focus", "disabled"],
      width: ["responsive", "focus"],
      animation: ["responsive", "hover"],
      scale: ["hover", "active"],
      boxShadow: ["responsive", "hover", "focus", "active"],
    },
  },
  plugins: [],
};

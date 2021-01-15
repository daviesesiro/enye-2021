module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
      gridTemplateColumns: {
        flexible: "repeat( auto-fit, minmax(300px, 400px))",
        "flexible-xl": "repeat( auto-fit, minmax(400px,500px))",
      },
      minHeight: {
        ".9screen": "90vh",
        ".8screen": "80vh",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["responsive", "hover", "focus", "disabled"],
      width: ["responsive", "focus"],
    },
  },
  plugins: [],
};

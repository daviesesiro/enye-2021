import React from "react";
import { ScrollToTop } from "./ScrollToTop";

export const Layout: React.FC = ({ children }) => (
  <>
    <NavBar />
    <div className="min-h-.8screen px-5">{children}</div>
    <ScrollToTop />
    <Footer />
  </>
);
const Footer = () => (
  <footer className="footer">
    Made with 💖 by{" "}
    <a
      className="hover:text-purple-500 hover:shadow-lg ring-purple-300 font-bold text-purple-700"
      href="http://github.com/daviesesiro"
      target="_blank"
      rel="noopener noreferrer"
    >
      Davies Ojurere
    </a>{" "}
    ~ 2021
  </footer>
);
const NavBar = () => {
  return (
    <header className="p-3 bg-purple-900">
      <h1 className="text-2xl font-bold text-center text-white">
        Enye Challenge Phase 1
      </h1>
    </header>
  );
};

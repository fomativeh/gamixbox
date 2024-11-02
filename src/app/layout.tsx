import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import React from "react";
import dynamic from "next/dynamic";
import "aos/dist/aos.css";

// Load the client-side layout dynamically
const CSRRootLayout = dynamic(() => import("./components/CSRRootLayout"), {
  ssr: false,
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col justify-center items-center bg-[#272626]">
        <CSRRootLayout>{children}</CSRRootLayout>
      </body>
    </html>
  );
};

export default RootLayout;

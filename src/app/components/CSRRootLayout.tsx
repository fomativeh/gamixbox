"use client";
import { SDKProvider } from "@tma.js/sdk-react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import React from "react";

const CSRRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <TonConnectUIProvider manifestUrl="https://gamixbox.vercel.app/tonconnect-manifest.json">
      <SDKProvider>
        <section className="app-wrap max-w-[500px] min-w-[350px] min-h-[100vh] w-[100vw] bg-dark_blue_1">
          {children}
        </section>
      </SDKProvider>
    </TonConnectUIProvider>
  );
};

export default CSRRootLayout;

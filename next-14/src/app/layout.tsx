"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { appStore } from "@/stores";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

// Fixes: Hydration failed because the initial UI does not match what was rendered on the server.
const DynamicContextProvider = dynamic(
  () => import("mobx-react").then((mod) => mod.Provider),
  {
    ssr: false,
  }
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DynamicContextProvider appStore={appStore}>
          {children}
        </DynamicContextProvider>
      </body>
    </html>
  );
}

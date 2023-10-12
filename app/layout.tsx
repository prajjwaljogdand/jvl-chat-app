import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToastContext from "./context/ToastContext";
import AuthContext from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JVL Chat App",
  description: "Created by @prajjwaljogdand",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"dark:bg-gray-800" + inter.className}>
        <AuthContext>
            <ToastContext />
            {children}
        </AuthContext>
      </body>
    </html>
  );
}

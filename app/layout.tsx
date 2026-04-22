import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ConsentBootstrap } from "./components/ConsentBootstrap";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Midnight Auto Studio | Premium Protection",
  description:
    "Premium PPF, wrap, tint and detailing studio for BMW M, Audi RS and Porsche. 3D design preview before installation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ConsentBootstrap />
      </head>
      <body
        className={montserrat.className}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

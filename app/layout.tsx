import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://08-zustand-virid-one.vercel.app"),
  title: "NoteHub",
  description:
    "NoteHub — a simple and efficient application for note management.",
  openGraph: {
    title: "NoteHub",
    description:
      "NoteHub — a simple and efficient application for note management.",
    url: "https://08-zustand-virid-one.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub — note management application",
      },
    ],
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}

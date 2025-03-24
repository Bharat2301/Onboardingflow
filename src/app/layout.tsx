'use client';
import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ margin: 0, padding: 0, minHeight: '100vh', backgroundColor: '#f5f7fa' }}
      >
        <Provider store={store}>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
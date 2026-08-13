import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: {
        default: "MediQueue | Tutor Booking",
        template: "%s | MediQueue",
    },
    description:
        "MediQueue connects students with tutors and makes learning session booking simple.",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            data-theme="light"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col bg-base-100 text-base-content">
                <Navbar />
                <div className="fixed bottom-5 right-5 z-50">
                    <ThemeToggle />
                </div>
                <main className="flex-1">{children}</main>
                <Footer />
                <ToastContainer position="top-right" />
            </body>
        </html>
    );
}

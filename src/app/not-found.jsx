import Link from "next/link";
import { SearchX } from "lucide-react";

export const metadata = {
    title: "Page Not Found",
};

export default function NotFound() {
    return (
        <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
            <div className="max-w-lg text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-base-200 text-[#0D335B]">
                    <SearchX size={38} />
                </div>

                <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-[#7AA93C]">
                    404 Error
                </p>

                <h1 className="mt-2 text-4xl font-bold sm:text-5xl">
                    Page not found
                </h1>

                <p className="mt-4 text-base-content/60">
                    The page you are looking for does not exist or may have been
                    moved.
                </p>

                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link href="/" className="btn bg-[#7AA93C] text-white">
                        Back to Home
                    </Link>
                    <Link href="/tutors" className="btn btn-outline">
                        Browse Tutors
                    </Link>
                </div>
            </div>
        </main>
    );
}

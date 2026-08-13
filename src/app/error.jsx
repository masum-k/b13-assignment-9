"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
            <div className="max-w-lg text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-error/10 text-error">
                    <AlertTriangle size={38} />
                </div>

                <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
                    Something went wrong
                </h1>

                <p className="mt-3 text-base-content/60">
                    We could not complete that request. Please try again.
                </p>

                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="btn bg-[#7AA93C] text-white"
                    >
                        Try Again
                    </button>
                    <Link href="/" className="btn btn-outline">
                        Go Home
                    </Link>
                </div>
            </div>
        </main>
    );
}

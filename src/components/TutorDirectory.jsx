"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

export default function TutorDirectory({ tutors = [] }) {
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const filteredTutors = useMemo(() => {
        const query = search.trim().toLowerCase();

        return tutors.filter((tutor) => {
            const matchesSearch =
                !query ||
                [tutor?.name, tutor?.subject, tutor?.category, tutor?.institution]
                    .filter(Boolean)
                    .some((value) =>
                        String(value).toLowerCase().includes(query)
                    );

            const rawDate =
                tutor?.registrationDate ||
                tutor?.createdAt ||
                tutor?.created_at;

            const tutorDate = rawDate ? new Date(rawDate) : null;
            const validDate = tutorDate && !Number.isNaN(tutorDate.getTime());

            const matchesStart =
                !startDate ||
                (validDate && tutorDate >= new Date(`${startDate}T00:00:00`));

            const matchesEnd =
                !endDate ||
                (validDate && tutorDate <= new Date(`${endDate}T23:59:59`));

            return matchesSearch && matchesStart && matchesEnd;
        });
    }, [tutors, search, startDate, endDate]);

    const clearFilters = () => {
        setSearch("");
        setStartDate("");
        setEndDate("");
    };

    return (
        <>
            <div className="mb-8 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm">
                <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_auto]">
                    <label className="input input-bordered flex items-center gap-2 w-full">
                        <Search size={18} />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search tutor, subject or institution..."
                            aria-label="Search tutors"
                        />
                    </label>

                    <input
                        type="date"
                        className="input input-bordered w-full"
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                        title="Registration date from"
                    />

                    <input
                        type="date"
                        className="input input-bordered w-full"
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                        title="Registration date to"
                    />

                    <button
                        className="btn btn-ghost"
                        type="button"
                        onClick={clearFilters}
                        disabled={!search && !startDate && !endDate}
                    >
                        <X size={17} />
                        Clear
                    </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-base-content/60">
                    <span>
                        Filter by tutor name/subject and registration date.
                    </span>
                    <strong className="text-base-content">
                        {filteredTutors.length} result
                        {filteredTutors.length === 1 ? "" : "s"}
                    </strong>
                </div>
            </div>

            {filteredTutors.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-base-300 p-12 text-center">
                    <h2 className="text-xl font-semibold">No tutors found</h2>
                    <p className="mt-2 text-base-content/60">
                        Try a different search term or registration date range.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredTutors.map((tutor) => (
                        <article
                            key={tutor._id}
                            className="card overflow-hidden bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <figure className="px-5 pt-5">
                                <Image
                                    width={500}
                                    height={360}
                                    src={tutor?.image || "/images/default-avatar.png"}
                                    alt={
                                        tutor?.name
                                            ? `${tutor.name}'s profile`
                                            : "Tutor profile picture"
                                    }
                                    className="h-64 w-full rounded-xl object-cover"
                                />
                            </figure>

                            <div className="card-body">
                                <div>
                                    <h2 className="card-title">{tutor.name}</h2>
                                    <p className="mt-1 text-sm text-base-content/60">
                                        {tutor.subject || "General tutoring"}
                                    </p>
                                </div>

                                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                                    {tutor?.teachingMode && (
                                        <span className="badge badge-outline">
                                            {tutor.teachingMode}
                                        </span>
                                    )}
                                    {tutor?.location && (
                                        <span className="badge badge-outline">
                                            {tutor.location}
                                        </span>
                                    )}
                                </div>

                                <div className="card-actions mt-4">
                                    <Link
                                        href={`/tutors/${tutor._id}`}
                                        className="btn w-full bg-[#7AA93C] text-white"
                                    >
                                        Book Session
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </>
    );
}

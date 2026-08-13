"use client";

import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function TutorSearch({ tutors = [] }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [startDate, setStartDate] = useState(searchParams.get("startDate") || "");
    const [endDate, setEndDate] = useState(searchParams.get("endDate") || "");

    useEffect(() => {
        setSearch(searchParams.get("search") || "");
        setStartDate(searchParams.get("startDate") || "");
        setEndDate(searchParams.get("endDate") || "");
    }, [searchParams]);

    const filteredTutors = useMemo(() => {
        const query = search.trim().toLowerCase();

        return tutors.filter((tutor) => {
            const matchesSearch =
                !query ||
                [tutor?.name, tutor?.subject, tutor?.category, tutor?.institution]
                    .filter(Boolean)
                    .some((value) => String(value).toLowerCase().includes(query));

            const rawDate =
                tutor?.registrationDate ||
                tutor?.createdAt ||
                tutor?.created_at;

            const tutorDate = rawDate ? new Date(rawDate) : null;
            const validDate = tutorDate && !Number.isNaN(tutorDate.getTime());

            const matchesStart =
                !startDate ||
                !validDate ||
                tutorDate >= new Date(`${startDate}T00:00:00`);

            const matchesEnd =
                !endDate ||
                !validDate ||
                tutorDate <= new Date(`${endDate}T23:59:59`);

            return matchesSearch && matchesStart && matchesEnd;
        });
    }, [tutors, search, startDate, endDate]);

    const applyFilters = (event) => {
        event.preventDefault();

        const params = new URLSearchParams();

        if (search.trim()) params.set("search", search.trim());
        if (startDate) params.set("startDate", startDate);
        if (endDate) params.set("endDate", endDate);

        const query = params.toString();
        router.push(query ? `/tutors?${query}` : "/tutors");
    };

    const clearFilters = () => {
        setSearch("");
        setStartDate("");
        setEndDate("");
        router.push("/tutors");
    };

    return (
        <>
            <form
                onSubmit={applyFilters}
                className="mb-8 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm"
            >
                <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_auto_auto]">
                    <label className="input input-bordered flex items-center gap-2 w-full">
                        <Search size={18} />
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search tutor, subject or institution..."
                            aria-label="Search tutors"
                        />
                    </label>

                    <label className="form-control">
                        <span className="sr-only">Registration date from</span>
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            value={startDate}
                            onChange={(event) => setStartDate(event.target.value)}
                            title="Registration date from"
                        />
                    </label>

                    <label className="form-control">
                        <span className="sr-only">Registration date to</span>
                        <input
                            type="date"
                            className="input input-bordered w-full"
                            value={endDate}
                            onChange={(event) => setEndDate(event.target.value)}
                            title="Registration date to"
                        />
                    </label>

                    <button className="btn bg-[#7AA93C] text-white" type="submit">
                        Search
                    </button>

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
            </form>

            <div className="mb-4 text-sm text-base-content/60">
                {filteredTutors.length} tutor{filteredTutors.length === 1 ? "" : "s"} found
            </div>

            {filteredTutors}
        </>
    );
}

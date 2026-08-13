import TutorDirectory from "@/components/TutorDirectory";

export const metadata = {
    title: "Find Tutors",
};

const AllTutorsData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors/all`, {
        cache: "no-store",
    });

    if (!res.ok) {
        return [];
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
};

const AllTutors = async () => {
    const tutorDataRes = await AllTutorsData();

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6">
            <div className="mb-10 text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-[#7AA93C]">
                    Learn with confidence
                </p>
                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                    Find Your Tutor
                </h1>
                <p className="mx-auto mt-3 max-w-2xl text-base-content/60">
                    Search by tutor, subject, or institution and narrow results by
                    registration date.
                </p>
            </div>

            <TutorDirectory tutors={tutorDataRes} />
        </section>
    );
};

export default AllTutors;

import CancelSessionButton from "@/components/CancelSessionButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
    title: "My Booked Sessions",
};

const BookedSessionPage = async () => {
    const requestHeaders = await headers();

    const { token } = await auth.api.getToken({
        headers: requestHeaders,
    });

    const session = await auth.api.getSession({
        headers: requestHeaders,
    });

    if (!session?.user || !token) {
        redirect("/login");
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booked-session/${session.user.id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    const data = await res.json();
    const bookedSessions = Array.isArray(data) ? data : [];

    return (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-[#7AA93C]">
                    Dashboard
                </p>
                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                    My Booked Sessions
                </h1>
                <p className="mt-2 text-base-content/60">
                    View and manage the learning sessions you have booked.
                </p>
            </div>

            {bookedSessions.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-base-300 p-12 text-center">
                    <h2 className="text-2xl font-semibold">No booked sessions</h2>
                    <p className="mx-auto mt-2 max-w-md text-base-content/60">
                        You have not booked a tutoring session yet.
                    </p>
                    <Link
                        className="btn mt-6 bg-[#7AA93C] text-white"
                        href="/tutors"
                    >
                        Browse Tutors
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100 shadow-sm">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Tutor</th>
                                <th>Student Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th className="text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {bookedSessions.map((booking) => {
                                const status =
                                    booking?.status ||
                                    booking?.bookStatus ||
                                    "active";

                                return (
                                    <tr key={booking?._id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                {booking?.image ? (
                                                    <Image
                                                        src={booking.image}
                                                        alt={booking?.subject || "Tutor"}
                                                        width={48}
                                                        height={48}
                                                        className="h-12 w-12 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-base-200 font-semibold">
                                                        T
                                                    </div>
                                                )}

                                                <div>
                                                    <div className="font-semibold">
                                                        {booking?.tutorName ||
                                                            booking?.subject ||
                                                            "Tutor"}
                                                    </div>
                                                    {booking?.subject && (
                                                        <div className="text-xs text-base-content/60">
                                                            {booking.subject}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        <td>{booking?.studentName || session.user.name}</td>
                                        <td>{booking?.studentEmail || session.user.email}</td>

                                        <td>
                                            <span
                                                className={`badge ${
                                                    String(status).toLowerCase() ===
                                                    "cancelled"
                                                        ? "badge-error"
                                                        : "badge-success"
                                                }`}
                                            >
                                                {status}
                                            </span>
                                        </td>

                                        <td className="text-right">
                                            {String(status).toLowerCase() ===
                                            "cancelled" ? (
                                                <span className="text-sm text-base-content/50">
                                                    Cancelled
                                                </span>
                                            ) : (
                                                <CancelSessionButton
                                                    id={booking?._id}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
};

export default BookedSessionPage;

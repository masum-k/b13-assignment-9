"use client";

import { authClient, useSession } from "@/lib/auth-client";
import {
    getTutorOwnerId,
    requestWithFallback,
} from "@/lib/api";
import { Edit3, Trash2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const editableFields = [
    ["name", "Tutor Name"],
    ["image", "Photo URL"],
    ["subject", "Subject"],
    ["availableDays", "Available Days"],
    ["availableTimeSlot", "Available Time Slot"],
    ["hourlyFee", "Hourly Fee"],
    ["totalSlots", "Total Slot"],
    ["sessionStartDate", "Session Start Date"],
    ["institution", "Institution"],
    ["experience", "Experience"],
    ["location", "Location"],
    ["teachingMode", "Teaching Mode"],
];

export default function TutorListPage() {
    const { data: session, isPending: sessionPending } = useSession();
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingTutor, setEditingTutor] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [saving, setSaving] = useState(false);

    const userId = session?.user?.id;

    const loadTutors = async () => {
        if (!userId) return;

        setLoading(true);

        try {
            const tokenResult = await authClient.token();
            const token = tokenResult?.data?.token;

            if (!token) throw new Error("Authentication token not found.");

            const data = await requestWithFallback(
                [
                    `/tutors/user/${userId}`,
                    `/tutors?userId=${encodeURIComponent(userId)}`,

                ],
                {
                    token,
                    cache: "no-store",
                }
            );
            const list = Array.isArray(data) ? data : [];

            setTutors(list);

        } catch (error) {
            toast.error(error.message || "Could not load your tutors.");
            setTutors([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!sessionPending && userId) {
            loadTutors();
        }
    }, [sessionPending, userId]);

    const normalizedEditingTutor = useMemo(() => {
        if (!editingTutor) return null;

        return {
            ...editingTutor,
            hourlyFee:
                editingTutor.hourlyFee ??
                editingTutor.hourlyRate ??
                editingTutor.fee ??
                "",
            totalSlots:
                editingTutor.totalSlots ??
                editingTutor.totalSlot ??
                "",
            availableTimeSlot:
                editingTutor.availableTimeSlot ??
                editingTutor.availableTime ??
                "",
            experience:
                editingTutor.experience ??
                editingTutor.experienceYears ??
                "",
        };
    }, [editingTutor]);

    const updateField = (name, value) => {
        setEditingTutor((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const saveTutor = async (event) => {
        event.preventDefault();

        if (!editingTutor?._id) return;

        setSaving(true);

        try {
            const tokenResult = await authClient.token();
            const token = tokenResult?.data?.token;

            if (!token) throw new Error("Authentication token not found.");

            const payload = {
                ...editingTutor,
                hourlyFee: Number(editingTutor.hourlyFee),
                hourlyRate: Number(editingTutor.hourlyFee),
                totalSlots: Number(editingTutor.totalSlots),
                totalSlot: Number(editingTutor.totalSlots),
                experience: editingTutor.experience,
                experienceYears: Number(editingTutor.experience) || 0,
                availableTime: editingTutor.availableTimeSlot,
            };

            let updated;
            let lastUpdateError;

            for (const method of ["PUT", "PATCH"]) {
                if (updated) break;

                for (const path of [
                    `/tutors/${editingTutor._id}`,

                ]) {
                    try {
                        updated = await requestWithFallback([path], {
                            method,
                            token,
                            body: JSON.stringify(payload),
                        });
                        break;
                    } catch (error) {
                        lastUpdateError = error;

                        if (![404, 405].includes(error.status)) {
                            throw error;
                        }
                    }
                }
            }

            if (!updated && lastUpdateError) {
                throw lastUpdateError;
            }

            const returnedTutor =
                updated?.tutor ||
                updated?.data ||
                updated;

            setTutors((current) =>
                current.map((tutor) =>
                    tutor._id === editingTutor._id
                        ? {
                            ...tutor,
                            ...payload,
                            ...(returnedTutor && typeof returnedTutor === "object"
                                ? returnedTutor
                                : {}),
                        }
                        : tutor
                )
            );

            toast.success("Tutor updated successfully.");
            setEditingTutor(null);
        } catch (error) {
            toast.error(error.message || "Could not update tutor.");
        } finally {
            setSaving(false);
        }
    };

    const deleteTutor = async (tutorId) => {
        setDeletingId(tutorId);

        try {
            const tokenResult = await authClient.token();
            const token = tokenResult?.data?.token;

            if (!token) throw new Error("Authentication token not found.");

            await requestWithFallback(
                [`/tutors/${tutorId}`],
                {
                    method: "DELETE",
                    token,
                }
            );

            setTutors((current) => current.filter((tutor) => tutor._id !== tutorId));
            toast.success("Tutor deleted successfully.");
        } catch (error) {
            toast.error(error.message || "Could not delete tutor.");
        } finally {
            setDeletingId(null);
        }
    };

    if (sessionPending || loading) {
        return (
            <div className="mx-auto flex min-h-[60vh] items-center justify-center">
                <span className="loading loading-spinner loading-lg" />
            </div>
        );
    }

    if (!session?.user) {
        return null;
    }

    return (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-[#7AA93C]">
                        Dashboard
                    </p>
                    <h1 className="mt-2 text-3xl font-bold sm:text-4xl">My Tutors</h1>
                    <p className="mt-2 text-base-content/60">
                        Manage the tutor profiles you created.
                    </p>
                </div>
            </div>

            {tutors.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-base-300 p-12 text-center">
                    <h2 className="text-2xl font-semibold">No tutors yet</h2>
                    <p className="mx-auto mt-2 max-w-md text-base-content/60">
                        You have not created any tutor profile yet. Add one to start
                        accepting learning sessions.
                    </p>
                    <a
                        href="/add-tutors"
                        className="btn mt-6 bg-[#7AA93C] text-white"
                    >
                        Add Tutor
                    </a>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100 shadow-sm">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Tutor</th>
                                <th>Subject</th>
                                <th>Fee</th>
                                <th>Slots</th>
                                <th>Start Date</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tutors.map((tutor) => (
                                <tr key={tutor._id}>
                                    <td>
                                        <div className="font-semibold">{tutor.name}</div>
                                        <div className="text-xs text-base-content/60">
                                            {tutor.institution || "—"}
                                        </div>
                                    </td>
                                    <td>{tutor.subject || "—"}</td>
                                    <td>
                                        {tutor.hourlyFee ??
                                            tutor.hourlyRate ??
                                            tutor.fee ??
                                            "—"}
                                    </td>
                                    <td>
                                        {tutor.totalSlots ??
                                            tutor.totalSlot ??
                                            "—"}
                                    </td>
                                    <td>
                                        {tutor.sessionStartDate
                                            ? new Date(
                                                tutor.sessionStartDate
                                            ).toLocaleDateString()
                                            : "—"}
                                    </td>
                                    <td>
                                        <div className="flex justify-end gap-2">
                                            <button
                                                className="btn btn-sm btn-outline"
                                                onClick={() => setEditingTutor(tutor)}
                                            >
                                                <Edit3 size={15} />
                                                Update
                                            </button>
                                            <button
                                                className="btn btn-sm btn-error btn-outline"
                                                disabled={deletingId === tutor._id}
                                                onClick={() => {
                                                    const confirmed = window.confirm(
                                                        `Delete ${tutor.name}? This action cannot be undone.`
                                                    );

                                                    if (confirmed) {
                                                        deleteTutor(tutor._id);
                                                    }
                                                }}
                                            >
                                                {deletingId === tutor._id ? (
                                                    <span className="loading loading-spinner loading-xs" />
                                                ) : (
                                                    <Trash2 size={15} />
                                                )}
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {normalizedEditingTutor && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-4xl">
                        <button
                            type="button"
                            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
                            onClick={() => setEditingTutor(null)}
                        >
                            <X size={18} />
                        </button>

                        <h2 className="text-2xl font-bold">Update Tutor</h2>
                        <p className="mt-1 text-sm text-base-content/60">
                            Update any tutor information and save the changes.
                        </p>

                        <form
                            onSubmit={saveTutor}
                            className="mt-6 grid gap-4 md:grid-cols-2"
                        >
                            {editableFields.map(([name, label]) => (
                                <label key={name} className="form-control">
                                    <span className="mb-1 text-sm font-medium">
                                        {label}
                                    </span>

                                    {name === "teachingMode" ? (
                                        <select
                                            className="select select-bordered"
                                            value={normalizedEditingTutor[name] || ""}
                                            onChange={(event) =>
                                                updateField(name, event.target.value)
                                            }
                                        >
                                            <option value="Online">Online</option>
                                            <option value="Offline">Offline</option>
                                            <option value="Both">Both</option>
                                        </select>
                                    ) : (
                                        <input
                                            className="input input-bordered"
                                            type={
                                                name === "hourlyFee" ||
                                                    name === "totalSlots"
                                                    ? "number"
                                                    : name === "sessionStartDate"
                                                        ? "date"
                                                        : name === "image"
                                                            ? "url"
                                                            : "text"
                                            }
                                            min={
                                                name === "hourlyFee"
                                                    ? 0
                                                    : name === "totalSlots"
                                                        ? 1
                                                        : undefined
                                            }
                                            value={normalizedEditingTutor[name] ?? ""}
                                            onChange={(event) =>
                                                updateField(name, event.target.value)
                                            }
                                            required
                                        />
                                    )}
                                </label>
                            ))}

                            <div className="md:col-span-2 flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    className="btn btn-ghost"
                                    onClick={() => setEditingTutor(null)}
                                    disabled={saving}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn bg-[#7AA93C] text-white"
                                    disabled={saving}
                                >
                                    {saving ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Changes"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div
                        className="modal-backdrop"
                        onClick={() => !saving && setEditingTutor(null)}
                    />
                </div>
            )}
        </section>
    );
}

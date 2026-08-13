"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { requestWithFallback } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialForm = {
    name: "",
    image: "",
    subject: "",
    availableDays: "Sun - Thu",
    availableTimeSlot: "",
    hourlyFee: "",
    totalSlots: "",
    sessionStartDate: "",
    institution: "",
    experience: "",
    location: "",
    teachingMode: "Online",
};

const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Computer Science",
    "ICT",
    "Other",
];

export default function AddTutors() {
    const router = useRouter();
    const { data: session, isPending } = useSession();
    const [form, setForm] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!isPending && !session?.user) {
            router.replace("/login");
        }
    }, [isPending, session, router]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!session?.user) {
            toast.error("Please log in before adding a tutor.");
            router.push("/login");
            return;
        }

        if (Number(form.totalSlots) < 1) {
            toast.error("Total slots must be at least 1.");
            return;
        }

        if (Number(form.hourlyFee) < 0) {
            toast.error("Hourly fee cannot be negative.");
            return;
        }

        if (!form.sessionStartDate) {
            toast.error("Please select a session start date.");
            return;
        }

        const tokenResult = await authClient.token();
        const token = tokenResult?.data?.token;

        if (!token) {
            toast.error("Authentication token not found. Please log in again.");
            return;
        }

        setSubmitting(true);

        const tutorData = {
            ...form,
            hourlyFee: Number(form.hourlyFee),
            hourlyRate: Number(form.hourlyFee),
            totalSlots: Number(form.totalSlots),
            totalSlot: Number(form.totalSlots),
            experienceYears: Number(form.experience) || 0,
            experience: form.experience,
            availableTime: form.availableTimeSlot,
            registrationDate: new Date().toISOString(),
            userId: session.user.id,
            userName: session.user.name,
            userEmail: session.user.email,
            aboutMe: `${form.institution || "Experienced tutor"}${form.experience ? ` • ${form.experience} experience` : ""}`,
        };

        try {
            await requestWithFallback(
                ["/tutors"],
                {
                    method: "POST",
                    token,
                    body: JSON.stringify(tutorData),
                }
            );

            toast.success("Tutor added successfully!");
            setForm(initialForm);
            router.push("/my-tutors");
            router.refresh();
        } catch (error) {
            toast.error(error.message || "Could not save tutor.");
        } finally {
            setSubmitting(false);
        }
    };

    if (isPending || !session?.user) {
        return (
            <div className="mx-auto flex min-h-[60vh] max-w-5xl items-center justify-center px-4">
                <span className="loading loading-spinner loading-lg" />
            </div>
        );
    }

    return (
        <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-[#7AA93C]">
                    Tutor Management
                </p>
                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Add a Tutor</h1>
                <p className="mt-2 max-w-2xl text-base-content/60">
                    Create a complete tutor profile so students can discover and book
                    your available sessions.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-8"
            >
                <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Tutor Name" name="name" value={form.name} onChange={handleChange} required />
                    <Field label="Photo URL" name="image" value={form.image} onChange={handleChange} type="url" required />

                    <SelectField
                        label="Subject / Category"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        options={subjects}
                        required
                    />

                    <SelectField
                        label="Teaching Mode"
                        name="teachingMode"
                        value={form.teachingMode}
                        onChange={handleChange}
                        options={["Online", "Offline", "Both"]}
                        required
                    />

                    <Field label="Available Days" name="availableDays" value={form.availableDays} onChange={handleChange} placeholder="Sun - Thu" required />
                    <Field label="Available Time Slot" name="availableTimeSlot" value={form.availableTimeSlot} onChange={handleChange} placeholder="5:00 PM - 8:00 PM" required />

                    <Field label="Hourly Fee" name="hourlyFee" value={form.hourlyFee} onChange={handleChange} type="number" min="0" required />
                    <Field label="Total Slot" name="totalSlots" value={form.totalSlots} onChange={handleChange} type="number" min="1" required />

                    <Field label="Session Start Date" name="sessionStartDate" value={form.sessionStartDate} onChange={handleChange} type="date" required />
                    <Field label="Institution" name="institution" value={form.institution} onChange={handleChange} required />

                    <Field label="Experience" name="experience" value={form.experience} onChange={handleChange} placeholder="e.g. 3 years" required />
                    <Field label="Location (Area / City)" name="location" value={form.location} onChange={handleChange} placeholder="e.g. New York" required />
                </div>

                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => router.back()}
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn bg-[#7AA93C] px-8 text-white"
                        disabled={submitting}
                    >
                        {submitting ? (
                            <>
                                <span className="loading loading-spinner loading-sm" />
                                Saving...
                            </>
                        ) : (
                            "Submit Tutor"
                        )}
                    </button>
                </div>
            </form>
        </section>
    );
}

function Field({
    label,
    name,
    value,
    onChange,
    type = "text",
    placeholder,
    required = false,
    min,
}) {
    return (
        <label className="form-control w-full">
            <span className="mb-2 text-sm font-medium">{label}</span>
            <input
                className="input input-bordered w-full"
                name={name}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                required={required}
                min={min}
            />
        </label>
    );
}

function SelectField({ label, name, value, onChange, options, required = false }) {
    return (
        <label className="form-control w-full">
            <span className="mb-2 text-sm font-medium">{label}</span>
            <select
                className="select select-bordered w-full"
                name={name}
                value={value}
                onChange={onChange}
                required={required}
            >
                <option value="">Select {label}</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </label>
    );
}

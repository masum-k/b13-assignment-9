"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function BookButton({ tutors }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSession = async () => {
    if (!session?.user) {
      router.push("/login");
      return;
    }

    if (!tutors?._id) {
      toast.error("Tutor information is missing.");
      return;
    }

    setLoading(true);

    try {
      const { data: jwtData } = await authClient.token();

      const token = jwtData?.token;

      if (!token) {
        throw new Error("Authentication failed.");
      }

      // Optional frontend check.
      // Backend still performs the real validation.
      if (
        tutors.totalSlot !== undefined &&
        Number(tutors.totalSlot) <= 0
      ) {
        toast.error(
          "This session is fully booked. You can't join at the moment."
        );
        return;
      }

      if (tutors.sessionStartDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const sessionDate = new Date(tutors.sessionStartDate);
        sessionDate.setHours(0, 0, 0, 0);

        if (today < sessionDate) {
          toast.error(
            "Booking is not available yet for this tutor"
          );
          return;
        }
      }

      const bookingData = {
        studentName: session.user.name,
        studentEmail: session.user.email,

        tutorId: tutors._id,
        tutorName: tutors.name,

        phone: "",
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booked-session/${tutors._id}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(bookingData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Booking failed."
        );
      }

      toast.success("Session booked successfully.");

      router.push("/my-booked-session");
    } catch (error) {
      console.error(error);

      toast.error(
        error.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="btn bg-[#7AA93C] text-white"
      onPress={handleSession}
      isDisabled={loading}
    >
      {loading ? "Booking..." : "Book Session"}
    </Button>
  );
}
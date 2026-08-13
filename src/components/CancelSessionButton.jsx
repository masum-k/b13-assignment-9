"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CancelSessionButton({
  id,
  onCancelled,
}) {
  const [loading, setLoading] = useState(false);

  const cancel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      const { data } = await authClient.token();

      const token = data?.token;

      if (!token) {
        throw new Error("Authentication failed.");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/booked-session/cancel/${id}`,
        {
          method: "PATCH",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Could not cancel booking."
        );
      }

      toast.success(
        "Booking cancelled successfully."
      );

      onCancelled?.();
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
      color="danger"
      variant="light"
      size="sm"
      onPress={cancel}
      isDisabled={loading}
    >
      {loading ? "Cancelling..." : "Cancel"}
    </Button>
  );
}
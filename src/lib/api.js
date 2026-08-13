const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getApiUrl = (path = "") => {
    if (!API_URL) {
        throw new Error("NEXT_PUBLIC_API_URL is not configured.");
    }

    return `${API_URL.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
};

export const getJwtToken = async () => {
    const { authClient } = await import("@/lib/auth-client");
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
        throw new Error("Authentication token could not be retrieved.");
    }

    return data.token;
};

export const apiRequest = async (path, options = {}) => {
    const token = options.token ?? null;
    const headers = new Headers(options.headers || {});

    if (options.body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    if (token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(getApiUrl(path), {
        ...options,
        headers,
    });

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        const message =
            data?.message ||
            data?.error ||
            `Request failed with status ${response.status}`;

        const error = new Error(message);
        error.status = response.status;
        error.data = data;
        throw error;
    }

    return data;
};

export const requestWithFallback = async (paths, options = {}) => {
    let lastError;

    for (const path of paths) {
        try {
            return await apiRequest(path, options);
        } catch (error) {
            lastError = error;

            // Only try the next route when the endpoint itself is missing.
            if (error.status !== 404) {
                throw error;
            }
        }
    }

    throw lastError || new Error("No API endpoint was available.");
};

export const getTutorOwnerId = (tutor) =>
    tutor?.userId ||
    tutor?.ownerId ||
    tutor?.createdBy ||
    tutor?.user?.id ||
    tutor?.authorId ||
    null;

export const getTutorSlots = (tutor) =>
    Number(tutor?.totalSlots ?? tutor?.totalSlot ?? tutor?.availableSlots ?? 0);

export const getTutorSessionDate = (tutor) =>
    tutor?.sessionStartDate || tutor?.sessionDate || tutor?.startDate || null;

export const isBeforeSessionDate = (tutor) => {
    const date = getTutorSessionDate(tutor);

    if (!date) return false;

    const start = new Date(date);
    if (Number.isNaN(start.getTime())) return false;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);

    return today < start;
};

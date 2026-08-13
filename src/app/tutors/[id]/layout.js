export async function generateMetadata({ params }) {
    const { id } = await params;

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            return { title: "Tutor Details" };
        }

        const tutor = await response.json();

        return {
            title: tutor?.name
                ? `${tutor.name} | Tutor Details`
                : "Tutor Details",
        };
    } catch {
        return {
            title: "Tutor Details",
        };
    }
}

export default function TutorDetailsLayout({ children }) {
    return children;
}

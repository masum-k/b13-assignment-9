const tutorsData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors`)
    const data = res.json()
    return data
}

const AllTutorsData = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors/all`)
    const data = res.json()
    return data
}
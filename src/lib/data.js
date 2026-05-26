const tutorsData = async () => {
    const res = await fetch("http://localhost:3001/tutors")
    const data = res.json()
    return data
}

const AllTutorsData = async () => {
    const res = await fetch("http://localhost:3001/tutors/all")
    const data = res.json()
    return data
}
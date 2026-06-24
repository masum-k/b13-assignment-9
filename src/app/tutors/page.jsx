import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AllTutorsData = async () => {
    const res = await fetch("http://localhost:3001/tutors/all")
    const data = res.json()
    return data
}

const AllTutors = async () => {

    const tutorDataRes = await AllTutorsData()

    return (
        <div className=' w-7xl mx-auto mt-10'>
            <div className='text-center'>
                <h1 className='font-bold text-4xl'>Available Tutor</h1>
            </div>
            <div className='md:grid grid-cols-3 gap-4 mt-10'>
                {
                    tutorDataRes.map(tutor => (
                        <div key={tutor._id} className="card bg-base-100 shadow-sm ">
                            <figure className="px-6 pt-6">
                                <Image
                                    width={300}
                                    height={300}
                                    // If tutor.image is empty or missing, it falls back to a placeholder
                                    src={tutor?.image || "/images/default-avatar.png"}
                                    // Always provide a fallback string for the alt text too
                                    alt={tutor?.name ? `${tutor.name}'s profile` : "Tutor profile picture"}
                                    className="rounded-xl h-72 object-cover"
                                />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{tutor.name}</h2>
                                <div className="card-actions">
                                    <Link href={`/tutors/${tutor._id}`} className="btn bg-[#7AA93C] text-white">Book Session</Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default AllTutors;
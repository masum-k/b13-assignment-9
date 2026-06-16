import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const tutorsData = async () => {
    const res = await fetch("http://localhost:3001/tutors")
    const data = res.json()
    return data
}

const TutorsCard = async () => {
    const tutorDataRes = await tutorsData()
    return (
        <div className='md:w-7xl mx-auto mt-20'>
            <div className='text-center space-y-2'>
                <h1 className='font-bold text-4xl'>Available Tutor</h1>
                <p>Connect with qualified tutors who provide personalized guidance to help you learn faster and succeed with confidence.</p>
            </div>
            <div className='md:grid grid-cols-3 gap-4 mt-10'>
                {
                    tutorDataRes.map(tutor => (
                        <div key={tutor._id} className="card bg-base-100 shadow-sm">
                            <figure className="px-6 pt-6">
                                <Image
                                    width={300}
                                    height={300}
                                    src={tutor.image}
                                    alt={tutor.name}
                                    className="rounded-xl h-72"
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

export default TutorsCard;
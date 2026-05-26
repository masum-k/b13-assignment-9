import Link from 'daisyUI/components/link';
import Image from 'next/image';
import React from 'react';

const DetailsPage = async ({ params }) => {
    const { id } = await params

    const tutorsDetails = async () => {
        const res = await fetch(`http://localhost:3001/tutors/${id}`)
        const data = res.json()
        return data
    }

    const tutorsDetailsRes = await tutorsDetails()
    const { subject, country, hourlyRate, rating, experienceYears } = tutorsDetailsRes
    return (
        <div className='md:w-7xl mx-auto mt-10'>
            <div className="card bg-base-100 md:w-2xl mx-auto shadow-sm">
                <figure>
                    <Image
                        src={tutorsDetailsRes.image}
                        alt={tutorsDetailsRes.name}
                        width={300}
                        height={300}
                        className='rounded-xl'
                    />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{tutorsDetailsRes.name}</h2>
                    <p className='md:w-1/2'>{tutorsDetailsRes.aboutMe}</p>
                    <div className="card-actions">
                        <button className="btn bg-[#7AA93C] text-white">Book Session</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;
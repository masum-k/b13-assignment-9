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
        <div className='md:w-7xl mx-auto mt-20 mb-20'>
            <div className="card bg-base-100 md:w-2xl mx-auto shadow-sm pt-10">
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
                    <div className='flex flex-col justify-center items-center'>
                        <h2 className="card-title">{tutorsDetailsRes.name}</h2>
                        <p className='md:w-1/2'>{tutorsDetailsRes.aboutMe}</p>
                    </div>
                    <div className='flex'>
                        <div>
                            <h1 className='font-medium'>Country : </h1>
                            <h1 className='font-medium'>Subject : </h1>
                            <h1 className='font-medium'>Experience : </h1>
                            <h1 className='font-medium'>Rating : </h1>
                            <h1 className='font-medium'>Hourly Rate : </h1>
                        </div>
                        <div>
                            <p>{tutorsDetailsRes.country}</p>
                            <p>{tutorsDetailsRes.subject}</p>
                            <p>{tutorsDetailsRes.experienceYears} Years</p>
                            <p>{tutorsDetailsRes.rating}</p>
                            <p>${tutorsDetailsRes.hourlyRate}</p>
                        </div>
                    </div>
                    <div className="card-actions">
                        <button className="btn bg-[#7AA93C] text-white">Book Session</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;
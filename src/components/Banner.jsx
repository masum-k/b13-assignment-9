"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

const Banner = () => {
    return (
        <div className='md:w-full w-3xl'>

            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="relative md:w-full w-3xl">
                        <div className='absolute ml-20 mt-10 space-y-2'>
                            <h1 className='text-4xl font-bold'>Learn From Expert Tutors</h1>
                            <p>
                                Connect with experienced tutors and improve your skills<br />through personalized online learning sessions designed for your goals.
                            </p>
                            <Link href={'/tutors'} className='btn bg-[#7AA93C] border-0 text-xl text-white'>
                                Find a Tutor
                            </Link>
                        </div>
                        <Image
                            src={'/slide1.jpg'}
                            alt='banner image'
                            width={1600}
                            height={500}
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative md:w-full w-3xl">
                        <div className='absolute ml-20 mt-10 space-y-2'>
                            <h1 className='text-4xl font-bold'>Share Your Knowledge</h1>
                            <p>
                                Become a tutor and help students achieve their learning goals. <br />Create tutoring sessions and connect with learners worldwide.
                            </p>
                            <Link href={'/tutors'} className='btn bg-[#7AA93C] border-0 text-xl text-white'>
                                Add a Tutor
                            </Link>
                        </div>
                        <Image
                            src={'/slide-2.jpg'}
                            alt='banner image'
                            width={1600}
                            height={500}
                        />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative md:w-full w-3xl">
                        <div className='absolute ml-20 mt-10 space-y-2'>
                            <h1 className='text-4xl font-bold'>Manage Your Learning Journey</h1>
                            <p>
                               Keep track of your tutors and booked sessions in one place,<br />making it easy to stay organized and continue learning.
                            </p>
                            <Link href={'/tutors'} className='btn bg-[#7AA93C] border-0 text-xl text-white'>
                                View My Sessions
                            </Link>
                        </div>
                        <Image
                            src={'/slide-3.jpg'}
                            alt='banner image'
                            width={1600}
                            height={500}
                        />
                    </div>
                </SwiperSlide>
            </Swiper>

            {/* <div className="carousel ">

                <div className="relative md:w-full w-3xl">
                    <div className='absolute ml-20 mt-10 space-y-2'>
                        <h1 className='text-4xl font-bold'>Learn From Expert Tutors</h1>
                        <p>
                            Connect with experienced tutors and improve your skills<br />through personalized online learning sessions designed for your goals.
                        </p>
                        <Link href={'/tutors'} className='btn bg-[#7AA93C] border-0 text-xl text-white'>
                            Find a Tutor
                        </Link>
                    </div>
                    <Image
                        src={'/slide1.jpg'}
                        alt='banner image'
                        width={1600}
                        height={500}
                    />
                </div>
                <div id="slide2" className="carousel-item opacity-80 relative w-full">
                    <div className='absolute ml-20 mt-10 space-y-2'>
                        <h1 className='text-4xl font-bold'>Study Without Limits</h1>
                        <p>
                            Access quality education from anywhere in the world. Flexible schedules,
                            <br />interactive lessons, and learning that fits your lifestyle.
                        </p>
                        <Link href={'/'} className='btn bg-[#7AA93C] border-0 text-xl text-white'>
                            Find a Tutor
                        </Link>
                    </div>
                    <Image
                        src={'/slide2.jpg'}
                        alt='banner image'
                        width={1600}
                        height={500}
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item opacity-80 relative w-full">
                    <div className='absolute ml-20 mt-10 space-y-2'>
                        <h1 className='text-4xl font-bold'>Unlock Your Potential</h1>
                        <p>
                            Whether you&apos;re preparing for exams, mastering a new subject, or building new skills,<br />our tutors help you succeed with confidence.
                        </p>
                        <Link href={'/'} className='btn bg-[#7AA93C] border-0 text-xl text-white'>
                            Find a Tutor
                        </Link>
                    </div>
                    <Image
                        src={'/slide3.jpg'}
                        alt='banner image'
                        width={1600}
                        height={500}
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Banner;
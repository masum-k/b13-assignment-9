import React from 'react';
import { FaChalkboardTeacher, FaClock, FaUserGraduate } from 'react-icons/fa';


const Service = () => {
    return (
        <div className='md:w-7xl mx-auto mt-20'>
            <div className='text-center mb-10 space-y-2'>
                <h1 className='text-2xl md:text-4xl font-bold'>Why Choose Us</h1>
                <p>Discover expert tutors, flexible learning schedules, and personalized guidance designed to help you achieve your academic goals faster.</p>
            </div>
            <div className=' grid md:grid-cols-3 gap-3'>

                <div className="hover-3d">
                    {/* content */}
                    <div className='bg-[#0D335B] p-10 flex items-center text-white'>
                        <div className="space-y-2">
                            <h1 className='text-3xl font-bold'>Expert Tutors</h1>
                            <p>Learn from experienced professionals passionate about helping students succeed.</p>
                        </div>
                        <FaChalkboardTeacher size={60} />
                    </div>
                    {/* 8 empty divs needed for the 3D effect */}
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <div className="hover-3d">
                    {/* content */}
                    <div className='bg-[#0D335B] p-10 flex items-center text-white'>
                        <div className="space-y-2">
                            <h1 className='text-3xl font-bold'>Flexible Learning</h1>
                            <p>Study anytime, anywhere with schedules that fit your lifestyle.</p>
                        </div>
                        <FaClock size={60} />
                    </div>
                    {/* 8 empty divs needed for the 3D effect */}
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <div className="hover-3d">
                    {/* content */}
                    <div className='bg-[#0D335B] p-10 flex items-center text-white'>
                        <div className="space-y-2">
                            <h1 className='text-3xl font-bold'>Expert Tutors</h1>
                            <p>Learn from experienced professionals passionate about helping students succeed.</p>
                        </div>
                        <FaUserGraduate size={60} />
                    </div>
                    {/* 8 empty divs needed for the 3D effect */}
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default Service;
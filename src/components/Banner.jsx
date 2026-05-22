import Image from 'next/image';
import React from 'react';

const Banner = () => {
    return (
        <div className='flex flex-col items-center mt-10'>
            <div className="carousel w-7/12 ">
                <div id="slide1" className="carousel-item relative w-full">
                    <Image
                        src={'/b1.jpg'}
                        alt='banner image'
                        width={1000}
                        height={800}
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <Image
                        src={'/b2.jpg'}
                        alt='banner image'
                        width={1000}
                        height={800}
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <Image
                        src={'/b3.jpg'}
                        alt='banner image'
                        width={1000}
                        height={800}
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
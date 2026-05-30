import React from 'react';

const Faq = () => {
    return (
        <div className='md:w-7xl mx-auto mt-20'>
            <div className='text-center space-y-2 mb-10'>
                <h1 className='font-bold text-4xl'>Frequently Asked Questions</h1>
                <p>Quick answers to common questions about finding tutors, booking sessions, and learning online.</p>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title font-semibold">
                    How do I find the right tutor?
                </div>
                <div className="collapse-content text-sm">
                    Browse tutors by subject, experience, ratings, and teaching style to find the best match for your learning goals.
                </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                    Can I schedule lessons at flexible times?
                </div>
                <div className="collapse-content text-sm">
                    Yes, tutors offer flexible schedules so you can book sessions that fit your availability.
                </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                    Are the lessons conducted online?
                </div>
                <div className="collapse-content text-sm">
                    Yes, all sessions are conducted online, allowing you to learn from anywhere with an internet connection.
                </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                    What subjects are available on MediQueue?
                </div>
                <div className="collapse-content text-sm">
                    We offer a wide range of subjects including programming, mathematics, science, languages, business, and more.
                </div>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title font-semibold">
                    Can beginners join the courses?
                </div>
                <div className="collapse-content text-sm">
                    Absolutely. Whether you&apos;re a beginner or an advanced learner, tutors adapt lessons to your skill level.
                </div>
            </div>
        </div>
    );
};

export default Faq;
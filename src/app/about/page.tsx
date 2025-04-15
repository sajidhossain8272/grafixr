"use client";
import React from "react";
import { FaRegEnvelope } from "react-icons/fa";

const AboutUs: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Header with Icon */}
        <div className="flex items-center justify-center mb-8">
          <FaRegEnvelope className="text-4xl text-gray-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">A Letter from Our Founder</h1>
        </div>

        {/* Letter Content */}
        <div className="space-y-6 font-serif text-lg text-gray-800 leading-relaxed">
          <p>Dear Valued Clients,</p>

          <p>
            I am deeply honored to share our journey and vision with you. My name is Rony, and my story began seven years ago when I started as an individual freelance graphics designer. With little more than a passion for creativity and a burning desire to help brands communicate their unique stories, I embarked on a journey that would eventually transform both my life and the way businesses experience design.
          </p>

          <p>
            In those early days, every project was a learning opportunity and every challenge fueled my determination. As my client base grew, I found that my vision resonated with those who believed in the power of exceptional design. This trust and support motivated me to expand and invest in a creative approach that focused on turning every idea into a striking visual narrative.
          </p>

          <p>
            Today, I am proud to say that what began as a solo venture has blossomed into a dynamic team of 15-20 dedicated professionals. Together, we combine our diverse skills and relentless passion to create visual experiences that not only captivate but also drive real results for brands around the globe.
          </p>

          <p>
            Thank you for being an integral part of our journey. We are committed to pushing creative boundaries and delivering design excellence in every project. Your belief in our vision inspires us to keep innovating and to continue telling stories through design.
          </p>
        </div>

        {/* Signature */}
        <div className="mt-10 text-right">
          <p className="font-bold text-xl">Sincerely,</p>
          <p className="mt-2 text-2xl font-extrabold text-gray-900">Rony</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

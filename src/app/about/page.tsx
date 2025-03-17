"use client";

import React from "react";
import Image from "next/image";

const Page: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900">About Us</h1>
          <p className="mt-4 text-xl text-gray-700">
            We are a dynamic design agency dedicated to creating exceptional digital experiences.
          </p>
        </div>

        {/* Our Story */}
        {/* <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed">
            Founded in [Year], our journey began with a small team of passionate creatives and developers determined to transform ideas into stunning realities.
            Over the years, we have evolved into an industry-leading agency by merging design with technology to deliver innovative digital solutions.
          </p>
        </section> */}

        {/* Mission & Vision */}
        {/* <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to empower businesses by delivering captivating digital experiences that drive engagement and growth.
              We combine creativity with cutting-edge technology to craft solutions that truly make an impact.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed">
              We envision a world where every digital interaction is a delightful experience.
              Our vision is to be at the forefront of design innovation—creating products and experiences that resonate deeply with users.
            </p>
          </div>
        </section> */}

        {/* Our Team */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Team Member Card */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Image
                src="https://via.placeholder.com/150"
                alt="Alice Johnson"
                width={150}
                height={150}
                className="mx-auto rounded-full"
              />
              <h3 className="mt-4 text-xl font-bold text-gray-900">Alice Johnson</h3>
              <p className="text-gray-600">Creative Director</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Image
                src="https://via.placeholder.com/150"
                alt="Bob Smith"
                width={150}
                height={150}
                className="mx-auto rounded-full"
              />
              <h3 className="mt-4 text-xl font-bold text-gray-900">Bob Smith</h3>
              <p className="text-gray-600">Lead Developer</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <Image
                src="https://via.placeholder.com/150"
                alt="Carol Davis"
                width={150}
                height={150}
                className="mx-auto rounded-full"
              />
              <h3 className="mt-4 text-xl font-bold text-gray-900">Carol Davis</h3>
              <p className="text-gray-600">UX/UI Designer</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;

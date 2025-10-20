
import React from 'react';
import Image from 'next/image';
import { FaTwitter, FaLinkedin, FaGithub, FaRocket, FaTrophy, FaHeart } from 'react-icons/fa';

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96">
        <Image
          src="/shoe.webp"
          alt="Our Team"
          layout="fill"
          objectFit="cover"
          className="opacity-80"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-5xl font-extrabold text-white tracking-wider">
            ABOUT NEST NOTCH
          </h1>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 md:px-16 lg:px-32 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          At Nest Notch, our mission is to blend cutting-edge technology with timeless design to create products that not only meet but exceed the expectations of our customers. We are committed to innovation, quality, and pushing the boundaries of what's possible.
        </p>
      </section>

      {/* Our Values */}
      <section className="bg-white py-20 px-4 md:px-16 lg:px-32">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="bg-gray-900 text-white rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
              <FaRocket className="text-4xl text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Innovation</h3>
            <p className="text-gray-600">
              We are driven by a relentless pursuit of innovation, constantly exploring new ideas and technologies to create groundbreaking products.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-gray-900 text-white rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
              <FaTrophy className="text-4xl text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Excellence</h3>
            <p className="text-gray-600">
              We are committed to the highest standards of quality and craftsmanship, ensuring that every product we create is a testament to our dedication.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-gray-900 text-white rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-6">
              <FaHeart className="text-4xl text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Customer Focus</h3>
            <p className="text-gray-600">
              Our customers are at the heart of everything we do. We strive to build lasting relationships by understanding and responding to their needs.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 px-4 md:px-16 lg:px-32">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Team Member 1 */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Image
              src="/barnabas.jpg"
              alt="Team Member 1"
              width={198}
              height={128}
              className=" mx-auto mb-6"
            />
            <h3 className="text-2xl font-bold text-gray-900">Barnanas Lapshak</h3>
            <p className="text-gray-500 mb-4">Lead Developer</p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900"><FaTwitter /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><FaLinkedin /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><FaGithub /></a>
            </div>
          </div>
          {/* Team Member 2 */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Image
              src="/barnabas.jpg"
              alt="Team Member 2"
              width={198}
              height={128}
              className=" mx-auto mb-6"
            />
            <h3 className="text-2xl font-bold text-gray-900">Newking Bash</h3>
            <p className="text-gray-500 mb-4">Product Designer</p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900"><FaTwitter /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><FaLinkedin /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><FaGithub /></a>
            </div>
          </div>
          {/* Team Member 3 */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <Image
              src="/barnabas.jpg"
              alt="Team Member 3"
              width={198}
              height={128}
              className=" mx-auto mb-6"
            />
            <h3 className="text-2xl font-bold text-gray-900">Bryan Kupsi</h3>
            <p className="text-gray-500 mb-4">Marketing Director</p>
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900"><FaTwitter /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><FaLinkedin /></a>
              <a href="#" className="text-gray-600 hover:text-gray-900"><FaGithub /></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

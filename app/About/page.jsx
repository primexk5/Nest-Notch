
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { HiOutlineLightBulb, HiOutlineStar, HiOutlineHeart } from 'react-icons/hi';

const teamMembers = [
  {
    name: 'Barnabas Lapshak',
    role: 'Lead Developer',
    image: '/barnabas.jpg',
    twitter: '#',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Newking Bash',
    role: 'Product Designer',
    image: '/barnabas.jpg',
    twitter: '#',
    linkedin: '#',
    github: '#',
  },
  {
    name: 'Bryan Kupsi',
    role: 'Marketing Director',
    image: '/barnabas.jpg',
    twitter: '#',
    linkedin: '#',
    github: '#',
  },
];

const values = [
  {
    icon: HiOutlineLightBulb,
    label: 'Innovation',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    description:
      'We are driven by a relentless pursuit of innovation, constantly exploring new ideas and technologies to create groundbreaking products.',
  },
  {
    icon: HiOutlineStar,
    label: 'Excellence',
    color: 'text-gray-900',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    description:
      'We are committed to the highest standards of quality and craftsmanship, ensuring every product we create is a testament to our dedication.',
  },
  {
    icon: HiOutlineHeart,
    label: 'Customer Focus',
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    description:
      'Our customers are at the heart of everything we do. We build lasting relationships by understanding and responding to their needs.',
  },
];

const stats = [
  { value: '10K+', label: 'Happy Customers' },
  { value: '500+', label: 'Products Listed' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '3+', label: 'Years of Trust' },
];

const AboutPage = () => {
  return (
    <div className="bg-white min-h-screen mt-16">

      {/* Hero Section */}
      <section className="relative bg-gray-900 py-24 sm:py-32 overflow-hidden">
        {/* Decorative grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Decorative blobs */}
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-gray-700 rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-gray-600 rounded-full opacity-30 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-gray-400 mb-4">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            Built with
            <span className="relative inline-block mx-3">
              <span className="relative z-10">passion</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-white/10 rounded-sm" />
            </span>
            for design.
          </h1>
          <p className="mt-6 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Nest Notch was founded on a simple belief — that great products
            deserve a platform worthy of them. We exist to connect quality
            craftsmanship with the people who appreciate it.
          </p>
          <Link href="/shop">
            <button className="mt-10 bg-white text-gray-900 font-semibold py-3 px-8 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Explore Our Shop
            </button>
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3">
            Our Mission
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Where Technology Meets Design
          </h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            At Nest Notch, our mission is to blend cutting-edge technology with
            timeless design — creating products that don't just meet expectations,
            but redefine them. We are committed to innovation, quality, and
            pushing the boundaries of what's possible.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3">
              What Drives Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, label, color, bg, border, description }) => (
              <div
                key={label}
                className={`rounded-2xl border ${border} ${bg} p-8 flex flex-col items-start gap-4 hover:shadow-md transition-shadow duration-300`}
              >
                <div className={`${color} text-3xl`}>
                  <Icon />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{label}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-gray-400 mb-3">
              The People
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="mt-3 text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              A small but mighty team obsessed with building exceptional products and experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="group bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative w-24 h-24 mx-auto mb-5">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="rounded-full object-cover ring-4 ring-gray-100 group-hover:ring-gray-900 transition-all duration-300 w-24 h-24"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                <p className="text-sm text-gray-500 mt-1 mb-5">{member.role}</p>
                <div className="flex justify-center gap-4 text-gray-400">
                  <a
                    href={member.twitter}
                    className="hover:text-gray-900 transition-colors duration-200"
                    aria-label={`${member.name} on Twitter`}
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href={member.linkedin}
                    className="hover:text-gray-900 transition-colors duration-200"
                    aria-label={`${member.name} on LinkedIn`}
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href={member.github}
                    className="hover:text-gray-900 transition-colors duration-200"
                    aria-label={`${member.name} on GitHub`}
                  >
                    <FaGithub />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gray-900 py-16 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Ready to experience Nest Notch?
          </h2>
          <p className="text-gray-400 mb-8 text-sm sm:text-base">
            Browse our curated collection of premium products — designed to elevate everyday life.
          </p>
          <Link href="/shop">
            <button className="bg-white text-gray-900 font-semibold py-3 px-10 rounded-full hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Shop Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;


import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen mt-20 py-20 px-4 md:px-16 lg:px-32">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-12">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Your Name</label>
                <input type="text" id="name" name="name" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100" />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Your Email</label>
                <input type="email" id="email" name="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100" />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
                <textarea id="message" name="message" rows="5" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100"></textarea>
              </div>
              <button type="submit" className="w-full bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-700 transition-colors">Send Message</button>
            </form>
          </div>
          {/* Contact Information */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <FaEnvelope className="text-2xl text-gray-900 mr-4" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Email</h3>
                  <p className="text-gray-600">lapshakbarnabas@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaPhone className="text-2xl text-gray-900 mr-4" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+234- 8168550514</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-2xl text-gray-900 mr-4" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Address</h3>
                  <p className="text-gray-600">New Abuja Dadin kowa Jos Plateau State</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

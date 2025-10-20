import React from 'react'
import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-black text-whiteborder-t">
      <div className="  py-12 px-4 sm:px-6 lg:px-52">
        {/* Top section: Name and main links */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <h2 className="text-2xl font-extrabold text-white">NEST NOTCH</h2>
          <div className="flex space-x-6">
            <Link href="/Support" className="text-base text-white hover:text-gray-300">
              Support
            </Link>
            <Link href="/Contact" className="text-base text-white hover:text-gray-300">
              Contact
            </Link>
             <Link href="/Contact" className="text-base text-white hover:text-gray-300">
              Freatures
            </Link>
          </div>
        </div>
        {/* Bottom section: Copyright and social icons */}
        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 border-t border-gray-400 pt-8 md:flex-row">
          <p className="text-base text-white">
            &copy; {new Date().getFullYear()} NEST NOTCH, Inc. All rights reserved.
          </p>
          <div className="flex text-white space-x-6">
            <Link href="#" className=" hover:text-gray-200">
              <FaFacebook className="h-6 w-6" />
            </Link>
            <Link href="#" className=" hover:text-gray-200">
              <FaTwitter className="h-6 w-6" />
            </Link>
            <Link href="#" className=" hover:text-gray-200">
              <FaInstagram className="h-6 w-6" />
            </Link>
            <Link href="#" className=" hover:text-gray-200">
              <FaGithub className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
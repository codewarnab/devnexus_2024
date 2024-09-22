import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react'


export default function Footer() {
  return (
    <div className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-5xl font-bold text-transparent">
              Botify
            </span>

            <p className="text-base text-gray-400">
              Empowering tourist sites with intelligent chatbots for seamless
              visitor experiences.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200">
                  Solutions
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Chatbot Builder
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Analytics
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Customization
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Integrations
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200">
                  Support
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Guides
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      API Status
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200">
                  Company
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Press
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200">
                  Legal
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="text-base text-gray-400 hover:text-white"
                    >
                      Trademark Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; 2023 BOTIFY, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
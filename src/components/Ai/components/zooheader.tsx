import { Calendar, Info, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import DarkModeSwitcher from '@/components/Header/DarkModeSwitcher';

export function ZooHeader() {
  return (
    <header className="relative  backdrop-blur-lg  text-dark dark:text-white py-6 px-4 sm:px-6 shadow-lg overflow-hidden">
      {/* Background image with opacity and blur */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/placeholder.svg?height=400&width=800"
          alt="Zoo Background"
          fill
          className="object-cover filter blur-sm"
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center mb-4 sm:mb-0">
            <MapPin className="h-5 w-5 mr-1" />
            <h1 className="text-3xl font-extrabold tracking-tight">
              WildLife Wonders Zoo
            </h1>
          </div>

          {/* Navigation with DarkModeSwitcher in line */}
          <nav className="flex flex-wrap items-center space-x-2 sm:space-x-4">
            {/* Hours button */}
           

            {/* Dark Mode Toggle */}
           <DarkModeSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
}

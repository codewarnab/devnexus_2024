import React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react"; // Importing a loader icon from lucide-react

interface ButtonPropTypes {
  label: string;
  link?: string;
  customClasses?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean; // Add a prop to track loading state
}

const ButtonDefault = ({
  label,
  link,
  customClasses = "", // Default empty string for custom classes
  children,
  onClick,
  isLoading = false, // Default loading state is false
}: ButtonPropTypes) => {
  return (
    <Link
      className={`inline-flex items-center justify-center gap-2.5 text-center font-medium hover:bg-opacity-90 ${customClasses} ${isLoading ? "opacity-50 pointer-events-none " : ""
        }`}
      href={link || "#"}
      onClick={onClick}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" /> // Show loader when loading
      ) : (
        <>
          {children}
          {label}
        </>
      )}
    </Link>
  );
};

export default ButtonDefault;

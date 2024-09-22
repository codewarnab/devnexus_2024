"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "../css/satoshi.css";
import "../css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "../components/common/Loader";
import Background from "../components/Bg";
import { ClerkProvider } from "@clerk/nextjs";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (

<ClerkProvider>
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Background />

        {loading ? <Loader /> : children}

      </body>
    </html>
    </ClerkProvider>

  );
}

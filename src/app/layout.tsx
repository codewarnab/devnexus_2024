"use client";
import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { ClerkProvider } from "@clerk/nextjs";
import { SnackbarProvider } from 'notistack';
import { EdgeStoreProvider } from '../lib/edgestore';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Background from "@/components/Bg";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const [loading, setLoading] = useState<boolean>(true);

  

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <ClerkProvider>

      <html lang="en">
        <body suppressHydrationWarning={true}>
          <Background />
          <SnackbarProvider
            autoHideDuration={2000}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <QueryClientProvider client={queryClient}>
              <EdgeStoreProvider> {loading ? <Loader /> : children}</EdgeStoreProvider>
            </QueryClientProvider>

          </SnackbarProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

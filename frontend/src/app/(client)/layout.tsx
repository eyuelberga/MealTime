'use client'
import React, { useState } from 'react';
import Sidebar from "@/components/layout-client/Sidebar"
import Header from '@/components/layout-client/Header';
import Providers from './Providers';
import { ProtectedLayout } from './ProtectedLayout';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <ProtectedLayout>

      <div className="flex h-screen overflow-hidden">


        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="bg-gray-50 relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

              {children}

            </div>
          </main>
        </div>
      </div>
    </ProtectedLayout>
  )
}

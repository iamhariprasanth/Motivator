'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              My Brain doctor
            </span>
          </Link>

          <nav className="flex items-center space-x-6">
            <Link
              href="/dashboard"
              className={pathname === '/dashboard'
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg transition"
                : "text-gray-700 hover:text-green-600 font-medium transition"
              }
            >
              Dashboard
            </Link>
            <Link
              href="/history"
              className={pathname === '/history'
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg transition"
                : "text-gray-700 hover:text-green-600 font-medium transition"
              }
            >
              History
            </Link>
            <Link
              href="/"
              className={pathname === '/'
                ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg transition"
                : "text-gray-700 hover:text-green-600 font-medium transition"
              }
            >
              Home
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

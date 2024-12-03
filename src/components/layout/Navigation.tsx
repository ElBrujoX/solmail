import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navigation() {
  const router = useRouter();

  return (
    <nav className="flex space-x-4">
      <Link
        href="/inbox"
        className={`${
          router.pathname === '/inbox'
            ? 'text-indigo-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Inbox
      </Link>
      <Link
        href="/compose"
        className={`${
          router.pathname === '/compose'
            ? 'text-indigo-600'
            : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Compose
      </Link>
    </nav>
  );
} 
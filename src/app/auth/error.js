'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function AuthError({ error, reset }) {
  useEffect(() => {
    // Only log the error if it's not a CredentialsSignin error during successful login
    if (!(error?.message?.includes('CredentialsSignin') && window.location.pathname === '/welcome')) {
      console.error('Authentication error:', error);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5">
      <h1 className="text-4xl font-bold mb-4">Authentication Error</h1>
      <p className="text-lg mb-6">
        There was a problem with your authentication. Please try again.
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try again
        </button>
        <Link href="/login" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
          Back to login
        </Link>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { 
  UserCircleIcon, 
  HeartIcon, 
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon 
} from './Icons';

export default function Header() {
  const { data: session, status } = useSession();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSignIn = () => {
    signIn('google');
  };

  const handleSignOut = () => {
    signOut();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              전시회 달력
            </h1>
            <span className="ml-2 text-sm text-gray-500 hidden sm:block">
              주말 전시회를 한눈에
            </span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              달력보기
            </a>
            <a
              href="/exhibitions"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              전체전시
            </a>
            <a
              href="/about"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              소개
            </a>
          </nav>

          <div className="flex items-center">
            {status === 'loading' ? (
              <div className="animate-pulse bg-gray-200 rounded-full h-8 w-20"></div>
            ) : session ? (
              <div className="relative user-menu">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-2"
                >
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="h-8 w-8 rounded-full"
                    />
                  ) : (
                    <UserCircleIcon className="h-8 w-8" />
                  )}
                  <span className="hidden sm:block text-sm font-medium">
                    {session.user.name}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">
                        {session.user.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {session.user.email}
                      </p>
                    </div>
                    
                    <a
                      href="/favorites"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <HeartIcon className="h-4 w-4 mr-3" />
                      즐겨찾기
                    </a>
                    
                    <a
                      href="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <Cog6ToothIcon className="h-4 w-4 mr-3" />
                      설정
                    </a>
                    
                    <div className="border-t">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                        로그아웃
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="md:hidden bg-gray-50 border-t">
        <div className="px-4 py-2 space-y-1">
          <a
            href="/"
            className="block px-3 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium"
          >
            달력보기
          </a>
          <a
            href="/exhibitions"
            className="block px-3 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium"
          >
            전체전시
          </a>
          <a
            href="/about"
            className="block px-3 py-2 text-gray-700 hover:text-blue-600 text-sm font-medium"
          >
            소개
          </a>
        </div>
      </div>
    </header>
  );
}
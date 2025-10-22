import React from 'react';

export default function Header({ user }: { user: { name: string; email: string } }) {
    return (
        <header className="flex items-center justify-between bg-white border-b border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    placeholder="Search for a creator"
                    className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700"
                />
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-900 font-bold">
                    {user.name[0]}
                </div>
            </div>
        </header>
    );
}
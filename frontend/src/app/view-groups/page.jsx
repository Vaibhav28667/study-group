'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ViewGroup = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');

    const fetchJoinedGroups = async () => {
        try {
            setLoading(true);
            // Get user name from localStorage
            const storedUserName = localStorage.getItem('userName') || 'You';
            setUserName(storedUserName);

            const res = await axios.get("http://localhost:5000/api/group");
            const allGroups = res.data;

            // Filter groups joined by current user
            const joined = allGroups.filter((g) => g.members.includes(storedUserName));

            setGroups(joined);
        } catch (error) {
            console.log(error);
            toast.error('Failed to load groups');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJoinedGroups();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black p-6 md:p-10">

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-12">
                <h1 className="text-5xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    👥 My Study Groups
                </h1>
                <p className="text-center text-gray-400 text-lg">
                    Groups you've joined and are actively learning in
                </p>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex items-center justify-center min-h-64">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
                        <p className="mt-4 text-gray-400">Loading your groups...</p>
                    </div>
                </div>
            ) : groups.length === 0 ? (
                <div className="max-w-7xl mx-auto">
                    <div className="text-center bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500 border-opacity-30 rounded-2xl p-12 md:p-16">
                        <p className="text-5xl mb-4">📚</p>
                        <p className="text-2xl text-gray-300 font-semibold mb-4">
                            No Groups Yet
                        </p>
                        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                            You haven't joined any study groups yet. Start exploring and join a group to begin learning with others!
                        </p>
                        <a
                            href="/browse-groups"
                            className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-8 rounded-xl hover:from-purple-500 hover:to-pink-500 hover:scale-105 transition-all duration-300"
                        >
                            🔍 Browse Groups
                        </a>
                    </div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto">
                    {/* Results count */}
                    <div className="mb-8 flex items-center justify-between">
                        <p className="text-gray-400">
                            You are a member of <span className="text-purple-400 font-bold text-lg">{groups.length}</span> group{groups.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {/* Groups Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {groups.map((g) => (
                            <div
                                key={g._id}
                                className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl overflow-hidden border border-gray-700 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-105 transition-all duration-300"
                            >
                                {/* Image Container */}
                                <div className="relative h-48 overflow-hidden bg-slate-700">
                                    <img
                                        src={g.thumbnail}
                                        alt={g.name}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>

                                    {/* Badge */}
                                    <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                        ✓ Joined
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-cyan-400 mb-3 group-hover:text-cyan-300 transition-colors">
                                        {g.name}
                                    </h2>

                                    <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-2">
                                        {g.description}
                                    </p>

                                    {/* Info Grid */}
                                    <div className="space-y-3 border-t border-gray-700 pt-5">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">📖 Category</span>
                                            <span className="text-sm text-blue-300 font-semibold">{g.category}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">👥 Members</span>
                                            <span className="text-sm text-purple-300 font-semibold">{g.members?.length || 0}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-400">⭐ Status</span>
                                            <span className="text-sm text-green-400 font-semibold">Active Member</span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button className="w-full mt-6 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold shadow-md hover:from-cyan-500 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all">
                                        📝 View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
};

export default ViewGroup;

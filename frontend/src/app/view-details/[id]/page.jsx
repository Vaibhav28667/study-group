'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const ViewDetails = ({ params }) => {
    const { id } = useParams();
    const router = useRouter();
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);
    const [isMember, setIsMember] = useState(false);

    const fetchDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`http://localhost:5000/group/getbyid/${id}`);
            if (res.status === 200) {
                setGroup(res.data);

                // Check if user is already a member
                const userToken = localStorage.getItem('userToken');
                const userId = localStorage.getItem('userId');
                if (res.data.members && res.data.members.includes(userId)) {
                    setIsMember(true);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to load group details');
            router.push('/browse-groups');
        } finally {
            setLoading(false);
        }
    };

    const joinGroup = async () => {
        try {
            setJoining(true);
            const res = await axios.put(`http://localhost:5000/group/addmember/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('userToken')}`
                }
            });

            if (res.status === 200) {
                toast.success('Successfully joined the group! 🎉');
                setIsMember(true);
                fetchDetails();
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to join group. Please try again.');
        } finally {
            setJoining(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
                    <p className="text-gray-400 text-lg">Loading group details...</p>
                </div>
            </div>
        );
    }

    if (!group) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-400 text-lg">Group not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black p-6 md:p-10">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="mb-8 flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors font-semibold"
                >
                    ← Back to Groups
                </button>

                {/* Main Card */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-purple-500 border-opacity-30">
                    {/* Image Section */}
                    <div className="relative h-80 overflow-hidden group">
                        <img
                            src={group.thumbnail || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFuLZe9UHs6cC_sIBZ8HIqkTg4ADomTdWBcQ&s'}
                            alt={group.name}
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                        {/* Member Badge */}
                        {isMember && (
                            <div className="absolute top-6 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2">
                                ✓ Member
                            </div>
                        )}
                    </div>

                    {/* Content Section */}
                    <div className="p-8 md:p-12">
                        {/* Title */}
                        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                            {group.name}
                        </h1>

                        {/* Description */}
                        <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-3xl">
                            {group.description}
                        </p>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            {/* Owner Card */}
                            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-xl p-6 border border-blue-500 border-opacity-30">
                                <p className="text-blue-300 text-sm font-semibold uppercase tracking-wide mb-2">
                                    👤 Owner
                                </p>
                                <p className="text-white text-xl font-bold">
                                    {group.owner || 'Unknown'}
                                </p>
                            </div>

                            {/* Category Card */}
                            <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-xl p-6 border border-purple-500 border-opacity-30">
                                <p className="text-purple-300 text-sm font-semibold uppercase tracking-wide mb-2">
                                    📚 Category
                                </p>
                                <p className="text-white text-xl font-bold">
                                    {group.category}
                                </p>
                            </div>

                            {/* Members Card */}
                            <div className="bg-gradient-to-br from-pink-900 to-pink-800 rounded-xl p-6 border border-pink-500 border-opacity-30">
                                <p className="text-pink-300 text-sm font-semibold uppercase tracking-wide mb-2">
                                    👥 Members
                                </p>
                                <p className="text-white text-xl font-bold">
                                    {group.members?.length || 0} Members
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-gray-700 my-8"></div>

                        {/* About Section */}
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-200 mb-4">📖 About This Group</h2>
                            <div className="bg-slate-700 rounded-xl p-6 border border-slate-600">
                                <p className="text-gray-300 text-base leading-relaxed">
                                    {group.description}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => router.back()}
                                className="flex-1 py-4 px-6 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-bold transition-all duration-300 flex items-center justify-center gap-2 border border-slate-600 hover:border-slate-500"
                            >
                                ← Go Back
                            </button>

                            {!isMember ? (
                                <button
                                    onClick={joinGroup}
                                    disabled={joining}
                                    className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {joining ? (
                                        <>
                                            <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                                            Joining...
                                        </>
                                    ) : (
                                        <>
                                            🚀 Join Group
                                        </>
                                    )}
                                </button>
                            ) : (
                                <div className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold shadow-lg flex items-center justify-center gap-2 text-center">
                                    ✓ You're a Member
                                </div>
                            )}
                        </div>

                        {/* Info Text */}
                        {!isMember && (
                            <p className="text-center text-gray-400 text-sm mt-6">
                                Join this group to start collaborating with other learners and access all group resources.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;

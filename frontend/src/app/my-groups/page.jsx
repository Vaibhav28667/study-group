'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const MyGroups = () => {
    const [ownedGroups, setOwnedGroups] = useState([]);
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('owned');
    const router = useRouter();

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const token = localStorage.getItem('userToken');

                if (!token) {
                    console.log('No token found');
                    router.push('/login');
                    setLoading(false);
                    return;
                }

                // Fetch owned groups
                const ownedRes = await axios.get('http://localhost:5000/group/getownedgroups', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                // Fetch joined groups
                const joinedRes = await axios.get('http://localhost:5000/group/getjoinedgroups', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setOwnedGroups(ownedRes.data);
                setJoinedGroups(joinedRes.data);
            } catch (error) {
                console.log('Error fetching groups:', error);
                toast.error('Failed to load groups');
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, [router]);

    const GroupCard = ({ group, type }) => (
        <div className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl overflow-hidden border border-gray-700 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-slate-700 flex-shrink-0">
                <img
                    src={group.thumbnail}
                    alt={group.name}
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>

                {/* Badge */}
                <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-xs font-bold text-white shadow-lg ${type === 'owned'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600'
                        : 'bg-gradient-to-r from-cyan-600 to-blue-600'
                    }`}>
                    {type === 'owned' ? '👑 Owned' : '✓ Joined'}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-cyan-400 mb-3 group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {group.name}
                </h2>

                <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3 flex-grow">
                    {group.description}
                </p>

                {/* Info Grid */}
                <div className="space-y-3 border-t border-gray-700 pt-5 mb-5">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">👤 Owner</span>
                        <span className="text-sm text-cyan-300 font-semibold truncate">{group.owner}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">📚 Category</span>
                        <span className="text-sm text-blue-300 font-semibold">{group.category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">👥 Members</span>
                        <span className="text-sm text-purple-300 font-semibold">{group.membersArray?.length || 0}</span>
                    </div>
                </div>

                {/* Button */}
                <Link
                    href={'/view-details/' + group._id}
                    className="w-full block py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold shadow-md hover:from-cyan-500 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all text-center mt-auto"
                >
                    View Details →
                </Link>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-14 w-14 border-4 border-purple-500 border-t-pink-500 mb-6"></div>
                    <p className="text-xl text-gray-300 font-semibold">Loading your groups...</p>
                    <p className="text-gray-500 text-sm mt-2">This may take a moment</p>
                </div>
            </div>
        );
    }

    const totalGroups = ownedGroups.length + joinedGroups.length;

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black p-6 md:p-10">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-12">
                <div className="text-center mb-8">
                    <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 drop-shadow-lg">
                        👥 My Groups
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Manage your owned and joined study groups
                    </p>
                </div>

                {/* Stats */}
                {totalGroups > 0 && (
                    <div className="flex justify-center gap-8 mb-8">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-purple-400">{ownedGroups.length}</div>
                            <p className="text-gray-400 text-sm mt-2">Owned Groups</p>
                        </div>
                        <div className="w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-50"></div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-cyan-400">{joinedGroups.length}</div>
                            <p className="text-gray-400 text-sm mt-2">Joined Groups</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Tab Navigation */}
            <div className="max-w-7xl mx-auto mb-12 flex gap-4 justify-center flex-wrap">
                <button
                    onClick={() => setActiveTab('owned')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'owned'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105'
                        : 'bg-slate-800 text-gray-300 border border-purple-500 border-opacity-30 hover:border-purple-400 hover:bg-slate-700'
                        }`}
                >
                    👑 Owned Groups <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">{ownedGroups.length}</span>
                </button>
                <button
                    onClick={() => setActiveTab('joined')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'joined'
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/50 scale-105'
                        : 'bg-slate-800 text-gray-300 border border-cyan-500 border-opacity-30 hover:border-cyan-400 hover:bg-slate-700'
                        }`}
                >
                    ✓ Joined Groups <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-sm">{joinedGroups.length}</span>
                </button>
            </div>

            {/* Owned Groups Tab */}
            {activeTab === 'owned' && (
                <div>
                    {ownedGroups.length === 0 ? (
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500 border-opacity-30 rounded-2xl p-12 md:p-16">
                                <p className="text-5xl mb-4">📭</p>
                                <p className="text-2xl text-gray-300 mb-4 font-semibold">No Owned Groups Yet</p>
                                <p className="text-gray-400 mb-8 text-lg">Create your first study group and become a community leader!</p>
                                <Link
                                    href="/add-detail"
                                    className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:from-purple-500 hover:to-pink-500 hover:shadow-purple-500/50 shadow-lg transition-all hover:scale-105"
                                >
                                    🚀 Create Your First Group
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {ownedGroups.map((g) => (
                                <GroupCard key={g._id} group={g} type="owned" />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Joined Groups Tab */}
            {activeTab === 'joined' && (
                <div>
                    {joinedGroups.length === 0 ? (
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500 border-opacity-30 rounded-2xl p-12 md:p-16">
                                <p className="text-5xl mb-4">🔍</p>
                                <p className="text-2xl text-gray-300 mb-4 font-semibold">No Joined Groups Yet</p>
                                <p className="text-gray-400 mb-8 text-lg">Start your learning journey by joining a study group!</p>
                                <Link
                                    href="/browse-groups"
                                    className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg hover:from-cyan-500 hover:to-blue-500 hover:shadow-cyan-500/50 shadow-lg transition-all hover:scale-105"
                                >
                                    🎯 Browse Available Groups
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {joinedGroups.map((g) => (
                                <GroupCard key={g._id} group={g} type="joined" />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyGroups;
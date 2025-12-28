'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const MyGroups = () => {
    const [ownedGroups, setOwnedGroups] = useState([]);
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('owned');

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const token = localStorage.getItem('userToken');
                // const userId = localStorage.getItem('userId');

                // if (!token || !userId) {
                //     console.log('No token or userId found');
                //     setLoading(false);
                //     return;
                // }

                // Fetch all groups and filter
                const res = await axios.get('http://localhost:5000/group/getall', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const allGroups = res.data;

                // Separate owned and joined groups
                const owned = allGroups.filter(g => g.owner === userId || g.ownerId === userId);
                const joined = allGroups.filter(g =>
                    g.membersArray?.includes(+userId) &&
                    g.owner !== userId &&
                    g.ownerId !== userId
                );

                setOwnedGroups(owned);
                setJoinedGroups(joined);
            } catch (error) {
                console.log('Error fetching groups:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    const GroupCard = ({ group }) => (
        <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-purple-500 border-opacity-30 hover:border-purple-400 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300">
            <img
                src={group.thumbnail}
                alt={group.name}
                className="w-full h-48 object-cover opacity-90 hover:opacity-100 transition"
            />

            <div className="p-6">
                <h2 className="text-2xl font-bold text-purple-300 mb-2">{group.name}</h2>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">{group.description}</p>

                <div className="mt-6 space-y-2 text-sm border-t border-purple-500 border-opacity-20 pt-4">
                    <p>
                        <span className="font-semibold text-blue-400">Owner:</span> <span className="text-gray-300">{group.owner}</span>
                    </p>
                    <p>
                        <span className="font-semibold text-pink-400">Category:</span> <span className="text-gray-300">{group.category}</span>
                    </p>
                    <p>
                        <span className="font-semibold text-green-400">Members:</span> <span className="text-gray-300">{group.membersArray?.length || 0}</span>
                    </p>
                </div>

                <Link href={'/view-details/' + group._id} className="mt-6 block w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-md hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:shadow-purple-500/50 transition text-center">
                    View Details
                </Link>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6 flex items-center justify-center">
                <p className="text-xl text-purple-300">Loading groups...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
            <h1 className="text-5xl md:text-7xl font-extrabold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-12 drop-shadow-lg">
                My Groups
            </h1>

            {/* Tab Navigation */}
            <div className="max-w-7xl mx-auto mb-8 flex gap-4 justify-center">
                <button
                    onClick={() => setActiveTab('owned')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'owned'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                            : 'bg-slate-800 text-gray-300 border border-purple-500 border-opacity-30 hover:border-purple-400'
                        }`}
                >
                    Owned Groups ({ownedGroups.length})
                </button>
                <button
                    onClick={() => setActiveTab('joined')}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'joined'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                            : 'bg-slate-800 text-gray-300 border border-purple-500 border-opacity-30 hover:border-purple-400'
                        }`}
                >
                    Joined Groups ({joinedGroups.length})
                </button>
            </div>

            {/* Owned Groups Tab */}
            {activeTab === 'owned' && (
                <div>
                    {ownedGroups.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-lg mb-4">You haven't created any groups yet</p>
                            <Link href="/add-detail" className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition">
                                Create a Group
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {ownedGroups.map((g) => (
                                <GroupCard key={g._id} group={g} />
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Joined Groups Tab */}
            {activeTab === 'joined' && (
                <div>
                    {joinedGroups.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-400 text-lg mb-4">You haven't joined any groups yet</p>
                            <Link href="/browse-groups" className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:from-purple-500 hover:to-pink-500 transition">
                                Browse Groups
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                            {joinedGroups.map((g) => (
                                <GroupCard key={g._id} group={g} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyGroups;
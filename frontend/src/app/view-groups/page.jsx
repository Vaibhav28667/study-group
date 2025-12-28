'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewGroup = () => {
    const [groups, setGroups] = useState([]);

    const fetchJoinedGroups = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/group");
            const allGroups = res.data;

            // Filter groups joined by Vaibhav
            const joined = allGroups.filter((g) => g.members.includes("Vaibhav"));

            setGroups(joined);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchJoinedGroups();
    }, []);

    return (
        <div className="min-h-screen  from-blue-100 via-purple-100 to-pink-100 p-8">

            <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10">
                Joined Groups
            </h1>

            {groups.length === 0 ? (
                <p className="text-center text-gray-700 text-xl">You have not joined any groups yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {groups.map((g) => (
                        <div
                            key={g._id}
                            className="bg-white rounded-2xl shadow-xl border border-purple-200 p-5 hover:scale-105 transition"
                        >
                            <img
                                src={g.thumbnail}
                                className="w-full h-48 object-cover rounded-lg"
                            />

                            <h2 className="text-2xl font-bold text-purple-700 mt-3">
                                {g.name}
                            </h2>

                            <p className="text-gray-600">{g.description}</p>

                            <p className="text-sm mt-2"><strong>Category:</strong> {g.category}</p>
                            <p className="text-sm"><strong>Members:</strong> {g.members.length}</p>
                        </div>
                    ))}

                </div>
            )}

        </div>
    );
};

export default ViewGroup;

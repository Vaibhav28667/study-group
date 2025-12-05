'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const BrowseGroups = () => {
  const [groups, setGroups] = useState([]);

  const getGroups = async () => {
    try {
      const res = await axios.get('http://localhost:5000/group/getall');
      setGroups(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className="min-h-screen  from-purple-100 via-pink-100 to-blue-100 p-6 bg-neutral-900">

      <h1 className="text-8xl underline font-extrabold text-center text-purple-700 mb-10 drop-shadow-lg">
        All Study Groups
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {groups.map((g) => (
          <div
            key={g._id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-200 hover:scale-[1.03] hover:bg-blue-400 transition-transform duration-300"
          >
            <img
              src={g.thumbnail}
              alt={g.name}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              <h2 className="text-2xl font-bold text-purple-700">{g.name}</h2>

              <p className="text-gray-700 mt-2">{g.description}</p>

              <div className="mt-4 space-y-1 text-sm">
                <p>
                  <span className="font-semibold text-blue-700">Owner:</span> {g.owner}
                </p>
                <p>
                  <span className="font-semibold text-pink-700">Category:</span> {g.category}
                </p>
                <p>
                  <span className="font-semibold text-green-700">Members:</span> {g.members?.length || 0}
                </p>
              </div>

              <Link href={'/view-details/'+g._id} className="mt-4 w-full py-2 rounded-xl from-purple-500 to-pink-500 text-rose-900 font-semibold shadow-md hover:opacity-90 transition">
                View Details
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseGroups;

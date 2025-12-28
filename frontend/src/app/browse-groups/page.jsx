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
      console.log(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">

      <h1 className="text-5xl md:text-7xl font-extrabold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-12 drop-shadow-lg">
        All Study Groups
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {groups.map((g) => (
          <div
            key={g._id}
            className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-purple-500 border-opacity-30 hover:border-purple-400 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300"
          >
            <img
              src={g.thumbnail}
              alt={g.name}
              className="w-full h-48 object-cover opacity-90 hover:opacity-100 transition"
            />

            <div className="p-6">
              <h2 className="text-2xl font-bold text-purple-300 mb-2">{g.name}</h2>

              <p className="text-gray-300 text-sm leading-relaxed mb-4">{g.description}</p>

              <div className="mt-6 space-y-2 text-sm border-t border-purple-500 border-opacity-20 pt-4">
                <p>
                  <span className="font-semibold text-blue-400">Owner:</span> <span className="text-gray-300">{g.owner}</span>
                </p>
                <p>
                  <span className="font-semibold text-pink-400">Category:</span> <span className="text-gray-300">{g.category}</span>
                </p>
                <p>
                  <span className="font-semibold text-green-400">Members:</span> <span className="text-gray-300">{g.members?.length || 0}</span>
                </p>
              </div>

              <Link href={'/view-details/' + g._id} className="mt-6 block w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-md hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:shadow-purple-500/50 transition text-center">
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

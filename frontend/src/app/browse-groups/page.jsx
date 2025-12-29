'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';

const BrowseGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');

  const getGroups = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/group/getall');
      setGroups(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error('Failed to load groups');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  // Get unique categories
  const categories = ['All', ...new Set(groups.map(g => g.category))];

  // Filter groups based on search and category
  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || group.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort groups
  const sortedGroups = [...filteredGroups].sort((a, b) => {
    if (sortBy === 'members') {
      return (b.members?.length || 0) - (a.members?.length || 0);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black p-6 md:p-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            🔍 Discover Study Groups
          </h1>
          <p className="text-center text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Join thousands of passionate learners and find the perfect study group for your academic journey.
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto mb-12">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search groups by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 bg-slate-800 border border-purple-500 border-opacity-30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all shadow-lg pl-14"
            />
            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl">🔍</span>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-8">
          {/* Category Filter */}
          <div className="w-full md:flex-1">
            <p className="text-sm font-semibold text-gray-300 mb-3">📚 Filter by Category</p>
            <div className="flex flex-wrap gap-3">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-2 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50 scale-105'
                    : 'bg-slate-800 text-gray-300 border border-purple-500 border-opacity-30 hover:border-purple-500 hover:bg-slate-700'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="w-full md:w-auto">
            <p className="text-sm font-semibold text-gray-300 mb-3">⭐ Sort by</p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-5 py-2 bg-slate-800 border border-purple-500 border-opacity-30 rounded-lg text-gray-300 focus:outline-none focus:border-purple-500 hover:border-purple-500 transition-all cursor-pointer w-full md:w-auto"
            >
              <option value="latest">Latest</option>
              <option value="members">Most Members</option>
            </select>
          </div>
        </div>

        {/* Results info */}
        <div className="text-sm text-gray-400 mb-6">
          Found <span className="text-purple-400 font-semibold">{sortedGroups.length}</span> group{sortedGroups.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
      </div>

      {/* Groups Grid */}
      {loading ? (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-14 w-14 border-4 border-purple-500 border-t-pink-500 mb-4"></div>
            <p className="text-gray-400 text-lg font-medium">Loading amazing study groups...</p>
          </div>
        </div>
      ) : sortedGroups.length === 0 ? (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center bg-gradient-to-br from-slate-800 to-slate-900 border border-purple-500 border-opacity-30 rounded-2xl p-12 max-w-md">
            <p className="text-5xl mb-4">😕</p>
            <p className="text-2xl text-gray-300 mb-3 font-semibold">No groups found</p>
            <p className="text-gray-400 mb-6">Try adjusting your search or filters to find more groups</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all"
            >
              Clear Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {sortedGroups.map((g) => (
            <div
              key={g._id}
              className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-xl overflow-hidden border border-gray-700 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-slate-700 flex-shrink-0">
                <img
                  src={g.thumbnail}
                  alt={g.name}
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                  {g.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold text-cyan-400 mb-3 group-hover:text-cyan-300 transition-colors line-clamp-2">
                  {g.name}
                </h2>

                <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-2 flex-grow">
                  {g.description}
                </p>

                {/* Info Grid */}
                <div className="space-y-3 border-t border-gray-700 pt-5 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">👤 Owner</span>
                    <span className="text-sm text-cyan-300 font-semibold truncate">{g.owner}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">👥 Members</span>
                    <span className="text-sm text-purple-300 font-semibold">{g.members?.length || 0}</span>
                  </div>
                </div>

                {/* Button */}
                <Link
                  href={'/view-details/' + g._id}
                  className="w-full block py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold shadow-md hover:from-cyan-500 hover:to-blue-500 hover:shadow-lg hover:shadow-cyan-500/50 transition-all text-center mt-auto"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results Count Footer */}
      {!loading && sortedGroups.length > 0 && (
        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 bg-opacity-20 border border-purple-500 border-opacity-40 rounded-full px-6 py-3">
            <p className="text-gray-300">
              Showing <span className="font-bold text-purple-400">{sortedGroups.length}</span> of{' '}
              <span className="font-bold text-cyan-400">{groups.length}</span> groups
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseGroups;

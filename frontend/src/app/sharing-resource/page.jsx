'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SharingResource = () => {
    const [joinedGroups, setJoinedGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groupMembers, setGroupMembers] = useState([]);
    const [sharedResources, setSharedResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [membersLoading, setMembersLoading] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('resources');
    const [previewImage, setPreviewImage] = useState(null);
    const [showImagePreview, setShowImagePreview] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        file: null,
        fileType: 'document' // document, image, link
    });

    useEffect(() => {
        const fetchJoinedGroups = async () => {
            try {
                const token = localStorage.getItem('userToken');

                if (!token) {
                    console.log('No token found');
                    router.push('/login');
                    setLoading(false);
                    return;
                }

                const res = await axios.get('http://localhost:5000/group/getjoinedgroups', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setJoinedGroups(res.data);
                if (res.data.length > 0) {
                    setSelectedGroup(res.data[0]._id);
                    await fetchGroupMembers(res.data[0]._id);
                    await fetchSharedResources(res.data[0]._id);
                }
            } catch (error) {
                console.log('Error fetching groups:', error);
                toast.error('Failed to load groups');
            } finally {
                setLoading(false);
            }
        };

        fetchJoinedGroups();
    }, [router]);

    const fetchGroupMembers = async (groupId) => {
        setMembersLoading(true);
        try {
            const res = await axios.get(`http://localhost:5000/group/getbyid/${groupId}`);
            if (res.data && res.data.membersArray) {
                const memberDetails = await Promise.all(
                    res.data.membersArray.map(async (memberId) => {
                        try {
                            const userRes = await axios.get(`http://localhost:5000/user/getbyid/${memberId}`);
                            return userRes.data;
                        } catch (error) {
                            return { _id: memberId, name: 'Unknown User', email: 'N/A', city: 'N/A' };
                        }
                    })
                );
                setGroupMembers(memberDetails);
            }
        } catch (error) {
            console.log('Error fetching group members:', error);
            toast.error('Failed to load group members');
        } finally {
            setMembersLoading(false);
        }
    };

    const fetchSharedResources = async (groupId) => {
        try {
            // Mock data - replace with actual API call when backend is ready
            const storedResources = localStorage.getItem(`group_resources_${groupId}`);
            if (storedResources) {
                setSharedResources(JSON.parse(storedResources));
            } else {
                setSharedResources([]);
            }
        } catch (error) {
            console.log('Error fetching resources:', error);
        }
    };

    const handleGroupChange = (groupId) => {
        setSelectedGroup(groupId);
        setActiveTab('resources');
        fetchGroupMembers(groupId);
        fetchSharedResources(groupId);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                file: file
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUploadResource = async (e) => {
        e.preventDefault();

        if (!formData.title.trim()) {
            toast.error('Please enter a title');
            return;
        }

        if (formData.fileType !== 'link' && !formData.file) {
            toast.error('Please select a file');
            return;
        }

        if (formData.fileType === 'link' && !formData.description.trim()) {
            toast.error('Please enter a link URL');
            return;
        }

        setUploadLoading(true);

        try {
            const token = localStorage.getItem('userToken');
            const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

            let fileData = null;
            if (formData.fileType === 'image' && formData.file) {
                // Convert image to base64
                const reader = new FileReader();
                fileData = await new Promise((resolve) => {
                    reader.onload = (e) => {
                        resolve(e.target.result);
                    };
                    reader.readAsDataURL(formData.file);
                });
            }

            const resource = {
                id: Date.now(),
                title: formData.title,
                description: formData.description,
                fileType: formData.fileType,
                uploadedBy: currentUser.name || 'Anonymous',
                uploadedAt: new Date().toLocaleDateString(),
                fileUrl: formData.fileType === 'link' ? formData.description : null,
                fileName: formData.file?.name || null,
                fileSize: formData.file?.size || null,
                imageData: fileData // base64 image data
            };

            // Save to localStorage (for demo purposes)
            const storedResources = JSON.parse(localStorage.getItem(`group_resources_${selectedGroup}`) || '[]');
            storedResources.push(resource);
            localStorage.setItem(`group_resources_${selectedGroup}`, JSON.stringify(storedResources));

            setSharedResources(storedResources);
            setFormData({
                title: '',
                description: '',
                file: null,
                fileType: 'document'
            });
            setShowUploadModal(false);
            toast.success('Resource shared successfully!');
        } catch (error) {
            console.log('Error uploading resource:', error);
            toast.error('Failed to share resource');
        } finally {
            setUploadLoading(false);
        }
    };

    const deleteResource = (resourceId) => {
        const updatedResources = sharedResources.filter(r => r.id !== resourceId);
        localStorage.setItem(`group_resources_${selectedGroup}`, JSON.stringify(updatedResources));
        setSharedResources(updatedResources);
        toast.success('Resource deleted');
    };

    const handleViewImage = (resource) => {
        setPreviewImage(resource);
        setShowImagePreview(true);
    };

    const handleDownloadImage = (resource) => {
        if (!resource.imageData) {
            toast.error('Image data not available');
            return;
        }

        const link = document.createElement('a');
        link.href = resource.imageData;
        link.download = resource.fileName || `image_${resource.id}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Image downloaded!');
    };

    const MemberCard = ({ member }) => (
        <div className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg overflow-hidden border border-gray-700 hover:border-pink-500 hover:shadow-2xl hover:shadow-pink-500/30 hover:scale-105 transition-all duration-300 p-6">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-pink-400 mb-1 group-hover:text-pink-300 transition">{member.name}</h3>
                    <p className="text-sm text-gray-400 break-all">{member.email}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">
                        {member.name?.charAt(0).toUpperCase()}
                    </span>
                </div>
            </div>

            <div className="border-t border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">📍 Location</span>
                    <span className="text-gray-300 font-semibold">{member.city || 'N/A'}</span>
                </div>
            </div>
        </div>
    );

    const ResourceCard = ({ resource }) => (
        <div className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg overflow-hidden border border-gray-700 hover:border-cyan-500 hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300 p-6 flex flex-col h-full">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="text-3xl flex-shrink-0 mt-1">
                        {resource.fileType === 'image' && '🖼️'}
                        {resource.fileType === 'document' && '📄'}
                        {resource.fileType === 'link' && '🔗'}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold text-cyan-400 group-hover:text-cyan-300 transition line-clamp-2">{resource.title}</h3>
                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{resource.description}</p>
                    </div>
                </div>
                <button
                    onClick={() => deleteResource(resource.id)}
                    className="text-red-400 hover:text-red-300 text-xl flex-shrink-0 ml-2 hover:scale-125 transition"
                    title="Delete resource"
                >
                    ✕
                </button>
            </div>

            <div className="border-t border-gray-700 pt-4 mt-4 space-y-2 text-xs text-gray-400 flex-grow">
                <div className="flex justify-between">
                    <span className="text-gray-400">👤 By</span>
                    <span className="text-gray-300 font-semibold">{resource.uploadedBy}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-400">📅 Date</span>
                    <span className="text-gray-300 font-semibold">{resource.uploadedAt}</span>
                </div>
                {resource.fileName && (
                    <div className="flex justify-between">
                        <span className="text-gray-400">📦 File</span>
                        <span className="text-gray-300 font-semibold truncate">{(resource.fileSize / 1024).toFixed(2)} KB</span>
                    </div>
                )}
            </div>

            {resource.fileType === 'image' && resource.imageData && (
                <div className="mt-4 flex gap-2">
                    <button
                        onClick={() => handleViewImage(resource)}
                        className="flex-1 py-2 px-3 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition flex items-center justify-center gap-1"
                        title="View image"
                    >
                        👁️ View
                    </button>
                    <button
                        onClick={() => handleDownloadImage(resource)}
                        className="flex-1 py-2 px-3 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-500 transition flex items-center justify-center gap-1"
                        title="Download image"
                    >
                        ⬇️ Download
                    </button>
                </div>
            )}

            {resource.fileUrl && (
                <a
                    href={resource.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 w-full inline-block py-2 px-3 rounded-lg bg-cyan-600 text-white text-sm font-semibold text-center hover:bg-cyan-500 transition"
                >
                    Open Link →
                </a>
            )}
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-14 w-14 border-4 border-cyan-500 border-t-purple-500 mb-6"></div>
                    <p className="text-xl text-gray-300 font-semibold">Loading your groups...</p>
                </div>
            </div>
        );
    }

    if (joinedGroups.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black p-6 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-5xl mb-4">🔍</p>
                    <p className="text-2xl text-gray-300 mb-2 font-semibold">No Joined Groups</p>
                    <p className="text-gray-400 mb-8">Join a group to share resources with your study community</p>
                    <Link href="/browse-groups" className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg hover:from-cyan-500 hover:to-blue-500 hover:shadow-cyan-500/50 shadow-lg transition-all hover:scale-105">
                        🎯 Browse Groups
                    </Link>
                </div>
            </div>
        );
    }

    const currentGroup = joinedGroups.find(g => g._id === selectedGroup);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black p-6 md:p-10">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-10">
                <h1 className="text-5xl md:text-7xl font-extrabold text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 drop-shadow-lg">
                    📚 Resource Hub
                </h1>
                <p className="text-center text-gray-400 text-lg">Share and discover learning materials with your study group</p>
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Group Selector */}
                <div className="mb-10 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-6 border border-gray-700">
                    <label className="block text-cyan-300 font-semibold mb-4 text-lg">👥 Select a Group:</label>
                    <select
                        value={selectedGroup}
                        onChange={(e) => handleGroupChange(e.target.value)}
                        className="w-full md:w-96 px-4 py-3 rounded-xl bg-slate-700 text-white border border-cyan-500 border-opacity-30 focus:border-cyan-400 focus:outline-none transition font-semibold"
                    >
                        {joinedGroups.map((group) => (
                            <option key={group._id} value={group._id}>
                                {group.name} • {group.membersArray?.length || 0} members
                            </option>
                        ))}
                    </select>
                </div>

                {/* Group Info Card */}
                {currentGroup && (
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 mb-10 hover:border-cyan-500 hover:shadow-cyan-500/20 transition-all">
                        <div className="flex flex-col md:flex-row gap-6 p-8">
                            <img
                                src={currentGroup.thumbnail}
                                alt={currentGroup.name}
                                className="w-full md:w-40 h-40 object-cover rounded-xl shadow-lg"
                            />
                            <div className="flex-1">
                                <h2 className="text-4xl font-bold text-cyan-400 mb-3">{currentGroup.name}</h2>
                                <p className="text-gray-300 mb-6 text-lg leading-relaxed">{currentGroup.description}</p>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-slate-700 rounded-lg p-3 text-center">
                                        <div className="text-2xl font-bold text-cyan-400">{currentGroup.membersArray?.length || 0}</div>
                                        <div className="text-sm text-gray-400">Members</div>
                                    </div>
                                    <div className="bg-slate-700 rounded-lg p-3 text-center">
                                        <div className="text-2xl font-bold text-purple-400">{sharedResources.length}</div>
                                        <div className="text-sm text-gray-400">Resources</div>
                                    </div>
                                    <div className="bg-slate-700 rounded-lg p-3 text-center">
                                        <div className="text-lg font-bold text-pink-400">{currentGroup.category}</div>
                                        <div className="text-sm text-gray-400">Category</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab Navigation */}
                <div className="mb-8 flex gap-4 flex-wrap border-b border-gray-700 pb-4">
                    <button
                        onClick={() => setActiveTab('resources')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'resources'
                            ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/50'
                            : 'bg-slate-800 text-gray-300 border border-cyan-500 border-opacity-30 hover:border-cyan-400'
                            }`}
                    >
                        📚 Shared Resources
                    </button>
                    <button
                        onClick={() => setActiveTab('members')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeTab === 'members'
                            ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-pink-500/50'
                            : 'bg-slate-800 text-gray-300 border border-pink-500 border-opacity-30 hover:border-pink-400'
                            }`}
                    >
                        👥 Group Members
                    </button>
                </div>

                {/* Shared Resources Tab */}
                {activeTab === 'resources' && (
                    <div>
                        {/* Share Resource Button */}
                        <div className="mb-8">
                            <button
                                onClick={() => setShowUploadModal(true)}
                                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold text-lg hover:from-cyan-500 hover:to-blue-500 hover:shadow-cyan-500/50 shadow-lg transition-all hover:scale-105 flex items-center gap-2"
                            >
                                📤 Share Resource
                            </button>
                        </div>

                        {/* Shared Resources Section */}
                        {sharedResources.length === 0 ? (
                            <div className="text-center py-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-gray-700">
                                <p className="text-5xl mb-4">📭</p>
                                <p className="text-2xl text-gray-300 mb-2 font-semibold">No Resources Yet</p>
                                <p className="text-gray-400 mb-8">Be the first to share a resource with your group!</p>
                                <button
                                    onClick={() => setShowUploadModal(true)}
                                    className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold hover:from-cyan-500 hover:to-blue-500 transition"
                                >
                                    Share Your First Resource
                                </button>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-6 text-gray-400">
                                    📊 Showing <span className="text-cyan-400 font-bold">{sharedResources.length}</span> resources
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {sharedResources.map((resource) => (
                                        <ResourceCard key={resource.id} resource={resource} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Group Members Tab */}
                {activeTab === 'members' && (
                    <div>
                        {membersLoading ? (
                            <div className="text-center py-16">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-purple-500 mb-4"></div>
                                <p className="text-gray-300 text-lg font-semibold">Loading members...</p>
                            </div>
                        ) : groupMembers.length === 0 ? (
                            <div className="text-center py-16 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-gray-700">
                                <p className="text-5xl mb-4">😕</p>
                                <p className="text-2xl text-gray-300 font-semibold">No Members Found</p>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-6 text-gray-400">
                                    👥 Total <span className="text-pink-400 font-bold">{groupMembers.length}</span> members
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {groupMembers.map((member) => (
                                        <MemberCard key={member._id} member={member} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 border border-gray-700 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-cyan-400">📤 Share Resource</h2>
                            <button
                                onClick={() => setShowUploadModal(false)}
                                className="text-gray-400 hover:text-white text-2xl transition"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleUploadResource} className="space-y-5">
                            {/* Title */}
                            <div>
                                <label className="block text-cyan-300 font-semibold mb-2">Title *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white border border-cyan-500 border-opacity-30 focus:border-cyan-400 focus:outline-none transition"
                                    placeholder="e.g., Chapter 5 Summary"
                                />
                            </div>

                            {/* Resource Type */}
                            <div>
                                <label className="block text-cyan-300 font-semibold mb-2">Resource Type *</label>
                                <select
                                    name="fileType"
                                    value={formData.fileType}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white border border-cyan-500 border-opacity-30 focus:border-cyan-400 focus:outline-none transition"
                                >
                                    <option value="document">📄 Document (PDF, DOC, etc.)</option>
                                    <option value="image">🖼️ Image</option>
                                    <option value="link">🔗 Link/URL</option>
                                </select>
                            </div>

                            {/* File Upload or Link Input */}
                            {formData.fileType === 'link' ? (
                                <div>
                                    <label className="block text-cyan-300 font-semibold mb-2">URL *</label>
                                    <input
                                        type="url"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white border border-cyan-500 border-opacity-30 focus:border-cyan-400 focus:outline-none transition"
                                        placeholder="https://example.com"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-cyan-300 font-semibold mb-2">Upload File *</label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept={formData.fileType === 'image' ? 'image/*' : '*'}
                                        className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white border border-cyan-500 border-opacity-30 focus:border-cyan-400 focus:outline-none transition file:text-cyan-400 file:bg-slate-600 file:rounded file:border-0 file:px-2 file:py-1 file:cursor-pointer"
                                    />
                                    {formData.file && (
                                        <p className="text-sm text-cyan-400 mt-3 flex items-center gap-2">✓ Selected: {formData.file.name}</p>
                                    )}
                                </div>
                            )}

                            {/* Description */}
                            <div>
                                <label className="block text-cyan-300 font-semibold mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.fileType === 'link' ? '' : formData.description}
                                    onChange={handleInputChange}
                                    disabled={formData.fileType === 'link'}
                                    className="w-full px-4 py-3 rounded-lg bg-slate-700 text-white border border-cyan-500 border-opacity-30 focus:border-cyan-400 focus:outline-none transition resize-none disabled:opacity-50"
                                    rows="3"
                                    placeholder="Add a description (optional)"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowUploadModal(false)}
                                    className="flex-1 px-4 py-3 rounded-lg bg-slate-700 text-white font-semibold hover:bg-slate-600 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploadLoading}
                                    className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold hover:from-cyan-500 hover:to-blue-500 transition disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {uploadLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Sharing...
                                        </>
                                    ) : (
                                        '📤 Share'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Image Preview Modal */}
            {showImagePreview && previewImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-slate-900 rounded-2xl shadow-2xl max-w-3xl w-full border border-gray-700">
                        <div className="flex justify-between items-center p-6 border-b border-gray-700">
                            <h2 className="text-2xl font-bold text-cyan-400">🖼️ {previewImage.title}</h2>
                            <button
                                onClick={() => {
                                    setShowImagePreview(false);
                                    setPreviewImage(null);
                                }}
                                className="text-gray-400 hover:text-white text-2xl transition"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="mb-6 max-h-[60vh] overflow-auto flex items-center justify-center bg-slate-800 rounded-lg">
                                <img
                                    src={previewImage.imageData}
                                    alt={previewImage.title}
                                    className="max-w-full max-h-[60vh] rounded-lg"
                                />
                            </div>

                            {previewImage.description && (
                                <div className="mb-4">
                                    <p className="text-gray-300 text-sm"><span className="text-cyan-400 font-semibold">Description:</span> {previewImage.description}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-400">
                                <div>
                                    <p><span className="text-gray-300 font-semibold">Uploaded By:</span></p>
                                    <p className="text-gray-300 ml-4">{previewImage.uploadedBy}</p>
                                </div>
                                <div>
                                    <p><span className="text-gray-300 font-semibold">Date:</span></p>
                                    <p className="text-gray-300 ml-4">{previewImage.uploadedAt}</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleDownloadImage(previewImage)}
                                    className="flex-1 py-3 px-4 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-500 transition flex items-center justify-center gap-2"
                                >
                                    ⬇️ Download Image
                                </button>
                                <button
                                    onClick={() => {
                                        setShowImagePreview(false);
                                        setPreviewImage(null);
                                    }}
                                    className="flex-1 py-3 px-4 rounded-lg bg-slate-700 text-white font-semibold hover:bg-slate-600 transition"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SharingResource;
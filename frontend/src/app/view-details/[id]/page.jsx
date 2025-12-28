'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Router, useRouter } from 'next/navigation';

const ViewDetails = ({ params }) => {
    const { id } = useParams();
    const router = useRouter();
    const [group, setGroup] = useState({
        name: '',
        description: '',
        members: '',
        owner: '',
        category: '',
        thumbnail: ''
    })

    const fetchDetails = async (values) => {
        console.log(values);
        const res = await axios.get(`http://localhost:5000/group/getbyid/${id}`)
        if (res.status === 200) {
            toast.success('Data Updated Successfully');
            console.log(res.data);
            setGroup(res.data);


        } else {
            router.push('/browse-groups');
            toast.error('error in data');
        }
    }

    const joinGroup = async () => {
        const res = await axios.put(`http://localhost:5000/group/addmember/${id}`, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            }
        })

        if (res.status === 200) {
            toast.success('Data Updated Successfully');
        } else {
            toast.err('some error occured');
        }
    }


    useEffect(() => {
        fetchDetails();
    }, []);

    if (!group) return <h1 className="text-center mt-10">Loading...</h1>;

    return (
        <div className="min-h-screen from-pink-100 via-purple-100 to-blue-100 p-10">

            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-8 border border-purple-300">

                <img
                    src={group.thumbnail ? group.thumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFuLZe9UHs6cC_sIBZ8HIqkTg4ADomTdWBcQ&s'}
                    alt={group.name}
                    className="w-full h-64 object-cover rounded-2xl shadow-md"
                />

                <h1 className="text-4xl font-extrabold text-purple-700 mt-6">
                    {group.name}
                </h1>

                <p className="text-gray-700 text-lg mt-4 leading-relaxed">
                    {group.description}
                </p>

                <div className="mt-6 text-lg space-y-2">
                    <p><span className="font-semibold text-blue-700">Owner:</span> {group.owner}</p>
                    <p><span className="font-semibold text-pink-700">Category:</span> {group.category}</p>
                    <p><span className="font-semibold text-green-700">Members:</span> {group.members?.length}</p>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                        onClick={() => window.history.back()}
                        className="py-2 rounded-xl from-purple-500 to-blue-500 text-black font-semibold shadow hover:opacity-90 transition"
                    >
                        Go Back
                    </button>

                    <button onClick={joinGroup} className="py-2 rounded-x from-green-500 to-teal-500 text-black font-semibold shadow hover:opacity-90 transition">
                        Join Group
                    </button>
                </div>

            </div>

        </div>
    );
};

export default ViewDetails;

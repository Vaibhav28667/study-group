'use client';
import { useParams } from 'next/navigation';
import React from 'react'

const ViewDetails = () => {

    const { id } = useParams();

    
    return (
        <div>ViewDetails</div>
    )
}

export default ViewDetails;
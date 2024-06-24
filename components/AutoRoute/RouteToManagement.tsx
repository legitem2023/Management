'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
const RouteToManagement = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/Management')
    })
    return (
        <div></div>
    )
}

export default RouteToManagement
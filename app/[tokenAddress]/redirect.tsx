'use client'

import { redirect } from "next/navigation"
import { useEffect } from "react"


export default function SolarplexRedirect(props: {did: string, post: string}) {
    const { did, post } = props
    useEffect(() => {
        redirect(`https://solarplex.xyz/profile/${did}/post/${post}`)
    }, [did, post])
  
    return <></>
}
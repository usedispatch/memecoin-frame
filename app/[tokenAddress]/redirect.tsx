'use client'

import { MemecoinFrameCreateForm } from "@/components/MemecoinFrameCreateForm"
import { redirect } from "next/navigation"
import { useEffect } from "react"


export default function SolarplexRedirect(props: {did: string, post: string}) {
    const { did, post } = props
    useEffect(() => {
        if (did && post) {
            redirect(`https://solarplex.xyz/profile/${did}/post/${post}`)
        } else {
            redirect(`https://solarplex.xyz/`)
        }
    }, [did, post])
  
    return <></>
}
"use client"
import { signIn, useSession } from 'next-auth/react'
import React from 'react'

const page = () => {
      const {data  : session , status} = useSession();
      console.log(session , status)
  return (
    <div onClick={()=>{signIn()}}>page</div>
  )
}

export default page
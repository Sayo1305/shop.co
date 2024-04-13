import Image from 'next/image'
import React from 'react'


const NewArrivalCard =  ()=>{
  return(
    <div className='w-[400px] h-[300px] flex flex-col justify-center items-center'>
      <Image className='w-[300px] rounded-md h-[200px] object-contain  bg-[#F0EEED] p-5' src={"https://res.cloudinary.com/dqpirrbuh/image/upload/v1708983018/Nike_T-Shirts_gwoces.jpg"} alt='product' width={100} height={100} />


      <div className='text-sm my-5 font-medium'>
        <div>T-shirt with tape details</div>
        <div>$120</div>
      </div>
    </div>
  )
}

const NewArrival = () => {
  return (
    <div className='px-16 sm:py-10 py-5'>
      <div className='text-5xl font-extrabold text-center w-full py-16'>NEW ARRIVALS</div>
      <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1  justify-items-center w-full'>
        <NewArrivalCard/>
        <NewArrivalCard/>

        <NewArrivalCard/>

        <NewArrivalCard/>

      </div>
      <div className='w-full flex justify-center'>
        <button className='border !px-10 text-sm py-2 rounded-3xl'>View all</button>
      </div>

      <div className='mx-auto w-full h-[1px] bg-gray-300 my-10'></div>
    </div>
  )
}

export default NewArrival
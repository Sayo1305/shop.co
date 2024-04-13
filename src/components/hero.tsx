import { Button } from 'antd'
import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='w-full relative sm:h-[86vh] min-h-[86vh] flex md:flex-row flex-col items-center bg-[#F2F0F1]'>
      <div className='md:w-1/2 w-full md:absolute'>
            <div className='lg:text-6xl md:text-4xl sm:text-4xl text-2xl md:w-11/12 w-full px-10 md:py-0 py-5 text-start mx-auto font-extrabold'>
                  <div>FIND CLOTHES</div>
                  <div>THAT MATCHES</div>
                  <div>YOUR STYLE</div>
            </div>
            <div className='md:text-xs  my-5 text-[#616060] w-11/12 px-10 md:mx-auto'>Browse through our diverse range of meticulously crafted garments, designed to bring out
                  your individuality and cater to your sense of style.
            </div>
            <div className='w-11/12 px-10 md:mx-auto my-6 '>        
                      <Button size='large' className='!text-white !bg-black hover:!bg-black !rounded-3xl hover:!border-none px-10 py-5 flex items-center justify-center'>Shop now</Button>
            </div>
            <div className='flex items-center sm:gap-5 gap-10  sm:w-11/12 w-full px-10  flex-wrap sm:flex-nowrap  md:mx-auto'>
                  <div>
                        <div className='text-4xl font-extrabold'>200+</div>
                        <div className='text-[#616060] text-xs'>International brands</div>
                  </div>
                  <div>
                        <div className='text-4xl font-extrabold'>200+</div>
                        <div className='text-[#616060] text-xs'>International brands</div>
                  </div>
                  <div>
                        <div className='text-4xl font-extrabold'>200+</div>
                        <div className='text-[#616060] text-xs'>International brands</div>
                  </div>
            </div>
      </div>
      <Image unoptimized src={'/images/heroImageMobile.png'} className='w-full md:w-0 h-full object-cover' width={100} height={100} alt='heroBg' />
      <Image unoptimized  className='md:w-full w-0 h-full  object-cover' src={"/images/heroImage.png"} width={100} height={100} alt='heroBg'/>
    </div> 
  )
}

export default Hero
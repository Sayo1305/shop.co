import { ProfileOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import React from 'react'

const Navbar  = (): React.JSX.Element => {
  return (
      <>
      <div className='w-full bg-black py-1 text-center text-white text-xs'>
            Sign up and get 20% off to your frst order.
      </div>
    <div className='w-full flex items-center justify-between sm:px-16 px-10 py-7'>
      <div className='text-3xl try font-extrabold'>
            SHOP.CO
      </div>
      <div className='md:flex  hidden gap-5 text-sm items-center'>
            <div>shop</div>
            <div>On Sale</div>
            <div>New Arrivals</div>
            <div>Brands</div>
      </div>
      <div className='md:w-1/3 sm:w-1/2'>
            <Input prefix={<SearchOutlined className='text-lg px-2'/>} placeholder='search for product' className='!bg-[#F0F0F0] text-lg sm:flex hidden w-full hover:!border-none !shadow-none hover:!shadow-none hover:!bg-[#F0F0F0] !border-none outline-none rounded-3xl p-2'/>
      </div>
      <div className='flex items-center text-xl gap-5'>
            <SearchOutlined className='flex sm:hidden'/>
            <ShoppingCartOutlined/>
            <ProfileOutlined/>
      </div>
    </div>
    </>
  )
}

export default Navbar
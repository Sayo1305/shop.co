"use client";
import { setPassword, setToken } from '@/lib/features/admin/passwordSlice';
import { RootState } from '@/lib/store';
import { Avatar, Button, Form, Input, notification } from 'antd'
import FormItem from 'antd/es/form/FormItem';
import Password from 'antd/es/input/Password';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
const PasswordMatcher = ()=>{
      const router = useRouter();
      const {data : session , status} = useSession();
      const onFinish= async(value : any)=>{
            if(value.password  === "" || !value.password){
                  notification.warning({message : "invalid password"});
                  return;
            }
            try{
                  const res = await signIn('credentials', { 
                        username: "admin@gmail.com", 
                        password: value.password,
                        redirect : true,
                   });
            }catch(err){
                  notification.error({message : "invalid password"});
                  console.error(err);
            }
      }     
      if(status === "authenticated"){
            router.push('/admin/dashboard');
      }
      return (
            <div className='w-full min-h-screen flex items-center justify-center p-5'>
                  <div className='w-[500px] h-[300px] shadow-2xl flex  flex-col items-center border p-5 rounded-2xl'>
                        <Avatar size={100} className='h-full w-full' src="https://res.cloudinary.com/dqpirrbuh/image/upload/v1700517682/blank-profile-picture_b84iuc.png"/>
                        <div className='font-medium '>Enter your password</div>
                        <Form layout='vertical' onFinish={onFinish}>
                              <FormItem  label="Password" name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                                    <Password size='large' placeholder='Password' />
                              </FormItem>
                              <Button size='large' className='w-full'  htmlType="submit">Submit</Button>
                        </Form>
                  </div>
            </div>
      )
}
const page = () => {

  return (
    <div>
      <PasswordMatcher/>
    </div>
  )
}

export default page
import AdminDashboardLayout from '@/components/adminDashboardlayout';
import { LogoutOutlined } from '@ant-design/icons';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Page: React.FC<Props> = ({ children }) => (
  <AdminDashboardLayout>
    <div className='flex w-full items-center justify-center gap-5 flex-col h-[75vh]'>
      <div className='text-3xl font-medium'>Admin Pannel</div>
      <div className='text-xs text-slate-400'>note: admin can create / delete / update the product and can see details of the orders</div>
    </div>
  </AdminDashboardLayout>
);

export default Page;
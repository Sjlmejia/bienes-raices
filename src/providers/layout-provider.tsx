'use client'
import { useEffect, useState } from 'react'
import { UserButton } from '@clerk/nextjs';
import { message } from 'antd';
import { GetCurrentUserFromMongoDb } from '@/actions/users';
import { User } from '@prisma/client';
import { usePathname } from 'next/navigation';

function LayoutProvider({ children} : {children: React.ReactNode}) {
  const [user = null, setUser] = useState<User | null>(null);
  const pathname = usePathname();
  const isPublicRoute = ['/sign-in', '/sign-up'].includes(pathname);
  const getHeader = () => {
    return(
      <div className='lg:px-20 px-5'>
        <div className='bg-primary p-3 flex justify-between items-center rounded-b'>
          <h1 className="text-2xl text-white font-bold">
            Bienes Raices
          </h1>
          <div className='bg-white py-2 px-5 rounded-sm flex items-center gap-5'>
            <span className='text-primary font-bold'>
              {user?.username}
            </span>
            <UserButton 
              afterSignOutUrl='/sign-in'
            />
          </div>
        </div>
      </div>
    )
  };

  const getContent= () => {
    return <div className='py-5 lg:px-20 px-5'>{children}</div>
  };

  const getCurrentUser = async() => {
    try {
      const response:any = await GetCurrentUserFromMongoDb();
      if(response.error) throw new Error(response.error);
      setUser(response.data);
    }catch(error:any)  {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <div>
      {getHeader()}
      {getContent()}
    </div>
  )
}

export default LayoutProvider

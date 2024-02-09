'use client'
import { useEffect, useState } from 'react'
import { UserButton, currentUser } from '@clerk/nextjs';
import { Button, Dropdown, message } from 'antd';
import { GetCurrentUserFromMongoDb } from '@/actions/users';
import { User } from '@prisma/client';
import { usePathname } from 'next/navigation';
import Loader from '@/components/loader';
import path from 'path';
import { useRouter } from 'next/navigation';

const userMenu =[
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Properties',
    path: '/user/properties'
  },
  {
    name: 'Account',
    path: '/user/account'
  },
  {
    name: 'Subscriptions',
    path: '/user/subscriptions'
  },
]
const adminMenu = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Properties',
    path: '/user/properties'
  },
  {
    name: 'Users',
    path: '/admin/users',
  }
]

function LayoutProvider({ children} : {children: React.ReactNode}) {
  const router = useRouter();
  const [menuToShow =userMenu, setMenuToShow] = useState<any>(userMenu);
  const [user = null, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const isPublicRoute = ['sign-in', 'sign-up'].includes(pathname.split('/')[1]);

  const getHeader = () => {
    if(isPublicRoute) return null;
    return(
      <div className='lg:px-20 px-5'>
        <div className='bg-primary p-3 flex justify-between items-center rounded-b'>
          <h1 className="text-2xl text-white font-bold cursor-pointer"
            onClick={() => router.push('/')}
          >
            Bienes Raices
          </h1>
          <div className='bg-white py-2 px-5 rounded-sm flex items-center gap-5'>
            <Dropdown
              menu={{
                items: menuToShow.map((item: any) => ({
                  label: item.name,
                  onClick: () => {
                    router.push(item.path);
                  },
                })),
              }}
            >
              <Button
                className='text-primary'
                type='link'
              >
                {user?.username}
              </Button>
            </Dropdown>
            <UserButton 
              afterSignOutUrl='/sign-in'
            />
          </div>
        </div>
      </div>
    )
  };

  const getContent= () => {
    if(isPublicRoute) return children;
    if(loading) return <Loader/>;
    return <div className='py-5 lg:px-20 px-5'>{children}</div>
  };

  const getCurrentUser = async() => {
    try {
      setLoading(true);
      const response:any = await GetCurrentUserFromMongoDb();
      if(response.error) throw new Error(response.error);
      setUser(response.data);
      if(response.data.isAdmin) {
        setMenuToShow(adminMenu);
      }
    }catch(error:any)  {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if(!isPublicRoute) getCurrentUser();
  }, []);
  return (
    <div>
      {getHeader()}
      {getContent()}
    </div>
  )
}

export default LayoutProvider

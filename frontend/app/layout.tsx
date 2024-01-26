import type { Metadata } from 'next';
import '@/app/styles/globals.css';
import Sidebar from '@/app/components/sidebar/sidebar.component';
import { Children } from '@/app/interfaces/children.interface';
import AuthContext from '@/app/contexts/AuthContext';

export const metadata: Metadata = {
  title: 'Together Piano',
  description: 'Together Piano',
};

export default function RootLayout({ children }: Children) {
  return (
    <html lang='ko'>
      <body>
        <AuthContext>
          <div className='flex'>
            <Sidebar />
            <div className='flex justify-center items-center h-screen w-screen'>
              {children}
            </div>
          </div>
        </AuthContext>
      </body>
    </html>
  );
}

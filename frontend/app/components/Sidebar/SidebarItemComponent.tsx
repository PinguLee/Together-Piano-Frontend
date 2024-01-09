// SidebarItemComponent.tsx

'use client';

// 넥스트
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 인터페이스
import { SidebarItemTitleProp } from '@/frontend/app/interfaces/Sidebar/SidebarItem/SidebarItemTitleProp';
import { SidebarItemHrefProp } from '@/frontend/app/interfaces/Sidebar/SidebarItem/SidebarItemHrefProp';
import { SidebarItemIconProp } from '@/frontend/app/interfaces/Sidebar/SidebarItem/SidebarItemIconProp';
import { OpenProp } from '@/frontend/app/interfaces/OpenProp';
interface SidebarItemProps
  extends SidebarItemTitleProp,
    SidebarItemHrefProp,
    SidebarItemIconProp,
    OpenProp {}

export default function SidebarItemComponent({
  title,
  href,
  icon,
  open,
}: SidebarItemProps) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link href={href}>
      <li
        className={`text-sm flex items-center gap-x-4 p-2 my-4 hover:bg-white hover:text-black rounded-md transition duration-300 ease-in-out ${
          isActive ? 'bg-sub1 border-l-4 border-primary border-highlight' : ''
        }`}
      >
        <span className='text-2xl block float-left'>{icon}</span>
        <span className={`text-base flex-1 font-semibold ${!open && 'hidden'}`}>
          {title}
        </span>
      </li>
    </Link>
  );
}
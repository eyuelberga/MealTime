import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Button, IconButton } from '@radix-ui/themes';
import { HomeIcon, CollectionIcon, ShoppingIcon, CalendarIcon, RecipeIcon, LogoIcon, CloseIcon } from '../icons';
import { Logo } from '@/components/logo';
const ListItem = ({ pathname, name, href, icon, callback }) => {
  const router = useRouter();
  const goToLink = () => {
    router.push(href);
    if (callback && typeof callback === "function") callback();
  }
  return <li className="p-2">
    <Button className='w-full' color={pathname.includes(href) ? 'primary' : 'gray'} variant='ghost' onClick={goToLink}>
      <div className='flex justify-start w-full items-center gap-2'>
        {icon}
        <div>
          {name}
        </div>
      </div>
    </Button>
  </li>
}

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const router = useRouter();

  const pathname = usePathname();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const toggleSidebar = (toggleValue) => {
    const toggle = toggleValue ? toggleValue : !sidebarOpen;
    setSidebarOpen(toggle);
  }

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 shrink-0 bg-white  transition-all duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-64'
          }`}
      >

        <div className="flex lg:border-b px-2 items-center">
          <button onClick={() => { router.push("/dashboard"); toggleSidebar(false); }} className="block mx-auto lg:mx-2">
            <Logo />
          </button>
          <div className='lg:hidden'>
            <IconButton
              value="close sidebar"
              ref={trigger}
              variant='ghost'
              color='gray'
              className="lg:hidden"
              onClick={() => { toggleSidebar(false) }}
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-8 border-r h-full">
          {/* Pages group */}
          <div>
            <ul className="m-3 ">

              <ListItem pathname={pathname} callback={toggleSidebar} name="Home" href="/dashboard" icon={<HomeIcon />} />
              <ListItem pathname={pathname} callback={toggleSidebar} name="Recipes" href="/recipes" icon={<RecipeIcon />} />
              <ListItem pathname={pathname} callback={toggleSidebar} name="Collections" href="/collections" icon={<CollectionIcon />} />
              <ListItem pathname={pathname} callback={toggleSidebar} name="Meal Planner" href="/meal-plan" icon={<CalendarIcon />} />
              {/* <ListItem pathname={pathname} name="Shopping List" href="/shopping-list" icon={<ShoppingIcon />} /> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

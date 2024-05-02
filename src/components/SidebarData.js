import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Add Answer',
    path: '/',
    icon: <AiIcons.AiFillEdit />, // Icon for Add Answer
    cName: 'nav-text'
  },
  {
    title: 'Assign Question',
    path: '/',
    icon: <IoIcons.IoIosDocument />, // Icon for Assign Question
    cName: 'nav-text'
  },
  {
    title: 'Assign Marks',
    path: '/',
    icon: <FaIcons.FaFileSignature />, // Icon for Assign Marks
    cName: 'nav-text'
  },
  {
    title: 'Show Plag report',
    path: '/attach',
    icon: <IoIcons.IoIosCopy />, // Icon for Show Plag report
    cName: 'nav-text'
  },
  {
    title: 'Review Students',
    path: '/students',
    icon: <IoIcons.IoIosPeople />, // Icon for Review Students
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/Marks',
    icon: <IoIcons.IoIosLogOut />, // Icon for Logout
    cName: 'nav-text'
  }
];

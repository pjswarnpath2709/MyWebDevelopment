import { Button, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
} from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

const LinkButton = ({ url, text, Icon }) => {
  const location = useLocation();
  const myUrl = `/admin/${url}`;
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (location.pathname === myUrl) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [location.pathname, myUrl]);
  return (
    <Link to={`/admin/${url}`}>
      <Button
        fontSize={'larger'}
        variant={'ghost'}
        colorScheme={active ? 'purple' : ''}
      >
        <Icon style={{ margin: '4px' }} />
        {text}
      </Button>
    </Link>
  );
};

const Sidebar = () => {
  const linksOnSideBar = [
    {
      url: 'dashboard',
      text: 'Dashboard',
      Icon: RiDashboardFill,
    },
    {
      url: 'createcourse',
      text: 'Create Course',
      Icon: RiAddCircleFill,
    },
    {
      url: 'courses',
      text: 'Courses',
      Icon: RiEyeFill,
    },
    {
      url: 'users',
      text: 'Users',
      Icon: RiUser3Fill,
    },
  ];
  return (
    <VStack spacing={'8'} p="16" boxShadow={'-2px 0 10px rgba(107,70,193,0.5)'}>
      {linksOnSideBar.map(item => (
        <LinkButton {...item} />
      ))}
    </VStack>
  );
};

export default Sidebar;

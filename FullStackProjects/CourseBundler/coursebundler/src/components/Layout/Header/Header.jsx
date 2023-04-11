import React from 'react';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const LinkButton = ({
  url = '/',
  title = 'Home',
  colorScheme = null,
  variant = null,
  icon = null,
  onClick = () => {},
}) => {
  return (
    <Link onClick={onClick} to={url}>
      <Button variant={variant} colorScheme={colorScheme}>
        {icon}
        {title}
      </Button>
    </Link>
  );
};

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuthenticated = true;
  const user = {
    role: 'admin',
  };

  const logoutHandler = e => {
    e.preventDefault();
  };

  return (
    <>
      <ColorModeSwitcher />
      <Button
        colorScheme="yellow"
        width={'12'}
        height={'12'}
        rounded={'full'}
        position={'fixed'}
        top={'6'}
        zIndex={'overlay'}
        left={'6'}
        onClick={onOpen}
      >
        <RiMenu5Fill />
      </Button>
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay backdropFilter={'blur(0.2px)'} />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={'1px'}>Course Bundler</DrawerHeader>
          <DrawerBody>
            <VStack spacing={'4'} alignItems={'flex-start'}>
              <LinkButton
                onClick={onClose}
                url="/"
                title="Home"
                variant={'ghost'}
              />
              <LinkButton
                onClick={onClose}
                url="/courses"
                title="Browse All Courses"
                variant={'ghost'}
              />
              <LinkButton
                onClick={onClose}
                url="/request"
                title="Request A Course"
                variant={'ghost'}
              />
              <LinkButton
                onClick={onClose}
                url="/contact"
                title="Contact Us"
                variant={'ghost'}
              />
              <LinkButton
                onClick={onClose}
                url="/about"
                title="About Me"
                variant={'ghost'}
              />

              <HStack
                justifyContent={'space-evenly'}
                position={'absolute'}
                bottom={'2rem'}
                width={'80%'}
              >
                {isAuthenticated ? (
                  <>
                    <VStack>
                      <HStack>
                        <LinkButton
                          onClick={onClose}
                          url="/profile"
                          colorScheme={'yellow'}
                          variant={'ghost'}
                          title="Profile"
                        />
                        <Button variant={'ghost'} onClick={logoutHandler}>
                          <RiLogoutBoxLine style={{ margin: '4px' }} />
                          Logout
                        </Button>
                      </HStack>
                      {user && user.role === 'admin' && (
                        <LinkButton
                          onClick={onClose}
                          url="/admin/dashboard"
                          title="DashBoard"
                          colorScheme={'purple'}
                          variant={'ghost'}
                          icon={<RiDashboardFill style={{ margin: '4px' }} />}
                        />
                      )}
                    </VStack>
                  </>
                ) : (
                  <>
                    <LinkButton
                      onClick={onClose}
                      url="/login"
                      title="Login"
                      colorScheme={'yellow'}
                    />
                    <p>OR</p>
                    <LinkButton
                      onClick={onClose}
                      url="/register"
                      title="Sign Up"
                      colorScheme={'yellow'}
                    />
                  </>
                )}
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;

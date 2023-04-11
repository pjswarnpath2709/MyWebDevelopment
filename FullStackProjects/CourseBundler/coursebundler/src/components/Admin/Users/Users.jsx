import React from 'react';
import AdminTemplate from '../AdminTemplate';
import {
  Box,
  Button,
  HStack,
  Heading,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { RiDeleteBin7Fill } from 'react-icons/ri';

const Users = () => {
  const users = [
    {
      _id: '1',
      name: 'Name1',
      email: ' user1@user.com',
      role: 'user',
      subscription: {
        status: 'active',
      },
    },
    {
      _id: '2',
      name: 'Name2',
      email: ' user2@user.com',
      role: 'admin',
      subscription: {
        status: 'unactive',
      },
    },
    {
      _id: '3',
      name: 'Name3',
      email: ' user3@user.com',
      role: 'user',
      subscription: {
        status: 'active',
      },
    },
  ];

  const updateButtonHandler = userId => {};

  const deleteButtonHandler = userId => {};

  return (
    <AdminTemplate>
      <Box padding={['0', '16']} overflowX={'auto'}>
        <Heading
          textTransform={'uppercase'}
          children="All users"
          my="16"
          textAlign={['center', 'left']}
        />
        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption>All Available Users</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Subscription</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map(item => (
                <Row
                  item={item}
                  key={item._id}
                  updateButtonHandler={updateButtonHandler}
                  deleteButtonHandler={deleteButtonHandler}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </AdminTemplate>
  );
};

const Row = ({ item, updateButtonHandler, deleteButtonHandler }) => {
  const active = item.subscription.status === 'active';
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td color={active ? 'green.600' : 'red.600'} fontWeight={'bold'}>
        {active ? 'Active' : 'Not Active'}
      </Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => updateButtonHandler(item._id)}
            variant={'outline'}
            color="purple.500"
          >
            Change Role
          </Button>
          <Button
            onClick={() => deleteButtonHandler(item._id)}
            variant={'outline'}
            color="red.600"
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
};

export default Users;

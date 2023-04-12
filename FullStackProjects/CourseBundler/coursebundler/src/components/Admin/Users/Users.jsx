import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from '../../../redux/actions/admin';
const Users = () => {
  const { users, error, loading, message } = useSelector(store => store.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [error, message, dispatch]);
  const updateButtonHandler = async userId => {
    await dispatch(updateUserRole(userId));
    await dispatch(getAllUsers());
  };

  const deleteButtonHandler = async userId => {
    await dispatch(deleteUser(userId));
    await dispatch(getAllUsers());
  };

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
              {users &&
                users?.map(item => (
                  <Row
                    item={item}
                    key={item?._id}
                    updateButtonHandler={updateButtonHandler}
                    deleteButtonHandler={deleteButtonHandler}
                    loading={loading}
                  />
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </AdminTemplate>
  );
};

const Row = ({ item, updateButtonHandler, deleteButtonHandler, loading }) => {
  const active = item?.subscription?.status === 'active';
  return (
    <Tr>
      <Td>#{item?._id}</Td>
      <Td>{item?.name}</Td>
      <Td>{item?.email}</Td>
      <Td>{item?.role}</Td>
      <Td color={active ? 'green.600' : 'red.600'} fontWeight={'bold'}>
        {active ? 'Active' : 'Not Active'}
      </Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            isLoading={loading}
            onClick={() => updateButtonHandler(item?._id)}
            variant={'outline'}
            color="purple.500"
          >
            Change Role
          </Button>
          <Button
            isLoading={loading}
            onClick={() => deleteButtonHandler(item?._id)}
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

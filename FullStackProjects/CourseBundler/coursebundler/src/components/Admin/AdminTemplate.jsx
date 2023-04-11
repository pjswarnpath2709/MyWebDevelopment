import { Grid } from '@chakra-ui/react';
import React from 'react';
import Sidebar from './Sidebar';
import { myCursor } from '../../assets/images';

const AdminTemplate = ({ children }) => {
  return (
    <Grid
      css={{ cursor: `url(${myCursor}), default` }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      {children}
      <Sidebar />
    </Grid>
  );
};

export default AdminTemplate;

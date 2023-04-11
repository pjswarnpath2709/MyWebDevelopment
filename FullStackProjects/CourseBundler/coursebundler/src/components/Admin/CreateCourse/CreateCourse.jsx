import React, { useState } from 'react';
import AdminTemplate from '../AdminTemplate';
import {
  Button,
  Container,
  Heading,
  Image,
  Input,
  Select,
  VStack,
} from '@chakra-ui/react';
import { fileUploadCss } from '../../Auth/Register';
const CreateCourse = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [createdBy, setCreatedBy] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState();
  const [imagePrev, setImagePrev] = useState();
  const categories = [
    'Web Development',
    'Artificial Intelligence',
    'Data Structures & Algorithms',
    'App Development',
    'Game Development',
    'Data Science',
  ];

  //  const dispatch = useDispatch();
  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  //   const submitHandler = e => {
  //     e.preventDefault();
  //     const myForm = new FormData();

  //     myForm.append('name', name);
  //     myForm.append('email', email);
  //     myForm.append('password', password);
  //     myForm.append('file', image);

  //     // dispatch(register(myForm));
  //   };
  return (
    <AdminTemplate>
      <Container py={'16'}>
        <form>
          <Heading
            textTransform={'uppercase'}
            children="Create Course"
            my="16"
            textAlign={['center', 'left']}
          />
          <VStack m="auto" spacing={'8'}>
            {imagePrev && (
              <Image src={imagePrev} boxSize={'64'} objectFit={'contain'} />
            )}
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              type={'text'}
              focusBorderColor="purple.300"
            />
            <Input
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Description"
              type={'text'}
              focusBorderColor="purple.300"
            />
            <Input
              value={createdBy}
              onChange={e => setCreatedBy(e.target.value)}
              placeholder="Creator Name"
              type={'text'}
              focusBorderColor="purple.300"
            />
            <Select
              focusBorderColor="purple.300"
              value={'category'}
              onChange={e => setCategory(e.target.value)}
            >
              <option hidden value="">
                Category
              </option>
              {categories.map(item => (
                <option key={item} value={`${item}`}>
                  {item}
                </option>
              ))}
            </Select>
            <Input
              accept="image/*"
              required
              id="chooseAvatar"
              type={'file'}
              focusBorderColor="purple.300"
              css={{
                '&::file-selector-button': {
                  ...fileUploadCss,
                  color: 'purple',
                },
              }}
              onChange={changeImageHandler}
            />
            <Button w="full" colorScheme="purple" type="submit">
              Create
            </Button>
          </VStack>
        </form>
      </Container>
    </AdminTemplate>
  );
};

export default CreateCourse;

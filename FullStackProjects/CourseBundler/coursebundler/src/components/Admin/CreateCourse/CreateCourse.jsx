import React, { useEffect, useState } from 'react';
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
import { createCourse } from '../../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const categories = [
  'Web Development',
  'Artificial Intelligence',
  'Data Structures & Algorithms',
  'App Development',
  'Game Development',
  'Data Science',
];

const CreateCourse = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [createdBy, setCreatedBy] = useState();
  const [category, setCategory] = useState();
  const [image, setImage] = useState();
  const [imagePrev, setImagePrev] = useState();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(store => store.admin);
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
      setTitle('');
      setDescription('');
      setImage(null);
      setImagePrev(null);
      setCategory('');
      setCreatedBy('');
      navigate('/admin/courses');
    }
  }, [loading, message, error, dispatch, navigate]);

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('createdBy', createdBy);
    myForm.append('category', category);
    myForm.append('file', image);
    dispatch(createCourse(myForm));
  };
  return (
    <AdminTemplate>
      <Container py={'16'}>
        <form onSubmit={submitHandler}>
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
              value={category}
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
            <Button
              isLoading={loading}
              w="full"
              colorScheme="purple"
              type="submit"
            >
              Create
            </Button>
          </VStack>
        </form>
      </Container>
    </AdminTemplate>
  );
};

export default CreateCourse;

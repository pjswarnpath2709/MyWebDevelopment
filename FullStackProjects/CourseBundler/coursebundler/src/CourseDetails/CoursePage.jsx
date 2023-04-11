import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { myVideo } from '../assets/videos';

const CoursePage = () => {
  const { id } = useParams();
  const [lectureNumber, setLectureNumber] = useState(0);
  const lectures = [
    {
      _id: '1',
      title: 'sample1',
      description: 'my description',
      video: {
        url: myVideo,
      },
    },
    {
      _id: '2',
      title: 'sample2',
      description: 'my description',
      video: {
        url: myVideo,
      },
    },
    {
      _id: '3',
      title: 'sample3',
      description: 'my description',
      video: {
        url: myVideo,
      },
    },
    {
      _id: '4',
      title: 'sample4',
      description: 'my description',
      video: {
        url: myVideo,
      },
    },
  ];
  return (
    <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']}>
      <Box>
        <video
          width={'100%'}
          controls
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={lectures[lectureNumber].video.url}
        ></video>
        <Heading
          m="4"
          children={`#${lectureNumber + 1} ${lectures[lectureNumber].title} `}
        />
        <Heading m="4" children="Description" />
        <Text m="4" children={lectures[lectureNumber].description} />
      </Box>
      <VStack>
        {lectures.map((item, index) => (
          <button
            key={item._id}
            style={{
              width: '100%',
              padding: '1rem',
              textAlign: 'center',
              borderBottom: '1px solid rgba(0,0,0,0.2)',
            }}
            onClick={() => setLectureNumber(index)}
          >
            <Text noOfLines={1}>
              #{index + 1} {item.title}
            </Text>
          </button>
        ))}
      </VStack>
    </Grid>
  );
};

export default CoursePage;

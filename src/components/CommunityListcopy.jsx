import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import styles from './css_module/CommunityList.module.css'
import { useState } from 'react';
import { Box, Button, Tab, Tabs, TextField } from '@mui/material';
import CommunityCreate from './CommunityCreate';

export default function CommunityList() {
    const [value, setValue] = useState('one');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    return (
    <>
    <Box 
        display={'flex'}
        justifyContent={'space-between'}
        padding={5}
    >
        <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
        >
            <Tab value="one" label="전체"/>
            <Tab value="two" label="즐겨찾기" />
        </Tabs>
        <Box>
            <TextField id="standard-basic" label="검색어를 입력하세요" />
            <Button variant="contained" style={{height:'100%'}}>검색</Button>
            <CommunityCreate />
        </Box>
    </Box>
        
    <ImageList sx={{ width: '100%', height: 600 }}
        className={styles.imageContainer}
        >
        <ImageListItem key="Subheader" cols={4} gap={8}>
        </ImageListItem>
        {itemData.map((item) => (
        <ImageListItem key={item.img}>
            <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=24%&fit=crop&auto=format`}
            // src={`${item.img}`}
            alt={item.title}
            loading="lazy"
            />
            <ImageListItemBar
            title={item.title}
            // subtitle={item.author}
            // actionIcon={}
            />
        </ImageListItem>
        ))}
    </ImageList>
    </>
    )
}

const itemData = [
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '클라이밍',
    author: '@bkristastucchio',
    featured: true,
    },

];

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import CommunityCreate from './CommunityCreate';

export default function CommunityListHeader() {
    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    return (
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
            <Tab value="one" label="전체" />
            <Tab value="two" label="즐겨찾기" />
            </Tabs>
            <Box>
                <TextField id="standard-basic" label="검색어를 입력하세요" />
                <Button variant="contained" style={{height:'100%'}}>검색</Button>
                <CommunityCreate />
            </Box>
        </Box>
    );
}
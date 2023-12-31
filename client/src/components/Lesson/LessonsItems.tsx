import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
export default function LessonsLists({idCourse, lessons, index}: any) {

  return (
    <>
     <div className='bg-[#f5f5f5]'>
        <Divider />
          <ListItemButton>
                <p className='text-sm mr-5 font-semibold'>{index+1}</p>
                <p className='text-sm mr-5 font-semibold w-full'>{lessons?.title}</p>
                <div className='text-end'> 
                  <IconButton edge="end">
                    <MoreVertIcon />
                  </IconButton>
                </div>
          </ListItemButton>
        <Divider />
     </div>
    </>
  );
}
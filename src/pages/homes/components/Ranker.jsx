import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { jsx } from '@emotion/react';
import styleHome from "../../../components/css_module/Home.module.css"
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

export default function Ranker() {
    //데이터를 받아오는 코드
    const { data } = useDemoData({
    dataSet: 'userid',
    rowLength: 30,
    maxColumns: 4,
    });
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [value, setValue] = React.useState('');

    const handlePopoverOpen = (event) => {
    const field = event.currentTarget.dataset.field;
    const id = event.currentTarget.parentElement.dataset.id;
    const row = data.rows.find((r) => r.id === id);
    setValue(row[field]);
    setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
    setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
    <div style={{ height: 400, width: '35%' }}>
    <h1
        className={styleHome.Ranker}>
            <MilitaryTechIcon
                sx={{fontSize: 48}}/>Today best challanger
    </h1>
        <DataGrid
            className={styleHome.RankerList}
            {...data}
            slotProps={{
                cell: {
                onMouseEnter: handlePopoverOpen,
                onMouseLeave: handlePopoverClose,
                },
            }}
        />
        <Popover
            sx={{
                pointerEvents: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
        >
        <Typography sx={{ p: 1 }}>{`${value.length} characters.`}</Typography>
        </Popover>
    </div>

    );
}

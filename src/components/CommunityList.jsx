import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './css_module/CommunityList.module.css'


export default function CommunityList() {
    const navigate = useNavigate()

    return (
        <div className={styles.container}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {itemData.map((d)=>{
                    return(
                        <Grid item xs={6}>
                            <Card onClick={()=>{navigate(`/communitypost/${d.title}`)}}>
                                <CardActionArea>
                                    <CardContent className={styles.title}>
                                        <Typography gutterBottom variant="h5" component="div" className={styles.titleName}>
                                            {d.title}
                                        </Typography>
                                    </CardContent>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={d.img}
                                    />
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

const itemData = [
    {
    img: 'https://images.unsplash.com/photo-1716018517051-7076e372319b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: '자유',
    },
    {
    img: 'https://images.unsplash.com/photo-1551884831-bbf3cdc6469e?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: '유머',
    },
    {
    img: 'https://plus.unsplash.com/premium_photo-1670505059783-806c0708bb31?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: '운동',
    },
    {
    img: 'https://plus.unsplash.com/premium_photo-1680303237111-35809e47fcc1?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: '질문',
    },
    {
    img: 'https://plus.unsplash.com/premium_photo-1693060074991-e5cc84dad92d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fHJlZ2lvbnxlbnwwfHwwfHx8MA%3D%3D',
    title: '지역',
    },
    {
    img: 'https://images.unsplash.com/photo-1585909694668-0a6e0ddbfe8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA4fHxpbmZvcm1hdGlvbnxlbnwwfHwwfHx8MA%3D%3D',
    title: '정보',
    },
];

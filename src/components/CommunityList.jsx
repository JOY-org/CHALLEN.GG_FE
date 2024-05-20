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
                                        <Typography gutterBottom variant="h5" component="div">
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
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '자유',
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '유머',
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '운동',
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '질문',
    },
];

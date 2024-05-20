import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from '@mui/material';


export default function CommunityList() {
    return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {itemData.map((d,i)=>{
            return(
                <Grid item xs={6}>
                    <Card>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div" style={{backgroundColor:'none'}}>
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
    )
}

const itemData = [
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '자유',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '유머',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '운동',
    author: '@bkristastucchio',
    featured: true,
    },
    {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: '질문',
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

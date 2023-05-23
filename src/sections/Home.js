import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, List, ListItem, ListItemText, Modal, Stack, Typography } from '@mui/material'
import React from 'react'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
//import HotelIcon from '@mui/icons-material/Hotel';
//import RepeatIcon from '@mui/icons-material/Repeat';
import { DeliveryDiningTwoTone, OutdoorGrillTwoTone } from '@mui/icons-material';
import h1 from '../img/h1.png'
import h2 from '../img/h2.png'
import { pg1 } from '../components/lorem'



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #f3c23a',
    boxShadow: 24,
    p: 4,
};


function Home() {
    const ingredients = ['Chicken Legs', 'Salt', 'Pepper', 'Garlic Powder', 'Paprika'];

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <Grid display={'flex'} flexDirection='column' alignItems={'center'} height='100%' width='100%'>
            <Grid display={'flex'} flexDirection='column' alignItems={'center'} height='100%' width='100%'>



                <Typography variant='h3'>Welcome to <br /> <span style={{ color: '#f3c23a', textShadow: '0.1rem 0.1rem #000', fontSize: '130%' }}>FH Chicken spot</span> </Typography>
                <Stack alignItems={'center'}>

                    <Timeline position="alternate" sx={{ width: '80%', height: '100%', flexWrap: 'wrap' }}>

                        <TimelineItem>
                            <TimelineOppositeContent
                                sx={{ m: 'auto 0' }}
                                variant="body2"
                                color="text.secondary" >
                                24/7 mo-sun
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot color="primary" variant='filled'>
                                    <LaptopMacIcon sx={{ fontSize: '130%' }} />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                <Typography variant="h4" component="span">
                                    Order online
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot color="secondary" variant="filled">
                                    <OutdoorGrillTwoTone sx={{ fontSize: '130%' }} />
                                </TimelineDot>
                                <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                <Typography variant="h4" >
                                    We Cook..
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
                                <TimelineDot color="secondary">
                                    <DeliveryDiningTwoTone sx={{ fontSize: '130%' }} />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                <Typography variant="h4">
                                    ..and bring
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem>
                            <TimelineOppositeContent
                                sx={{ m: 'auto 0' }}
                                align="right"
                                variant="body2"
                                color="text.secondary"
                            >
                                because you deserve it
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineConnector />
                                <TimelineDot color='primary'>
                                    <FastfoodIcon sx={{ fontSize: '130%', color: '#f3c23a' }} />
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent sx={{ py: '12px', px: 2 }}>
                                <Typography variant="h4" >
                                    you Enjoy
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                    <Button fullWidth color='secondary' variant='contained'>GET YOUR CHICKEN</Button>

                </Stack>
            </Grid>
            <Grid display={'flex'} flexDirection='row' justifyContent={'center'} alignItems={'center'} height='100%' pt={'3rem'}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box display={'flex'} flexDirection='column' alignContent={'center'} sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Ingredients for Chicken Legs
                        </Typography>
                        <List>
                            {ingredients.map((ingredient) => (
                                <ListItem key={ingredient}>
                                    <ListItemText primary={ingredient} />
                                </ListItem>
                            ))}
                        </List>
                        <Button sx={{ color: '#f3c23a', backgroundColor: '#763408' }} variant='outlined'>COMPOSE NOW</Button>
                    </Box>
                </Modal>
                <Stack width={'50%'} p={'0.5rem'}>
                    <Card >
                        <CardActionArea onClick={handleOpen}>
                            <CardMedia component="img"
                                image={h1}
                                alt="img1" />
                            <CardContent sx={{ background: '#f3c23a' }}>
                                <Typography>Discover our suggestions</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Stack>
                <Stack width={'50%'} p={'0.5rem'}>
                    <Typography variant='h4'><span style={{ textShadow: '2px 2px #f3c23a' }}>Choos'a Chick'</span> </Typography>

                    <Typography>{pg1}</Typography>
                    <Button variant='outlined'>compose your chicken</Button>
                </Stack>
            </Grid>
            <Grid display={'flex'} flexDirection='row' justifyContent={'center'} alignItems={'center'} height='100%' >

                <Stack width={'50%'} p={'0.5rem'}>
                    <Typography variant='h4'>The <span style={{ textShadow: '2px 2px #f3c23a' }}>Great Chicken Menu</span> </Typography>

                    <Typography>{pg1}</Typography>
                    <Typography>fds</Typography>
                </Stack>
                <Stack width={'50%'} p={'0.5rem'}>
                    <Card >
                        <CardActionArea>
                            <CardMedia component="img"
                                image={h2}
                                alt="green iguana" />
                            <CardContent sx={{ background: '#763408' }}>
                                <Typography variant='body2' color={'secondary'}>from 22.95$</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Stack>
            </Grid>
        </Grid>
    )
}

export default Home
import { Button, Card, Grid, Stack, Typography } from '@mui/material'
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
import HotelIcon from '@mui/icons-material/Hotel';
import RepeatIcon from '@mui/icons-material/Repeat';
import { DeliveryDiningTwoTone, OutdoorGrillTwoTone } from '@mui/icons-material';


function Home() {
    return (
        <Grid display={'flex'} flexDirection='column' alignItems={'center'} height='100%' width='100%'>



            <Typography variant='h3'>Welcome to <br /> <span style={{ color: '#f3c23a', textShadow: '0.1rem 0.1rem #000', fontSize: '130%' }}>FH Chicken spot</span> </Typography>
            <Stack p={'2rem'} alignItems={'center'}>
                <Button fullWidth color='secondary' variant='contained'>GET YOUR CHICKEN</Button>

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
                <Button fullWidth color='primary' variant='contained'>GET YOUR CHICKEN</Button>
            </Stack>
        </Grid>
    )
}

export default Home
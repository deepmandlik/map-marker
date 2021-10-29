import React ,{useState} from "react";
import {Button ,Box , Typography  ,useMediaQuery, Grid , Avatar, Tooltip , IconButton} from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { red ,purple, indigo ,grey , pink ,blue} from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "../styles/Home.module.css";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';


export default function ListComponent(props) {


    return (
        <Box sx={{ width: '320px' , bgcolor: '#eceff1' ,height : 'auto' }} p={1} className={styles.box}>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }} justifyContent="space-between" mt={2}>
                    <Typography> <IconButton onClick={props.closeList}><ArrowBackOutlinedIcon></ArrowBackOutlinedIcon> </IconButton ></Typography>
                    <Typography sx={{fontWeight : 500 , fontSize : '20px'}}>OutlateBuddy</Typography>
            
                    <IconButton size="small" sx={{ ml: 2 }}>
                        <Stack direction="row" spacing={2}><Avatar sx={{ width: 35, height: 35 , bgcolor : purple[600]}} src="/Deep1.jpeg"></Avatar> </Stack>
                    </IconButton>
            
                </Box>
                <Box className={styles.head}></Box>
                <Box mt={1} className={styles.scroll} style={{overflowY: 'scroll', height:'551px'}}>
                {
                    // Here, we displays marker as list 
                    props.marker.map((data ,index) => {
                        return (
                            <Card sx={{ maxWidth: 345 , bgcolor : grey[50] }} className={styles.card_box} >
                                <CardHeader
                                    sx ={{ padding : '9px 10px' }}
                                    avatar={
                                        <Avatar sx={{ bgcolor: pink[500] ,width : 35 ,height : 35 }}>
                                            <RoomOutlinedIcon />
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="add to favorites" onClick={props.addToBookmark(data.latitude)} >
                                         {(data.bookmark) ? <BookmarkOutlinedIcon style={{ fontSize : '20px'}}></BookmarkOutlinedIcon> : <BookmarkBorderOutlinedIcon style={{ fontSize : '20px'}}></BookmarkBorderOutlinedIcon> }
                                        </IconButton>
                                    }
                                    title={data.place_name}
                                >
                                </CardHeader>
                                <CardContent sx={{bgcolor : '#f5f5f5' ,padding : '10px 15px'}}>
                                    <Typography variant="body2" color="text.secondary">
                                        This place is {data.category} {data.address}
                                    </Typography>
                                </CardContent>
                                <CardActions >
                                    <IconButton  aria-label="locate"  onClick={props.goToMarker(data)}>
                                        <MapsUgcIcon style={{ fontSize : '20px'}} />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={props.handleDelete(data)}>
                                        <DeleteIcon style={{ fontSize : '20px'}} />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        )
                    })
                }
            </Box>
        </Box>
    )
}
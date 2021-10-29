import React ,{useRef} from "react";
import ReactMapGL ,{ Marker , Popup , NavigationControl , GeolocateControl} from "react-map-gl";
import {Button ,Box , Typography  , IconButton} from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import { red ,purple, indigo ,grey ,blue, pink } from '@mui/material/colors';
import 'mapbox-gl/dist/mapbox-gl.css'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
import Geocoder from 'react-map-gl-geocoder'

export default function Map(props) {
    const token = "pk.eyJ1IjoidXJiYW5tYXRyaXgiLCJhIjoiY2tqa3ppbTlzMW5jbzMwcW91dnN5YmxzYSJ9.zg8JJCbckTlnAaZdJvNN5A";
    
    //Sets mapRef for map
    const geocoderContainerRef = useRef();
    const mapRef = useRef();
    
    //Sets popData for showing popup
    const [popData, setPopData] = React.useState(null);

    const [showPopup, togglePopup] = React.useState(false);
    
    //Styles
    const navControlStyle= {
        right: 20,
        bottom: 20
    };
    const geolocateControlStyle= {
        right: 20,
        bottom: 115
    };

    const geoCoder = {
        position: "absolute",
        top: 20,
        left: 10,
        zIndex: 1,
        width : (!props.matches) ? '265px':'315px'
    }

    
    
    return (
            <Box>
                {/* Here ,we diplays map on web */}
                <ReactMapGL 
                    ref={mapRef}
                    {...props.viewport} 
                    mapStyle="mapbox://styles/mandlik20/ckv8dwyte6r1q15qq8tsu4pyq"
                    mapboxApiAccessToken= {token}
                    onViewportChange={viewport => { props.changeViewport(viewport)}}
                    onClick={props.getCoordinates}>
                        {/* Here, we shows search bar for searching places on map */}
                        <Geocoder
                            mapRef={mapRef}
                            containerRef={geocoderContainerRef}
                            onViewportChange={viewport => { props.changeViewport(viewport)}}
                            mapboxApiAccessToken={token}
                            zoom={12} 
                            position="top-left"
                        />
                        {/* Here, We shows navigation icon such as zoom out and zoom in */}
                        <NavigationControl style={navControlStyle} />
                        {/* Here, we displays button for marking user's location*/}
                        <GeolocateControl
                            style={geolocateControlStyle}
                            positionOptions={{enableHighAccuracy: true , timeout: 1000}}
                            trackUserLocation={true}
                            showUserHeading= {true}
                            transitionDuration= {5000}
                        />
                    {
                        // Here, we displays marker on map through marker array
                        props.marker.map((data) => {
                            return (
                                <Marker latitude={data.latitude} longitude={data.longitude} offsetLeft={-20} offsetTop={-10}>
                                    <IconButton onClick={e => {
                                        e.preventDefault();
                                        setPopData(data);
                                        togglePopup(true)}}>
                                        <RoomIcon sx={{ color: pink[500] , fontSize : '30px'}}></RoomIcon>
                                    </IconButton>
                                </Marker>
                            )
                        })
                    }
                    {/* Shows popup when onclick on marker */}
                    {showPopup && 
                        <Popup
                            latitude={popData.latitude}
                            longitude={popData.longitude}
                            closeButton={true}
                            closeOnClick={false}
                            onClose={() => togglePopup(false)}
                            anchor="top" >
                            <Box style={{width : '200px' ,padding : '7px'}}> 
                                <Typography sx={{color : '#000'}}>{popData.place_name}</Typography>
                                <Typography sx={{color : '#0007'}}>This place is {popData.category} {popData.address}</Typography>
                            </Box>
                        </Popup>
                    }                    
                </ReactMapGL>
                <Box
                    ref={geocoderContainerRef}
                    style={geoCoder}
                /> 
            </Box>
    )
}
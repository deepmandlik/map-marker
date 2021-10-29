import React ,{useState , useEffect,useRef} from "react";
import {Button ,Box , Typography  , Avatar, useMediaQuery,Grid,IconButton, List} from '@mui/material';
import Map from "../components/map";
import ListComponent from "../components/ListComponents";
import { Marker , FlyToInterpolator , Popup , NavigationControl , GeolocateControl} from "react-map-gl";
import {createTheme ,ThemeProvider} from '@mui/material';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import "typeface-quicksand";
import { red ,purple, indigo ,grey , pink ,blue} from '@mui/material/colors';
import mapboxSdk from '@mapbox/mapbox-sdk/services/geocoding'
import { Global, css } from '@emotion/react'

const theme = createTheme({
    typography: {
        fontFamily: [
            'Quicksand',
            'sans-serif',
        ].join(','),
  },
});
export default function Home() {
    const matches = useMediaQuery('(min-width:375px)');
    
    //Initialization of token 
    const token = "pk.eyJ1IjoidXJiYW5tYXRyaXgiLCJhIjoiY2tqa3ppbTlzMW5jbzMwcW91dnN5YmxzYSJ9.zg8JJCbckTlnAaZdJvNN5A";
    
    //Initialization of geocoding Client
    const geocodingClient = mapboxSdk({ accessToken: token });

    const [showList ,setShowList] = useState(false);
    
    //Sets details of marker
    const [marker ,setMarker] = useState([]);
     
    //Sets viewport for map
    const [viewport ,setViewport] = useState({
        latitude : 23.816189853778024,
        longitude :  86.4408162166436,
        width :  '100vw',
        height : '100vh',
        zoom : 12
    });

    
    const getCoordinates = (event) => {
        //Reverse geocoding using map box api through mapboxsdk which takes lngLat as input and return place details
        //Here, we get lngLat from onclick event handler
        geocodingClient
            .reverseGeocode({
                query: [event.lngLat[0], event.lngLat[1]]
            })
            .send()
            .then(response => {
                if (response && response.body && response.body.features && response.body.features.length) {
                    const feature = response.body.features[0];
                    //pushing marker details to marker array of object
                    setMarker(arr => [...arr ,{
                        latitude : event.lngLat[1],
                        longitude : event.lngLat[0],
                        place_name: feature.text,
                        address : feature.place_name,
                        category : feature.properties.category,
                        bookmark : false
                    }]);                    
                }
            })
            .catch(err => {
                console.error(err.message);
            });
    }

    //This method delete a particular marker from marker array
    const handleDelete = (dataToDelete) => () => {
        setMarker((marker) => marker.filter((data) => data.latitude !== dataToDelete.latitude));
    };

    //This method sets updated viewport
    const changeViewport = (viewport) => {
        setViewport(viewport);
    }
    
    //This method is useful for adding bookmark to a particular marker point
    const addToBookmark = (latitude) => () => {
        const updatemarker = marker.map((data) => {
            if(data.latitude === latitude){
                return {...data , bookmark : !data.bookmark};
            }
            return data;
        });
        setMarker(updatemarker);
    }
    
    //This method is useful for zooming to particular place 
    const goToMarker= (data) => () => {
        setViewport({
            ...viewport,
            latitude : data.latitude,
            longitude : data.longitude,
            zoom : 12,
            transitionDuration: 4000,
            transitionInterpolator: new FlyToInterpolator(), 
        });
        setShowList(false);
    }

    const openList = () => {
        setShowList(true);
    }

    const closeList = () => {
        setShowList(false);
    }

    return (
        <ThemeProvider theme={theme}>
             <Global
                styles={css`
                body {
                    margin: 0 !important;
                }
                `}
            />
            <Grid container>
                
                <Map marker={marker} viewport={viewport} matches={matches} getCoordinates={getCoordinates} changeViewport={changeViewport} goToMarker={goToMarker} />
                {(showList) ?  <ListComponent marker={marker} addToBookmark={addToBookmark} handleDelete={handleDelete} goToMarker={goToMarker}  closeList={closeList} /> : 
                        <IconButton style={{position : 'absolute', right: 5 ,top: 15,}} onClick={openList}> 
                            <Avatar sx={{ bgcolor: pink[500] , width: 45, height: 45 }} >
                                <MenuOpenOutlinedIcon ></MenuOpenOutlinedIcon>
                            </Avatar>
                        </IconButton>
                } 
                </Grid> 
        </ThemeProvider>
    )
}

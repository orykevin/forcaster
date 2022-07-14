import React,{useState,useEffect} from 'react'

function useGeoLocation() {
    const [location,setLocation] =useState({
        loaded: false,
        cordinates : {lat: "", long: ""},
    })

    const onSuccess = (location) => {
        setLocation({
            loaded : true,
            cordinates : {
                lat : location.coords.latitude,
                long : location.coords.longitude,
            }
        })
    }
    const onError = (error) => {
        setLocation({
            loaded: true,
            error: {
                code: error.code,
                message: error.message,
            },
        });
    };

    useEffect(()=>{
        if(!("geolocation" in navigator)){
            onError({
                code:0,
                message: "Geolocation not Supported",
            })
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    },[]);

  return location;
}

export default useGeoLocation
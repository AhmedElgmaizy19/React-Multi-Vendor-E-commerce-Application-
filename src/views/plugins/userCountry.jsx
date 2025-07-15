import { useState , useEffect } from "react";

function userCountry() {
    const [add , setAdd] = useState('')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos)=>{
            const {latitude , longtiude} = pos.coords

            const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longtiude}&localityLanguage=en`
            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    setAdd(data.countryName)
                })
                .catch((err) => {
                    console.error("Error fetching location data:", err);
                    setAdd('Location not available')
                })

        })
    },[]) 

    return add
    
}

export default userCountry
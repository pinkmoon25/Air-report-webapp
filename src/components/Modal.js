import ReactModal from "react-modal";
import { useEffect, useState } from "react";

const Modal = ()=>{
    const [open, setIsOpen] = useState(false);
    const[latitude, setLatitude] = useState(null);
    const[longitude, setLongitude] = useState(null);

    const handleClick = ()=>{
        setIsOpen(true)

    }

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
        console.log(latitude, longitude);
    }, [])

    return(
    <div>
        <button onClick={handleClick}>
            current location data
        </button>
        <ReactModal isOpen={open}>
            <h2>Modal</h2>
            <button onClick={()=> setIsOpen(false)}>close</button>
        </ReactModal>
    </div>
        
    )
};

export default Modal;

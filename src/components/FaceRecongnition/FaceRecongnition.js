import React from 'react';
import './FaceRecongnition.css';


const FaceRecongnition = ({imageUrl,Facebox}) => {

     
    return(
        <div className='center ma'>
            <div className='absolute mt4'>
                <img id='inputImg' src={imageUrl} alt="" width='500px' height='auto'/> 
                <div className='bounding-box' style={{top: Facebox.topRow, right: Facebox.rightCol, bottom: Facebox.bottomRow, left: Facebox.leftCol}}></div>
            </div>
        </div>  
        );

}


export default FaceRecongnition;
import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onSubmitButton}) => {

    return (<div>
        <p className='f4 white'>
            {'This Magic Brain will detect faces in your pictures. give it a try'}
        </p>
        <div className='center'>
            <div className='form center pa4 be3 shadow-5'>
                <input className='f3 pa2 w-70 center' 
                    type='text' 
                    onChange={onInputChange} />
                <button className='w-30 grow f4 link ph3 pv2 deb white bg-light-purple'
                 onClick={onSubmitButton}>Detect</button>
            </div>    
        </div>
    </div>);
}

export default ImageLinkForm;
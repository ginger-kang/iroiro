import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FileUploadContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

function ImageUpload () {

    //It sends a request to upload to the server by storing the file object in the state
    const [ uploadedFile, setUploadedFile ] = useState('');
    const uploadInput = useRef(null);

    //Post request to server when submitted 
    const handleSubmit = ( e: any ) => {
        e.preventDefault();
        const imageData = new FormData();
        imageData.append("file", uploadedFile);

        //request
        axios.post(
            'S3 업로드할 url',
            imageData
        ).then((res) => {
            console.log(res.data);
        }).catch((error) => {
            console.log(error);
        });
    } 

    const handleClick = ( e: any ) => {
        console.log(e.target);
    };
    
    const handleChange = ( e: any ) => {
        const uploadedFile = e.target.files[0];
    };

    return (
        <FileUploadContainer>
            {/* <input type='file' name='file' onChange={ handleChange }/>
            <button type='button' onClick={ handleClick }/> */}

            <form action="/upload" encType='multipart/form-data' onSubmit={ handleSubmit }>
                <input
                    ref={ uploadInput }
                    type='file'
                    onChange={ handleChange }
                    // style={{
                    //     display: 'none'
                    // }}
                />
                <button type="submit">
                    Upload
                </button>
            </form>
        </FileUploadContainer>
    );
}

export default ImageUpload;
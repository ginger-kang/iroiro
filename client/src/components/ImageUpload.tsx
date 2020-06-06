import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import axios from 'axios';
import uploadIcon from '../Images/uploadIcon.png'


const FileUploadContainer = styled.div`
    width: 20vw;
    height: 100%;
    display: flex;
`;

const Edit = styled.div`
    z-index: 1;
`;

const Upload = styled.div`
    position: relative;
    max-width: 205px;
    margin: 50px auto;
`;

const Input = styled.input`
    display: none;
`;

const Preview = styled.div`
    width: 192px;
    height: 192px;
    position: relative;
    border-radius: 100%;
    border: 6px solid #F8F8F8;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
`;
const Label = styled.label`
    for:imageUpload
    display: inline-block;
    width: 34px;
    height: 34px;
    margin-bottom: 0;
    border-radius: 100%;
    background: #FFFFFF;
    border: 1px solid transparent;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    font-weight: normal;
    transition: all .2s ease-in-out;
        
    &:hover {
        background: #f1f1f1;
        border-color: #d6d6d6;
    }
    &:after {
        icon: ;
        font-family: 'fontawesome';
        color: #757575;
        position: absolute;
        top: 10px;
        left: 0;
        right: 0;
        text-align: center;
        margin: auto;
    }
`;




function ImageUpload() {

    //It sends a request to upload to the server by storing the file object in the state
    const FileUpload = () => {
        console.log(11);
        const [uploadedFile, setUploadedFile] = useState('');
        const [image, setImage] = useState({ preview: "", raw: "" });
    
        //Post request to server when submitted 
        const handleSubmit = (e: any) => {
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
    
        const handleClick = (e: any) => {
            console.log(e.target);
        };
    
        const handleChange = (e: any) => {
            if (e.target.files.length) {
              setImage({
                preview: URL.createObjectURL(e.target.files[0]),
                raw: e.target.files[0]
              });
            }
          };
    
    const uploadInput = useRef(null);
    return (
        <FileUploadContainer>
            <Upload>
                <Edit>                    
                    <Label htmlFor='imageUpload'>                        
                    </Label>
                    <Input type='file' id='imageUpload' onChange={handleChange} style={{display:'none'}}/>                    
                </Edit>
                <Preview>
                </Preview>
            </Upload>

        </FileUploadContainer>
    );
}
}

export default ImageUpload;
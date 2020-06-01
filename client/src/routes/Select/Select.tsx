import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ImageUpload from '../../components/ImageUpload';
import  { USEREXIST } from '../Game/query';
import { Query } from "react-apollo"
import { useQuery } from '@apollo/react-hooks';
import GameLoading from '../../components/GameLoading';
import ErrorPage from '../../components/ErrorPage';

const SelectPageContainer = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ImageUploadContainer = styled.div`
    width: 400px;
    height: 150px;
    background: rgba(0,0,0,.3);
`;

const StartButton = styled.button`
    width: 200px;
    padding: 7px;
    margin-top: 50px;
    border-radius: 10px;
    font-size: 27px;
    font-weight: 800;
    color: white;
    background: rgba(0,0,0,0.3);
    transition: all 0.1s;

    &:hover {
        -ms-transform: scale(1.1);
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
`;

function SelectMenu() {
    // let userId = window.sessionStorage.getItem('id');
    // // userId = "moonseok";
    // const { loading, error, data } = useQuery(USEREXIST, {
    //     variables: {userId},
    // });

    // if (loading) return <GameLoading />;
    // if (error) return <ErrorPage />
    return (

        <SelectPageContainer>
            <ImageUploadContainer>
                <ImageUpload />
            </ImageUploadContainer>
            <Link to="/game">
                <StartButton>
                    START
                </StartButton>
            </Link>
        </SelectPageContainer>

                
    );
    /*return (
        <SelectPageContainer>
            <ImageUploadContainer>
                <ImageUpload />
            </ImageUploadContainer>
            <Link to="/game">
                <StartButton>
                    START
                </StartButton>
            </Link>
        </SelectPageContainer>
    );*/

}

export default SelectMenu;
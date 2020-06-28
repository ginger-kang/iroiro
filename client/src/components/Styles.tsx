import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineAppstore } from 'react-icons/ai';
import { PHOTOS } from '../query';
import { Query, Mutation } from 'react-apollo';
import GameLoading from '../components/GameLoading';
import ErrorPage from '../components/ErrorPage';
import StylesPhotos from './StylesPhotos';

const StylesContainer = styled.section`
  width: 100%;
  background: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StylesNavContainer = styled.nav`
  width: 100%;
  height: 53px;
  min-height: 50px;
  position: relative;
  background: #efefef;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const StylePhotoWrapper = styled.section`
  width: 85%;
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

function Styles() {
  const [layoutNumber, setLayoutNumber] = useState(6);

  return (
    <Query
      query={PHOTOS}
      notifyOnNetworkStatusChange={true}
      fetchPolicy={'cache-and-network'}
    >
      {({ loading, error, data }: any) => {
        if (loading) {
          return <GameLoading />;
        }
        if (error) {
          return <ErrorPage />;
        }
        if (data) {
          console.log(data);
        }
        return (
          <StylesContainer>
            <StylesNavContainer>
              <AiOutlineAppstore size={30} />
            </StylesNavContainer>
            <StylePhotoWrapper>
              {data &&
                data.Photos.map((photo: any) => (
                  <StylesPhotos PhotoData={photo} layoutNumber={layoutNumber} />
                ))}
            </StylePhotoWrapper>
          </StylesContainer>
        );
      }}
    </Query>
  );
}

export default Styles;

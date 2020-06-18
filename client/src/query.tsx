import gql from 'graphql-tag';

export const PHOTOS = gql`
  {
    Photos {
      url
      category
      owner
    }
  }
`;

export const USER_EXIST = gql`
  query getUser($userId: String!) {
    User(userId: $userId) {
      userId
      userNickName
      userInstagram
    }
  }
`;

export const CONTEST = gql`
  query getContest($round: Int!) {
    Contest(round: $round) {
      url
      owner
      instagram
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $userId: String!
    $userName: String!
    $userNickName: String!
    $userInstagram: String!
  ) {
    CreateUser(
      userId: $userId
      userName: $userName
      userNickName: $userNickName
      userInstagram: $userInstagram
    ) {
      userId
      userName
      userNickName
      userInstagram
    }
  }
`;

export const SET_USER_INFO = gql`
  mutation SetUserInfo($userId: String!, $userNickName: String!, $userInstagram: String!) {
    SetUserInfo(userId: $userId, userNickName: $userNickName,userInstagram: $userInstagram) {
      userId
      userNickName
      userInstagram
    }
  }
`;

export const SET_USER_INSTAGRAM = gql`
  mutation SetUserInstagram($userId: String!, $userInstagram: String!) {
    SetUserInstagram(userId: $userId, userInstagram: $userInstagram) {
      userId
      userInstagram
    }
  }
`;

export const UPLOAD_PHOTO = gql`
  mutation UploadPhoto(
    $owner: String!
    $category: String!
    $originalname: String!
    $uploadDate: String!    
  ) {
    UploadPhoto(
      owner: $owner
      category: $category
      originalname: $originalname
      uploadDate: $uploadDate
    ) {
      owner
    }
  }
`;

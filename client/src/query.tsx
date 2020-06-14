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
    }
  }
`;


export const CONTEST = gql`
  query getContest($round: Int!){
    Photos(round: $round){
      url
    }
  }
  `;

export const CREATE_USER = gql`
  mutation CreateUser(
    $userId: String!
    $userName: String!
    $userNickName: String!
  ) {
    CreateUser(
      userId: $userId
      userName: $userName
      userNickName: $userNickName
    ) {
      userId
      userName
      userNickName
    }
  }
`;

export const SET_USER_NICKNAME = gql`
  mutation SetUserNickName($userId: String!,$userNickName: String!) {
  SetUserNickName(userId: $userId, userNickName:$userNickName) {
    userId    
    userNickName
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

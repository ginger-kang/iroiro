import gql from 'graphql-tag';

export const PHOTOS = gql`
  {
    Photos {
      url
      category
      owner
      detail{
        top{
          name
          price
        }
        bottom{
          name
          price
        }
        shoes{
          name
          price
        }
      } 
    }
  }
`;

export const USER_EXIST = gql`
  query getUser($userId: String) {
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
  mutation SetUserInfo(
    $userId: String!
    $userNickName: String!
    $userInstagram: String!
  ) {
    SetUserInfo(
      userId: $userId
      userNickName: $userNickName
      userInstagram: $userInstagram
    ) {
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
export const UPLOAD_PHOTO_FOR_GAME = gql`
  mutation UploadPhotoForGame(
    $owner: String!
    $category: String!   
    
    $instagram: String!
    $top1:String!
    $top2:String!
    $bottom1:String!
    $bottom2:String!
    $shoes1:String!
    $shoes2:String!   
  ) {
    UploadPhotoForGame(
      owner: $owner
      category: $category      
      
      top1:$top1
      top2:$top2
      bottom1:$bottom1
      bottom2:$bottom2
      shoes1:$shoes1
      shoes2:$shoes2
      instagram:$instagram
    ) {
      owner
    }
  }
`;
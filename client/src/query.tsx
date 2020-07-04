import gql from 'graphql-tag';

export const PHOTOS = gql`
  {
    Photos {
      url
      category
      owner
      instagram
      detail {
        top {
          name
          price
        }
        bottom {
          name
          price
        }
        shoes {
          name
          price
        }
      }
    }
  }
`;
export const FINDGAMEPHOTOS = gql`
  {
    FindStyleGamePhotos {
      url
      gender
      instagram
      likeNum
}
  }
`;

export const USER_EXIST = gql`
  query getUser($userId: String) {
    User(userId: $userId) {
      userId
      userName
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
    $id: String!
    $owner: String!
    $category: String!
    $instagram: String!
    $url: String!
    $top1: String!
    $top2: Int!
    $bottom1: String!
    $bottom2: Int!
    $shoes1: String!
    $shoes2: Int!
  ) {
    UploadPhotoForGame(
      owner: $owner
      category: $category
      id: $id
      url: $url
      top1: $top1
      top2: $top2
      bottom1: $bottom1
      bottom2: $bottom2
      shoes1: $shoes1
      shoes2: $shoes2
      instagram: $instagram
    ) {
      owner
    }
  }
`;

export const UPLOAD_PHOTO_FOR_FIND_STYLE_GAME = gql`
  mutation UploadPhotoForFindStyleGame(
    $id: String!
    $gender: String!
    $instagram: String!
    $url: String!
    $likeNum: Int!
  ) {
    UploadPhotoForFindStyleGame(
      id: $id
      gender: $gender
      instagram: $instagram
      url: $url
      likeNum: $likeNum
    ) {
      instagram
    }
  }
`;

import gql from "graphql-tag";

export const PHOTOS = gql`
  {
    Photos{
      url
      category
      owner
    }
  }
`;

export const USER_EXIST = gql`
  query getUser($userId: String!){
  User(userId: $userId){
    userId
  
  }
}
`;

export const CREATE_USER = gql`
  mutation CreateUser($userId: String!,$userName: String!) {
  CreateUser(userId: $userId, userName: $userName) {
    userId
    userName
  }
}
`;

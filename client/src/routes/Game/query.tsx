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

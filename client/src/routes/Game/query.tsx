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

export const USEREXIST  = gql`
  query USEREXIST($userId: any) {
    AllUsers(userId: $userId){
      userId
    }
  }
`;
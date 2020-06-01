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

export const USEREXIST = ({userId}) =>gql`
{
  AllUsers(userId:${userId}{
    userId
  }

}
`;
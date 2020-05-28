import gql from "graphql-tag";

export const PHOTOS = gql`
  {
    photos{
      url
      category
      owner
    }
  }
`;
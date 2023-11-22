import { gql } from '@apollo/client';

export const GET_DATA = gql`
  query {
    getAllList{
      key
      title
      sort
    },
    getAllCard{
      id
      text
      editMode
      created
      updated
    }
  }
`;

export const CREATE_LIST = gql`
  mutation CreateList($title: String!){
    createList(title: $title) {
      list {
        id
        key
        title
        sort
        created
        updated
      }
    }
  }
`
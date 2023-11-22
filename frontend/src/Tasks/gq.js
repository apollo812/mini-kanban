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
        key
        title
        sort
      }
    }
  }
`

export const CREATE_CARD = gql`
  mutation CreateCard($id: String!, $listId: String!, $text: String!){
    createCard(id: $id, listId: $listId, text: $text) {
      card {
        id
        key
        listId
        index
        text
        editMode
        created
        updated
      }
    }
  }
`
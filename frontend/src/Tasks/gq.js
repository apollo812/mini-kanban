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
      index
      editMode
      created
      updated
      listId
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

export const CARD_INDEX_DRAG = gql`
  mutation CardIndexDrag($listId: String!, $cardPos: Int!, $targetPos: Int!){
    cardIndexDrag(listId: $listId, cardPos: $cardPos, targetPos: $targetPos) {
      cards {
        text
        index
      }
    }
  }
`

export const CARD_INDEX_DRAG_TO_OTHER = gql`
  mutation CardIndexDragToOther($cardListId: String!, $targetListId: String!, $cardPos: Int!, $targetPos: Int!){
    cardIndexDragToOther(cardListId: $cardListId, targetListId: $targetListId, cardPos: $cardPos, targetPos: $targetPos) {
      cards {
        text
        index
      }
    }
  }
`

export const DELETE_CARD = gql`
  mutation DeleteCard($id: String!) {
    deleteCard(id: $id){
      card
    }
  }
`

export const DELETE_LIST = gql`
  mutation DeleteList($id: String!) {
    deleteList(id: $id){
      list
    }
  }
`

export const UPDATE_LIST = gql`
  mutation UpdateList($id: String!, $sort: String!){
    updateList(id: $id, sort: $sort) {
      list {
        id
        title
        sort
      }
    }
  }
`
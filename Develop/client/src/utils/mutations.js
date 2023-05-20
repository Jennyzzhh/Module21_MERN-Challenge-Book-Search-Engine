import { gql } from "apollo-server-express";

export const LOGIN = gql`
mutation login(email:String!,password:String! ){
    login(email:$email, password:$password){
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            image
            link
            title
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser(username:String!,email:String!,password:String!){
    addUser(username:$username,email:$email,password:$password){
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            image
            link
            title
        }
    }
}
`
export const SAVE_BOOK = gql`
mutation saveBook(authors:[String!], description:String!,title:String!,image:String!,link:String!){
    saveBook(authors:$authors, description:$description,title:$title,image:$image,link:$link){
            bookId
            authors
            description
            image
            link
            title
        }
    }
}
`

export const REMOVE_BOOK= gql`
mutation removeBook(bookId:String!){
    removeBook(bookId:$bookId){
            bookId
            authors
            description
            image
            link
            title
        }
    }
}
`




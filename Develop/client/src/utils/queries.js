import { gql } from "apollo-server-express";

export const GET_ME = gql `
query getMe {
    me {
        _id
        username
        email
        bookCount
        savedBooks
    }
}
`;
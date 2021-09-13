import { gql } from "@apollo/client";

export const FETCH_USER = gql`
    query {
        users {
            name
            email
            _id
        }
    }
`;

export const FETCH_BATCH = gql`
    query Batch {
        batch {
            _id
            name
            phase
        }
    }
`;

export const BLOCKED_USER = gql`
    query BlockedUser {
        blockedUser @client
        messageUser @client
    }
`;

export const FAVORITE_USER = gql`
    query {
        favUserQuery @client
    }
`;

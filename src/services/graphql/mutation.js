import { gql } from "@apollo/client";

export const ADD_USER_MUTATION = gql`
    mutation addUser($user: InputUser) {
        addUser(input: $user) {
            email
            name
        }
    }
`;

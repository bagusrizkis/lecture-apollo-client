import { ApolloClient, InMemoryCache } from "@apollo/client";
import { dataBlockedUser } from "../cache/reactiveVar";
import { FAVORITE_USER } from "../query";

const client = new ApolloClient({
    uri: "http://localhost:4000",
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    // blockedUser: () => {
                    //     return dataBlockedUser();
                    // },
                    blockedUser: {
                        read() {
                            return dataBlockedUser();
                        },
                    },
                    messageUser: () => "Hello Blocked User",
                },
            },
        },
    }),
});

client.writeQuery({
    query: FAVORITE_USER,
    data: {
        favUserQuery: [10, 12, 13],
    },
});

export default client;

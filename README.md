# Apollo Client

-   Mengimplementasikan GraphQl, Query, dan Mutation di sisi client
-   Menggunakan client state yang ada di apollo
-   Mengambil data menggunakan query ke client state

## Todo

-   [x] buat services/graphql/config

    ```js
    import {
        ApolloClient,
        InMemoryCache,
        ApolloProvider,
        useQuery,
        gql,
    } from "@apollo/client";

    const client = new ApolloClient({
        uri: "",
        cache: new InMemoryCache(), // sesi berikutnya
    });
    ```

-   [x] Connect client ke react menggunakan <ApolloProvider>
-   [x] Fetch data dengan `useQuery()` dan membuat query dengan gql
-   [x] Mutation data dengan `useMutation()` dan refetchQuery

---

Client State

-   [x] 1.a. Reactive Variable (mirip reducers di redux)
        (https://www.apollographql.com/docs/react/local-state/reactive-variables/)

    ```js
    import { makeVar } from "@apollo/client";

    const message = makeVar("");
    ```

-   [x] 2.b. local-only fields (query dengan `@client`) & inMemoryCache() typePolicies
-   [ ] 3. client.writeQuery
-   [ ] Pakai secara langsung di writeQuery

    ```js
    client.writeQuery({
        quer: [],
    });
    ```

-   [ ] Modify refetchQuery
    ```js
    onComplete in useQuery;
    ```

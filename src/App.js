import {
    useMutation,
    useQuery,
    useReactiveVar,
    useApolloClient,
} from "@apollo/client";
import { useState } from "react";
import { ADD_USER_MUTATION } from "./services/graphql/mutation";
import {
    FETCH_USER,
    BLOCKED_USER,
    FAVORITE_USER,
} from "./services/graphql/query";
import {
    dataAddUserVar,
    message,
    dataBlockedUser,
} from "./services/graphql/cache/reactiveVar";

function App() {
    const client = useApolloClient();

    const [input, setInput] = useState({});

    const userQuery = useQuery(FETCH_USER);
    const {
        data: blockedData,
        loading: blockedLoading,
        error: blockedError,
    } = useQuery(BLOCKED_USER);
    const {
        data: favData,
        loading: favLoading,
        error: favError,
    } = useQuery(FAVORITE_USER);

    const [addNewUser, newUserData] = useMutation(ADD_USER_MUTATION, {
        // refetchQueries: [FETCH_USER],
        // onCompleted: async (data) => {
        //     const newData = await newUserData;
        //     console.log(newData);
        //     // pengin push halaman dll
        //     const dataUser = client.readQuery({ query: FETCH_USER });
        //     const newUser = [...dataUser.users, data.addUser];
        //     client.writeQuery({
        //         query: FETCH_USER,
        //         data: {
        //             users: newUser,
        //         },
        //     });
        // },
    });

    if (userQuery.loading) return <p>Loading....</p>;

    if (userQuery.error) return <p>Sorry.. Failed to fetch data....</p>;

    const handleChangeInput = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addNewUser({ variables: { user: input } });
    };

    const addUserToBookmark = (props) => {
        // console.log(props);
        dataAddUserVar([...dataAddUserVar(), props]);
    };

    const addUserToBlocked = (props) => {
        dataBlockedUser([...blockedData.blockedUser, props._id]);
    };

    const addUserToFav = (props) => {
        client.writeQuery({
            query: FAVORITE_USER,
            data: {
                favUserQuery: [...favData.favUserQuery, props._id],
            },
        });
    };

    return (
        <div className="App">
            {/* <pre>{JSON.stringify(userQuery.data, null, 4)}</pre> */}
            <h2>User data</h2>
            {/* <p>{JSON.stringify(input)}</p> */}
            <form onSubmit={(e) => handleSubmit(e)}>
                <input name="name" type="text" onChange={handleChangeInput} />
                <input name="email" type="text" onChange={handleChangeInput} />
                <input type="submit" />
            </form>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: "100px" }}>Name</th>
                        <th style={{ width: "150px" }}>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userQuery.data.users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => addUserToBookmark(user)}>
                                    Add Bookmark
                                </button>
                                <button onClick={() => addUserToBlocked(user)}>
                                    Add Block
                                </button>
                                <button onClick={() => addUserToFav(user)}>
                                    Add Fav
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <FavUserPage />
            <hr />
            <BlockedUserPage />
            <hr />
            <AddedUserPage />
        </div>
    );
}

export default App;

function AddedUserPage() {
    const bookmarkedUser = useReactiveVar(dataAddUserVar);
    return (
        <div>
            <h2>Add User page</h2>
            <h2>{message()}</h2>
            <pre>{JSON.stringify(bookmarkedUser, null, 4)}</pre>
        </div>
    );
}

function BlockedUserPage() {
    const {
        data: blockedData,
        loading: blockedLoading,
        error: blockedError,
    } = useQuery(BLOCKED_USER);

    return (
        <div>
            <h2>Blocked User page</h2>
            <pre>{JSON.stringify(blockedData, null, 4)}</pre>
        </div>
    );
}

function FavUserPage() {
    const {
        data: favData,
        loading: favLoading,
        error: favError,
    } = useQuery(FAVORITE_USER);

    return (
        <div>
            <h2>Favorite User page</h2>
            <pre>{JSON.stringify(favData, null, 4)}</pre>
        </div>
    );
}

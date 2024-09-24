import './App.css';
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";
import { useState, useEffect } from "react";

function App() {
    const [users, setUsers] = useState([]); // Store user data
    const [refresh, setRefresh] = useState(false); // Trigger refresh for user list

    // Trigger a refresh for UserList when a user is created
    const handleUserCreated = () => {
        setRefresh(!refresh); // Change the state to trigger a re-fetch in UserList
    };

    return (
        <>
            <CreateUser users={users} setUsers={setUsers} onUserCreated={handleUserCreated} />
            <UserList users={users} setUsers={setUsers} refresh={refresh} />
        </>
    );
}

export default App;

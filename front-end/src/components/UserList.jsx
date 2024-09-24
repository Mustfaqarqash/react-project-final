import { useState, useEffect } from "react";

export default function UserList() {
    const [users, setUsers] = useState([]); // Store user data
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/users`);
                const result = await response.json();

                // The actual user data is inside result.data
                setUsers(result.data);
                setLoading(false); // Data loaded
            } catch (error) {
                console.error("Error fetching users:", error);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Show loading state
    }

    return (
        <>
            {users && users.length > 0 ? (
                users.map((user) => (
                    <p key={user.id}>{user.name}</p>
                ))
            ) : (
                <p>No users available</p>
            )}
        </>
    );
}

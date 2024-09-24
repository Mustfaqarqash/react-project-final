import { useState } from "react";
import axios from "axios";

export default function CreateUser({ users, setUsers, onUserCreated }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // API call to create a new user
            const response = await axios.post("http://127.0.0.1:8000/api/users", {
                name,
                email,
                password,
            });

            if (response.status === 201) {
                const newUser = response.data; // Get the newly created user

                // Update users array in the parent
                setUsers([...users, newUser]);

                // Notify UserList that a new user is created
                onUserCreated();

                // Reset form fields and show success message
                setName("");
                setEmail("");
                setPassword("");
                setSuccess(true);
                setError(null);
            }
        } catch (error) {
            console.error("Error creating user:", error);
            setError(error.response?.data?.message || "Something went wrong");
            setSuccess(false);
        }
    };

    return (
        <div>
            <h2>Create New User</h2>
            {success && <p style={{ color: "green" }}>User created successfully!</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Create User</button>
            </form>
        </div>
    );
}

import { useState, useEffect } from "react";
import useFetchData from "../function/useFetchData"; // Import the custom hook

export default function UserList({ users, setUsers, refresh }) {
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track error state
    const [pagination, setPagination] = useState({}); // Store pagination data
    const [currentPage, setCurrentPage] = useState(1); // Track the current page

    // API URL dynamically changes based on the current page
    const apiUrl = `http://127.0.0.1:8000/api/users?page=${currentPage}`;

    // Use the custom hook for fetching data
    useFetchData(apiUrl, setUsers, setLoading, setError, setPagination);

    // Re-fetch data whenever the refresh prop changes

    useFetchData(apiUrl, setUsers, setLoading, setError, setPagination ,refresh );


    const handleNextPage = () => {
        if (pagination.next_page_url) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (pagination.prev_page_url) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    if (loading) {
        return <p>Loading...</p>; // Show loading state
    }

    if (error) {
        return <p>Error: {error}</p>; // Show error message
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

            {/* Pagination Controls */}
            <div>
                <button
                    onClick={handlePrevPage}
                    disabled={!pagination.prev_page_url}
                >
                    Previous
                </button>
                <span>Page {pagination.current_page} of {pagination.last_page}</span>
                <button
                    onClick={handleNextPage}
                    disabled={!pagination.next_page_url}
                >
                    Next
                </button>
            </div>
        </>
    );
}

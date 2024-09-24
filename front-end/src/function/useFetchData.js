import { useEffect } from "react";
import axios from "axios";

function useFetchData(Api, setArray, setLoading, setError, setPagination , refresh) {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(Api); // Use axios to fetch data


                setArray(response.data); // Update users array with data from API
                setPagination({
                    current_page: response.data.current_page,
                    next_page_url: response.data.next_page_url,
                    prev_page_url: response.data.prev_page_url,
                    last_page: response.data.last_page,
                });
                setLoading(false); // Stop loading after data is fetched
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error.message); // Set error message on failure
                setLoading(false); // Stop loading even if an error occurs
            }
        };

        fetchData(); // Fetch data when the component mounts or when Api changes
    }, [Api , refresh]); // Re-fetch if the API URL changes
}

export default useFetchData;

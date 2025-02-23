import { useState } from "react";
import { useEffect } from "react";

function useFetch(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const result = await response.json();
                setData(result);
            } catch(err) {
                setError(err);
            } finally {
                setLoading(false);
            }
            
        };
        
        fetchData();
    }, [])

    return {data, loading, error}
}

export default useFetch;
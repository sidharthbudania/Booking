import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            setLoading(true);
            setError(false);
            try {
                const res = await axios.get(url, {
                    headers: {
                        "Cache-Control": "no-cache, no-store, must-revalidate",
                        Pragma: "no-cache",
                        Expires: "0",
                    },
                });
                if (isMounted) {
                    setData(res.data);
                }
            } catch (err) {
                if (isMounted) {
                    setError(true);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
            
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url]);

    const reFetch = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await axios.get(url, {
                headers: {
                    "Cache-Control": "no-cache, no-store, must-revalidate",
                    Pragma: "no-cache",
                    Expires: "0",
                },
            });
            setData(res.data);
        } catch (err) {
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, reFetch };
};

export default useFetch;

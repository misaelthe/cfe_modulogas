import { useEffect, useState } from "react";


export const FetchData = (url: RequestInfo) => {
    
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch(url);
            const jsonData = await resp.json();
            setData(jsonData);
       };

        fetchData()
    }, [url])

    return data;
};
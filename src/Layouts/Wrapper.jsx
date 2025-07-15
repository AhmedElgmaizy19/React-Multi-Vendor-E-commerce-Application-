import { useState , useEffect } from "react";
import { setUser } from "../utils/auth";


export default function Wrapper({children}) {
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        const handler = async () => {
            await setUser();
            setLoading(false);
        };

        handler();
    }, []);
  return (
    <>{loading ? null : children}</>
  );
}


import {useState, useEffect} from "react"
import {myFirebaseAuth} from "../firebase/config";
import {useAuthContext} from "./useAuthContext";

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const {dispatch} = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);
        try {
            await myFirebaseAuth.signOut();
            dispatch({type: "LOGOUT"})
            if (!isCancelled) {
                setError(null);
                isPending(false);
            }
        }
        catch (err) {
            if (!isCancelled) {
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return {logout, error, isPending}
}
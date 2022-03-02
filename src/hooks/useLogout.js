import {useState} from "react"
import {myFirebaseAuth} from "../firebase/config";
import {useAuthContext} from "./useAuthContext";

const useLogout = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const {dispatch} = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);
        try {
            await myFirebaseAuth.signOut();
            dispatch({type: "LOGOUT"})
            setError(null);
            isPending(false);
        }
        catch(err){
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        }
    }
    
    return {logout, error, isPending}
}
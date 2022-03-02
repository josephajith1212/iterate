import {useState} from "react"
import {myFirebaseAuth} from "../firebase/config";
import {useAuthContext} from "./useAuthContext";


export const useFirebaseSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const {dispatch} = useAuthContext();

    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            const res = await myFirebaseAuth.createUserWithEmailAndPassword(email, password);
            // console.log(res.user);
            if (!res) throw new Error('Sorry, Signup failed!')
            else await res.user.updateProfile({displayName})
            //dispatch login action
            dispatch({type: "LOGIN", payload: res.user})
            setError(null)
            setIsPending(false)
        }
        catch (err) {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        }

    }

    return {error, isPending, signup}
}
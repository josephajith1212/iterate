import {useState} from 'react'
import {myFirebaseAuth, projectAuth} from '../firebase/config'
import {useAuthContext} from './useAuthContext'

export const useFirebaseLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await myFirebaseAuth.signInWithEmailAndPassword(email, password);
            dispatch({type: 'LOGIN', payload: res.user});
            setIsPending(false);
            setError(null);
        }
        catch (err) {
            setError(err.message);
            setIsPending(false);
        }
    }

    return {login, isPending, error}
}
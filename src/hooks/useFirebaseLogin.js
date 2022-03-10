import {useState, useEffect} from 'react'
import {myFirebaseAuth, myFirestore} from '../firebase/config'
import {useAuthContext} from './useAuthContext'

export const useFirebaseLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)

        try {
            const res = await myFirebaseAuth.signInWithEmailAndPassword(email, password);
            const documentRef = myFirestore.collection('users').doc(res.user.uid);
            await documentRef.update({online: true});
            dispatch({type: 'LOGIN', payload: res.user});
            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        }
        catch (err) {
            if (!isCancelled) {
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true);
    }, [])

    return {login, isPending, error}
}
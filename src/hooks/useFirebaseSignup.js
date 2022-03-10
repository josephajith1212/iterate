import {useState, useEffect} from "react"
import {myFirebaseAuth, myFirebaseStorage, myFirestore} from "../firebase/config";
import {useAuthContext} from "./useAuthContext";


export const useFirebaseSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const {dispatch} = useAuthContext();

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null);
        setIsPending(true);

        try {
            const res = await myFirebaseAuth.createUserWithEmailAndPassword(email, password);
            // console.log(res.user);
            if (!res) throw new Error('Sorry, Signup failed!');

            const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
            const uploadedThumbnail = await myFirebaseStorage.ref(uploadPath).put(thumbnail);
            const thumbnailURL = await uploadedThumbnail.ref.getDownloadURL();

            await res.user.updateProfile({displayName, photoURL: thumbnailURL});
            await myFirestore.collection("users").doc(res.user.uid).set({
                online: true,
                displayName,
                photoURL: thumbnailURL
            })
            //dispatch login action
            dispatch({type: "LOGIN", payload: res.user});

            if (!isCancelled) {
                setError(null);
                setIsPending(false);
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
        return () => setIsCancelled(true);
    }, [])

    return {error, isPending, signup}
}
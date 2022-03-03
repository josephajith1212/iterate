import {useState} from "react"
import {myFirebaseAuth, myFirebaseStorage, myFirestore} from "../firebase/config";
import {useAuthContext} from "./useAuthContext";


export const useFirebaseSignup = () => {
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
            //dispatch login action
            dispatch({type: "LOGIN", payload: res.user});
            setError(null);
            setIsPending(false);
        }
        catch (err) {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        }

    }

    return {error, isPending, signup}
}
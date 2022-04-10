import {useState} from "react";
import {useFirebaseSignup} from "../../hooks/useFirebaseSignup";

// styles
import "./signup.css";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailError, setThumbnailError] = useState(null)
    const {error, isPending, signup} = useFirebaseSignup()

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, displayName, thumbnail);
    };
    const handleFileSubmit = (e) => {
        setThumbnail(null);
        let selected = e.target.files[0];
        console.log(selected);

        if (!selected) {
            setThumbnailError('Please select an image for thumbnail');
            return
        }
        if (!selected.type.includes('image')) {
            setThumbnailError('Selected file must be an image');
            return
        }
        if (selected.size > 100000) {
            setThumbnailError('Image file size must be less than 100kb');
            return
        }
        setThumbnailError(null);
        setThumbnail(selected);
        // console.log('thumbnail updated')
    }
    return (
        <form onSubmit={handleSubmit} className='signupSignin-form'>
            <h2>Sign Up</h2>
            <label>
                <span>Email:</span>
                <input
                    required
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>Password:</span>
                <input
                    required
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>Display Name:</span>
                <input
                    required
                    type='text'
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={displayName}
                />
            </label>
            <label>
                <span>Profile Thumbnail:</span>
                <input required type='file' onChange={handleFileSubmit} />
                {thumbnailError && <div className="error">{thumbnailError}</div>}
            </label>
            {!isPending && <button className='btn'>Sign up</button>}
            {isPending && <button className='btn' disabled>Signing up</button>}
            {error && <div className="error">{error}</div>}
        </form>
    );
}

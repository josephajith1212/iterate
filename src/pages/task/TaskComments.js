import {useState} from "react"
import Thumbnail from "../../components/Thumbnail";
import {timestamp} from "../../firebase/config"
import {useAuthContext} from "../../hooks/useAuthContext"
import {useFirestore} from "../../hooks/useFirestore";

export default function TaskComments({task}) {
    const {user} = useAuthContext();
    const {updateDocument, response} = useFirestore('tasks');
    const [newComment, setNewComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timestamp.fromDate(new Date()),
            id: Math.random()
        }
        await updateDocument(task.id, {
            comments: [...task.comments, commentToAdd],
        })
        if (!response.error) {
            setNewComment('')
        }
    }

    return (
        <div className="task-comments">
            <h4>Task Comments</h4>

            <ul>
                {task.comments.length > 0 && task.comments.map(comment => (
                    <li key={comment.id}>
                        <div className="comment-author">
                            <Thumbnail src={comment.photoURL} />
                            <p>{comment.displayName}</p>
                        </div>
                        <div className="comment-date">
                            <p>{comment.Date}</p>
                        </div>
                        <div className="comment-content">
                            <p>{comment.content}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <form className="add-comment" onSubmit={handleSubmit}>
                <label>
                    <span>Add new comment:</span>
                    <textarea
                        required
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                    ></textarea>
                </label>
                <button className="btn">Add Comment</button>
            </form>
        </div>
    )
}
import "../assets/styles/CreateReview.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Rating from "../components/Rating";

const CreateReview = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("");
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    const [rating , setRating] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();

        const review = { title, body, author, rating };

        setIsPending(true);

        fetch("http://localhost:8000/reviews", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(review),
        }).then(() => {
            console.log("new review added");
            setIsPending(false);
            history.push("/");
        });
    };


    const handleIncreaseRating = () => {
        if (rating < 5) {
            setRating(rating + 1);
        }
    };

    const handleDecreaseRating = () => {
        if (rating > 1) {
            setRating(rating - 1);
        }
    };


    return (
        <div className="create-page">
            <h2>Add a new Review</h2>
            <div className="divider"></div>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Review Title:</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Review author:</label>
                        <input
                            type="text"
                            required
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>


                    <div className="form-group">
                        <label>Review Text:</label>
                        <textarea
                            required
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                        ></textarea>
                    </div>

                    

                    <div className="button-group">
                        {!isPending ? (
                            <button className="CreateReview-btn">Add Review</button>
                        ) : (
                            <button className="CreateReview-btn" disabled>Adding Review...</button>
                        )}
                    </div>
                </form>
            </div>

            <div className="form-group">
                        <label>Rating:</label>
                        <div>
                            <button onClick={handleDecreaseRating}>-</button>
                            <span>{rating}</span>
                            <button onClick={handleIncreaseRating}>+</button>
                        </div>
                    </div>


            <div className="preview-left">
                <p>{title}</p>
                <p>{author}</p>
                <p>{body}</p>
                
            </div>
        </div>
    );
};

export default CreateReview;

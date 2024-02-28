import "../assets/styles/CreateReview.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function getUsernameFromLocalStorage() {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedData = JSON.parse(atob(base64));
            return decodedData.username;
        } catch (error) {
            console.error('Erro ao decodificar o token:', error);
            return null;
        }
    } else {
        console.error('Token JWT não encontrado no Local Storage');
        return null;
    }
}

const CreateReview = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [bookId, setBookId] = useState("");
    const [author, setAuthor] = useState("");
    const [selectedBookTitle, setSelectedBookTitle] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [books, setBooks] = useState([]);
    const history = useHistory();
    const [rating, setRating] = useState(1);

    useEffect(() => {
        const username = getUsernameFromLocalStorage();
        if (username) {
            setAuthor(username);
        }
        fetchBooks();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title) {
            alert("Please fill in the title field.");
            return;
        }

        if (!selectedBookTitle) {
            alert("Please select a book.");
            return;
        }

        if (!rating) {
            alert("Please select a rating.");
            return;
        }

        const userId = localStorage.getItem('userID');
        const bookId = findBookIdByTitle(selectedBookTitle);
        const review = { title, body, userId, bookId, rating };
        console.log(review);
        setIsPending(true);

        fetch("http://localhost:5015/creview", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(review),
        }).then(() => {
            console.log("New review added");
            setIsPending(false);
            history.push("/");
        }).catch((error) => {
            console.error("Error while accessing the database:", error);
            alert("Failed to access the database.");
        });
    };


    const fetchBooks = async () => {
        try {
            const response = await fetch("http://localhost:5015/books");
            const data = await response.json();
            setBooks(data);
            console.log(data);
        } catch (error) {
            console.error("Erro ao carregar os livros:", error);
            alert("Failed to connect to the database.");
        }
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
    const findBookIdByTitle = (title) => {
        for (let i = 0; i < books.length; i++) {
            if (books[i].Title === title) {
                return books[i].id;
            }
        }
        return null;
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
                        <label>Book Title:</label>
                        <select
                            value={selectedBookTitle}
                            onChange={(e) => setSelectedBookTitle(e.target.value)}
                        >
                            <option value="">Select a book</option>
                            {books.map((book) => (
                                <option key={book.id} value={book.Title}>
                                    {book.Title}
                                </option>
                            ))}
                        </select>

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
                <p>Title: {title}</p>
                <p>Author: {author}</p>
                <p>Review: {body}</p>
            </div>
        </div>
    );

};

export default CreateReview;

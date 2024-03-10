import "../assets/styles/CreateReview.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import StarRating from "../components/StarRating";
import AutocompleteInput from "../components/AutocompleteInput";

function getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedData = JSON.parse(atob(base64));
        return decodedData.userId;
    }
    return null;
}

const CreateReview = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [author, setAuthor] = useState("");
    const [userId, setUserId] = useState("");
    const [selectedBookTitle, setSelectedBookTitle] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [books, setBooks] = useState([]);
    const history = useHistory();
    const [rating, setRating] = useState(1);

    useEffect(() => {
        setUserId(getUserIdFromToken());
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const response = await fetch("http://localhost:5015/books");
        const data = await response.json();
        setBooks(data);
    };

    const findBookIdByTitle = (title) => {
        const book = books.find(book => book.Title === title);
        return book ? book.id : null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const bookId = findBookIdByTitle(selectedBookTitle);
        const review = { title, body, userId, bookId, rating };

        setIsPending(true);

        fetch("http://localhost:5015/creview", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(review),
        }).then(() => {
            setIsPending(false);
            history.push("/");
        });
    };

    return (
        <div className="container flex-container">
            <div className="left">
                <input type="titulo--preview" disabled value={title} className="titulo-input" id="tituloInput" />
                <input type="author-preview" disabled value={author} className="author-input" id="authorInput" />
                <div className="rating-preview">
                    <StarRating initialRating={rating}/>
                </div>
                <textarea type="text-preview" disabled value={body} className="body-input" id="bodyTextarea"/>
            </div>
            <div className="vertical-line"></div>
            <div className="right" style={{width: "35%"}}>
                <div className="create-page">
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                            <AutocompleteInput onTitleChange={(newTitle) => { setTitle(newTitle); }}/>
                            <div className="form-group2" style={{ display: 'flex', alignItems: 'center' }}>
                                <label>Username: </label>
                                <textarea value={userId} disabled style={{ height: '13px', marginRight: "100PX", fontWeight: "bold", fontSize: "12px", textAlign: "center"}}></textarea>
                                <div className="Rating" style={{ marginLeft: '20px', display: 'flex', alignItems: 'center' }}>
                                    <label style={{ marginRight: '10px' }}>Rating:</label>
                                    <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
                                        {[1, 2, 3, 4, 5].map(value => <option key={value} value={value}>{value}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group1" style={{marginTop: '20px', width: "100%"}}>
                                <label>Review</label>
                                <textarea required value={body} onChange={(e) => setBody(e.target.value)} id="bodyTextarea" style={{ fontSize: '16px'}}></textarea>
                            </div>
                            <div className="button-group">
                                {!isPending ? <button className="CreateReview-btn">Add Review</button> : <button className="CreateReview-btn" disabled>Adding Review...</button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateReview;

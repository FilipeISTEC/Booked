import "../assets/styles/CreateReview.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import StarRating from "../components/StarRating";
import AutocompleteInput from "../components/AutocompleteInput";

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
    const [author, setAuthor] = useState("");
    const [user, setUser] = useState("");
    const [selectedBookTitle] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [books, setBooks] = useState([]);
    const history = useHistory();
    const [rating, setRating] = useState(1);

    const adjustTextareaHeight = () => {
        const textarea = document.getElementById("bodyTextarea");
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      };


    useEffect(() => {
        const username = getUsernameFromLocalStorage();
        if (username) {
            setUser(username);
        }
        fetchBooks();
    }, []);

    useEffect(() => {
        adjustTextareaHeight();
      }, [title, author, body]);

    const handleTitleChange = (newTitle, newAuthor) => {
        setTitle(newTitle);
        setAuthor(newAuthor);
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title) {
            alert("Please fill in the title field.");
            return;
        }

        if (!AutocompleteInput) {
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

    const findBookIdByTitle = (title) => {
        for (let i = 0; i < books.length; i++) {
            if (books[i].Title === title) {
                return books[i].id;
            }
        }
        return null;
    };

    return (
        <div className="container flex-container">
            <div className="left">
                <input
                    type="titulo--preview"
                    disabled
                    value={title}
                    className="titulo-input"
                    id="tituloInput"
                />
                <input
                    type="author-preview"
                    disabled
                    value={author}
                    className="author-input"
                    id="authorInput"
                />

                <div className="rating-preview">
                    <StarRating initialRating={rating}/>
                </div>

                <textarea
                    type="text-preview"
                    disabled
                    value={body}
                    className="body-input"
                    id="bodyTextarea"
                    />
                <label style={{fontSize:'15px', lineHeight: '3', verticalAlign: 'top', color:'#6e6e6e50' }}>By </label>
                <textarea 
                    type="user-preview"
                    disabled
                    value={user}
                    className="user-input"
                    id="userInput"
                    style={{ borderRadius:'0px 10px 10px 0px', height:'14px', fontSize:'14px' , color:'#6e6e6e90' }}
                />

            </div>

            <div className="vertical-line"></div>

            <div className="right" style={{width: "35%"}}>
                <div className="create-page">
                    <div className="form">
                        <form onSubmit={handleSubmit}>
                        <AutocompleteInput onTitleChange={handleTitleChange}/>
                            
                        <label>Author:</label>
                                <textarea
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    disabled
                                    style={{ height: '15px', textAlign:"center", borderColor:"#e4d5c700", fontWeight:"bold", fontSize:"15px", padding:"10px"}}
                                    className="author"
                                ></textarea>
                                <br></br>
                            <div className="form-group2" style={{ display: 'flex', alignItems: 'center' }}>
                                
                                <label>Username: </label>
                                <textarea
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    disabled
                                    style={{ height: '13px' , marginRight:"100PX", fontWeight: "bold" , fontSize:"12px", textAlign:"center"}}
                                ></textarea>

                                <div className="Rating" style={{ marginLeft: '20px' , display: 'flex', alignItems: 'center' }}>
                                    <label style={{ marginRight: '10px' }}>Rating:</label>
                                    <select
                                        value={rating}
                                        onChange={(e) => setRating(parseInt(e.target.value))}
                                    >
                                        {[1, 2, 3, 4, 5].map((value) => (
                                            <option key={value} value={value}>
                                                {value}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>


                            <div className="form-group1" style={{marginTop: '20px', width:"100%"}}>
                                <label >Review</label>
                                <textarea 
                                    required
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    id="bodyTextarea"
                                    style={{ fontSize:'16px'}}
                                ></textarea>
                            </div>

                            <div className="button-group">
                                {!isPending ? (
                                    <button className="CreateReview-btn">Add Review</button>
                                ) : (
                                    <button className="CreateReview-btn" disabled>
                                        Adding Review...
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default CreateReview;
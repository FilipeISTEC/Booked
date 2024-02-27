import "../assets/styles/CreateReview.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function getUsernameFromLocalStorage() {
    const token = localStorage.getItem('token');

    if (token) {
        try {
            // Decodifica o token JWT
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const decodedData = JSON.parse(atob(base64));

            // Extrai e retorna o nome de usuário (username) do objeto decodificado
            return decodedData.username;
        } catch (error) {
            console.error('Erro ao decodificar o token:', error);
            return null; // Retorna null em caso de erro
        }
    } else {
        console.error('Token JWT não encontrado no Local Storage');
        return null; // Retorna null se o token não for encontrado
    }
}

const CreateReview = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [bookId, setBookId] = useState(""); // Armazena o ID do livro selecionado
    const [author, setAuthor] = useState("");
    const [selectedBookTitle, setSelectedBookTitle] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [books, setBooks] = useState([]); // Armazena os livros obtidos
    const history = useHistory();
    const [rating, setRating] = useState(1);

    // Obtém o nome de usuário do Local Storage ao inicializar o componente
    useEffect(() => {
        const username = getUsernameFromLocalStorage();
        if (username) {
            setAuthor(username);
        }

        // Obtém os livros da base de dados ao inicializar o componente
        fetchBooks();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const userId = localStorage.getItem('userID');
        const bookId = findBookIdByTitle(selectedBookTitle);
        const review = { title, body, userId, bookId, rating }; // Adiciona o ID do livro aos dados da avaliação
        console.log(review);
        setIsPending(true);

        fetch("http://localhost:5015/creview", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(review),
        }).then(() => {
            console.log("new review added");
            setIsPending(false);
            history.push("/");
        });
    };

    // Função para obter os livros da base de dados
    const fetchBooks = async () => {
        try {
            // Faz a requisição para obter os livros da base de dados
            const response = await fetch("http://localhost:5015/books");
            const data = await response.json();
            setBooks(data); // Armazena os livros obtidos no estado 'books'
            console.log(data);
        } catch (error) {
            console.error("Erro ao carregar os livros:", error);
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
        // Percorre a lista de livros
        for (let i = 0; i < books.length; i++) {
            // Se encontrar o livro com o título correspondente
            if (books[i].Title === title) {
                // Retorna o ID do livro encontrado
                return books[i].id;
            }
        }
        // Se não encontrar nenhum livro com o título correspondente, retorna null ou outra indicação de que o livro não foi encontrado
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

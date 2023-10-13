import "../assets/styles/CreateReview.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const CreateReview = () => {
    const [title, setTitle] =useState("");
    const [body, setBody] =useState("");
    const [author, setAuthor] =useState("");
    const [isPending, setIsPending] =useState(false)
    const history = useHistory();

    const handleSubmit = (e) => {
          e.preventDefault();

         
          const review ={title, body, author};

          setIsPending(true);

            fetch("http://localhost:8000/reviews", {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(review)
            }).then(() => {
                console.log("new review add")
                setIsPending(false)
                history.push("/")
            })

            
    }
    
    return ( 
        <div className="create-page">
            
            <h2>Add a new Review</h2>
            <form onSubmit={handleSubmit}>
                <label>Review Title:</label>
                <input
                type="text"
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
 
                />

            <label>Review Text:</label>
               <textarea
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
               ></textarea>
            
               <label>Review author:</label>
               <input
                type="text"
                required
                value={author}
                 onChange={(e) => setAuthor(e.target.value)}
                />

               

                {!isPending &&<button className="CreateReview-btn">Add Review</button>}
                { isPending &&<button className="CreateReview-btn"disabled>Adding Review...</button>}
                <p>{title}</p>
                <p>{author}</p>
            </form>
        </div>
     );
}
 
export default CreateReview;
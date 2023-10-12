import { useState } from "react";

const Create = () => {
    const [title, setTitle] =useState("");
    const [body, setBody] =useState("");
    const [author, setAuthor] =useState("");
    const [isPending, setIsPending] =useState(false)

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
                setIsPending(False)
            })
    }
    
    return ( 
        <div className="create">
            <h2>Add a new Review</h2>
            <form onSubmit={handleSubmit}>
                <label>Review Title:</label>
                <input
                type="text"
                required 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />

            <label>Review Body:</label>
               <textarea
                required
                value={body}
                onChange={(e) => setBody(e.target.value)}
               ></textarea>

               <label>Review author:</label>

               <select 
               value={author}
               onChange={(e) => setAuthor(e.target.value)}>
                <option value="mario">mario</option>
                <option value="yoshi">yoshi</option>
                </select> 
                {!isPending &&<button>Add Review</button>}
                { isPending &&<button disabled>Adding Review...</button>}
                <p>{title}</p>
                <p>{body}</p>
                <p>{author}</p>
            </form>
        </div>
     );
}
 
export default Create;

import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ReviewDetails = () => {
    const { id } = useParams ();
    const{ data: review, error, isPending} = useFetch("http://localhost:8000/reviews/"+id);
    const history = useHistory();

    const handleClick= () =>     {
        fetch("http://localhost:8000/reviews/" + review.id, {
            method: "DELETE"
        }).then(() =>{
        history.push("/");
        })
    }
    return (  
        <div className="review-details">
           {isPending && <div>Loading...</div>}
           {error && <div>{error}</div>}
           {review &&(
            <article>
                <h2>{review.title}</h2>
                <p>Written by {review.author}</p>
                <div>{review.body}</div>
                <button onClick={handleClick}>delete</button>
            </article>
           )}
        </div>
    );
}

 
export default ReviewDetails;
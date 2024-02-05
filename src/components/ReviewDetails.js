import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../assets/styles/ReviewDetails.css";

const ReviewDetails = () => {
    const { id } = useParams ();
    const{ data: review, error, isPending, raiting} = useFetch("http://localhost:8000/reviews/"+id);
    const history = useHistory();

    const handleClick= () =>     {
        fetch("http://localhost:8000/reviews/" + review.id, {
            method: "DELETE"
        }).then(() =>{
        history.push("/");
        })
    }
    return (  
        <div className="container1">
            <div className="review-details">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {review &&(
                <article>
                    <h2>{review.title}</h2>
                    <p>Written by {review.author}</p>
                    <br></br>
                    <div>{review.body}</div>
                    <br></br>
                    <button className="delete" onClick={handleClick}>delete</button>
                </article>
            )}
            </div>
            </div>
    );
}

 
export default ReviewDetails;
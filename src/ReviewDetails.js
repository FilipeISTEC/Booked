import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const ReviewDetails = () => {
    const { id } = useParams ();
    const{ data: review, error, isPending} = useFetch("http://localhost:8000/reviews/"+id);
    return (  
        <div className="review-details">
           {isPending && <div>Loading...</div>}
           {error && <div>{error}</div>}
           {review &&(
            <article>
                <h2>{review.title}</h2>
                <p>Written by {review.author}</p>
                <div>{review.body}</div>
            </article>
           )}
        </div>
    );
}

 
export default ReviewDetails;
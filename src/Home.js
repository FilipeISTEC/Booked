import {Link} from "react-router-dom";
import ReviewList from "./ReviewList";
import useFetch from "./useFetch";




const Home = () => {
    const{data: reviews, isPending, error} = useFetch("http://localhost:8000/reviews")
        /*
        const handleDelete = (id) => {
            const newReviews = reviews.filter(review => review.id !== id);
            setReviews(newReviews);
        }*/

       


        return (
            <div>
              <div className="review+">
                <Link to="/create" className="New-Review">New Review +</Link>
              </div>

              <div className="home">
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                {reviews && <ReviewList reviews={reviews} title="Todos as reviews"  /*handleDelete={handleDelete}*/ />}
                </div>
                
            </div>
          );
          
}
   
  export default Home;
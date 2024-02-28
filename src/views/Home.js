import { Link, useHistory } from "react-router-dom";
import "../assets/styles/Home.css";
import ReviewList from "../components/ReviewList";
import useFetch from "../hooks/useFetch";

const Home = () => {
    const { data: responseData, isPending, error } = useFetch("http://localhost:5015/reviews");
    console.log(responseData);
    const reviews = responseData?.reviews; 
    const history = useHistory();

    const handleNewReviewClick = () => {
        const userToken = localStorage.getItem('token');
        if (!userToken) {
            alert("You need to login to create a new review.");
            history.push("/login");
        } else {
            history.push("/create");
        }
    };

    const handleNoReviewsAlert = () => {
        if (!isPending && !error && !reviews) {
            alert("Database not available. Please try again later or contact one of the administrators.");
        }
    };
    handleNoReviewsAlert();

    return (
        <div>
            <div className="home-page">
                <button className="New-Review" onClick={handleNewReviewClick}>
                    New Review +
                </button>
            </div>

            <div className="reviews">
                {error && <div>{error}</div>}
                {isPending && <div>Loading...</div>}
                {reviews && <ReviewList reviews={reviews} />}
            </div>
        </div>
    );
}

export default Home;

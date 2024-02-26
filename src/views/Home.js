import { Link } from "react-router-dom";
import "../assets/styles/Home.css";
import ReviewList from "../components/ReviewList";
import useFetch from "../hooks/useFetch";

const Home = () => {
    const { data: reviews, isPending, error } = useFetch("http://localhost:5000/reviews");

    return (
        <div>
            <div className="home-page">
                <Link to="/create" className="New-Review">
                    New Review +
                </Link>
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

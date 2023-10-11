import {useState} from "react"; 
import ReviewList from "./ReviewList";




const Home = () => {
     const [reviews, setReviews] = useState([
            {title: "tentativa 1", body: "algo...123...", author: "mario", id:1 }, 
            {title: "tentativa 2..", body: "algo...123...", author: "luigi", id:2 }, 
            {title: "tentativa 3....", body: "algo...123...", author: "mario", id:3 }, 

        ]);
    
  
        return (
            <div>
              <div className="review+">
                <a href="/create" className="New-Review">New Review +</a>
              </div>

              <div className="home">
                <ReviewList reviews={reviews} title="Todos as reviews"/>
                <ReviewList reviews={reviews.filter((review) => review.author === "mario" )} title="Mario blog"/>
                </div>
            </div>
          );
          
}
   
  export default Home;
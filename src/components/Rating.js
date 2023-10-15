import '../assets/styles/rating.css'




const Rating = ({rating, setRating}) => {
    return ( 
        <div className="rating-design">
            <div className="rating-outside">
                <div className="rating-inside">
                    <label>Rating</label>
                    <input
                    type="number"
                    value={rating}
                    min="1"
                    max="5"
                    required
                    placeholder="1"
                    onChange={(e) => setRating(e.target.value)}
                    />
                </div>
            </div>
        </div>
     );
}


const FormRating =({setRating}) => {
    return (
        <div className="rating">
            <Rating username={setRating}/>
        </div>
    )
}
 
export default Rating;
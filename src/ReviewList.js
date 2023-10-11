const BlogList = (props) => {
    const reviews = props.reviews;
    const title = props.title;
  
    return ( 
        <div className="review-list">
            <h2>{title }</h2>
            {reviews.map((review) => (
                    <div className="review-preview" key={review.id}>
                        <h2>{ review.title}</h2>
                        <p>Written by {reviews.author}</p>

                    </div>
                ))}
        </div>
     );
}
 
export default BlogList;
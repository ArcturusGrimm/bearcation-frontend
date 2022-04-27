import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/reviewPage.css';


const AlaskaPark = {
    'name': 'Alaska National Park', 
    'description': 'With millions of acres of diverse and vital wilderness and a human history reaching back 14,000 years...',
    'activities': ['Hunting', 'Fishing', 'Boating', 'Camping'],
    'price': 4.99,
    'rating': 4.8
}

function ReviewPage () {

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const navigate = useNavigate();

    return(
        <div className="review-page-body">
            {/* Title */}
            <h3 className="review-name-text">Review {AlaskaPark.name}</h3>

            {/* Rating */}
            <div className="review-rating-group">
                <input name = "rating" 
                    className="form-control review-rating-text" 
                    placeholder="Rating..." 
                    value={rating} 
                    type="text" 
                    onChange={e => setRating(e.target.value)} 
                />
            </div>

            {/* Review */}
            <div className="review-review-group">
                <textarea 
                    name="review-description" 
                    className="form-control review-description" 
                    placeholder="Review..." 
                    value={review} 
                    rows="6" 
                    onChange={e => setReview(e.target.value)} 
                /> 
            </div>

            <div className="review-button-group">
                <input type="submit" 
                    className="btn btn-dark btn-block review-post-review-submit" 
                    value="Post" 
                />
                <input type="submit" 
                    className="btn btn-dark btn-block review-cancel-review-submit" 
                    value="Cancel" 
                    onClick={e=>(navigate('/location'))}
                />
            </div>
        </div>
    );
}

export default ReviewPage;

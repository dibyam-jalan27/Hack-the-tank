import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../components/css/review.css';

const Review = () => {
  return (
    <div className="g-review-container">
      <div className="star-widget">
        <input type="radio" name="rate" id="rate-5" />
        <label htmlFor="rate-5"><FontAwesomeIcon icon={faStar} /></label>
        <input type="radio" name="rate" id="rate-4" />
        <label htmlFor="rate-4"><FontAwesomeIcon icon={faStar} /></label>
        <input type="radio" name="rate" id="rate-3" />
        <label htmlFor="rate-3"><FontAwesomeIcon icon={faStar} /></label>
        <input type="radio" name="rate" id="rate-2" />
        <label htmlFor="rate-2"><FontAwesomeIcon icon={faStar} /></label>
        <input type="radio" name="rate" id="rate-1" />
        <label htmlFor="rate-1"><FontAwesomeIcon icon={faStar} /></label>

        <form action="#">
          <header></header>
          <div className="text-area">
            <textarea name="" cols="30" placeholder="Describe your experience"></textarea>
          </div>

          <div className="sub-btn">
            <button type="submit">Post</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Review;

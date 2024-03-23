import React from 'react';
import { FaStar} from "react-icons/fa6";
import '../components/css/review.css';

function Review() {
  return (
    <div className="body">
    <div className="g-review-container">
    <div className="star-widget">
      <input type="radio" name="rate" id="rate-5" />
      <label htmlFor="rate-5"><FaStar/></label>
      <input type="radio" name="rate" id="rate-4" />
      <label htmlFor="rate-4"><FaStar/></label>
      <input type="radio" name="rate" id="rate-3" />
      <label htmlFor="rate-3"><FaStar/></label>
      <input type="radio" name="rate" id="rate-2" />
      <label htmlFor="rate-2"><FaStar /></label>
      <input type="radio" name="rate" id="rate-1" />
      <label htmlFor="rate-1"><FaStar /></label>

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
  </div>
  )
}

export default Review


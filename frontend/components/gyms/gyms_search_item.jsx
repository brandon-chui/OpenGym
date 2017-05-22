import React from 'react';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';

const GymSearchItem = ({gym}) => {
  let averageRating = gym.reviews.reduce((sum, el) => sum += el.rating, 0) / gym.reviews.length;

  return (
    <li className="gym-info-searched">
      <img className="searched" src={gym.image_url} alt="Image Not Working" />

      <div className="gym-index-info">
        <div className="left-search">
          <Link className="searched-gym-name" to={`/gyms/${gym.id}`}>
            { gym.name }
          </Link>
          <br/>
          <span>
            <Rating
            className="stars"
            initialRate={averageRating}
            readonly
            empty="fa fa-star-o fa-lg"
            full="fa fa-star fa-lg"
            fractions={2}/>&nbsp;&nbsp;{ gym.reviews.length } reviews
           </span>
           <br/>
           <span> { gym.price } </span>
        </div>

        <div className="right-search">
          <span className="feature-text">
            { gym.address }
            <br/>
          { gym.city }, { gym.state } { gym.zip }
           </span>
           <br/>
          <span className="feature-text"> { gym.phone } </span>
          </div>
      </div>
    </li>
  )
}

export default GymSearchItem;
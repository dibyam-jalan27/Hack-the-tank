import React from 'react';

const Card1 = ({ image, title, body, primaryBadges, secondaryBadges, price }) => {
  return (
    <div className="card w-64 bg-base-100 shadow-xl">
      <figure><img src={image} alt="Card" /></figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          {primaryBadges && primaryBadges.map((badge, index) => (
            <div key={index} className="badge badge-secondary">{badge}</div>
          ))}
          {price && <span className="text-lg">₹{price}</span>}
        </h2>
        <p>{body}</p>
        {secondaryBadges && (
          <div className="card-actions justify-end">
            {secondaryBadges.map((badge, index) => (
              <div key={index} className="badge badge-outline">{badge}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card1;



/*import Card from './Card';
<Card 
        image="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
        title="Shoes!"
        body="If a dog chews shoes whose shoes does he choose?"
        primaryBadges={['NEW']}
        secondaryBadges={['Fashion', 'Products']}
        price="38"
      />
*/

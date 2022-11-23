import React from "react";

const Card = ({ name, description, image, unitPrice }) => {
  return (
    <div className="card card-compact w-96 h-96 bg-base-100 shadow-xl m-8">
      <figure className="mt-5">
        <img src={image} alt="Not found" width={350} height={300} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <h3 className="card-title">{`$ ${unitPrice}`}</h3>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;

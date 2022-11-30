import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addFavorites, deleteFavorites } from "../../redux/actions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'

const Card = ({ name, image, brand, unitPrice, id, isFavorite }) =>
{
  const dispatch = useDispatch();

  const { loggedUser, isAuthenticated } = useSelector(state => state.user);

  const addFavorite = () =>
  {
    dispatch(addFavorites({ userId: loggedUser?.id, productId: id }));
  }

  const removeFavorite = () => 
  {
    dispatch(deleteFavorites({ userId: loggedUser?.id, productId: id }));
  }

  return (
    <div className="card  w-96  bg-base-100 shadow-xl m-8">
      {isAuthenticated ?
        <div className="flex justify-end mr-4 mt-4 ">
          {isFavorite ?
            <button className="first:text-red-400 mr-2 mt-2" onClick={removeFavorite}>
              <FontAwesomeIcon icon={solid('heart')} />
            </button>
            :
            <button className="hover:first:text-red-400 mr-2 mt-2" onClick={addFavorite}>
              <FontAwesomeIcon icon={regular('heart')} />
            </button>
          }
        </div>
        : null}
      <figure className="mt-5">
        <Link to={`/products/${id}`}>
          <img className="h-56 w-56" src={image} alt="Not found" width={350} height={400} />
        </Link>
      </figure>
      <div className="card-body flex justify-center">
        <Link to={`/products/${id}`}>
          <p className="card-title text-base flex justify-center">{brand}</p>
        </Link>
        <Link to={`/products/${id}`} >
          <p className="card-title text-base text-center ">{name}</p>
          {/* </Link>
        <p className="card-title text-base">{`$ ${unitPrice}`}</p>
        <Link to={`/products/${id}`}> */}
          {/* <p>{description}</p> */}
        </Link>

        <div className="card-actions justify-end mt-4">
          <p className="card-title text-base mt-4">{`$ ${unitPrice}`}</p>
          <button className="btn  bg-white text-black border-2 hover:bg-stone-500 hover:border-stone-500  hover:text-white border-stone-400 text-sm">Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
};

export default Card;

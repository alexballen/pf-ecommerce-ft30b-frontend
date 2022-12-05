/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getCurrentUser } from "../../redux/actions/index"
import { useSelector, useDispatch } from "react-redux";
//import logo from "../../images/HCoutureLogo.png";

import UserCart from "../Cart/UserCart";
const Nav = () => {

  const { isAuthenticated, logout, loginWithPopup, user } = useAuth0();
  const { loggedUser } = useSelector(state => state.user);

  // const navigate = useNavigate()
  // if(loggedUser.phoneNumber ===null || loggedUser.cityOfOrigin ===null){
  //   navigate("/completeSignUp")
  // }



  return (
    <>
      <div className="navbar flex justify-between bg-white" style={{ width: "100%" }}>
        <div style={{ width: "fit-content" }}>
          <Link to={"/"} style={{ width: "fit-content" }}>
            <img
              className="ml-4"
              style={{
                width: "14em",
                height: "fit-content",
                objectFit: "cover",
              }}
              src="/assets/images/HCoutureLogo.png"
              alt=""
            />
          </Link>
        </div>



        {!isAuthenticated && (
          <div>
            <UserCart />
            <div>
              {/* <Link to={"/registerUser"}>
                <span className="btn btn-ghost normal-case   text-white  text-base m-2  bg-stone-400 hover:bg-stone-500">
                  Regístrate
                </span>
              </Link> */}

              <span
                className="btn btn-ghost normal-case text-base   text-white  bg-stone-400 hover:bg-stone-500"
                onClick={loginWithPopup}
              >
                Iniciar Sesión
              </span>
            </div>
          </div>
        )}
        {isAuthenticated && (
          <div className=" mr-8 m-2">

            <UserCart />

            {loggedUser && loggedUser.isAdmin && (
              <div className=" flex-1">
                <Link to="/dashboard">
                  <button className="btn btn-ghost normal-case   text-black  ml-8 text-base">
                    Panel de Admin
                  </button>
                </Link>
              </div>
            )}

      

          {loggedUser ? (
            <div className="dropdown dropdown-end   ">
              <label
                tabIndex={0}
                className="  btn btn-ghost btn-circle  avatar"
              >
                  <div className="w-10 rounded-full">
                    <img src={loggedUser.photo?.url ? loggedUser.photo.url :"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUemgh2Unk-2K8MrXuSRmawDNdccYPxRcCCQ&usqp=CAU"} alt="profilepicture" />
                  </div>
                <span className="justify-between text-black">
                  {user.name ? user.name : user.nickname}
                </span>

              </label>
              {/* active mediante log in o inactivemediante log out */}
              <ul className="menu    menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <Link to={`/user/${loggedUser.id}`}>
                  <li>
                    <span className="justify-between text-xl  ">Perfil</span>
                  </li>
                </Link>

                <Link to={"/favorites"}>
                  <li>
                    <span className="justify-between text-xl  ">
                      Mis favoritos
                    </span>
                  </li>
                </Link>

                <Link to={"/Items"}>
                  <li>
                    <span className="justify-between text-xl  ">
                      Mis compras
                    </span>
                  </li>
                </Link>

                <li>
                  <button className="text-xl" onClick={logout}>
                    Cerrar Sesión
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            null
          )}
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Nav;

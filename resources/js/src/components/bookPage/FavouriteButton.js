import React from "react";

export default function FavouriteButton({ favouriteHandler, liked }) {
  let heartColorClass = liked ? "text-danger" : "text-secondary";
  return (
    <button
      className={`btn float-right ${heartColorClass} heart`}
      onClick={favouriteHandler}
      title="Add To Favourites"
    >
      <i className={`fa fa-heart fa-2x`} />
    </button>
  );
}

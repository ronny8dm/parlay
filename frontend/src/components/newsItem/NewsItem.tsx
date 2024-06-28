/** @format */

import React from "react";
import { News } from "../../types/newInterface";

const NewsItem = ({ news }: { news: News }) => {
  const date = new Date(news.timestamp);
  const isValidDate = !isNaN(date.getTime());

  return (
    <div
      style={{
        color: "white",
        margin: "20px",
        padding: "20px",
        border: "1px solid #ccc",
      }}
    >
      <h2>{news.title}</h2>
      <p>{news.description}</p>
      <small>{isValidDate ? date.toLocaleString() : "Invalid date"}</small>
    </div>
  );
};

export default NewsItem;

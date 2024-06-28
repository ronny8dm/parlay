/** @format */

import React from "react";
import NewsItem from "../newsItem/NewsItem";
import { NewsFeedProps } from "../../types/newInterface";

const NewsFeed = ({ newsItems }: NewsFeedProps) => {
  console.log(newsItems[0]);
  return (
    <div className="mt-24">
      {newsItems.map((item) => (
        <NewsItem key={item.id} news={item} />
      ))}
    </div>
  );
};

export default NewsFeed;

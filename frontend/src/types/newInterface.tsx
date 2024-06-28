/** @format */

export interface News {
  id: number;
  title: string;
  description: string;
  timestamp: string;
}

export interface NewsFeedProps {
  newsItems: News[];
}

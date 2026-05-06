import { useEffect, useState } from "react";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemPerPage = 6;

  useEffect(() => {
    fetchData();
  }, []);

  const lastIndex = itemPerPage * currentPage;
  const firstIndex = lastIndex - itemPerPage;
  const currentNews = news.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(news.length / itemPerPage);

  function fetchData() {
    setLoading(true);

    fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=c18ce96fd5c34e2e8f853309ffff8cd3")
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles);
        setLoading(false);
      })
      .catch(() => {
        setError("Data Not Available");
        setLoading(false);
      });
  }

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error}</h1>;
  if (news.length === 0) return <h2>No News Found</h2>;

  return (
    <div>
      <ul>
        {currentNews.map((item, index) => (
          <li key={index}>{item.title}</li>
        ))}
      </ul>

      <div>
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

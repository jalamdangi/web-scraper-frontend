import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [url, setUrl] = useState("");
  const [scrapping, setScrapping] = useState()
  const navigate = useNavigate();

  const scrapeData = async () => {
    try {
      setScrapping(true)
      const { data } = await axios.post("http://localhost:5000/api/companies/scrape", { url });
      // console.log("Scraped Data:", data);
      if (data) navigate("/companies")
    } catch (err) {
      console.error(err);
      alert(err.message || "Unable to scrape site data !")
    }
    setScrapping(false)
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center p-6">
      <h1 className="text-white text-4xl font-bold mb-6 text-center">Website Data Scraper</h1>

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          type="text"
          placeholder="Enter Website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          disabled={scrapping}
          onClick={scrapeData}
          className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold shadow-md hover:bg-blue-600 transition-colors"
        >
          {scrapping ? "Scrapping.." : "Scrape Data"}
        </button>
      </div>

      <button
        onClick={() => navigate("/companies")}
        className="mt-6 text-white underline hover:text-gray-200 transition-all"
      >
        View Scraped Companies
      </button>
    </div>
  );
};

export default Home;
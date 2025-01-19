import { useEffect, useState } from "react";
import { QuoteResponse } from "../types/qoute";

const Qoute = () => {
  const [quote, setQuote] = useState<QuoteResponse | null>(null);

  useEffect(() => {
    const fetchQuote = async () => {
      const response = await fetch("https://thequoteshub.com/api/");
      const data: QuoteResponse = await response.json();
      setQuote(data);
    };

    fetchQuote();
  }, []);

  return (
    <div className="mt-4 p-8 bg-white rounded-lg shadow-lg mx-4 md:mx-8 lg:mx-12">
      {quote ? (
        <blockquote className="text-sm md:base lg:text-lg italic border-l-4 pl-6 border-blue-500">
          <div className="text-gray-800">{quote.text}</div>
          <footer className="mt-3 text-right font-semibold text-gray-700">
            - {quote.author}
          </footer>
        </blockquote>
      ) : (
        <p className="text-lg md:text-xl text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default Qoute;

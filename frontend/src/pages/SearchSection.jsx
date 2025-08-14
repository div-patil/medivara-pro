import React from "react";
import { useNavigate } from "react-router-dom";

const SearchSection = () => {
  const [query, setQuery] = React.useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/doctors?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className="w-full">
      <div className="relative isolate overflow-hidden px-6 py-20 text-center sm:px-16 sm:shadow-sm">
        <h2 className="text-3xl md:text-4xl font-bold dark:text-white">
          Search by <span className="text-[#00B5C9]">disease</span>
        </h2>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          We understand the value of your time and the importance of finding the
          right healthcare professional to address your needs.
        </p>

        <form onSubmit={handleSearch}>
          <label
            className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
            htmlFor="search-bar"
          >
            <input
            name="search"
              id="search-bar"
              placeholder="your keyword here"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-6 py-2 w-full rounded-md flex-1 outline-none text-black "
              required
            />
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-3 bg-[#00B5C9] text-white rounded-xl font-semibold"
            >
              Search
            </button>
          </label>
        </form>

        {/* Background SVG */}
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
            fillOpacity="0.7"
          ></circle>
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stopColor="#3b82f6"></stop>
              <stop offset="1" stopColor="#00B5C9"></stop>
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default SearchSection;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function UserSearch() {
  const API_URL = window.location.origin.replace('3000', '5000');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const fetchUsers = async (searchTerm) => {
    if (!searchTerm) {
      setResults([]);
      setShowResults(false);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(
        `/api/users/search?query=${searchTerm}`
      );
      if (!response.ok) {
        throw new Error('Networt Response is not Ok');
      }
      const data = await response.json();
      console.log(data);
      setResults(data.users || []);
      setShowResults(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputchange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchUsers(value);
  };
  return (
    <div className="relative max-w-md mx-auto search-container">
      <input
        type="text"
        placeholder="Search users by username"
        value={query}
        onChange={handleInputchange}
        className="w-full bg-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-blue-600"
      />
      {showResults && (
        <div className="absolute z-50 bg-white mt-1 shadow-lg rounded-lg mx-h-60 overflow-y-auto w-full">
          {loading ? (
            <p className="p-4 text-center text-gray-500">Loading...</p>
          ) : results.length > 0 ? (
            results.map((user) => (
              <Link to={`/profile/${user.username}`} key={user.username}>
                <div className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-300">
                  <img src="" alt="" className="w-10 h-10 rounded-full" />
                  <div className="ml-4">
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.fullname}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="p-4 text-center text-gray-500">No User found</p>
          )}
        </div>
      )}
    </div>
  );
}

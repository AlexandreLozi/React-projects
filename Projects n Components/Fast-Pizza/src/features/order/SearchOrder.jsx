import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="text-md transiion-all w-40 rounded-full bg-yellow-100 px-4 py-2 duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-300 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchOrder;
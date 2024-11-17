import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { cryptoList } from '@/data/cryptoData';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = cryptoList.filter(crypto =>
        crypto.name.toLowerCase().includes(search.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(search.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [search]);

  const handleSelect = (cryptoId) => {
    navigate(`/crypto/${cryptoId}`);
    setSearch('');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="flex items-center bg-gray-800 rounded-lg">
        <div className="flex items-center flex-1 px-4 py-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsOpen(true);
            }}
            placeholder="Rechercher une crypto..."
            className="w-full ml-2 bg-transparent text-white focus:outline-none"
          />
        </div>
        {search && (
          <button
            onClick={() => {
              setSearch('');
              setResults([]);
            }}
            className="px-4 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
          {results.map((crypto) => (
            <button
              key={crypto.id}
              onClick={() => handleSelect(crypto.id)}
              className="flex items-center w-full px-4 py-3 hover:bg-gray-700"
            >
              <img src={crypto.image} alt={crypto.name} className="w-6 h-6 mr-3" />
              <div className="flex-1 text-left">
                <div className="text-white">{crypto.name}</div>
                <div className="text-sm text-gray-400">{crypto.symbol.toUpperCase()}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
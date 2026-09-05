import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collections } from '../data/collections.js';
import './HeaderSearch.css';

// Mapeo de nota (notación inglesa) a la etiqueta en español usada en las rutas
const NOTE_TO_ROUTE = {
  c: 'do',
  d: 're',
  e: 'mi',
  f: 'fa',
  g: 'sol',
  a: 'la',
  b: 'si',
};

/**
 * Componente HeaderSearch: input de búsqueda en el header que permite
 * filtrar las colecciones definidas en src/data/collections.js y navegar
 * directamente a la colección seleccionada.
 */
const HeaderSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  // Filtra colecciones por nombre o descripción (insensible a mayúsculas)
  useEffect(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (normalizedQuery === '') {
      setResults([]);
      setIsDropdownOpen(false);
      return;
    }

    const filtered = collections.filter(collection => {
      const name = (collection.name || '').toLowerCase();
      const description = (collection.description || '').toLowerCase();
      const id = (collection.id || '').toLowerCase();
      return (
        name.includes(normalizedQuery) ||
        description.includes(normalizedQuery) ||
        id.includes(normalizedQuery)
      );
    });

    setResults(filtered.slice(0, 12));
    setIsDropdownOpen(true);
  }, [query]);

  // Cierra el dropdown al hacer clic fuera del componente
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const buildRoute = (collection) => {
    // El id tiene la forma "c-major" => nota="c", mode="major"
    const [noteKey, ...modeParts] = collection.id.split('-');
    const routeNote = NOTE_TO_ROUTE[noteKey];
    const mode = modeParts.join('-');
    if (!routeNote || !mode) return null;
    return `/scale/${routeNote}/${mode}`;
  };

  const handleSelect = (collection) => {
    const route = buildRoute(collection);
    if (route) {
      setQuery('');
      setIsDropdownOpen(false);
      navigate(route);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Si hay un único resultado, navega directamente a él
    if (results.length === 1) {
      handleSelect(results[0]);
    }
  };

  return (
    <div className="header-search" ref={containerRef}>
      <form className="header-search-form" onSubmit={handleSubmit}>
        <input
          type="search"
          className="header-search-input"
          placeholder="Buscar colección..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar colecciones"
          autoComplete="off"
        />
      </form>
      {isDropdownOpen && results.length > 0 && (
        <ul className="header-search-results">
          {results.map(collection => (
            <li
              key={collection.id}
              className="header-search-result-item"
              onClick={() => handleSelect(collection)}
            >
              <span className="header-search-result-name">{collection.name}</span>
              {collection.description && (
                <span className="header-search-result-desc">{collection.description}</span>
              )}
            </li>
          ))}
        </ul>
      )}
      {isDropdownOpen && query.trim() !== '' && results.length === 0 && (
        <ul className="header-search-results">
          <li className="header-search-result-empty">
            No se encontraron colecciones.
          </li>
        </ul>
      )}
    </div>
  );
};

export default HeaderSearch;
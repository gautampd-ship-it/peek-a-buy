import React, { useEffect, useState } from 'react';

/**
 * Peek-a-Buy - final v1.0 UI (single-file App)
 *
 * Behavior:
 * - Loads /public/mock-results.json if API unreachable
 * - Card grid layout, rating pill, cheapest pill (blinking)
 * - Location and type filters; search by dish name
 */

const MOCK_URL = '/mock-results.json'; // served from /public
const API_BASE = '/api'; // if you have a backend, set this in code

function RatingPill({ rating }) {
  return (
    <span className="rating-pill" aria-hidden>
      {rating.toFixed(1)} <span className="star">★</span>
    </span>
  );
}

export default function App() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('All Locations');
  const [type, setType] = useState('Veg & Non-Veg');
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [locationsList, setLocationsList] = useState([]);

  useEffect(() => {
    // Try to fetch API (prefetch) — fallback to mock file
    async function prefetch() {
      setErrorMessage('');
      try {
        const res = await fetch(`${API_BASE}/search?dish=`);
        if (!res.ok) throw new Error('API returned non-OK');
        const data = await res.json();
        setResults(data);
      } catch (err) {
        // fetch mock results
        try {
          const r = await fetch(MOCK_URL);
          const data = await r.json();
          setResults(data);
          // populate locations
          const locs = Array.from(new Set(data.map((d) => d.location))).sort();
          setLocationsList(['All Locations', ...locs]);
          setErrorMessage('Prefetch failed (API may be down)');
        } catch (e) {
          setErrorMessage('Unable to load data');
        }
      }
    }
    prefetch();
  }, []);

  function matchesFilter(item) {
    // search text
    if (query && !item.dish.toLowerCase().includes(query.toLowerCase())) return false;
    // location
    if (location !== 'All Locations' && item.location !== location) return false;
    // type
    if (type === 'Veg' && item.platforms.every(p => p.type !== 'Veg')) return false;
    if (type === 'Non-Veg' && item.platforms.every(p => p.type !== 'Non-Veg')) return false;
    return true;
  }

  const filtered = results.filter(matchesFilter);

  function handleSearchClick() {
    // In this static prototype, search is client-side (filtered)
    setErrorMessage('');
  }

  function handleReset() {
    setQuery('');
    setLocation('All Locations');
    setType('Veg & Non-Veg');
    setErrorMessage('');
  }

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <h1>Peek-a-Buy</h1>
          <div className="logo-wrap" title="Peek-a-Buy">
            <img src="/logo-peek.svg" alt="Peek-a-Buy logo" className="peek-logo" />
          </div>
        </div>
        <p className="subtitle">Compare dish prices & ratings across Swiggy and Zomato — Bangalore (prototype)</p>
        <div className="controls">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search dish (e.g. chicken biryani)" />
          <select value={location} onChange={e => setLocation(e.target.value)}>
            {locationsList.length ? locationsList.map(l => <option key={l} value={l}>{l}</option>) : <option>All Locations</option>}
          </select>
          <select value={type} onChange={e => setType(e.target.value)}>
            <option>Veg & Non-Veg</option>
            <option>Veg</option>
            <option>Non-Veg</option>
          </select>
          <button className="btn" onClick={handleSearchClick}>Search</button>
          <button className="btn ghost" onClick={handleReset}>Reset</button>
        </div>
        <div className="meta">
          <div>Showing {filtered.length} dishes</div>
          <div className="error">{errorMessage}</div>
        </div>
      </header>

      <main>
        <section className="grid">
          {filtered.length === 0 && <div className="empty">No results found.</div>}
          {filtered.map((item, idx) => (
            <article className="card" key={idx}>
              <h2 className="dish">{item.dish}</h2>
              <div className="loc">{item.location}</div>

              <div className="cheapest-row">
                <span className="cheapest-pill blink">Cheapest ₹{item.cheapest}</span>
                <div className="best">Best place to order: <strong>{item.best_place}</strong></div>
              </div>

              <hr />

              <div className="platforms">
                {item.platforms.map((p, i) => (
                  <div className="platform-row" key={i}>
                    <div className="platform-name">{p.name}</div>
                    <div className="platform-meta">{p.name} • Rating {p.rating.toFixed(1)} • {p.type}</div>
                    <div className="platform-right">
                      <RatingPill rating={p.rating} />
                      <div className="price">₹{p.price}</div>
                      <a className="order" href="#" onClick={e => e.preventDefault()}>Order</a>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>

      <footer className="footer">© Peek-a-Buy — prototype</footer>
    </div>
  );
}

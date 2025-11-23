import React from 'react';

// Starter: useEffect exercise
// This file intentionally provides conceptual hints instead of full copyable solutions.

const mockHeroes = [
  { id: 1, name: 'Iron Man', team: 'Avengers' },
  { id: 2, name: 'Spider-Man', team: 'Avengers' },
  { id: 3, name: 'Wonder Woman', team: 'Justice League' },
];

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <h1 style={{ textAlign: 'center', fontSize: 36 }}>
        useEffect Exercises
      </h1>

      <TitleUpdater />
      <Timer />
      <HeroLoader />
    </div>
  );
}

function time() {
  const [showTimer, setShowTimer] = React.useState(true);
}
function TitleUpdater() {
  const [count, setCount] = React.useState(0);

  // TODO: Use useEffect to update document.title when `count` changes.
  // Hint: React.useEffect(() => { document.title = `Count: ${count}` }, [count])
  return (
    <div className="card">
      <h2>Title Updater</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>
        Increment
      </button>
      <button onClick={() => setCount((c) => c - 1)}>
        Decrement
      </button>
      <button onClick={() => setCount((c) => c = 0)}>
        Reset
      </button>
    </div>
  );
}

function Timer() {
  const [seconds, setSeconds] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(true);

  React.useEffect(() => {
    console.log('Timer effect started');

    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => {
      console.log('Cleaning up timer');
      clearInterval(intervalId);
    };
  }, [isRunning]);

  // TODO: Use useEffect to start an interval that increments seconds every 1000ms
  // Remember to return a cleanup function to clearInterval.

  return (
    <div className="card">
      <h2>Timer</h2>
      <p style={{ fontSize: 28 }}>{seconds}s</p>
      <p style={{ opacity: 0.8 }}>
      <button onClick={() => setIsRunning(!isRunning)}>
        Start/Stop
      </button>
      <button onClick={() => setSeconds(0)}>
        Reset
      </button>
      </p>
    </div>
  );
}

  // TODO: Use useEffect to simulate fetching heroes (setTimeout) and update state.
  // Show loading while fetching and render the hero list when done.
function HeroLoader() {
  const [heroes, setHeroes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    console.log('Fetching heroes...');
    setLoading(true);

    const timeoutId = setTimeout(() => {
      try {
        setHeroes(mockHeroes);
        setLoading(false);
        console.log('Heroes loaded successfully');
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <div
          style={{
            border: '4px solid rgba(255,255,255,0.2)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            width: 60,
            height: 60,
            animation: 'spin 1s linear infinite',
            marginBottom: 20,
          }}
        ></div>
        <p style={{ fontSize: 20 }}>Loading products...</p>
      </div>
    );
  }
  return (
    <div className="card">
      <h2>Hero Loader (Simulated)</h2>
      {loading ? (
        <p>Loading... (implement the effect to fetch mock data)</p>
      ) : (
        <ul>
          {heroes.map((h) => (
            <li key={h.id}>
              {h.name} — {h.team}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

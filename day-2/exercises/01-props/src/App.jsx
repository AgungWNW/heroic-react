// TODO: Create a HeroCard component that accepts props
// The component should receive: name, power, image, and realName (optional)
// Hint: You can destructure props in the function parameters
// Hint: For conditional rendering of realName, use the && operator

// Example component structure:
// function HeroCard(props) {
//   // Your component code here
//   return (
//     <div>
//       {/* Your JSX here */}
//     </div>
//   )
// }
function HoloCard({  name,
  power,
  country,
  image,
}) {
  const cardStyle = {
    backgroundColor: 'rgba(255, 122, 122, 0.35)',
    borderRadius: '10px',
    padding: '25px',
    border: '1px solid rgba(60, 63, 255, 0.36)',
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '5px',
    marginBottom: '15px',
  };

  return (
    <div style={cardStyle}>
      <img src={image} alt={name} style={imageStyle} />
      <h2
        style={{
          color: 'white',
          fontSize: '24px',
          margin: '0 0 8px 0',
        }}
      >
        {name}
      </h2>
      {country && (
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '12px',
            fontStyle: 'italic',
            margin: '0 0 8px 0',
          }}
        >
          from {country}
        </p>
      )}
      <p
        style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '14px',
          margin: '0 0 8px 0',
        }}
      >
        Power: {power}
      </p>
    </div>
  );
}
// BONUS TODO: Create a Badge component
// It should accept: text and color (with a default value)
// Hint: Use default parameters like: function Badge({ text, color = '#667eea' })

function Badge({ text, color = '#667eea' }) {
  const badgeStyle = {
    display: 'inline-block',
    padding: '5px 10px',
    borderRadius: '12px',
    backgroundColor: color,
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold',
    marginTop: '10px',
  };

  return <span style={badgeStyle}>{text}</span>;
}

function App() {
  return (
    <div>
      <h1
        style={{
          color: 'white',
          textAlign: 'center',
          fontSize: '48px',
          marginBottom: '40px',
        }}
      >
        Hololive Gallery
      </h1>
        <HoloCard 
          name="Vestia Zeta"
          country="Indonesia"
          power="Cat Manipulation"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1D9jfWdePNZ_RSGwwo6y-lTV6otmXQUBunQ&s"
        />
      <HoloCard 
          name="Kobo Kanaeru"
          country="Indonesia"
          power="Rain Manipulation"
          image="data:image/jpeg;base64,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"
        />
        <HoloCard 
          name="Sakamata Chloe"
          country="Japan"
          power="Blood Manipulation"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT43cubIB0pArvFZxtRF-mRTtDLZR7SZV4szg&s"
        />
    </div>
  );
}

export default App;

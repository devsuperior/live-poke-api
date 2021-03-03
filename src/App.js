import { useState, useEffect } from "react";
import { api } from "./services";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);

  useEffect(() => {
    api
      .get("pokemon")
      .then((res) => {
        setPokemons(res.data.results);
        setNext(res.data.next);
        setPrev(res.data.previous);
      })
      .catch((err) => console.warn(err));
  }, []);

  const seeNext = (next) => {
    api.get(next).then((res) => {
      setPokemons(res.data.results);
      setNext(res.data.next);
      setPrev(res.data.previous);
    });
    window.scrollTo(0, 0);
  };

  const seePrev = (prev) => {
    api.get(prev).then((res) => {
      setPokemons(res.data.results);
      setNext(res.data.next);
      setPrev(res.data.previous);
    });
    window.scrollTo(0, 0);
  };

  const buildImgUrl = (url) => {
    const id = url.split("/");
    const idx = id.length - 2;
    const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id[idx]}.png`;

    return imgUrl;
  };

  return (
    <div className="container">
      <div className="pokemon-container">
        {pokemons.map((pokemon) => {
          return (
            <div key={pokemon.name} className="pokemon">
              <img src={buildImgUrl(pokemon.url)} alt={pokemon.name} />
              <p>{pokemon.name}</p>
            </div>
          );
        })}
      </div>
      <div className="button-container">
        <button
          onClick={() => seePrev(prev)}
          disabled={prev === null ? true : false}
          className={prev === null ? "btn-disabled" : ""}
        >
          Ver anteriores
        </button>
        <button
          onClick={() => seeNext(next)}
          disabled={next === null ? true : false}
          className={next === null ? "btn-disabled" : ""}
        >
          Ver Próximos
        </button>
      </div>
    </div>
  );
}

export default App;

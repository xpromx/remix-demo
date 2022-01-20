import { Link, useLoaderData } from "remix";
import { PokemonsQuery } from "~/graphql/types";
import { graphql } from "~/utils/graphql";
import pokemonStyles from "~/styles/pokemons.css";

export const links = () => {
  return [{ rel: "stylesheet", href: pokemonStyles }];
};

export const loader = async () => {
  return graphql.pokemons();
};

export default function Page() {
  const data = useLoaderData<PokemonsQuery>();
  const pokemons = data.pokemons?.results;
  return (
    <div>
      <h1>Pokemons (GraphQL)</h1>
      <ul>
        {pokemons &&
          pokemons?.map((pokemon) => (
            <li>
              <Link to={`/pokemon/${pokemon?.name}`}>
                {pokemon?.image && <img src={pokemon?.image} />}
                <h2>{pokemon?.name}</h2>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

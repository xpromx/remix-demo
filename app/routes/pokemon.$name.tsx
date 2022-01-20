import { useLoaderData } from "remix";
import type { LoaderFunction } from "remix";
import invariant from "tiny-invariant";
import { graphql } from "~/utils/graphql";
import { PokemonByNameQuery } from "~/graphql/types";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.name, "expected params.name");
  return graphql.pokemonByName({ name: params.name });
};

export default function Page() {
  const data = useLoaderData<PokemonByNameQuery>();
  const pokemon = data.pokemon;
  return (
    <div>
      <h1>{pokemon?.name}</h1>
      {pokemon?.sprites?.front_default && (
        <img src={pokemon?.sprites?.front_default} />
      )}
      <ul>
        {pokemon?.types?.map((type) => (
          <li>{type?.type?.name}</li>
        ))}
      </ul>
    </div>
  );
}

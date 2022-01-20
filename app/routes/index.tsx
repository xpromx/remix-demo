import { Link } from "remix";

export default function Index() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/posts">Posts</Link>
        </li>
        <li>
          <Link to="/pokemons">Pokemons</Link>
        </li>
      </ul>
    </div>
  );
}

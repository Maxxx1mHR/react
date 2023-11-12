import { useContext, useMemo } from 'react';
import { PokemonContext } from '../Context/PokemonContextProvider';

const ItemPerPage = () => {
  const { setSearchParams, setPokemonPerPage, setCurrentPage, setOffset } =
    useContext(PokemonContext) || {};

  const countItem = useMemo(() => [4, 12, 16, 32, 64, 104], []);

  return (
    <div className="count">
      <h2 className="count__title">Choose item per page</h2>
      <select
        onChange={(e) => {
          setPokemonPerPage?.(Number(e.target.value));
          setSearchParams?.({ page: 1 });
          setCurrentPage?.(1);
          setOffset?.(0);
        }}
      >
        {countItem.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ItemPerPage;

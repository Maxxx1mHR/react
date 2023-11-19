import { useContext, useMemo } from 'react';
import { PokemonContext } from '../Context/PokemonContextProvider';
import { useDispatch } from 'react-redux';
import {
  setCurrentPage,
  setLimit,
  setOffset,
} from '../../state/slices/pageSlice';

const ItemPerPage = () => {
  const countItem = useMemo(() => [4, 12, 16, 32, 64, 104], []);
  const dispatch = useDispatch();

  return (
    <div className="count">
      <h2 className="count__title">Choose item per page</h2>
      <select
        onChange={(e) => {
          dispatch(setLimit(Number(e.target.value)));
          // setPokemonPerPage?.(Number(e.target.value));
          // setSearchParams?.({ page: 1 });
          // setCurrentPage?.(1);
          dispatch(setCurrentPage(1));
          dispatch(setOffset(0));

          // setOffset?.(0);
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

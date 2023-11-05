const ItemPerPage = ({
  setPokemonPerPage,
  setSearchParams,
  setCurrentPage,
  setOffset,
}: {
  setPokemonPerPage: CallableFunction;
  setSearchParams: CallableFunction;
  setCurrentPage: CallableFunction;
  setOffset: CallableFunction;
}) => {
  const countItem = [4, 12, 16, 32, 64, 104];

  return (
    <div className="count">
      <h2 className="count__title">Choose item per page</h2>
      <select
        onChange={(e) => {
          setPokemonPerPage(e.target.value);
          setSearchParams({ page: 1 });
          setCurrentPage(1);
          setOffset(0);
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

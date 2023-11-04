const ItemPerPage = ({
  setPokemonPerPage,
}: {
  setPokemonPerPage: CallableFunction;
}) => {
  const countItem = [4, 12, 16, 32, 64, 104];

  return (
    <div className="count">
      <h2 className="count__title">Item per page</h2>
      <select onChange={(e) => setPokemonPerPage(e.target.value)}>
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

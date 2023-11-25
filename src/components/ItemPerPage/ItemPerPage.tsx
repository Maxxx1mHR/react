import { useRouter } from 'next/router';

const ItemPerPage = () => {
  const countItem = [4, 12, 16, 32, 64, 104];

  const router = useRouter();

  return (
    <div className="count">
      <h2 className="count__title">Choose item per page</h2>
      <select
        onChange={(e) => {
          router.replace({
            query: { ...router.query, limit: e.target.value },
          });
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

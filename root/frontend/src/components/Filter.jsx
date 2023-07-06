/* eslint-disable react/prop-types */
const Filter = ({ filter, setFilter }) => {
  return (
    <input
      className="input"
      type="text"
      placeholder="Filter by name"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    />
  );
};

export default Filter;

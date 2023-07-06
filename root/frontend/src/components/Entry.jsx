/* eslint-disable react/prop-types */
const Entry = ({ fullName, number, handleDelete }) => {
  return (
    <div className="Entry">
      <div>
        <h4>
          <b>Full Name:</b> {fullName}
        </h4>
        <p>
          <b>Phone Number:</b> {number}
        </p>
      </div>
      <button className="button delete" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Entry;

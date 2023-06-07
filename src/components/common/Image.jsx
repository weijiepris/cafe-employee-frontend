const Image = ({ logo }) => {
  return (
    <div>
      <img
        src={`data:image/jpeg;base64,${logo}`}
        alt="hello"
        height={"150px"}
        width={"150px"}
      />
    </div>
  );
};

export default Image;

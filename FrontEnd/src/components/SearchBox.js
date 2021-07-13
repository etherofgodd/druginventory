const SearchBox = () => {
  const search = async (e) => {
    e.preventDefault();
    console.log("BTN CLICKED");
  };
  return (
    <div className="section">
      <form onSubmit={search}>
        <label htmlFor="drugs">SEARCH FOR DRUGS HERE</label>
        <input type="text" />
        <button>SEARCH</button>
      </form>
    </div>
  );
};

export default SearchBox;

import { Link } from "react-router-dom";

const Card = ({ name, drugCategory, drugId }) => {
  return (
    <div className="card">
      <div className="card_ctn">
        <div className="name">
          <h3>{name}</h3>
        </div>
        <div className="cate">{drugCategory}</div>
      </div>
      <div>
        <div className="card_btn">
          <Link to={`/drug/${drugId}`}>
            <h3>View</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;

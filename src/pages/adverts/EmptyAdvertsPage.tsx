import { Link } from "react-router-dom";
import Button from "../../components/shared/Button";
import "./Advert.css"

const EmptyAdvertsPage: React.FC = () => (
  <div className="advertsPage-empty">
    <p>No adverts have been created yet, be the first one!</p>

    <Link to="/adverts/new">
      <Button>Create advert</Button>
    </Link>
  </div>
);

export default EmptyAdvertsPage;
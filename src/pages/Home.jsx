
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
     <div>
          <h1>TravelBugs: The web app abuzz with travel!</h1>
          <img  //Create assets for the landing page 
            src="/travel.jpg"
            alt="Travel image"
            height="500"
            width="800"
          />
          <button //Create a slider of travel posts recently uploaded from users. Selecting a post brings the user into the web app or to login/registration.
            id="view-travels-button"
            onClick={() => { navigate(`/travelcatalog/`); }}  //Change to /travelcatalog/
          >View Inspiring Journeys
          </button>
        </div>
    </>
  );
};

export default Home;


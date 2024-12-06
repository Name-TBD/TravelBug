//Landing page for users to sign into the web app

import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <>
      <h1>TravelBugs: The web app abuzz with travel!</h1>

      <img  //Create assets for the landing page 
        src="/travel.jpg"
        alt="Travel image"
        height="500"
        width="800"
      />
      
      
      <button //Create a slider of travel posts recently uploaded from users. Selecting a post brings the user into the web app or to login/registration.
        id="view-travels-button"
        onClick={() => { navigate(`/travelcatalog/`); }}
      >View Inspiring Journeys</button>
    </>
  );
};

export default Homepage;
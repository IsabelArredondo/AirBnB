// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignUpFormPage from "./components/SignUpFormPage";
import Spots from './components/Spots'
import SpotById from './components/SpotById/index'
import CreateArea from './components/CreateSpot'
import UserSpots from "./components/UserSpots";
import Reviews from "./components/SpotById/reviews";
import CreateReview from "./components/CreateReview";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import EditSpot from "./components/EditSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/signup">
            <SignUpFormPage />
          </Route>

          <Route exact path="/">
            <Spots />
          </Route>
          
          <Route path="/getspots/:spotId">
            <SpotById />
          </Route>

          <Route exact path="/spot/createSpot">
            <CreateArea />
          </Route>

          <Route exact path="/user/spots">
            <UserSpots />
          </Route>

          <Route exact path="/edit/userSpot/:id">
            <EditSpot />
          </Route>

          <Route exact path="/reviews">
            <Reviews />
          </Route>

          <Route exact path="/reviews/create/:spotId">
            <CreateReview />
          </Route>

        </Switch>
      )}
    </>
  );
}

export default App;

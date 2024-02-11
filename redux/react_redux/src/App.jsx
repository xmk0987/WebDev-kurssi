/** @format 
 * 
 * Student instructions:
 * Copy paste the App.jsx file from the previous exercises into this file. In this exercise, you will be introducing redux, which is a state management library that allows you to manage the state of your application in a single store. The store is a single source of truth for the state of your application, and it is the only place where the state can be updated. 
 * 
 * The fetch functions will start using action creators from now on. Each action creator will be responsible for updating the redux store with the data from the request. You can find the template files for the action creators in the src/redux/actionCreators folder. It is your job to implement them, as well as the reducers that will be used to update the store. The reducers can be found in the src/redux/reducers folder.
 * 
  Hint: Use the provided REQ_STATUS object to update the request status when necessary. "loading" for when the request is in progress, "success" for when the request is successful, and "error" for when the request has failed. The REQ_STATUS object is imported from the "../cypress/e2e/constants.js" file.

*/
import {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";
import { REQ_STATUS } from "../cypress/e2e/constants.js";
import { setStatus } from "./redux/actionCreators/statusActions.js";
import { setPlayers } from "./redux/actionCreators/playersActions.js";
import { setSelectedPlayer } from "./redux/actionCreators/selectedPlayerActions.js";

const url = "http://localhost:3001/api/players";
function App() {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(setStatus(REQ_STATUS.loading));
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error(`Request rejected with status ${res.status}`);
        }
      })
      .then((json) => {
        dispatch(setStatus(REQ_STATUS.success));
        dispatch(setPlayers(json));
      })
      .catch((err) => {
        dispatch(setStatus(REQ_STATUS.error));
      });
  }, [dispatch]);

  const players = useSelector(state => state.players);

  const handleClick = (id) => {
    dispatch(setStatus(REQ_STATUS.loading));
    const player = players.find((a) => a.id === id);
    console.log("tulee");
    console.log(player);
    dispatch(setSelectedPlayer(player));
};

  return (
    <>
      <RequestStatus/>
      <ListPlayers selectPlayer={handleClick}/>
      <SelectedPlayer />
    </>
  );
}

export default App;

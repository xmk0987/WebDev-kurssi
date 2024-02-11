/** @format 
 * 
 * Useful to read:
 * https://react.dev/
 * 
 * Student instructions:
 * Use the provided components to create a React app that fetches players from the provided API and displays them in a list when the App is first rendered. 
 * When a player is clicked in the list, fetch that player and display it in the selected player section.
 *  Give ListPlayer a function as its selectPlayer prop: it is used to fetch a specific player and should take a player id as its only argument. 
 * 
 * You can use the Vue exercise players_fetch as a reference and inspiration. More detailed descriptions of the components 
 * can also be found in the Vue exercises, but the components are not exactly the same.

	* REMEMBER: use the same ids, classes and attributes as in the Vue exercise in the same places to pass the tests. Remember to pass in the appropriate props to the child components.

	* BEWARE: The component props may be different from the Vue exercise and the tests will not pass if you use the wrong props.
	
  Hint: Use the provided REQ_STATUS object to update the request status when necessary. Use "loading" key for when the request 
  is in progress, "success" key for when the request is successful, and "error" for when the request has failed. 
  The REQ_STATUS object is now imported from the ../cypress/e2e/constants.js file and should not be modified.

*/

const url = "http://localhost:3001/api/players";
import { REQ_STATUS } from "../cypress/e2e/constants.js";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";
import { useEffect, useState } from "react";

function App() {
  const [ players, setPlayers ] = useState(null);
  const [ player, setPlayer ] = useState(null);

  const [ loading, setLoading ] = useState(true);


  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Couldnt fetch players");
        }
        const data = await response.json();
        setLoading(false);
        setPlayers(data);
      } catch (err) {
        setLoading(null);
        console.error(err);
      }
    }
    fetchPlayers();
  },[])


  const getPlayer = async (id) => {
    try {
      setLoading(true);

      const response = await fetch(url+'/'+id);
      if (!response.ok) {
        throw new Error("Couldnt fetch player");
      }
      const data = await response.json();
      setLoading(false);
      setPlayer(data);
    } catch (err) {
      setLoading(null);
      console.error(err);
    }
  }

  return (
    <div>
      <h2>Request Status</h2>
      <RequestStatus
        reqStatus={
          loading
            ? REQ_STATUS.loading
            : loading === false
            ? REQ_STATUS.success
            : REQ_STATUS.error
        }
      />      
      <h2>List of players</h2>
      <ListPlayers players={players} getPlayer={getPlayer}/>
      <SelectedPlayer player={player} />
    </div>
  )
}

export default App;

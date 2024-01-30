/** @format
 *
 * Copy paste your code from the App.jsx file here from the previous exercise.
 *
 * Use similar logic as in the Vue CRUD exercise to create a new player in the backend when the user submits the form in the AddPlayer component.
 *
 * Likewise, add logic to update the player in the backend when the user clicks the update button in the SelectedPlayer component.
 *
 * Finally, add logic to delete the player in the backend when the user clicks the delete button in the SelectedPlayer component.
 * 
 * HINT: Before the above logic, it may be better to start by updating the SelectedPlayer component to use the new props.
 * 
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise in the same places to pass the tests. Remember to pass in the appropriate props to the child components.

 * BEWARE: The component props may be different from the Vue exercise and the tests will not pass if you use the wrong props. Look at invididual component file descriptions and tests to see what props are expected.
 *
 */
import { REQ_STATUS } from "../cypress/e2e/constants.js";
const url = "http://localhost:3001/api/players";

import { AddPlayer } from "./components/AddPlayer";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";
import { useEffect, useState } from "react";

function App() {
  const [ players, setPlayers ] = useState(null);
  const [ player, setPlayer ] = useState(null);
  const [ loading, setLoading ] = useState(true);

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

  useEffect(() => {
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

  const addPlayer = async (name) => {
    try {
        setLoading(true);
        const maxId = players.reduce((max, player) => (player.id > max ? player.id : max), 0);

        const newPlayer = {
            name: name,
            id: maxId,
            isActive: false
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPlayer)
        });

        if (!response.ok) {
            throw new Error("Couldnt fetch player");
        }
        await fetchPlayers();
        setLoading(false);
        
    } catch (err) {
        setLoading(null);
        console.error(err);
    }
  }

  const handleDelete = async (id) => {
    try {
        setLoading(true);
  
        const response = await fetch(url+'/'+id , {
            method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error("Couldnt delete player");
        }

        await fetchPlayers();
        setPlayer(null);
        setLoading(false);

      } catch (err) {
        setLoading(null);
        console.error(err);
      }
  }

  const handleUpdate = async (active) => {
    try {
        console.log(player);
        setLoading(true);
  
        const response = await fetch(url+'/'+player.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isActive: active
            })
        });
        if (!response.ok) {
          throw new Error("Couldnt update player");
        }
        await getPlayer(player.id);
        setLoading(false);
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
      <h2>Add Player</h2>
      <AddPlayer handleSubmit={addPlayer} />
      <h2>List of players</h2>
      <ListPlayers players={players} getPlayer={getPlayer}/>
      <SelectedPlayer player={player} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
    </div>
  )
}

export default App;

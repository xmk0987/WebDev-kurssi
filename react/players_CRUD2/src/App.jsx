/** @format
 * Copy paste your code from the App.jsx file here from the previous exercise.
 *
 * Use similar logic as in the Vue CRUD2 exercise and add authentication to the app.
 * 
 * Backend is still using Basic Auth, so you must use the same logic as in the Vue exercise. 
 * 
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise in the same places to pass the tests. Remember to pass in the appropriate props to the child components. 

 * BEWARE: The component props may be different from the Vue exercise and the tests will not pass if you use the wrong props.
 */

import { AuthUser } from "./components/AuthUser.jsx";


import { REQ_STATUS } from "../cypress/e2e/constants.js";
const url = "http://localhost:3001/api/players";

import { AddPlayer } from "./components/AddPlayer";
import { ListPlayers } from "./components/ListPlayers.jsx";
import { SelectedPlayer } from "./components/SelectedPlayer.jsx";
import { RequestStatus } from "./components/RequestStatus.jsx";
import { useState } from "react";

function App() {
  const [ players, setPlayers ] = useState(null);
  const [ player, setPlayer ] = useState(null);
  const [ loading, setLoading ] = useState(true);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ user, setUser ] = useState(null);
  const [password, setPassword] = useState(null);

  const fetchPlayers = async () => {
    try {
      setLoading(true);

      const response = await fetch(url, {
        headers: {
            'Authorization': `Basic ${window.btoa(`${user}:${password}`)}`,
          }
      });
      if (!response.ok) {
        throw new Error("Couldnt fetch players");
      }
      const data = await response.json();
      setLoading(false);
      setPlayers(data);
    } catch (err) {
      setLoading(null);
      setIsLoggedIn(false);
      console.error(err);
    }
  }

  const getPlayer = async (id) => {
    try {
      setLoading(true);

      const response = await fetch(url+'/'+id, {
        headers: {
            'Authorization': `Basic ${window.btoa(`${user}:${password}`)}`,
        }
      });
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
                'Content-Type': 'application/json',
                'Authorization': `Basic ${window.btoa(`${user}:${password}`)}`
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
            headers: {
                'Authorization': `Basic ${window.btoa(`${user}:${password}`)}`,
            },
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
                'Content-Type': 'application/json',
                'Authorization': `Basic ${window.btoa(`${user}:${password}`)}`,
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

  const login = async (username, password) => {
    setUser(username);
    setPassword(password);
    await fetchPlayers();
    setIsLoggedIn(true);
  }

  const logout = () => {
    setUser(null);
    setPassword(null);
    setIsLoggedIn(false);
  }

  const register = async (username, password) => {
    try {
        setLoading(false);
        const credentials = window.btoa(`${username}:${password}`);
    
        const response = await fetch(url, {
            
          headers: {
            Authorization: `Basic ${credentials}`,
          },
          method: 'POST',

        });
    
        if (!response.ok) {
            throw new Error("Couldnt register user");
        }

        setUser(username);
        setPassword(password);
        await fetchPlayers();
        setLoading(false);
        setIsLoggedIn(true);

    } catch (err) {
        setLoading(null);
        console.error(err);
    }
  };
  

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
      {isLoggedIn ? 
      <>
        <h2>Add Player</h2>
        <AddPlayer handleSubmit={addPlayer} />
        <h2>List of players</h2>
        <ListPlayers players={players} getPlayer={getPlayer}/>
        <SelectedPlayer player={player} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
      </>
      : 
      <AuthUser isLoggedIn={isLoggedIn} onLogin={login} onRegister={register} onLogout={logout}/>
      }
    </div>
  )
}

export default App;

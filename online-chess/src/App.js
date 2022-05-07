import Board from './Components/Board';
import "./app.css";
import { useSelector, useDispatch } from 'react-redux';
import { setTeam } from './actions';
function App() {
  const team = useSelector(state => state.team)
  const dispatch = useDispatch();
  const switchTeams = () => {
    console.log("Team: " + team + " swapped team.")
    if (team === "White"){
      dispatch(setTeam("Black"))
    } else {
      dispatch(setTeam("White"))
    }
  }
  return (
    <div>
      <Board className="Board"></Board>
      <button className='swap-team' onClick={switchTeams}>Change Team</button>
    </div>
  )
}

export default App;

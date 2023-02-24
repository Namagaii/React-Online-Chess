import Board from './Components/Board';
import { changeTurn, hideThreatMap, showBlackThreatMap, showWhiteThreatMap, testMoves } from './logic';
import Square from './helpers/square';
function getSquares(){
  console.log("All Squares:");
  for(let x = 0; x < 8; x++){
    for(let y = 0; y < 8; y++){
      console.log(`Square (${x}, ${y})`);
      console.log(Square.getContent(x,y));
    }
  }
}
function App() {
  return (
    <div>
      <Board team="white"/>
      <button onClick={changeTurn} style={{position:"fixed"}}>Change Turn</button>
      <button onClick={testMoves} style={{position:"fixed", top:"3%"}}>TestMoves</button>
      <button onClick={showWhiteThreatMap} style={{position:"fixed",top:"20%",left:"80%"}}>White Threatmap</button>
      <button onClick={showBlackThreatMap} style={{position:"fixed",top:"30%",left:"80%"}}>Black Threatmap</button>
      <button onClick={hideThreatMap} style={{position:"fixed",top:"40%",left:"80%"}}>Hide Threatmap</button>
    </div>
  )
}

export default App;

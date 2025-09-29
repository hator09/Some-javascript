import { useState } from "react"

const TURNS = {
  X: 'x',
  O: 'o'
}
const WINNER_COMBOS=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];
function WinnerModal({winner}){
  if(winner === null) return null;

  const winnerText = winner === false ? 'Empate' : 'Ganó:'

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>

        <header className="win">
          {winner && <Square>{winner}</Square>}
        </header>
      </div>
    </section>
  )
}

const Square = ({children, index, updateBoard, isSelected}) => {
  const className =`square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index)
  }
  return (
  <div className={className} onClick={handleClick}>
    {children}
  </div>)
}


function App() {
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)

  function checkWinner(board){
    
    for(const combo of WINNER_COMBOS){
      const [a, b, c] = combo;
      if(board[a] && board[a] === board[b] && board[a] === board[c]){
        return board[a];
      }
    }
    return null;
  }
  function checkEndGame(board){
    let empate = true;
    board.forEach(cell => {
      if(cell === null)
        empate = false;
    });
    return (empate)
  }

  const updateBoard = (index) =>{
    if(board[index]) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    setTurn(turn === TURNS.X ? TURNS.O : TURNS.X)
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      console.log("winner :" + newWinner)
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
    
  }

  
  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal winner={winner}/>
    </main>
  )
}

export default App

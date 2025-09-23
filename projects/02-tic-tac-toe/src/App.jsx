const TURNS = {
  X: 'x',
  O: 'o'
}

const board = Array(9).fill(null)

const Square =
function App() {
  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <section className="game">
        {
          board.map((_,index) => {
            return (
              <Square
                key={index}
                index={index}
              >
                {index}
              </Square>
            )
          })
        }
      </section>
    </main>
  )
}

export default App

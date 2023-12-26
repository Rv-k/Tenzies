import React from 'react'
import Dies from './components/Dies'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

const App = () => {
  function generate () {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function diesArray () {
    const array = []
    for (let i = 0; i < 10; i++) {
      array.push(generate())
    }
    console.log(array)
    return array
  }

  const [dies, setDies] = React.useState(diesArray())
  const [win, setWin] = React.useState(false)

  const diesElement = dies.map(die => (
    <Dies
      key={die.id}
      id={die.id}
      value={die.value}
      bool={die.isHeld}
      click={() => selectDies(die.id)}
    />
  ))

  function selectDies (id) {
    console.log(id)
    setDies(die =>
      die.map(prevdata =>
        prevdata.id === id
          ? { ...prevdata, isHeld: !prevdata.isHeld }
          : prevdata
      )
    )
  }

  function rollDies () {
    if(win){
      setDies(diesArray)
      setWin(false)
    }else{
      setDies(prevDies => prevDies.map(die => (die.isHeld ? die : generate())))
    }
    
  }

  React.useEffect(() => {
    const checkall = dies.every(die => die.isHeld)
    const firstvalue = dies[0].value
    const allset = dies.every(die => die.value === firstvalue)
    if (checkall && allset) {
      setWin(true)
    }
  }, [dies])

  return (
    <div className='container-fluid ' id='main-container'>
      {win && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      
      <div className='display-3 text-center fw-bold text-light pt-2'>
        Tensizes
      </div>
      <div className='text-light text-center mt-3'>
        <p>
          Choose a number then try to <br /> select all dies with the same
          number and keep rolling
        </p>
      </div>
      <div className='container-fluid p-3 d-flex justify-content-center'>
        {diesElement[0]}
        {diesElement[1]}
        {diesElement[2]}
        {diesElement[3]}
        {diesElement[4]}
      </div>
      <div className='container-fluid p-3 d-flex justify-content-center'>
        {diesElement[5]}
        {diesElement[6]}
        {diesElement[7]}
        {diesElement[8]}
        {diesElement[9]}
      </div>
      <div className='text-center mt-3'>
        <div className='btn btn-success' onClick={rollDies}>
          {win ? 'New Game' : 'Roll Dies'}
        </div>
      </div>
    </div>
  )
}

export default App

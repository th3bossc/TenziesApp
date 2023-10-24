import './App.css'
import Die from './components/Die'
import Won from './components/Won'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
interface dieI {
  id : string;
  num: number,
  selected: boolean
}

function App() {





  const [tenzies, setTenzies] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)
  const initialize = () => {
    const nums : dieI[] = []
    for (let i = 0; i < 10; i++)
      nums.push({id : nanoid(), num : Math.floor(Math.random() * 6)%6 + 1, selected : false})
    return nums;
  }

  const getRandomNums = () => {
    const nums : dieI[] = []
    for (let i = 0; i < 10; i++) {
      if (dice[i].selected)
        nums.push(dice[i])
      else
        nums.push({id : nanoid(), num : Math.floor(Math.random() * 6)%6 + 1, selected : false})
    }
    return nums
  }

  const [dice, setDice] = useState<dieI[]>(initialize())

  useEffect(() => {
    const allHeld = dice.every(die => die.selected)
    const firstValue = dice[0].num
    const allSame = dice.every(die => die.num === firstValue)
    allHeld && allSame && setTenzies(true)
  }, [dice])



  const handleRoll = () => {
    if (!tenzies) {
      setDice(getRandomNums())
      setCount(count => count + 1)
    }
    else {
      setTenzies(false)
      setDice(initialize())
    }

  }

  const handleSelect = (id : string) => {
    setDice(dice => {
      return dice.map(die => {
        if (die.id === id)
          return {...die, selected : !die.selected}
        else
          return die
      })
    })
  }

  return (
    <>
      { tenzies && <Confetti /> }
      <main className="main-content">
        { 
          (tenzies) 
            ? <Won count={ count } />
            : <>
              <h1 className="title">Tenzies</h1>
              <h3 className="text"> Roll until all dice are the same. Click each die to freeze it at its current value between rolls. </h3>
              <div className='dies'>
                { dice.map((die) => <Die 
                                      key={die.id} 
                                      id={die.id}
                                      num={die.num} 
                                      selected={die.selected} 
                                      handler={ handleSelect }
                                    />) }
              </div>
            </>
        }
        
        <button className="roll-button" onClick={ handleRoll }> { tenzies ? "Reset game" : "Roll"} </button>
      </main>
      <footer className='footer'>
        <p className="footer-text">Made by<a href="https://th3bossc.github.io/Portfolio" target='_blank'>  @diljith </a> </p>
      </footer>
    </>
  )
}

export default App

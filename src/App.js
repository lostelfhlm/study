import { nanoid } from 'nanoid'
import './style.css'
import React, { useEffect, useState, useRef } from "react"
import { ReactDOM } from "react"
import Die from './practice8/Die'
import Confetti from 'react-confetti'

export default function App () {



  const old = {
    count: 0,
    step: 0
  }
  const [tenzies, setTenzies] = useState(false)

  const [value, setValue] = useState(allNewDice())


  const [count, setCount] = useState(old)
  const [times, setTimes] = useState(0)
  const counttime = useRef(null)



  function record () {


    if (count.count !== 0) {
      setCount(() => {
        return {
          count: count.count,
          step: 0
        }
      })


    } else {

      return {
        count: 0,
        step: 0
      }
    }
  }



  function allNewDice () {
    const newarr = []

    for (let i = 0; i < 10; i++) {
      const randomnum = creatbox()

      newarr.push(randomnum)
    }

    return newarr
  }

  useEffect(() => {

    let num = []
    for (let i = 0; i < value.length - 1; i++) {


      if (value[i].value === value[i + 1].value) {
        num.push(value[i].value)
      }

    }

    const allHeld = value.every((item) => item.isHeld)



    if (num.length == 9 && allHeld) {
      setTenzies(true)

      setCount((item) => {

        return {
          ...item,
          count: item.count + 1
        }
      })

    }
    if (times === 0) {
      timestart()
    } else if (allHeld) {
      timeend()
    }

  }, [value])



  function timestart () {
    counttime.current = setInterval(function () {
      setTimes(item => item + 1)
    }, 1000)
  }

  function timeend () {
    clearInterval(counttime.current)
    console.log(times)
  }


  function creatbox () {
    return {

      value: Math.floor(Math.random() * (6)) + 1,
      isHeld: false,
      id: nanoid()
    }
  }






  function holdbox (id) {
    let num = 0
    let select = []
    for (let i in value) {
      if (!value[i].isHeld) {
        num++
      } else {

        select.push(value[i].value)

      }

    }

    console.log(num)
    if (num === 10) {
      setValue(value.map((item) => {
        return {
          ...item,
          isHeld: item.id === id ? true : item.isHeld
        }
      }))
    } else {

      setValue(value.map((item) => {
        return {
          ...item,
          isHeld: item.id === id && item.value === select[0] ? true : item.isHeld
        }
      }))

    }

  }


  function Reset () {

    if (tenzies) {
      setValue(allNewDice())
      setTenzies(false)
      setTimes(0)
      record()
    } else {
      setCount((item) => {
        return {
          ...item,
          step: item.step + 1
        }
      })
      setValue(value => value.map(item => {
        return item.isHeld ?
          item :
          creatbox()

      })
      )
    }
  }



  const style = value.isHeld ? 'boxactive' : ''


  const Delement = value.map((item) => <Die value={item.value} className={'boxactive'} isHeld={item.isHeld} holdbox={() => holdbox(item.id)} key={item.id} />)

  return (

    <main className='main'>

      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      {!tenzies && <p className="instructions">Roll until all boxes are the same. Click each box to freeze it at its current value between rolls.</p>}
      {!tenzies && <div className='container '>
        {Delement}
      </div>}

      {tenzies && <div className='win'>CONGRATULATION <br />YOU WIN!!!</div>}
      <div >
        you had win <p className='score'>{count.count}</p>  times <br />

        spend <p className='score'>{times}</p> s

        and use <p className='score'>{count.step}</p> steps

      </div>

      <button className='roll' onClick={Reset}>{tenzies ? 'Newgame' : 'Roll'}</button>

    </main>















  )
}
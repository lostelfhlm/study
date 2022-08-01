

import React from "react"

export default function Die (props) {


  const active = props.isHeld ? { backgroundColor: '#FFFF90' } : { backgroundColor: 'white' }



  return (


    <div style={active} onClick={props.holdbox}>{props.value}</div>


  )
}
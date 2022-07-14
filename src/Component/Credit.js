import React from 'react'
import "../Style/Credit.scss"
function Credit({setCredit,displayCredit}) {
  return (
    <div className='credit-container'>
        <span onClick={()=>setCredit(!displayCredit)}>X</span>
        <div className='info-credit'>
            <h1>This Web Created by <br/> Ory Works </h1>
            <h2>Api Used on this web app</h2>
            <a target={'_blank'} href='https://www.openstreetmap.org/'>https://www.openstreetmap.org/</a>
            <a target={'_blank'} href="https://openweathermap.org/">https://openweathermap.org/</a>
            <div className='visit-container'>
                <h2>for more work you can visit</h2>
                <a target={'_blank'} href="https://orykevin.github.io/">orykevin.github.io</a>
            </div>
        </div>
    </div>
  )
}

export default Credit
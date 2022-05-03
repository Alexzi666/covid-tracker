import React from 'react'

function ChartView({picSrc}) {
    return (
        <div className='sidebar_div'>
            <div className='sidebar'>
                <img className='country_flag' src={picSrc} alt="pic" width="160" height="110"></img>
            </div> 
        </div>
    )
}

export default ChartView

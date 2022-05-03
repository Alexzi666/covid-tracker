import React from 'react'

function Infobar({tag, info}) {

    const indicator = info === 'No-Data-Collected' ? true : false;

    return (
        <div className='sidebar' id='info_bar'>
            <h3>{tag}:</h3>
            <h3>{info}</h3>
            {indicator && <h3>ʕノ•ᴥ•ʔノ ︵ ┻━┻</h3>}
        </div>
    )
}

export default Infobar

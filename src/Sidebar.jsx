import React from 'react'

function Sidebar({ title, cases, total }) {
    return (
        <div className='sidebar'>
            <li className='sidebar_title'>{title}</li>
            <h2 className='sidebar_cases'>+ {cases}</h2>
            <li className='sidebar_total'>{total} Total</li>
        </div>
    )
}

export default Sidebar

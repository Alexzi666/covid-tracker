import React from 'react'

function SidebarInfo({info}) {
    
    return (
        <div className='sidebar'>
            <ul className='sidebar_h4_tag'>
                    {info.country && <h4 className='sidebar_h4'>{info.country}</h4>}
                    {!info.country && <h4 className='sidebar_h4'>Worldwide</h4>}
            </ul>
            <div className='scroll_info'>
                <ul className='sidebar_ul'>
                    <li className='sidebar_li'>CONT: </li>
                    {info.continent && <li className='sidebar_li'>{info.continent}</li>}
                    {!info.continent && <li className='sidebar_li'>_______</li>}
                    
                </ul>
                <ul className='sidebar_ul'>
                    <li className='sidebar_li'>Active: </li>
                    <li className='sidebar_li'>{info.active}</li>
                </ul>
                <ul className='sidebar_ul'>
                    <li className='sidebar_li'>Critical: </li>
                    <li className='sidebar_li'>{info.critical}</li>
                </ul>
                <ul className='sidebar_ul'>
                    <li className='sidebar_li'>Tests: </li>
                    <li className='sidebar_li'>{info.tests}</li>
                </ul>
                <ul className='sidebar_ul'>
                    <li className='sidebar_li'>POP.: </li>
                    <li className='sidebar_li'>{info.population}</li>
                </ul>
                <ul className='sidebar_ul'>
                    <li className='sidebar_li'>OneCase/Peop: </li>
                    <li className='sidebar_li'>{info.oneCasePerPeople}</li>
                </ul>
                <ul className='sidebar_ul'>
                    <li className='sidebar_li'>OneDea/Peop: </li>
                    <li className='sidebar_li'>{info.oneDeathPerPeople}</li>
                </ul>
                <ul className='sidebar_ul'>
                    <li className='sidebar_li'>OneTes/Peop: </li>
                    <li className='sidebar_li'>{info.oneTestPerPeople}</li>
                </ul>
            </div>
        </div>
    )
}

export default SidebarInfo

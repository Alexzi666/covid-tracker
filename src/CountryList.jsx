import {React, useState} from 'react'

function CountryList({info}) {

    function addcommas(x) {
        return x.toLocaleString('en-US');
    }

    return (
        <div className='live_cases_div'>
            <h3>Live Cases by Country (DESC)</h3>
            <hr/>
            <div className='live_cases_span'>
                {info && info.map( country => {
                    return (
                        <tr className='country_list' key={country.countryId}>
                            <td>{country.countryId}</td>
                            <h4>{addcommas(country.val)}</h4>
                        </tr>
                    )
                })}
            </div>
        </div>
    )
}

export default CountryList

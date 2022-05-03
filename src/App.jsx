import './App.css';
import { 
  fetchCountry,
  fetchGetCountries,
  sortCountryCases,
  fetchProvince,
  getProvince,
  filterProvince,} from './tools.js';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar.jsx';
import ChartView from './ChartView.jsx';
import CountryList from './CountryList.jsx';
import SidebarInfo from './SidebarInfo.jsx';
import Service from './Service.jsx';
import Infobar from './Infobar.jsx';



function App() {

  const [ countries, setCountries ] = useState([]);
  const [ countryID, setCountryID ] = useState('worldwide')
  const [ country, setCountry ] = useState('worldwide');
  const [ province, setProvice ] = useState([]);
  const [ provinceID, setProvinceID ] = useState(' Province '); 
  const [ countryData, setCountryData ] = useState();
  const [ worldCountryData, setWorldCountryData ] = useState([]);
  const [ flag, setFlag ] = useState('https://cdn.pixabay.com/photo/2017/06/14/08/20/map-of-the-world-2401458_1280.jpg');
  const [ data, setData ] = useState([]);
  const [ dateList, setDateList ] = useState();
  const [ provinceCases, setProvinceCases ] = useState({});
  const [ provinceDeaths, setProvinceDeaths ] = useState({});
  const [ provinceRecovered, setProvinceRecovered ] = useState({});
  const [ date, setDate ] = useState('');
  const [ provinceData, setProvinceData ] = useState([]);
  const [ pickDateList, togglePickDateList] = useState(false);
  const [ loading, setloading ] = useState(false);
  const [ error, seterror ] = useState()

  
  function getProvinceData(){
    getProvince()
    .then(data => {setData(data)})
    .catch(error => {seterror(error.error)});
  }
  
  
  function getWordwideData(){
    fetchCountry(country)
    .then(output => { 
      setCountryData(output);
    })
    .catch(error => {seterror(error.error)});
  }

  function getCountries(){
    fetchGetCountries()
    .then(
      output => {
        const countries = output.map((country) => ({
          name : country.country,
          value : country.countryInfo.iso3,
        }));

        const wordlCountries = output.map((country) => ({
          countryId : country.country,
          val : country.cases,
        }));

        setWorldCountryData(sortCountryCases(wordlCountries));
        setCountries(countries);
      }
    )
    .catch(error => {seterror(error.error)});
  }

  function modifyProvince(event){
    const provinceCode = event.target.value;
    setProvinceID(provinceCode)

    if(provinceCode === `No Data Collected for This Country`){
      const temp = [];
        temp['cases'] = 'No-Data-Collected';
        temp['deaths'] = 'No-Data-Collected';
        temp['recovered'] = 'No-Data-Collected';

        setCountryData();
        setProvinceData(temp);
        return;
    }

    setDate('');
    setloading(true);
    fetchProvince(countryID, provinceCode)
    .then(data => {
      if(data.message === `Country not found or doesn't have any historical data`){
        const temp = [];
        temp['cases'] = 'No-Data-Collected';
        temp['deaths'] = 'No-Data-Collected';
        temp['recovered'] = 'No-Data-Collected';

        setCountryData();
        setProvinceData(temp);
        return;
      }

      Object.keys(data).map( obj => {
        if(obj === 'timeline'){

          Object.keys(data[obj]).map( date => {

            if(date === 'deaths'){
              setProvinceDeaths(data[obj][date]);
            }

            if(date === 'cases'){
              setProvinceCases(data[obj][date]);
              const dateList = [];
              Object.keys(data[obj][date]).map( time => {
                dateList.unshift(time);
              })
              setDateList(dateList)
              togglePickDateList(true);
            }

            if(date === 'recovered'){
              setProvinceRecovered(data[obj][date])
            }
          })
        }
      })
    })
    .catch(error => {})
    .finally(final => {
      setloading(false);
    })
  }

  function modifyDateList(event){
    const date = event.target.value;
    const tempData = [];

    setDate(date);

    Object.keys(provinceCases).map((cases, index) =>{
      if(cases == date){
        tempData[`cases`] =  provinceCases[cases]
      }
    });

    Object.keys(provinceDeaths).map((cases, index) =>{
      if(cases == date){
        tempData[`deaths`] =  provinceDeaths[cases]
      }
    });

    Object.keys(provinceRecovered).map((cases, index) =>{
      if(cases == date){
        tempData[`recovered`] =  provinceRecovered[cases]
      }
    });

    setCountryData();
    setProvinceData(tempData);

  }

  function modifyCountry(event){
    const countryCode = event.target.value;

    togglePickDateList(false);
    setProvinceID(' Province ');
    
    fetchCountry(countryCode)
    .then( output => {
      setCountryData(output);
      setCountry(countryCode);
      setCountryID(output.country);
      setProvice(filterProvince(output.country ,data));

      if(countryCode === 'worldwide') {setFlag(`https://cdn.pixabay.com/photo/2017/06/14/08/20/map-of-the-world-2401458_1280.jpg`);}
      else{setFlag(output.countryInfo.flag);}
    })
    .catch( error => {seterror(error.error)});
  }



  useEffect(() => {
    getWordwideData();
    getCountries();
    getProvinceData();
  } 
  , []);


  return (
    <div className="app">
      
      <div className='header'>
        <span className='header_label'>
          <h1 className='header_text'>Welcome to Covid Tracker</h1>
          <h2 className='header_text'>Data Updated in Realtime for Every 10 Minutes</h2>
        </span>
        
        <span className='selection_span'>

          <select className='dropdown_selection' 
            value={country.value}
            onChange={ modifyCountry }
          >
          <option value="worldwide"> Worldwide </option>
            {countries.map( (country) => (
              <option value={country.value} 
              key={country.name}
              >{country.name}</option>
            ))}
          </select>

          <select className='dropdown_selection' 
            value={provinceID}
            onChange={ modifyProvince }
          >
          <option value="N/A"> Province </option>
            {province[0] == null && <option>No Data Collected for This Country</option>}
            {province[0] != null && province.map( (country, index) => 
              (
              <option value={country} 
              key={country}
              >{country}</option>
            ))}
          </select>


          { dateList != null && pickDateList 
          && <select className='dropdown_selection'
            value={ date }
            onChange={ modifyDateList }
          >
            <option>Pick A Date</option>
            {dateList.map((date) => (
              <option
              value={date}
              key={date}
              >{date}</option>
            ))}

          </select>
          }
        </span>
        
      </div>
      <hr/>

      <div className='info_box'>
          <span className="sidebar_view">
            {countryData &&
              <div className='sidebar_view'>
                <Sidebar title="Covid Cases" cases={countryData.todayCases} total={countryData.cases}></Sidebar>
                <Sidebar title="Recovered" cases={countryData.todayRecovered} total={countryData.recovered}></Sidebar>
                <Sidebar title="Death" cases={countryData.todayDeaths} total={countryData.deaths}></Sidebar>
                <SidebarInfo info={countryData}></SidebarInfo>
                <ChartView picSrc={ flag }></ChartView>
              </div>
            }

            {!countryData && provinceData &&
              <div className='sidebar_view'>
                <Infobar tag='Cases' info={provinceData.cases}></Infobar>
                <Infobar tag='Deaths' info={provinceData.deaths}></Infobar>
                <Infobar tag='Recovered' info={provinceData.recovered}></Infobar>
                <ChartView picSrc={ flag }></ChartView>
              </div>
            }
          </span>

      </div>

      <div className="body">
        <div className='left_window'>
          {(error == null || error == undefined) && <Service/>}
        </div>

        <div className="right_window">
          <CountryList info={worldCountryData}/>
        </div>

      </div>

      {loading && <div className='loading_img'>
        <h6>Preparing Data for You</h6>
        <div className="lds-heart"><div className='heart'></div></div>
        </div>}
      
    </div>
  );
}

export default App;

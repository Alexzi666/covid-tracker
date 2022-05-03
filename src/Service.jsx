import React, { useState, useEffect } from 'react'
import {
    fetchLogin,
    fetchLogout,
    fetchSession,
    detectDigit,
    fetchAddTodo,
    fetchTodos,
    fetchDeleteTodo,
} from './tools.js';

function Service() {

    const [ userLogin, setUserLogin ] = useState(false);
    const [ error, setError ] = useState();
    const [ error2, setError2 ] = useState();
    const [ userInput, setuserInput ] = useState('');
    const [ username, setusername ] = useState('')
    const [ disableButton, setdisableButton ] = useState(false);
    const [ entry, setentry ] = useState();
    const [ todo, settodo ] = useState([]);
    const [ severity, setseverity ] = useState('');
    const [ conError, setConError ] = useState();
    
    function login(){
        setError('');
        setError2('');
        fetchLogin(userInput)
        .then( loginInfo => {
            setUserLogin(true);
            fetchSession()
            .then(res => {setusername(res.username);})
        })
        .catch( error => {
            setError(error.error)
            setConError(error.error);
        })
        .finally(output => {showTodos(); setuserInput('')})
    }

    function logout(){
        setError('');
        setError2('');
        setuserInput('');
        settodo([]);

        fetchLogout()
        .then(() => {
            setUserLogin(false);
        })
        .catch((error) => {setError(error.error)})
    }

    function containsDigi(text){
        if(detectDigit(text) === "1"){
            setError('Only Letters Are Allowed');
            setdisableButton(true);
        }
        else if(detectDigit(text) === "2"){
            setError('Only One Space is Allowed');
            setdisableButton(true);
        }
        else if(detectDigit(text) === "3"){
            setError('Username Shoud not Start with Space');
            setdisableButton(true);
        }
        else if(detectDigit(text) === "4"){
            setError('Username Shoud not Exceed the Length of 18');
            setdisableButton(true);
        }
        else {
            setError('');
            setError2('');
            setdisableButton(false);
        }
    }

    function addEntry(text){
        setentry('');
        setseverity('');
        fetchAddTodo(text)
        .then((res) => {showTodos()})
        .catch(error => {
            if(error.error === 'Please Only Pick LOS from the Following Choices'){
                setError2(error.error);
            }
            else setError(error.error)
        })
    }

    function showTodos(){
        fetchTodos()
        .then(res => {settodo(res)})
        .catch(error => {setConError(error.error)})
    }

    useEffect(() => {
        fetchSession()
        .then(res => {
            setusername(res.username);
            fetchLogin(res.username)
            .then(() => {
                setUserLogin(true);
                showTodos();
            })
        })
    }, [setUserLogin])

    return (
        <div className='service_box'>
            { !userLogin && 
            <div className='login_form'>
                <h3>(👍≖‿‿≖)👍 Please Login to Proceed to Use HealthNote  👌(≖‿‿≖👌)</h3>
                <div>
                    <input 
                    type="text" 
                    placeholder='Please Enter Your Username'
                    value={userInput} 
                    onInput={(e) => {setuserInput(e.target.value); containsDigi(e.target.value)}}
                    />
                    <span className='error_message'> { error }</span>
                </div>
                <br/>
                <button 
                onClick={() => {login()}}
                disabled= {disableButton}
                > Login </button>
            </div>}
            { userLogin && 
            <div className='logout_form'>
                <div className='logout_form_div'>
                    <h1 className='logout_form_header_text'>Welcome to HealthNote</h1>
                    <button className='logout_button' onClick={logout}> Logout </button>
                </div>
                <span className='username_span'>User: <span className='username'>{username.charAt(0).toUpperCase() + username.slice(1)}</span></span>

                <span className='input_form'>
                    <div className='div1'>
                        <h4 className='IndicateYourSymptom'>Indicate Your Symptom : </h4>
                        <span className='req_span'>
                            <input type="text"
                            placeholder='Required!'
                            value={entry}
                            onInput={ (e) => {setentry(e.target.value);setError2(''); setError('')}}
                            />
                            <p className='err_mess_1'>{error}</p>
                        </span>
                        <p className='suggestion_1'>Example: Fever/Chill/Cough/Fatigue/Headache/Nausea or vomiting/Diarrhea etc.</p>
                    </div>


                    <div className='div2'>
                        <h4 className='LevelofSeverity'>Level of Severity : </h4>
                        <span className='req_span'>
                            <input type="text"
                            placeholder='ex: Minor'
                            value={severity}
                            onInput={ (e) => {setseverity(e.target.value); setError2(''); setError('')}}
                            />
                            <p className='err_mess_2'>{error2}</p>
                        </span>
                        <p className='suggestion_2'>(Default to Minor if not indicate) Pick from Following: Critical/Major/Moderate/Minor/Cosmetic</p>
                    </div>

                    <button
                    className='comfirm_button'
                    onClick={() => {addEntry(entry + "," + severity)}}
                    >Comfirm</button>
                </span>

                <div className='todo_list'>
                    { Object.keys(todo).map(val => (
                        <ul className='todo_ul'>
                            
                            <li className='todo_li'>Symptom: {todo[val].task1} </li>
                            <li className='todo_li'>Level: 
                                <span className={todo[val].seve.toLowerCase()}> {todo[val].seve.charAt(0).toUpperCase() + todo[val].seve.slice(1)}</span>
                            </li>
                            <button 
                            className='todo_list_button'
                            onClick={() => {fetchDeleteTodo(val); showTodos()}}
                            >Delete</button>
                        </ul>
                    ))}
                </div>
            </div>
            }
        </div>
    )
}

export default Service

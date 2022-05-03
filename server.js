const express = require('express');
const app = express();
const PORT = 4000;
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser');

const sessions = require('./sessions');
const users = require('./users');
const todos = require('./todos');


app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());


  app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    res.json({ username });
  });
  
  app.post('/api/session', (req, res) => {
    const { username } = req.body;
    if(!username) {
      res.status(400).json({ error: 'required-username' });
      return;
    }

    if(username.length > 18) {
      res.status(403).json({ error: 'username exceed 18 max length requirement' });
      return;
    }

    if(username.toLowerCase() === 'dog') {
      res.status(403).json({ error: 'auth-insufficient' });
      return;
    }

    if(username.charAt(0) == ' ') {
      res.status(403).json({ error: 'auth-failed' });
      return;
    }

    let countZero = 0;
    const allow = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < username.length; i++){
        if(username.charAt(i) == ' ') countZero++;

        if (allow.indexOf(username.charAt(i)) == -1 || countZero > 1){
          res.status(403).json({ error: 'auth-failed' });
          return;
        }
    }

    const sid = sessions.addSession(username);
    const existingUserData = users.getUserData(username);
    if(!existingUserData) {
      users.addUserData(username, todos.makeTodoList());
    }
    res.cookie('sid', sid);
    res.json(users.getUserData(username).getTodos());
  });
  
  app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(sid) {
      res.clearCookie('sid');
    }
    if(username) {sessions.deleteSession(sid)}
    res.json({ username });
  });





  app.get('/api/todos', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    res.json(users.getUserData(username).getTodos());
  });
  
  app.post('/api/todos', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const { task } = req.body;

    if(!task) {
      res.status(400).json({ error: 'Symptom-Required' });
      return;
    }

    if(task === "undefined," || task === "," || task.charAt(0) == ","){
      res.status(400).json({ error: 'Symptom-Required' });
      return;
    }

    const allow = [`critical`,
                    `major`,
                    `moderate`,
                    `minor`,
                    `cosmetic`,]

    const severity = task.split(",")[1].toLowerCase();

    if(severity != '' && severity != null && severity != undefined){
      for(let i = 0; i < allow.length; i++){
        if(i == allow.length - 1 && allow[i] != severity){
          res.status(400).json({ error: 'Please Only Pick LOS from the Following Choices' });
          return;
        }
        else if(allow[i] === severity){
          const todoList = users.getUserData(username);
          const id = todoList.addTodo(task);
          res.json(todoList.getTodo(id));  
          return;
        }
      }
    }

    const todoList = users.getUserData(username);
    const id = todoList.addTodo(task);
    res.json(todoList.getTodo(id));    
  });
  
  app.get('/api/todos/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const todoList = users.getUserData(username);
    const { id } = req.params;
    if(!todoList.contains(id)) {
      res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
      return;
    }
    res.json(todoList.getTodo(id));
  });
  
  app.put('/api/todos/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const todoList = users.getUserData(username);
    const { id } = req.params;
    const { task, done=false } = req.body;
    if(!task) {
      res.status(400).json({ error: 'required-task' });
      return;
    }
    if(!todoList.contains(id)) {
      res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
      return;
    }
    todoList.updateTodo(id, { task, done });
    res.json(todoList.getTodo(id));
  });
  
  app.patch('/api/todos/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const { id } = req.params;
    const { task, done } = req.body;
    const todoList = users.getUserData(username);
    if(!todoList.contains(id)) {
      res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
      return;
    }
    todoList.updateTodo(id, { task, done });
    res.json(todoList.getTodo(id));
  });
  
  app.delete('/api/todos/:id', (req, res) => {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !username) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }
    const { id } = req.params;
    const todoList = users.getUserData(username);
    const exists = todoList.contains(id);
    if(exists) {
      todoList.deleteTodo(id);
    }
    res.json({ message: exists ? `todo ${id} deleted` : `todo ${id} did not exist` });
  });




  //Third party API calls
  app.get('/api/countries', (req, res) => {
      const api_url = `https://disease.sh/v3/covid-19/countries`;

      fetch(api_url)
      .then(data =>{return data.json()})
      .then(data => {res.json(data)})
      .catch(error => {Promise.reject({ error : 'something went wrong!'})}
      )
  });

  app.get('/api/country/:countryID', (req, res) => {
      const countryID = req.params.countryID;
      const api_url = countryID == 'worldwide' 
      ? `https://disease.sh/v3/covid-19/all` 
      : `https://disease.sh/v3/covid-19/countries/${countryID}`;

      fetch(api_url)
      .then(data =>{return data.json()})
      .then(data => {res.json(data)})
      .catch(error => {Promise.reject({ error : 'something went wrong!'})}
      )
  });


  app.get('/api/province/:countryProvince', (req, res) => {
      const provinceId = req.params.countryProvince.split(',');
      const countryID = provinceId[0];
      const provinceCode = provinceId[1];

      let conbine = countryID + '/' + provinceCode;
      conbine = conbine.replaceAll(" ", '%20');
      const api_url = `https://disease.sh/v3/covid-19/historical/${conbine}`;

      fetch(api_url)
      .then(data =>{return data.json()})
      .then(data => {res.json(data)})
      .catch(error => {Promise.reject({ error : 'something went wrong!'})}
      )
  });


  app.get('/api/getProvince', (req, res) => {

      const api_url = 'https://disease.sh/v3/covid-19/jhucsse';

      fetch(api_url)
      .then(data => {return data.json()})
      .then(data => {res.json(data)})
      .catch(error => {Promise.reject({error : 'something went wrong'})});
  });



  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
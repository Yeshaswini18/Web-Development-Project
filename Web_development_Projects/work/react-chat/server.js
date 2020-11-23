const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const app = express();
const PORT = 4000;

const { v4: uuidv4 } = require('uuid');
const { getAllByPlaceholderText } = require('@testing-library/react');

app.use(express.static('./build'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const serverCookie = {};
const messages = {};
const loggedInUsers = [];

const counter = () => {
    let count = 0;
    return () => {
        count += 1;
        return count;
    };
};

const getTimeStamp = () => {
    const today = Date.now();
    return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today);
}

const generateMessageId = counter();

app.get('/home', (req, res) => {
    let sid = req.cookies.sid;

    if(!serverCookie[sid]) {
        sid = '';
        res.cookie('sid', '').json({isLoggedin: false});  
        return;     
    } 
    res.json({isLoggedin: true, messages:messages, loggedInUsers: loggedInUsers});
});

app.post('/sendMessage', express.json(), (req, res) => {
    const sid = req.cookies.sid;
    if(!serverCookie[sid]) {
      res.status(403).json({error: 'You are not allowed!'});
      return;
    }
    messageId = generateMessageId();
    const username = serverCookie[sid];
    const message = req.body.text;
    if(!message || /^ *$/.test(message)) {
        res.json({messages:messages, loggedInUsers: loggedInUsers});
        return;
    }
    const messageInfo = { user: username,
        text : message,
        timeStamp: getTimeStamp()
    }
    messages[messageId] = messageInfo;
    res.json({messages:messages, loggedInUsers: loggedInUsers});
});
  
app.get('/logout', (req, res) => {
    const sid = req.cookies.sid;
    const username = serverCookie[sid];
    const userIndex = loggedInUsers.indexOf(username);
    loggedInUsers.splice(userIndex, 1);
    delete serverCookie[sid];  
    res.clearCookie('sid').json('');
});

app.post('/login', express.json(), ( req, res ) => {
    const username = req.body.user;

    if(!username || username === 'dog' || /^ *$/.test(username)) {
        res.status(403).json({ error: 'Enter valid username'});
        return;
    }
    const sid = uuidv4();
    serverCookie[sid] = username; 
    loggedInUsers.push(username);
    res.cookie('sid', sid).json({messages:messages, loggedInUsers: loggedInUsers});
  });

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

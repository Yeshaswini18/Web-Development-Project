const express = require('express');
const HttpStatus = require('http-status-codes');
const app = express();
const PORT = 3000;

app.use(express.static('./public'));

const items = {};
let serverCookie = '';

const counter = () =>  {
    let count = 0;
    return () => {
        count += 1;
        return count;
    };
};

const nextId = counter();


app.post('/session', express.json(), (req, res) => {
    const sid = req.body.user;
    if (req.body.user.includes('dog')  || /^ *$/.test(req.body.user) || /\s/.test(req.body.user)) {
        return res.status(HttpStatus.UNAUTHORIZED)
            .json({ error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED) });
    }
    // store the cookie for the user
    serverCookie = 'sid='.concat(sid);
    res.cookie('sid', sid).json(items);
});

app.get('/session', (req, res) => {
    serverCookie = '';
    res.clearCookie('sid').json();
});

app.get('/items/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    if(items[itemId]) {
        res.json(items[itemId]);
    } else {
        res.status(HttpStatus.BAD_REQUEST).json({ error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)});
    }
});


app.get('/items', (req, res) => {
    cookie = req.headers.cookie;

    if (!cookie) {
        return res.status(HttpStatus.UNAUTHORIZED).json('');
    }

    if (cookie.length <= 4 || serverCookie !== cookie) {
        return res.status(HttpStatus.UNAUTHORIZED)
            .json({ error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED) });
    }

    res.json(items);
});

app.post('/items', express.json(), (req, res) => {
    const itemId = nextId();
    for(let [key, value] of Object.entries(items)){
        if(items[key].name === req.body.name) {
            return res.status(HttpStatus.CONFLICT)
            .json({ error: HttpStatus.getStatusText(HttpStatus.CONFLICT) });
        }   
    }   
    if(/^ *$/.test(req.body.name)) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)});
    }  
    items[itemId] = req.body;  
    res.json(items);
});

app.delete('/items/:itemId', (req, res) => {
    const itemId = req.params.itemId;
    if (!items[itemId]) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST), items });
    }   
   
    delete items[itemId];
    res.json(items);
});

app.put('/items/:itemid', express.json(), (req, res) => {
    const itemid = req.params.itemid;
    if(!itemid) {
        res.status(HttpStatus.BAD_REQUEST).json({ error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)});
        return;
    }

    item = items[itemid];
    item.quantity = req.body.quantity;
    res.json(items);
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

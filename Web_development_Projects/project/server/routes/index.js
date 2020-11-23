const session = require('../session');
const movies = require('../movies');
const bookingInfo = require('../bookingInfo');

const web = (res) => {
    return ({ message, status, data }={}) => {
      if(!message && !data) {
        data = 'OK';
      }
      res.status(status || 200).json({ message, data });
    };
};
  
const routes = {
    session: { },
    movies: {
        one: {},
        all: {},
    }, 
    bookingInfo: { }
};

// Session
routes.session.status = ( req, res ) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if(!validSession) {
        res.clearCookie('sid');
        web(res)({status: 401, message: 'no valid session', data: movies.readAll() });
        return;
    }
    web(res)({ data: {sid:session.getSession(sid), moviesList:movies.readAll()}} );
};

routes.session.create = ( req, res ) => {
    const username = req.body.username;
    const sessionInfo = session.attemptCreate(username);
    if(!sessionInfo) {
        web(res)({ status: 403, message: 'login denied' });
        return;
    }
    res.cookie('sid', sessionInfo.sid, { MaxAge: 1000*60 } );
    web(res)({data: sessionInfo});
};

routes.session.remove = ( req, res ) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if(!validSession) {
        res.clearCookie('sid');
        web(res)({status: 401, message: 'no valid session' });
        return;
    }
    res.clearCookie('sid');
    session.remove(sid);
    web(res)();
};

//movies
routes.movies.all.read = ( req, res ) => {
    web(res)({ data: movies.readAll() } );
};

routes.movies.one.read = ( req, res ) => {
    const movieId = req.params.movieId;
    const movie = movies.readMovie(movieId);
    if(!movie) {
      web(res)({ status: 404, message: 'no such movie' });
      return;
    }
    web(res)({ data: movie } );
};

//booking information
routes.bookingInfo.add = ( req, res ) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if(!validSession) {
        res.clearCookie('sid');
        web(res)({status: 401, message: 'no valid session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = session.canReadUser({ sid, username });
    if(!isAllowed) {
        web(res)({status: 403, message: 'action not permitted' });
        return;
    }

    const movieId = req.body.movieId;
    const timing = req.body.timing;
    const date = req.body.date;
    const tickets = req.body.tickets;

    web(res)({ data: bookingInfo.addBooking({ username, movieId, timing, date, tickets })});
}

routes.bookingInfo.readAllBookings = ( req, res ) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if(!validSession) {
        res.clearCookie('sid');
        web(res)({status: 401, message: 'no valid session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = session.canReadUser({ sid, username });
    if(!isAllowed) {
        web(res)({status: 403, message: 'action not permitted' });
        return;
    }

    web(res)({ data: bookingInfo.readAllBookings(username)});
}

routes.bookingInfo.readBooking = ( req, res ) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if(!validSession) {
        res.clearCookie('sid');
        web(res)({status: 401, message: 'no valid session' });
        return;
    }

    const username = req.params.username;
    const isAllowed = session.canReadUser({ sid, username });
    if(!isAllowed) {
        web(res)({status: 403, message: 'action not permitted' });
        return;
    }

    const bookingId = req.params.bookingId;
    web(res)({ data: bookingInfo.readBooking({username, bookingId})});
}

routes.bookingInfo.removeBooking = ( req, res ) => {
    const sid = req.cookies.sid;
    const validSession = session.validateSession(sid);
    if(!validSession) {
      res.clearCookie('sid');
      web(res)({status: 401, message: 'no valid session' });
      return;
    }
  
    const username = req.params.username;
    const isAllowed = session.canReadUser({ sid, username });
    if(!isAllowed) {
      web(res)({status: 403, message: 'action not permitted' });
      return;
    }
  
    const bookingId = req.params.bookingId;
    const booking = bookingInfo.removeBooking({ username, bookingId });
    if(!booking) {
      web(res)({ status: 404, message: 'no such bookingId' });
      return;
    }
    web(res)({ data: booking } );
  };

module.exports = routes;

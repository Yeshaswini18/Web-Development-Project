const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const routes = require('./routes');
const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('./build'));

app.get('/session', routes.session.status);
app.post('/session', routes.session.create);
app.delete('/session', routes.session.remove);

app.get('/movies', routes.movies.all.read);
app.get('/movies/:movieId', routes.movies.one.read);

app.post('/bookings/:username', routes.bookingInfo.add);
app.get('/bookings/:username', routes.bookingInfo.readAllBookings);
app.get('/bookings/:username/:bookingId', routes.bookingInfo.readBooking);
app.delete('/bookings/:username/:bookingId', routes.bookingInfo.removeBooking);

app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`) );

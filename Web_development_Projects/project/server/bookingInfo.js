const movies = require('./movies');

const { v4: uuidv4 } = require('uuid');

const bookings = {};

const addBooking = ({username, movieId, timing, date, tickets}) => {
    const bookingId = uuidv4();
    const totalPrice = movies.movies[movieId].ticketPrice * tickets;
    const movie = { poster: movies.movies[movieId].poster, QRcode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAABlBMVEX///8AAABVwtN+AAACjElEQVR4nO3dS47bQAwE0Jn7XzqrAAEit1hFGcYkj8s2P/V0AX997+rrd0U9X3/V5Kcy4Xae8LKHkDBKuJ0nvOwhJIwSHlYfqssafY5o4WmK8G6+CkQYLzxNEd7NV4EI44WnKcK7+SrQh4WT893Vw3h0K0tISEhISEhI+Jxw+RUICQkJCQkJf5bwAHvqJ0JCQkJCQsK9cFKROdo8uZVNEU6vEvZFeDdFOL1K2Bfh3dT3rpbm6KVMuJ0nfPClTLidJ3zwpUy4nSd88KVMuJ0nfPBlmXBb0eoJ47FkTxXhdXM3/pkivG7uxj9ThNfN3fhnivC6uRsvky0DTSI+1RyNExISEhISEl66Jp7Joqh5Ul2M06LlasK4CAknyQinewpeHeO0aLmaMK5SGEWcHIv2PMUgJIxyZOeTzYSE3U+Ed+eTzYR3Jw4bu6tdT/TtDuOEhISEhISEf05NYNHG5XhkHn0OQkJCQkJCwjD0af71wslL91OUh5CQkJCQkLBONtnTVZmekJCQkJCQ8Dnh4wsf/4jbQFER9kcJF4GiIuyPEi4CRUXYHy2F74s4yXEIfRjfUgkJCQkJCQlnFa2O0h/GlzGyIrxpJrweX8bIivCmmfB6fBkjK8Kb5jcKJ8cmOSYv0ZeavBzynNCEhISEhIT/sXCZY5n1jZsJCQkJCQkJ3/B/wFGg6Ho0lZ0nJCQkJCQknAmj9JOpSYzRFyckJCQkJCR8p7BLP7kefVbCF2OHq9HCqAhfNEeBCAl3RfiiOQr0jwgntby6PHpYSJgfWwbqjhISRseWgbqjhITRsWWg7mgp7OoQOsoxaS4TbucJL1+65jLhdp7w8qVrLhNu5wkvX7rmMuF2nvDypWvu6hdwJWEkXvHKCAAAAABJRU5ErkJggg==',
        title: movies.movies[movieId].title, theater: movies.movies[movieId].theater, timing: timing, date: date, tickets: tickets, total: totalPrice }
    bookings[username] = bookings[username] || {}
    bookings[username][bookingId] = {...movie};
    return bookingId;
}

const readAllBookings = (username) => {
    if(!bookings[username]) {
      return {};
    }
    return bookings[username];
};

const readBooking = ({username, bookingId}) => {
    if(!bookings[username]) {
        return {};
    }
    return bookings[username][bookingId];

}

const removeBooking = ({ username, bookingId }) => {
    if(!bookings[username]) {
      return;
    }
    const booking = bookings[username][bookingId];
    delete bookings[username][bookingId];
    return booking;
  };

module.exports = {
    addBooking,
    readAllBookings,
    readBooking,
    removeBooking
}

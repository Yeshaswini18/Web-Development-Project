const getTimeStamp = () =>{
    const expiryDate = new Date();
    expiryDate.setMonth(9);
    return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(expiryDate)
}

const movies = {0: {
                    movieId : 0,    
                    title:"Dolittle",
                    language: "English",
                    ratings: 4.5,
                    actors: "Robert Downey, Jr.",
                    description: "Dr. John Dolittle lives in solitude behind the high walls of his lush manor in 19th-century England. His only companionship comes from an array of exotic animals that he speaks to on a daily basis. But when young Queen Victoria becomes gravely ill, the eccentric doctor and his furry friends embark on an epic adventure to a mythical island to find the cure.",
                    ticketPrice: 30,
                    theater: "Regal Cinemas",
                    timings:{0: "11:30 AM", 1:"3:00PM", 2:"6:30 PM"},
                    poster: 'https://www.uphe.com/sites/default/files/styles/scale__344w_/public/2020/02/Dolittle_DVD_2DOring_191329081181.png',
                    expiryDate: getTimeStamp(),
                    movieType: "Comedy",
                    location: "Washington"
                    },
                1: {
                    movieId : 1,
                    title:"BloodShot",
                    language: "English",
                    ratings: 4.5,
                    actors: "Vin Diesel",
                    description: "After he and his wife are murdered, marine Ray Garrison is resurrected by a team of scientists. Enhanced with nanotechnology, he becomes a superhuman, biotech killing machine - Bloodshot. As Ray first trains with fellow super-soldiers, he cannot recall anything from his former life. But when his memories flood back and he remembers the man that killed both him and his wife, he breaks out of the facility to get revenge, only to discover that there's more to the conspiracy than he thought",
                    ticketPrice: 34,
                    theater: "Bellevue Square Mall",
                    timings:{0: "10:30 AM", 1:"2:00PM", 2:"6:00 PM"},
                    poster: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSTZpoS_MAefm28gf2gdItxesLJaxgTWPdewMW9TUB4aNRi2zbS',
                    expiryDate: getTimeStamp(),
                    movieType: "Thriller",
                    location: "California"
                    },
                2: { 
                    movieId : 2,
                    title:"Invisible Man",
                    language: "English",
                    ratings: 4.5,
                    actors: "Elisabeth Moss",
                    description: "After staging his own suicide, a crazed scientist uses his power to become invisible to stalk and terrorize his ex-girlfriend. When the police refuse to believe her story, she decides to take matters into her own hands and fight back",
                    ticketPrice: 34,
                    theater: "Northgate Mall",
                    timings:{0: "11:00 AM", 1:"3:00PM", 2:"7:30 PM"},
                    poster: 'https://filmschoolrejects.com/wp-content/uploads/2020/05/poster-the-invisible-man.jpg',
                    expiryDate: getTimeStamp(),
                    movieType: "Horror",
                    location: "Nevada"
                    },
                3: { 
                    movieId : 3,
                    title:"The Devil's BackBone",
                    language: "Spanish",
                    ratings: 4,
                    actors: "Fernando Tielve",
                    description: "After losing his father, 10-year-old Carlos (Fernando Tielve) arrives at the Santa Lucia School, which shelters orphans of the Republican militia and politicians, and is taken in by the steely headmistress, Carmen (Marisa Paredes), and the kindly professor, Casares (Federico Luppi). Soon after his arrival, Carlos has a run-in with the violent caretaker, Jacinto (Eduardo Noriega). Gradually, Carlos uncovers the secrets of the school, including the youthful ghost that wanders the grounds.",
                    ticketPrice: 24,
                    theater: "Regal Cinemas",
                    timings:{0: "9:00 AM", 1:"2:00PM", 2:"7:30 PM"},
                    poster: 'https://s3.amazonaws.com/criterion-production/films/2d2ca1ee563de89f50f5cbe2712903ec/8L4xcUeNLUCM7wiQxbxB9gT5w1Nlf4_original.jpg',
                    expiryDate: getTimeStamp(),
                    movieType: "Horror",
                    location: "Washington"
                    },
                4: { 
                    movieId : 4,
                    title:"The Invisible Guest",
                    language: "Spanish",
                    ratings: 3.8,
                    actors: "Mercedes Gamero, Mikel Lejarza, Sandra Hermida",
                    description: "A young businessman wakes up in a locked hotel room next to the body of his dead lover. He hires a prestigious lawyer to defend him, and over the course of one night, they work together to find out what happened.",
                    ticketPrice: 34,
                    theater: "Northgate Mall",
                    timings:{0: "11:00 AM", 1:"3:00PM", 2:"7:30 PM"},
                    poster: 'https://www.thisisbarry.com/wp-content/uploads/InvisibleGuest/Invisible-Guest-Explained.jpg',
                    expiryDate: getTimeStamp(),
                    movieType: "Thriller",
                    location: "California"
                    },
                5: { 
                    movieId : 5,
                    title:"The Spanish Affair",
                    language: "Spanish",
                    ratings: 4.7,
                    actors: "Emilio Martínez-Lázaro",
                    description: "Spanish Affair is a 2014 Spanish comedy film directed by Emilio Martínez-Lázaro. It premiered in Spain on 14 March 2014. Six weeks after its release, it became the second biggest box office hit ever in Spain, behind Avatar.",
                    ticketPrice: 44,
                    theater: "Bellevue Mall",
                    timings:{0: "10:00 AM", 1:"4:00PM", 2:"7:30 PM"},
                    poster: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSrhoQxljaypaNfPlfiN8hk8aVsQH2uwZQLHq0XmpdbWiTe3__Q',
                    expiryDate: getTimeStamp(),
                    movieType: "Comedy",
                    location: "Nevada"
                    },
                6: { 
                    movieId : 6,
                    title:"Blue Is the Warmest Colour",
                    language: "French",
                    ratings: 3.8,
                    actors: "Adèle Exarchopoulos, Jérémie Laheurte",
                    description: "A French teen (Adèle Exarchopoulos) forms a deep emotional and sexual connection with an older art student (Léa Seydoux) she met in a lesbian bar.",
                    ticketPrice: 54,
                    theater: "Regal Cinemas",
                    timings:{0: "11:00 AM", 1:"5:00PM", 2:"8:30 PM"},
                    poster: 'https://www.gstatic.com/tv/thumb/v22vodart/10102199/p10102199_v_v8_aa.jpg',
                    expiryDate: getTimeStamp(),
                    movieType: "Comedy",
                    location: "Washington"
                    },
                7: { 
                    movieId : 7,
                    title:"Elle",
                    language: "French",
                    ratings: 4.3,
                    actors: "Demi Lovato",
                    description: "The successful CEO (Isabelle Huppert) of a video game company tries to learn the identity of the man who raped her.",
                    ticketPrice: 44,
                    theater: "Bellevue Mall",
                    timings:{0: "1:00 PM", 1:"4:00PM"},
                    poster: 'https://www.gstatic.com/tv/thumb/v22movies/12936381/p12936381_v_v8_aa.jpg',
                    expiryDate: getTimeStamp(),
                    movieType: "Thriller",
                    location: "California"
                    },
                8: { 
                    movieId : 8,
                    title:"Raw",
                    language: "French",
                    ratings: 4.1,
                    actors: "Julien War, Remy Four",
                    description: "Stringent vegetarian Justine (Garance Marillier) encounters a decadent, merciless and dangerously seductive world during her first week at veterinary school. Desperate to fit in, she strays from her principles and eats raw meat for the first time. The young woman soon experiences terrible and unexpected consequences as her true self begins to emerge.",
                    ticketPrice: 44,
                    theater: "Northgate Mall",
                    timings:{0: "9:00 AM", 1:"4:00PM", 2:"7:30 PM"},
                    poster: 'https://www.gstatic.com/tv/thumb/v22vodart/13008802/p13008802_v_v8_ab.jpg',
                    expiryDate: getTimeStamp(),
                    movieType: "Horror",
                    location: "Nevada"
                    }
                };

const readAll = () => {
    return movies;
};

const readMovie = (movieId) => {
    return movies[movieId];
};

module.exports = {
    readMovie,
    readAll,
    movies,
};

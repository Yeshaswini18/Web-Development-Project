export const questions = [
    {
        question: "Who is Steve Jobs?",
        answers: [
            "CEO of Microsoft",
            "Barber in NY",
            "Movie Star",
            "CEO of Apple"
        ],
        correct: 3,
        result: ""
    },
    {
        question: "Metallica is a ____ band",
        answers: [
            "Blues",
            "Hard-Rock",
            "Jazz",
            "Metal"
        ],
        correct: 3,
        result: ""
    },
    {
        question: "IS is a ____",
        answers: [
            "Word",
            "Band",
            "Terror Group",
            "Brand"
        ],
        correct: 2,
        result: ""
    },
    {
        question: "Who was Einstein",
        answers: [
            "A Scientist",
            "A Dentist",
            "A Serial Killer",
            "None of the above"
        ],
        correct: 0,
        result: ""
    },
    {
        question: "JavaScript can be used in ____ development",
        answers: [
          "Back-End",
          "Front-End",
          "ReactJS",
          "All of the Above"
        ],
        correct: 3,
        result: ""
    },
];

export const shuffleArray = function() {
    questions.sort(() => Math.random() - 0.5);
}

export const topN = function(count) {
    return questions.slice(0, count);
};

export const answer = function(count) {
    return questions[count];
};

export const resetResult = function(){
    for(let i = 0; i < questions.length; i++) {
        questions[i].result = "";
    }
    return questions;
}

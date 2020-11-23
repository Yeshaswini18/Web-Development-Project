"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) {  // DO NOT MODIFY

	let count = 0;
	const wordCaseInsensitive = word.toLowerCase();
	let guessCaseInsensitive = guess.toLowerCase();
	const obj = guessCaseInsensitive.split('');
	for(let element of wordCaseInsensitive) { // because len of words are same
		let index = obj.findIndex(s => s === element);
		if(index >= 0){
		  count++;
		  obj.splice(index, 1);
		} 
	}
	return count;
}

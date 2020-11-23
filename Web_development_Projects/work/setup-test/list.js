const path = require('path');

const people = `
Name                            | NEUID       | Slack handle                    | github ID
Yeshaswini Venkatesha Gupta     | 001038959   | @Yeshaswini Venkatesha Gupta    | Yeshaswini18

`.split('\n').filter( truthy => truthy );

if (require.main === module) {
  // Run if we are being run directly

  // List the people
  for ( person of people ) {
    console.log(person);
  }
}
// If not being run directly, return the text
module.exports = people;

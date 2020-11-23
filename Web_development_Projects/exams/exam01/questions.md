# Exam 1 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.


## Q: What is the difference between a dynamic asset and a static asset?
Ans: Static asset - A static asset is a file that exists as a file which can be deleted/modified/created. The webserver will send the contents of the file from the file system.
Dynamic asset - A dynamic asset doesn't exists as a file. It is generated when user sends a request. For example when a user browses for some information, the HTML content will be created in respone to the users request.


## Q: What is the difference between a relative and absolute file path in an href?  What is the "webserver root/document root" and how do absolute/relative paths relate to this document root?
Ans: The "absolue path" in a href starts from the document root whereas "relative  path" is navigation from the path of the currently loaded page. The "webserver root/document root" is how the web server treats the request for the "root"("Document root" is different from file system root).The absolute/reletive paths on URLs is relative to the "document root" which means absolute/relative paths is relative to a directory that is stored on our host's servers which holds our web pages.


## Q: What is the difference between server-side and client-side JS?
Ans: The client-side JS enhances and manipulates the contents of the web page. In browser environment, our code will have access to the things like document for the current page, the window etc. In addition, client-side JS can validate inputs, perform animations, etc.
The server-side JS deals with the back-end access to databases, file systems or servers. User's request is captured and any server side logic is applied on the request to send the appropriate response back to the user.


## Q: What are the differences between `var`, `const`, and `let`, and when should you use each of them?
Ans: "var" is globally scoped/function scoped. It can be updated or re-declared within its scope. "var" hoists.
"let" is block scoped(valid only inside if/for blocks).It can be updated but not re-declared. "let" doesn't hoist.
"const" is also block scoped. It can neither be updated or re-declared. Const has to be declared using initializer or it will generate an error.
If we want to access the variable globally then we can use "var" keyword. This is not used unless we are targeting older JS engines.
If we want to access the variable only inside for/if/while block "let" keyword is prefered. 
If the value of the variable need not to be re-assigned then "const" is the better keyword. 


## Q: What are the 4 ways to create inheritance in JS? (no examples needed, just a sentence describing each)
Ans: Constructor Function - The "new" keyword is used to create the object(used in function call). The prototype property of that function is assigned as the prototype of the new object. That is how the prototype property is inherited by the new objects created using constructor function.

Object.create - This type of inheritance will create new object and the new object's prototype is set to the passed object. Constructor isn't used because there is no initialization required.  

ES6 classes - The syntax of this type of inheritance is similar to that of the other languages like java, c++. ES6 classes was hotly debatd because it worked differenly when compared to other programming languages. In the end there was no difference and people started using it.

Brute Force Prototype Assignment - In this inheritance technique, prototype can be set directly along with the object. 


## Q: Give a short code demonstration of 1 way to create JS inheritance to __inherit__ a method named "purr".
Ans: Used "Constructor Function" technique to inherit the method "purr". 
const Cat = function(name) {
  this.name = name;
};
Cat.prototype.purr = function() {
  console.log(`${this.name} says 'Purr'`);
};
const simba = new Cat('Simba');
simba.purr();

## Q: Give a short code demonstration of a different way to create JS inheritance to __inherit__ a method named "hiss".
Ans: Used "Object.create" inheritance method to inherit the method "hiss".
const snake = {
  hiss: function() {
    console.log(`${this.name} says 'Hiss'`);
  }
};
const cobra = Object.create(snake);
cobra.name = 'Cobra';
cobra.hiss();


## Q: Explain what a callback is, and give an example.
Ans: A callback function is a function that is passed as an argument to another javascript function, and the callback function runs inside the function it was passed into. The receiving function gets the control over how many times to call the callback, when to call the callback and what to pass in the call to the callback.

Callback function reduces complexity because it is written with the minimal information which makes the changes easier.

Example:
const employees = {
  rachel: 87000,
  'Ross': 65000
};

const checkSalary = function( employees, onStruggle ) {
  for( let name of Object.keys(employees) ) {
    if( employees[name] < 80000 ) {
      onStruggle(name, employees[name]);
} }
};
const tellGovernor = function( employee, salary ) {
  console.log(`${employee} is in trouble because he is getting a salary of $${salary}`);
};
checkSalary(employees, tellGovernor);

In the above example, "tellGovernor" is a callback function passed as a parameter in "checkSalary" function call. Whenever an employee gets salary less than $80,000. Governor is notified.


## Q: What are the words that would correctly fill in the space in this sentence:

"If a function using `this` is used `_______`, then `this` will not have the expected implicit value"
Ans: "as a callback"

## Q: In CSS, what does it mean "You shouldn't name your classes after what they look like"?   Why?  Give an example of a class that is well named and a class that is poorly named.
Ans: Naming classes in HTML should be based on the content and not on how the content look. Also, naming should be more specific(according to the content) for effective skimming. These class names are used in CSS to style the content/page. By following this kind of naming convention, work becomes much easier while debugging and styling.

1)Example of a class that is well named.
<div class="cats-form">
	<form action="cats.html" method="GET">
		<label>Favorite Cat: <input name="favorite" placeholder="enter here"/></label>
		<p> <button type="submit">See Star Cats</button></p>
	</form>
</div>  

Class name used in CSS.
.cats-form {
	float: left;
	width: 25%;
}

In the above example, we will get to know the contents inside <div> without even looking into the code inside <div>. This help during skimmig and debugging. In CSS, we can easily style the "cat<form>" according to user's wish.


2) Example of a class that is poorly named.
<div class="form">
	<form action="cats.html" method="GET">
		<label>Favorite Cat: <input name="favorite" placeholder="enter here"/></label>
		<p> <button type="submit">See Star Cats</button></p>
	</form>
</div> 

In the above example, name of the class is not specific and named according to how they look, which is not efficient. We have to go through the content inside <div> to make sure which kind of form it is. Hence, this is a poorly named class. 

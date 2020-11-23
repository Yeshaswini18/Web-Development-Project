# Exam 2 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q1: The first rule I've given about REST services is that the URL should represent a resource.  What does that mean?  Give an example where a url DOES not represent a resource, then describe how to modify it so that it does.

Ans: URL represents a resource to interact with. If we want to get an information about the resource then we can mention it in the URL. URL will take us to that path and displays the information. URL will often be a noun. /addStudent/, /updateGrade/, /searchLocation/ are few of the examples where a URL doesn't represent a resource. The given examples represents action performed on the resouces and not the resources. We have to modify it to /Students/,/location/,/grade/ to make it a valid URL.  

## Q2: If the service returns the username as a plain text string, what is wrong with the below and what would fix it? (Assume the service works without error)
```
  const username = fetch('/username');
  console.log(`user is named ${username}`);
```  

Ans: fetch returns a promise. The promise resolves with a response object. The response object lacks parsed body, to parse the body we need to call a method(.text() or .json()). These parsing methods are async. So the correct way to get username is:
```
fetch('/username')
	.then (response => return response.text())
	.then(username => console.log(username));  
```
## Q3: What does it mean to "store your state in the DOM"?  Why shouldn't you do this?

Ans: An application has "state" which is the summary of the current value for all the things that can change. Storing a state in dom means whenever we want to recapture the state we need to read the DOM. Also, this is not an efficient way to store the state. For example: We show a list of users on the screen and the state is stored in DOM. If we need a list of users, then we have to read DOM to get the data. If we alter the display(when DOM changes) then we change how to get the list that way. As our display gets more complicated, so does all our state interaction. Hence we should not store the state in DOM. The better way to store state is in variables/objects and update the screen as needed. 

## Q4: Explain the differences between a multiple-page-web application and single-page-web application.  Be sure to fully demonstrate your understanding.

Ans: multi-page-web-application: A multi-page application consists of several pages with static information (text, images, etc) and links to the other pages with the same content. During a jump to another page, a browser reloads the content of a page completely and downloads all resources again, even the components which are repeated throughout all pages (e.g., header, footer). The main technologies for such a type of website building are HTML and CSS. It allows creating uncomplicated websites of this type quite fast and without any problems. 
Issues with multi-page-web applications are
* Difficulties with adding dynamics.
* Low flexibility.
* The increasing cost of changes during adding new functionality.


Single-page-web-application: When we enter a single-page application website, we download a page only one time and then the components of the page change and load only when it is required. Because of that, such a website is much faster than a multi-page application. Also, if we build a single-page application, we usually use a solid mature ecosystem (it happens the other way round when you integrate interactive elements on multi-page application websites).
Issues with single-page-web applications are
* Complexity
* You need more time to create a minimum viable product (MVP)

## Q5: What is Progressive Enhancement?  What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?

Ans: Progressive enhancement is taking a non-client side JS web app and augmenting it with JS. It is a strategy for web design that emphasizes core webpage content first. This strategy then progressively adds more nuanced and technically rigorous layers of presentation and features on top of the content as the end-user's browser/internet connection allow. The proposed benefits of this strategy are
* Remains working if there is no client-side JS.
* It allows everyone to access the basic content and functionality of a web page, using any browser or Internet connection.
* It is great for accessibility and various devices.
* Also, great for ensuring if backend is secure.

SPA which uses progressive enhancement will work as a multipage application during form submission when javascript is turned off. Whereas, SPA which doesn't use progressive enhancement will not work as a multipage application on form submission when javascript is turned off.

## Q6: Explain how a REST service is or is not similar to a dynamic asset.

Ans: REST service is similar to dynamic asset because assets/resources(html, css, etc) are rendered according to the request made by the user.  

## Q7: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.

Ans: Password is an example of a piece of information that should not be stored in a cookie. Cookies will be visible on client side and can be viewed by anyone. Hence it is not recommended to store password in cookie. 

## Q8: Explain why it is useful to separate a function that fetches data from what you do with that data

Ans: It is better to write a separate function for the functionality for the data which is fetched and fetching the data because whatever changes has to be done for the respose can be done inside the function where you write the functionality. For example:
```
addButton.addEventListener('click', e =>{
	e.preventDefault();
	const origText = setSpin({button:addButton, spin:true});
	const formData = gatherFormInfo();
	addTask(formData)....
	}) 
```
Here the addTask()no longer touches any HTML. It gives data and returns data. 
Caller can decide how to react to this data.
The data received from addTask() can be reused for different purposes.
It doesn't change if HTML changes.

## Q9: Explain why try/catch is useless when dealing with asynchronous errors (assume you aren't using async/await)
```
Ans: try {
    setImmediate(() => {
        throw new Error();
    });
} catch (e) {
    // catch error.. doesn't work
}
```
Here a try.. catch block is used to wrap a call to setImmediate(). It is a function that operates asynchronously and schedules the argument callback to be called in the near future, as soon as other operations have finished. There are no other statements to execute, and the control is passed back to one level up — to the Node.js event loop.

An asynchronous exception is uncatchable because the intended catch block is not present when the asynchronous callback is executed. Instead, the exception will propagate all the way and terminate the program.

Hence try/catch is useless when dealing with asynchronous errors.

## Q10: Is separation of concerns a front end issue, a server-side issue, or both?  Describe an example the demonstrates your answer.

Ans: Separation of concers is both front-end and server-side issue. SOC is used everywhere so that the code is maintainable and easy to understand.
```
const addButton = document.querySelector('.add-task');
addButton.addEventListener('click', e =>{
	e.preventDefault();
	const taskText = document.querySelector('.task-to-add');
	addButton.disabled=true;
	fetch('/task', {
	method: 'POST',
	headers: new Headers({'content-type': 'application/json'}),
	body: JSON.stringyfy({text:taskText});
})...
```
In the above example there are lot of things to do in a single function. Like
1. Attach an eventListener
1. Indicate call in progress
1. Disable the add button
1. Read data from form/input fields
1. Send call
1. Handle errors
1. Read results and ,many more
Instead of writing multiple functionalities in same function. We can use a seperate one. 

For example:
```
addButton.addEventListener('click', e =>{
	e.preventDefault();
	const origText = setSpin({button:addButton, spin:true});
	const formData = gatherFormInfo();
	addTask(formData)....
	}) 
```

The real changes is inside addTask(). The addTask() no longer touches any HTML. It gives data and returns data. 
Caller can decide how to react to this data.
The data received from addTask() can be reused for different purposes.
It doesn't change if HTML changes. This is the example SOC for front-end.

Given below is the example for server-side without SOC. Here, the service call is checking for the errors. Instead, we can write a separate code for checking the errors. Which makes the code easy to understand. 
```
app.get('/session', (req, res) => {
    const uid = req.cookies.uid;
    if(!uid) {
      res.status(401).json({ code: 'provide-error'});
      return;
    }
    if(!recipes.authors[uid]) {
      res.clearCookie('uid');
      res.status(403).json({ code: 'provide-error'});
      return;
    }
    res.sendStatus(200);
  });
```

Given below is the server-side code with good SOC. checkErrors() will check for the errors in the uid, which can be written in a separate function.
```
app.get('/session', (req, res) => {
    const uid = req.cookies.uid;
    checkErrors(uid);
    res.sendStatus(200);
  });
```












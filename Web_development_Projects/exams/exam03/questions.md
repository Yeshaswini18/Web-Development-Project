# Exam 3 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

* NOTE: Because there is no coding portion to Exam 3, each of these questions is worth more to your grade than the questions on previous Exams!  Be sure to have answers you are confident shows your understanding!

## Q1: I have said that React JSX components are like functions and follow many of the same best practices.  Give at least 2 such best practices that are good for both JS functions and JSX Components.  (Be substantive!)
Ans: Some of the best practices that are good for both JS functions and JXS components are:
=> Like functions in Javascript, Components have to be broken down into smaller pieces. One component has to be used for one purpose. Also, one component can call others. For example.
```
function Calculator() {
    return(
        <div className="box1">Box1
            <Add />
            <Sub />
        </div>
    );
}
function Add() {
    return(
    <div className="add">Adds two numbers</div>
    );
}
function Sub() {
    return(
    <div className="add">Subtract two numbers</div>
    );
}
```
Here, Calculator is a component which is brokendown into Add and Sub. Each component will have its own purpose which is written inside that component. In javascript function can be called inside a function. Similarly, Components can be called inside the other component.

Parameters can be passed from one funtion to another. Similarly, in JSX components, parameters can be passed in the form of keys.Thus it is easy to develop the project by changing the parameters as required. For example.
```
function Result({fakedata}) {
	const [data, setData] = useState(); 
	const scoreLabel = "score";
    return(
        <div className="box1">Box1
            <News fakedata={fakedata} data={data} scoreLabel={scoreLabel} />
        </div>
    );
}
```

In the above example, Result is a component which is receiving a parameter and passing it to the News component. Also, 'data' which is passed as a parameter to News is controllable in the Result Component (place where it is declared). This helps during development of the project. These are some of the similarities between JS functions and JSX Components.

## Q2: I have said that using Progressive Enhancement (supporting both MPA and SPA) is best, but many places don't do so because of the effort involved.  What is at least one major reason not to use SPA alone?
Ans: One of the major reasons for not using SPA alone is because of its difficulty to go back and forward quickly and reliably. Browers store history so that pages load quickly when the user clicks back. In a naive implementation of a SPA hitting back will do the same thing as clicking a link, resulting in a server request, additional latency, and possibly visual data changes.
To give users the expected, fast experience, we need to emulate the same native browser behaviour using JavaScript. This means:
* storing pages in memory, local storage, client-side databases or cookies.
* working out when to retrieve the cached pages and when to invalidate them.	

## Q3: The "proxy" setting in your package.json is required for the create-react-app dev server to call a local service, but not if you are calling a service that will always be on a different domain.  Explain what happens (in terms of network traffic) when your dev server is running on localhost port 3000 and the page makes a call to `/service` when you have "proxy" set to `http://localhost:4000` and a server running on localhost port 4000 that has the `/service` service.  hint: This should list and describe multiple request/response steps, and be clear where the request is coming from and where the response is received.
Ans: create-react-app often has CORS issues. CORS is a browser policy about allowing JS-based service calls to endpoints that are on a different domain/port than the currently loaded page which is done for a security reasons. But, this creates newtwork traffic as dev server will be on one url:port(http://localhost:3000) and '/service' server will be on a different url:port(http://localhost:4000).
So, JS files loaded from dev server would not be able to make fetch call to '/service' server as CORS is disallowed by browser. Therefore, we assign dev server as a proxy that routes all requests to '/service' server. Browser would show the response to these requests since there is no CROS origin call(fetch call is sent to dev server which loads JS files).**This is mostly done faced during development using CRA**. 

Below are the steps on how the request is sent and the response is received:

The representation of client sending multiple requests to the server through proxy.

* get request
client(sends get request) --> proxy --> /service(get request received)
/service(evaluates and sends response) --> proxy --> client(displays the body)

* post request
client(posts json body) --> proxy --> /service(post request received)
/service(evaluates and sends response) --> proxy --> client(displays the body)

* delete request
client(sends delete request) --> proxy --> /service(delete request received)
/service(delete username and sends response) --> proxy --> client(displays the body)

* When dev server gets a request it can't handle. Hence, through "proxy" the request is sent to the '/service' server(http://localhost:4000). Therefore, proxy response(response from '/service' server) is sent to the dev server. 
* Browser never talks directly to service server. 
* Traffic is created when too many requests come from client side and proxy can't hadle the communication between client and the server.

## Q4: Follow-up: Using the above scenario, list and describe what the network calls are like after you run `npm run build` and are only running all of your content on localhost port 4000 when your JSX makes a call to `/service`
Ans: The client and the server communicates directly when proxy is not involved. Below are the network calls when we run all the content on localhost port 4000:

The representation of client sending multiple requests to the server

* get request
client(sends get request) --> /service(get request received)
/service(evaluates and sends response) --> proxy --> client(displays the body)

* post request
client(posts json body) --> /service(post request received)
/service(evaluates and sends response) --> proxy --> client(displays the body)

* delete request
client(sends delete request) --> /service(delete request received)
/service(delete username and sends response) --> proxy --> client(displays the body)

This type of interaction is not recommended because of the security issues.

## Q5: I have said that you can only pass data "down" in React, not "up".  What does that mean?  Give simple code sample if that makes it easier to describe.
Ans: Components can have 'props'(properties). These props are often the state of ancestor(wrapping) components. Props can only pass down(to descendants). Props can be any kind of JS value. For example.
```
function Box1({fakedata}) {
    return(
        <div className="box1">Box1
        	<News fakedata={fakedata}/>
        </div>
    );
}
```

In the above example, 'fakedata'(prop) could have been passed from its parent component and it can also be passed to its child component. But prop can't be passed from child component to its parent component(i.e from News to Box1).

## Q6: Follow-up: If you can't pass data "up" the component tree, how can anything that is "down" change data?  Give simple code samples if that makes it easier to describe.
Ans: As mentioned in the previous answer. Components can pass state to descendants as props. Descendants can communicate "up" only via callback, which the ancestor must pass down. For example.(this example is the continuation of the example mentioned in the previous answer)
```
function News({fakedata}) {
    return(
        <div className="news">This is {fakedata}
        </div>
    );
}
```

In the given example. 'News' returns the 'fakedata' to Box1 through return statement which will be in the form of html. That is how anything that is down change data. 

## Q7: Imagine you have a collection of student records, with each having a student id, a name, and an address. (an example of one item in the collection would be: { id: "654321", name: "Bao", address: "123 Main Street" })  Imagine you also have collection of steps to create a pizza, with each step having an ingredient, a quantity, and an instruction. (an example of one item in the collection would be the object { qty: "1 cup", ingredient: "shredded cheese", instructions: "sprinkle over pizza" })

Give a code sample where each collection is shown with at least one more element (2+ students for the first collection, 2+ pizza-making steps).  Make sure you make proper use of arrays and objects.  Explain why you've chosen each way of making a collection (e.g. Why you use an array for one or both, or why you use an object for one or both)

Ans: 
```
studentRecord = {
	654321:	{ id: "654321", name: "Bao", address: "123 Main Street" }, 
	656321:	{ id: "656321", name: "Amit", address: "345 Galer Street" }
}
```

```
pizzaMaking = [{ qty: "1 cup", ingredient: "shredded cheese", instructions: "sprinkle over pizza" },{ qty: "1 cup", ingredient: "red sauce", instructions: "place it over pizza" }]
```

I am using object to represent collection of student records because the time complexity to search a student will be O(1) using keys.
I am using array to represent collection of steps to prepare pizza because the steps are represented in order. It is easy to get any step by its index value. We need not assing any key to each step.  

## Q8: How does inheritance in JS relate to a prototype?  Give a simple code sample if it helps explain.
Ans: When it comes to inheritance, JavaScript only has one construct: objects. Each object has a private property which holds a link to another object called its prototype. That prototype object has a prototype of its own, and so on until an object is reached with null as its prototype. For Example:

```
function doSomething(){}
console.log( doSomething.prototype );
//  It does not matter how you declare the function, a
//  function in JavaScript will always have a default prototype property.
var doSomething = function(){}; 
console.log( doSomething.prototype );

{
    constructor: ƒ doSomething(),
    __proto__: {
        constructor: ƒ Object(),
        hasOwnProperty: ƒ hasOwnProperty(),
        isPrototypeOf: ƒ isPrototypeOf(),
        propertyIsEnumerable: ƒ propertyIsEnumerable(),
        toLocaleString: ƒ toLocaleString(),
        toString: ƒ toString(),
        valueOf: ƒ valueOf()
    }
}
```

As seen above, doSomething() has a default prototype property, as demonstrated by the console. After running this code, the console should have displayed an object that looks similar to this.

We can add properties to the prototype of doSomething(), as shown

```
function doSomething(){}
doSomething.prototype.foo = "bar";
```

## Q9: What is wrong about this code sample? `if( !username || username == undefined) { ` be sure to explain why that is wrong.
Ans: In JavaScript if a variable has been declared, but has not been assigned a value, is automatically assigned the value undefined. Therefore, if you try to display the value of such variable, the word "undefined" will be displayed. The "undefined" is nothing but the type of that variable. So the correct code would be :
```
if(!username || typeof username === undefined)
```

## Q10: In your own words, what is decoupling?  What is an example of decoupling in a React app?  Why is this beneficial?
Ans: Decoupling is writing a piece of code which is not dependant on any other part of the code. 
If you have a decoupled system, where you need to change a component, you can do that as long as the API remains intact. If you want to use a different database backend or structure, you are good to go. You just need to replace that part instead of walking through the whole project looking for references and dependencies to the old service.
Example of decoupling in React:
```
    fetchUpdateTheme(userInfo, theme)
        .then(() => performGetTheme())
        .catch((error) => setError(error.message))

        const fetchUpdateTheme = (username, theme) => {
        return fetch(`/theme/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                theme: theme
            })
        })
        .catch( () => {
            return Promise.reject({message: 'network-error'});
        })
        .then( (response) => {
            if(response.ok) {
                return response.json();
            }
            return response.json()
            .then( err => Promise.reject(err) );
        });
    };
```
In the above example, fetchUpdateTheme() function is written in such a way that even if you use a different backend/ structure, the ouput should be reliable. 



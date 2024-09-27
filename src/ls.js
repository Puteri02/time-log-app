localStorage.setItem('accept cookies', 'true');
localStorage.setItem('data', {prop : 1});
localStorage.setItem('score', 5);
localStorage.setItem('nickname', 'Harry');

console.log( localStorage.getItem('nickname'));
console.log( localStorage.getItem('data'));
console.log( localStorage.getItem('score'));
console.log( localStorage.getItem('accept cookies'));


const user = {
    name: "Alice",
    age: 30,
    isAdmin: true
};

//if use JSON, receiver need use eval() to convert to funct back
const data = JSON.stringify(user);
const data1 = user;
console.log(data);
console.log(data1);
//we gonna learn all about arrays in javaScript and all it's fundamentals are gonna get cover
const friends = ['Tanya', 'Pulkit', 'Ishaan', 'Saurabh', 'Divya', 'Nikita', 'Aayush', 'Bhavyaa'];
console.log(friends, typeof friends);

const years = new Array(1991, 1992, 1993, 1994, 1995);
console.log(years, typeof friends);

//accessing the single elements 
console.log(friends[0], years[0]);

//accessing the length of the arrays
console.log(friends.length, years.length);

//changing the variables inside the arrays
friends[6] = "Aayushi";
console.log(friends, typeof friends);


const pulkit = [
    'PULKIT',
    'JAIN',
    2022 - 2002,
    true,
    20.02,
    friends,
    years
]

console.log(pulkit);



//basic array methods in javaScript

//push method add the element at the end of arrays
friends.push("Rajat"); //returns new length of array
console.log(friends);


//add elements to the begining of the arrays
friends.unshift("YashDeep");
console.log(friends);


//to remove the last element of the arrays
friends.pop(); //it returns the removed element  
console.log(friends);

//to remove the first element from the arrays
friends.shift(); // it also returns the removed element
console.log(friends);


//to get the index of the specific element in the arrays
console.log(friends.indexOf("Pulkit"));
console.log(friends.indexOf("Vijay "));

console.log(friends.includes("Tanya"));
console.log(friends.includes("Harry"));
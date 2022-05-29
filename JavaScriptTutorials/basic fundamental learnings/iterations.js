'use strict';

for (let rep = 1; rep <= 10; rep++) {
    console.log(`lifting weight repetation ${rep} 🏋️‍♀️`);
}
const friends = ['Tanya', 'Pulkit', 'Ishaan', 'Saurabh', 'Divya', 'Nikita', 'Aayush', 'Bhavyaa'];
const pulkit = [
    'PULKIT',
    'JAIN',
    2022 - 2002,
    true,
    20.02,
    friends,
]

for (let i = 0; i < pulkit.length; i++) {
    console.log(pulkit[i]);
}

const typearray = [];
// typearray[20] = 90;
// console.log(typearray);
for (let i = 0; i < pulkit.length; i++) {
    //filling an array 
    typearray.push(typeof pulkit[i]);
}

console.log(typearray);


const years = [2000, 2001, 2002, 2003, 2004, 2005];


const ages = [];

for (let i = 0; i < years.length; i++) {
    ages[i] = 2022 - years[i];
}

console.log(ages);


//continue and break are also allowed in javascript

const pulkitObject = {
    firstName: 'Pulkit',
    lastName: 'Jain',
    age: 2022 - 2002,
    job: 'Student',
    friends:
        ["Tanya", "Ishaan", "Divya", "Saurabh", "Nikita", "Aayush", "Bhavyaa"]
}
console.log(pulkitObject);

//two ways of accessing a property from an Object
//dot annotation
console.log(pulkitObject.lastName);
//bracket annotation
console.log(pulkitObject['firstName']);


//brackets can contain expressions
const nameKey = 'Name';
console.log(pulkitObject['first' + nameKey]);
console.log(pulkitObject['first' + nameKey]);
console.log(pulkitObject['something' + nameKey]);

const intrestedIn = prompt("what you want to know about me - choose between firstName,lastNam, job,age and his friends");

if (pulkitObject[intrestedIn]) {
    console.log(pulkitObject[intrestedIn]);
} else {
    console.log("wrong request");
}

pulkitObject.location = 'India';
pulkitObject['twitter'] = '@pulkitjainalways';

console.log(pulkitObject.location);
console.log(pulkitObject.twitter);


console.log(`${pulkitObject.firstName} has ${pulkitObject.friends.length} friends, and his best friend is ${pulkitObject.friends[3]}`);
// console.log(5 % 2);
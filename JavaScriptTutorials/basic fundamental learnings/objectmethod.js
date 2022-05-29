'use strict';

//we can infact add functions to the objects 

const PulkitObj = {
    firstName: 'Pulkit',
    lastName: 'Jain',
    birthYear: 2002,
    job: 'teacher',
    friends: ["Tanya", "Ishaan", "Divya", "Saurabh", "Nikita", "Aayush", "Bhavyaa"],
    hasDriverLicense: false,
    // calcAge: function () {
    //     return 2022 - this.birthYear;
    // }

    calcAge: function () {
        this.age = 2022 - this.birthYear;
        return this.age;
    },

    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he ${this.hasDriverLicense == true ? "has a driving License" : "does not have  a driving licence"}`;
    }
}


console.log(PulkitObj.calcAge());
console.log(PulkitObj['age']);
console.log(PulkitObj.getSummary());
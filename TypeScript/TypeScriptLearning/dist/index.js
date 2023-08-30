"use strict";
/*
const a: number = 20;

const nambo = <string>"hello"; // new Syntax fot the use

const surName: string | number = "something is fishy"; // union data type

const func = (n: number, m: string): string => {
  return n.toFixed(2) + m;
};

// types in typescript
type UserName = string | number;

const hello: UserName = "name";

// type for function

type UserFunc = (n: number, m: string) => string;

const func2: UserFunc = (n, m) => {
  return String(m) + n;
};


*/
/*
// Arrays in  Ts
const arr: number[] = [1, 2, 4, 4.4, 4];
// generics
const arr2: Array<string> = ["something", "is", "there"];
const arr3: Array<number | string> = new Array(20); // union with generics

*/
/*
// Objects in ts
type Obj = {
  height: number;
  weight: number;
  gender?: boolean; // this property becomes optional
};

// interface : can be extended , types can't be extended
interface ObjJ {
  height: number;
  weight: number;
  gender?: boolean;
}

type FuncType = (n: number, m: number) => void;

interface newObject extends ObjJ {
  school: boolean;
  func?: FuncType;
}

const ken: newObject = {
  school: true,
  func: (n, m) => {
    console.log(n * m);
  },
  height: 23,
  weight: 49,
};

const obj: Obj = {
  height: 23,
  weight: 34,
  gender: true,
};

const obj2: Obj = {
  height: 23,
  weight: 34,
};

*/
// functions In ts
/*

// optional parameter
type FuncType = (n: number, m: number, l?: number) => number | string;
const func: FuncType = (n, m, l) => {
  if (typeof l === "undefined") {
    return "l is undefined";
  } else {
    return n * m * l;
  }
};
func(24, 23);


// default Values
type FuncType = (n: number, m: number, l?: number) => number | string;
const func: FuncType = (n, m, l = 20) => {
  return n * m * l;
};
const func2 = (n: number, m: number, l: number = 20): number => {
  return n * m * l;
};
func(24, 23);



// Rest Operator

type FuncType = (...m: number[]) => number;

const func1: FuncType = (...m) => {
  let ans: number = 0;
  m.forEach((i) => {
    ans += i;
  });
  return ans;
};

const func2 = (...m: number[]): number => {
  let ans: number = 0;
  m.forEach((i) => {
    ans += i;
  });
  return ans;
};

func2(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);



// FUNCTIONS With Objects

type Product = {
  name: string;
  stock: number;
  price: number;
  photoUrl: string;
  readonly id: string;
};
type GetDataType = (product: Product) => void;

const getData: GetDataType = (product) => {
  // product.id = "something" , not allowed
  console.log(product.name);
};


*/
/* */
// classes
/*

class Player {
  // private height: number;
  // public weight: number;
  // constructor(height: number, weight: number) {
  //   this.height = height;
  //   this.weight = weight;
  // }\
  public readonly id: string;
  constructor(
    private height: number,
    public weight: number,
    protected power: number
  ) {
    this.id = String(Math.random() * 1000);
  }
  // getter
  get getHeight(): number {
    return this.height;
  }
  // setter , no return type
  set changeHeight(val: number) {
    this.height = val;
  }
}

class Player2 extends Player {
  constructor(height: number, weight: number, power: number, special: boolean) {
    super(height, weight, power);
    // the power is private for this class
  }
}

const ans: Player2 = new Player2(20, 20, 20, true);
ans.changeHeight = 300;
ans.getHeight;

*/
/*
// interfaces are all public , can't use them as private
interface ProductType {
  name: string;
  stock: number;
  price: number;
  offer?: boolean;
}

interface GetId {
  getId: () => string;
}

class Product implements ProductType, GetId {
  public name: string;
  public stock: number;
  public price: number;
  public readonly id: string = String(Math.random() * 1000);
  constructor(name: string, price: number, stock: number) {
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
  getId = () => this.id;
}
*/
// Type Assertion
// const btn = document.getElementById("btn")!;
// const btn = document.getElementById("btn") as HTMLElement;
// const btn = <HTMLElement>document.getElementById("btn");
// btn.onclick;
//Generics
// on functions
const func = (n) => {
    return n;
};
const ans = func("hello");
const func2 = (n, m) => {
    return { name: n, crank: m };
};
const func3 = (n, m) => {
    return { name: n, crank: m };
};
const filterByPeoples = (arr, property, value) => {
    return arr.filter((item) => item[property] === value);
};
class Person2 {
    constructor(prop1, prop2) {
        this.prop1 = prop1;
        this.prop2 = prop2;
    }
}

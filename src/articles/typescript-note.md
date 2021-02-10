# TypeScript 筆記
> **Summary：**
> Author：Frank Lin
> Email: alinktofrank@gmail.com
> Status：編輯中 
> Description:
> 本文是針對 TS v3.9 官方文件整理而成的中文筆記，涵蓋官方 Handbook 和 Handbook Reference 兩個部分，正文中將簡稱 TypeScript 為 TS，JavaScript 為 JS

## 導航欄 
[TOC]

## 基本型別
TS 支援 JS 中所有的型別，同時引入了便利的枚舉類型

### Boolean 布林值
```typescript=
// 一般 JS 的寫法
let isLightOn = true;

// TS 加入了型別的概念
let isLightOn:boolean = true;
```
在宣告變數同時時，以“：”定義了此變數的型別，isLightOn 在宣告後只能接受布林值，無法接受其他型別。
```javascript=
isLightOn = 'isNotWorking'; 
//error: the value 'isNotWorking' is not assignable to type 'boolean'
```
### Number 數值
如同在 JS 中，數值都是浮點類型或大整數（BigIntegers），TS 將數值分成兩種類型 number 和 bigint，並如同 JS 支援 2、8、16 進位及小數點等表示方式
```typescript=
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let big: bigint = 100n;
```
> **Note：** 
> BigInt 是一個內建的物件，提供了表示大於253的整數的功能 (253是JavaScript原生的Number能夠表示的最大值)
> 

### String 字串
如同 JS，TS 用兩個 “ 或 ‘ ，來表示文字類型的值
```typescript=
let someString:string = 'this is string'
someString = "another string"
```
同樣的樣板文字（template string）的語法也能在 TS 使用，另外字串也能做加法運算
```typescript=
let templateStr:string = `Hi ${username}`;

let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.

I'll be ${age + 1} years old next month.`;

// This is equivalent to declaring sentence like so:
let sentence: string =
  "Hello, my name is " +
  fullName +
  ".\n\n" +
  "I'll be " +
  (age + 1) +
  " years old next month.";

```

### Array 陣列
在 TS 中，陣列有兩種表示方式，這邊直接用範例說明
```typescript=
// JS 表示方式
let A1 = [1,2,3,4,'Hi',true];

// TS 需要我們定義陣列中元素的型別
// 這邊有兩種方式，第一種：基本款
let A2:number[] = [1,3,5,7];

// 第二種：利用函數多型的方式
// Array構造函數並多型定為數字型別 Array<elemType>:
let A3:Array<number> = [1,3,5,7];
```
那接下來有一個問題，目前透過 TS 似乎我們在單一陣列中只能放入單一型別的元素，這並不符合 JS 的設定（如上方的 A1），針對這個部分 TS 提供了 Tuple 的概念（元組）

### Tuple 元組
當如果我們需要表示 A1 這種陣列時，我們可以：
```typescript=
let A1:[string,number]=['Hi',2];
```
但這邊有一個限制，元組的長度必須先定義，後續賦值的長度必須符合定義的情況，那顯然還是不能解決我們表示 A1 的需求

我們需要這個陣列是不需要預先定義長度的（可擴充），為此，TS有另一個作法“聯合類型”，這我們會在聯合類型的部分在做說明，這邊先上一個簡單的範例
```typescript=
// 透過 （type1｜type2|...）的方式
let A1:(number|string|boolean)[] = [1,2,3,4,'Hi',true];
```

### Enum 枚舉類型
枚舉類型是一種數值與字串對應的類陣列數值，key值必須為字串，預設起始值是 0，可自定義賦值，而下個數值為上一個數值 +1
```typescript=
// 宣告枚舉
enum Classes{
    Warrior, // 0
    Priest,  // 1
    Mage,    // 2
    Monk = 5,// 5
    Hunter   // 6
}

Classes.Warrior // 顯示數值 0
Classes[0] // 顯示字串 'Warrior'
Classes[3] // 值為 undefined 
Classes[4] // 但不會報錯
```
一般來說，枚舉類型內的元素為 'key:string' 對應 'value:number'，但實質上其型別的限制為 'key:string' 對應 'value:any'，但在實例化的時候由於枚舉類型**下個數值為上一個數值 +1**的特性，非數值+1會出現報錯

以 TS 官方線上的練習區實驗結果如下：
```typescript=
enum Classes{
    Monk = '燒毀！',
    Hunter  // Error: Enum member must have initializer
}

enum Classes{
    Monk = '燒毀！',
    Hunter = 6 // OK
}
```
Key 值不能重複，但 Value 可以，相同 Value 的值，後者覆蓋前者，如下方，A 和 F 的值都是 0 但 Classes\[0]指向的是 F
```typescript=
enum Classes{
    A = 0,
    B,
    C,
    E = -1,
    F,
    G
}
console.log(Classes[0]) // F
```
當一變數的型別被宣告為某一枚舉類型時，他可以接受的賦值範圍為所有的 number, bigint and 在宣告時定義的值
```typescript=
enum Classes{
    I,
    J = 'K'
}

let A: Classes;
A = 0
A = 6
A = 1000
let x: number = 90
A = x;
A = Classes.J; // 在枚舉值為字串
A = 'K'; // Error 字串，但並非透過枚舉值
A = Math.pow(2,54); // bigint
console.log(A);
```
枚舉類型的某一個 key 也能作為型別
```typescript=
let B:Classes.I
B = Classes.I //OK
B = Classes.K //任何非 Classes.I 的值都會報錯
```
### any 任意型別
我們可能會遇到一個變數可能是任意型別（不限定型別）的情況
```typescript=
let notSure: any = 4;

notSure.length = 6; 
// could be array

notSure.ifItExists(); 
// okay, ifItExists might exist at runtime

notSure.toFixed(); 
// okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); 
// Error: Property 'toFixed' doesn't exist on type 'Object'.
```
另外 any 還有一個用法，我們之前提到的如果陣列中我們預想他有多種型別，沒錯，就是你想像的
```typescript=
let mixArray:any[]=[1,2,3,'Mix',true]; 
```
> **Note：**
> any 是所有型別的超集，能接受所有回傳值

### Void 無回傳值
如果過去有接觸過強型別語言的，應該都會對這個關鍵字有印象，這個通常用在 function 的宣告，當我們定義的 function 不能有回傳值時
```typescript=
function noReturn():void{
    return ;
    // return undefined
    // null is not assignable to type void;
    // undefined is assignable to void;
}
```
> **Note：**
> 當回傳值定義為 void 時，return 僅能接受 undefined 或者不寫，null及空字串都是不能被接受的

### Null and Undefined
從剛剛的例子中我們可以明確的了解到在 TS 的設定中 null 與 undefined 為不同的型別，沒錯，他們類似枚舉類型，其值等於其型別
    
- Null，型別為 null，值為 null 
- Undefined，型別為 undefined，值為 undefined

> **Note：**
> 一般情況下 null 和 undefined 是所有其他型別的子型別，但如果在使用了 --strictNullChecks 的情況下，null 和 undefined 只能賦值給 any 和 他們各自的型別（不變的是，void 仍可接受 undefined）
> 這時候我們可以這樣定義回傳值:
> ```typescirpt=
> :string | null | undefined. 
> ```

### Never
這是我覺得 TS 中最為特別的型別，指的是永不（能）到達，用於三種情境下 function 的回傳值設定：
```typescript=
// Function returning never must have unreachable end point

// 拋出錯誤
function error(message: string): never {
  throw new Error(message);
}

// 回傳錯誤
function fail() {
  return error("Something failed");
}

// 永不停止
function infiniteLoop(): never {
  while (true) {}
}
```
> **Note：**
> never 是所有型別的子集，因為每種型別的情境都有可能拋出錯誤

### Object 物件
object 為所有非主型別之型別集合，為 fuction 和 array 的超集
```typescript=
let x:object
let y:Array<number> = [1,2,3];

x = [12,34,5]
x = function(){}
x = y;
```
> **Note：**
> 即任何非 string, number, bigint, boolean, null, undefined, symbol and enum 的類別即為 object

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>Basic Type</b> End  
</p><hr/>

## 類型推論 Type Inference
TS 當我們未宣告變數型別時，TS 會根據變數所被賦予的值去推斷其型別，如下方這兩行語句，在 JS 方面是完全沒問題的，但在 TS 中，因為其類型推論的特性，會拋出錯誤
```typescript=
let number = 5; // 等同於 let number:number = 5;
number = 'five' // error
// Type '"five"' is not assignable to type 'number'
```
### 斷言 Type Assertions
在實際應用中，我們可能需要一個變數根據不同使用情境，可能是多種不同型別，但需要在某些情況下需要該變數為特定型別，這時候我們就會使用斷言的方式
```typescript=
function getArrLength(ele:any):string{
    // Error 
    // 因為 ele 可能是任意屬性，則 ele.length is not exist 
    if(ele.length){
        return ele.length;
    }else{
        return 'Not A Array'
    }
}

```
### 小結：思考 TS 是如何運行的？
我們可以先思考一下這個問題，然後下方我在講我的理解，我的理解可能有誤，所以讀者可以自己先思考這個問題，回顧一下目前所理解的部分，試著去理解 TS 想要解決什麼問題以及它如何解決。

### 個人理解
TS 事實上是 JS 的擴充，在實質的程式運行時，我們是先將 .ts 與 .tsx 編譯成 .js 檔來執行

TS 的目的是透過在編譯階段為我們確認程式撰寫上型別是不是有準確定義，若型別的設定有誤 TS 會預先報錯，避免型別上的定義不清所造成未來可能的任何錯誤

如同以下 TS 在編譯時就會失敗：我們定義了一個 type or interface 'Object'，而在其中卻未曾定義 toFixed 這個屬性
```typescript=
let prettySure: Object = 4;
prettySure.toFixed(); 
// Error: Property 'toFixed' doesn't exist on type 'Object'.
```
反過來說，只要是符合所定義型別時（或在定義的型別範疇內），TS 是不會報錯的，舉例：
```typescript=
let notSure: any = 4;
notSure.length = 6; // TS 不會報錯，JS 執行時報錯
// Cannot create property 'length' on number '4'
```
這段語法執行時必定報錯，因為 4 為數值，並不會具有陣列 length 的屬性，但從 TS 的邏輯上看來，notSure 的型別 any 其範疇包含了 array，因此 notSure.length 這個表達式是沒有問題的，但在後續 JS 執行階段則會報錯

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>類型推論</b> End  
</p><hr/>

## 介面 Interfaces
到目前為止我們介紹了 TS 如何宣告變數在一些基本型別方面，如 string, number, boolean等，但事實上我們在物件的格式上我們可能會有限定格式的需求

### 我們約定好了，不能多也不能少
假設我們現在定義了一個類別叫做狗，狗可以叫、可以睡覺、可以跑，但是絕對不能飛（一般來說），我們需要限定狗這個類別的結構，而 interface 就是為了達成這件事情 -- 定義約定（contract）好的介面格式

```typescript=
interface Dog{
    bread:string;
    bark:Function;
    sleep:Function;
}

let HERO:Dog

HERO = {
    bread:'black',
    bark: function(){
        console.log('旺旺！')
    },
    sleep: function(){
        console.log('HERO is sleeping')
    }
}
```
上方我們定義了 Dog 這個 interface（type） 必須要有 bread, bark 及 sleep 三個屬性，因此當我們將 HERO 宣告為 Dog 這個 type 的時候，這三個屬性缺一不可

### 可選屬性 Optional Properties
實際情況下我們會遇到一種情境，我們定義了一個介面，但不一定總是需要某個屬性，這時候 Optional type 提供了我們彈性
```typescript=
interface Animal{
    bark?:Function;
    sleep:Function;
    bread?:string;
}

let Dog:Animal;
let Fish:Animal;

Dog = {
    bread:'black',
    bark: function(){
        console.log('旺旺！')
    },
    sleep: function(){
        console.log('HERO is sleeping')
    }
}

Fish = {
    sleep: function(){
        console.log('Fish is sleeping')
    }
}
```
### 唯獨屬性 Readonly Properties
只能看不給摸系列，TS 可透過加上 readonly 前綴，使該屬性只能讀不能改
```typescript=
interface Dog{
    readonly bark:Function;
    readonly sleep:Function;
    bread:string;
}

let HERO:Dog;

HERO = {
    bread:'black',
    bark: function(){
        console.log('旺旺！')
    },
    sleep: function(){
        console.log('HERO is sleeping')
    }
}

HERO.bark = function(){
    console.log('喵喵！')
} 
// Error
// Cannot assign to 'bark' because it is a read-only property

HERO.bread = 'yellow' // OK
```
#### ReadonlyArray\<T>
類似於 Array\<T> 但其值無法被更改：

```typescript=
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;

ro[0] = 12; // error!
// Index signature in type 'readonly number[]' only permits reading.
ro.push(5); // error!
// Property 'push' does not exist on type 'readonly number[]'.
ro.length = 100; // error!
// Cannot assign to 'length' because it is a read-only property.
a = ro; // error!
// The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'.
```

Array\<T> 可以被賦值給 ReadonlyArray\<T>，但反之不可（Readonly 值無法賦值給 Mutable型別之變數）

```typescript=
let ROA:ReadonlyArray<number> 
let A1:Array<number> = [1,2,3,4];
ROA = A1;
A1 = ROA;
// Error 
// The type 'readonly number[]' is 'readonly' and cannot be assigned to the mutable type 'number[]'
A1 = ROA as number[];
// 但可以透過斷言的方式達成
// as 為斷言語句，我們在後續的章節會提到
```

> **Note：**
> interface or type 在宣告不可變更的屬性時用 readonly，而一般變數可以用 const 達到一樣的效果

### 未被介面定義的額外屬性
直接上菜：
```typescript=
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return { color: config.color || "red", area: config.width || 20 };
}

let mySquare = createSquare({ colour: "red", width: 100 });
// Argument of type '{ colour: string; width: number; }' is not assignable to parameter of type 'SquareConfig'.
// Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. 
// Did you mean to write 'color'?
```
如果在賦值的時候出現了介面未定義的屬性時，TS 也會報錯。這時候有兩種做法，一種為斷言，另一種則是在介面中預先定義未知屬性格式(index signature)
```typescript=
// type assertion
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

// Index signature
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any; 
  // optional property
  // SquareConfig can have any number of properties, 
  // and as long as they aren’t color or width, 
  // their types don’t matter.
}
```
我們可以這樣理解，TS 做的事情是確認是否程序按造所定義的型別執行，不能出現未規範的情況，以方法的參數而言，方法內能使用的參數僅能有當初宣告時定義的參數介面具有的屬性，回傳值同理，除此之外，都是為例外（報錯）

```typescript=
function(config:SquareConfig){
    config.colour...
    // 上方這段 code 也會報錯
}
```
> **Note：** 
> 我們確實可以用上方提及的那兩種方式去傳入額外的屬性，但這也提高了程序產生意外的風險，謹慎使用

### Function Type
介面在 TS 中被大量應用在 Function 的參數與回傳值的型別定義上；此外我們也可以用以下方式來定義 Function - call signature
```typescript=
interface SearchFunc {
  (source: string, subString: string): boolean;
}
// 格式：(argu1:type, argu2:type..):returnType
// To describe a function type with an interface, we give the interface a call signature. 
// This is like a function declaration with only the parameter list and return type given. 
// Each parameter in the parameter list requires both name and type.
```
一樣的，interface 如何合同，參數與回傳值得格式都必須符合 interface 所規定的格式，否則會報錯
```typescript=
let mySearch: SearchFunc;

mySearch = function (src, sub) {
    // Type '(src: string, sub: string) => string' is not assignable to type 'SearchFunc'.
    // Type 'string' is not assignable to type 'boolean'.
    let result = src.search(sub);
    return "string";
};
```

### Indexable Types 有序型別
前面提到了我們可以透過 index signature 去彈性擴充我們的介面之屬性型別，先前我們是字串類型的 index signature

TS 同時也支援了 數值類型的 index signature 即 indexable
```typescript=
interface StringArray {
  [index: number]: string;
}
```
也可以定義介面屬性同時支援字串與數值的 index
```typescript=
interface TwoType {
  [x: number]: Dog;
  [x: string]: Dog;
}
```
這邊有一個潛在的問題：如果 number index 與 string index 的值定義不同的型別可能報錯

這是因為物件的 key 值在 JS initial 的過程中，會先被轉為字串，然後才於物件中排序，簡單來說 obj[100] = obj['100']，你可以想像字串 key 為數值 key 的超集，同理其對應的值也應該是如此

如同下方例子，**string key 所對應的值，其型別應該是 number key 的超集（即父類），否則會報錯**
```typescript=
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

interface Okay {
    [x: string]: Animal;
    [x: number]: Dog;
}
```
符合 index signature 之 key 型別範疇的一般定義屬性，其值之型別必須是 index signature 的值之子集：
```typescript=
interface NumberDictionary {
  [index: string]: number;
  length: number; // ok, length is a number
  name: string; // error, 
  // the type of 'name' is not a subtype of the indexer
  // Property 'name' of type 'string' is not assignable to string index type 'number'.
}
```
你可以透過聯合型別增加 index signature 的彈性：
```typescript=
interface NumberOrStringDictionary {
  // union type
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}
```
最後，可以透過 readonly 屬性去阻止所有的屬性被修改
```typescript=
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // error!
Index signature in type 'ReadonlyStringArray' only permits reading.
```
> **Thinking：**
> 如果 index signature 設為 readonly，符合其 key 型別範疇之一般屬性之值之型別可以為 muteable 嗎？
> 
> 答案是 OK!
```typescript=
interface R {
  readonly [index: string]: any;
  mutable:boolean; 
  // mutable 為字串所以必須是 index signature<string> 其值的型別的子集
  // boolean is any's subtype OK!
}

let r:R = {
    test:'yo',
    mutable:true
}

r.mutable = false;  // OK, 不是 readonly
r.test = 'oh ya' ;  // error
// Index signature in type 'R' only permits reading.

```

### Class types
履行承諾：implement，中文翻作實現，你可以把 interface 想像成一種通用的介面，並不存在實體，而 class 則會在介面的規範下實現實體：
```typescript=
// 我們約定好了一種介面稱之為 ClockInterface，這個介面必須要有 currentTime 這個屬性，且其型別為 Date
interface ClockInterface {
    currentTime: Date;
}

// 在 Clock 這個類中，我們實現了（implement）ClockInterface 並給予了 currentTime 這個屬性一個實際的值（主體）
class Clock implements ClockInterface {
    currentTime: Date = new Date();
    constructor(h: number, m: number) { 
        //....
    }
}
```
同樣， interface 除了能約定屬性，也能約定行為（meth or function），例如：
```typescript=
// 這是一個很好的例子，我們講到動物的時候，我們指的一定是一個群體，因為他們有共通的屬性及行為
interface Animal{
    gender:string;
    move:(describption:string)=>:void
}
// 我們約好了，動物都會有一個屬性：性別，其型別為字串；同時會有一個 method function 會接受一個字串參數並沒有任何回傳值

// class 實現
interface DogProps{
    gender: string;
}

class Dog implement Animal{
    contructor(props:DogProps){
        this.gender = props.gender;
    }
    move(describption:string){
        console.log(`move like ${describption}`)
    }
}
```
#### 類的靜態層面與實例層面的不同
這個是從官網上的這段直翻過來的(我怕我翻的不好，我們還是直接看原文XD)
> *Difference between the static and instance sides of classes*

回歸正題，我們知道 TS 的目的是為了做型別檢查這件事情，回到類的議題上，在我們前面提到以 interface 去定義類的類型時，我們做了什麼？思考一下...

我們定義了類在實例層面應該要有的樣子，但靜態層面我們並沒有約定好，這會導致錯誤，我們來思考一件事情，我們定義了實例層面卻沒有對其建構式定義好其該有的樣子時會發生什麼事情？
```typescript=
interface ClockConstructor {
    new (hour: number, minute: number);
}

let Clock = class NormalClock implements ClockConstructor {
    currentTime: Date;
    constructor(h: number, m: number) { }
}
let Clock = class WiredClock implements ClockConstructor {
    currentTime: Date;
    constructor(h: string, m: string) { }
}
```
我們仍然都收到相同的實例但我們卻可能使用錯誤的建構式，除非我們也約定好了 Clock 建構式該有的樣式（interface)
```typescript=
// 這樣就完美了
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
    return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("beep beep");
    }
}
class AnalogClock implements ClockInterface {
    constructor(h: number, m: number) { }
    tick() {
        console.log("tick tock");
    }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```
或者這樣，感覺更強烈
```typescript=
interface ClockConstructor {
  new (hour: number, minute: number);
}

interface ClockInterface {
  tick();
}

// 我的建構式必須長這樣: ClockConstructor
// 我的實例則是: ClockInterface
const Clock: ClockConstructor = class Clock implements ClockInterface {
  constructor(h: number, m: number) {}
  tick() {
      console.log("beep beep");
  }
}
```

### Interface extends interfaces
介面擴展，介面可以被介面繼承，這點在許多物件導向的程式語言都有實作，這讓我們可以有彈性的去使用並擴展現成的介面
```typescript=
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square = {} as Square; // any 型別 assertion 成 Square 型別
square.color = "blue";
square.sideLength = 10;
```
同時繼承多種型別(但不能有所衝突)
```typescript=
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
```


### Hybird types
混種，特殊類型，TS 延續的 JavaScript 的彈性，一種 interface 能同時定義具有多種型態，他可以既擁有物件的特性，同時本身也是 function 
```typescript=
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = (function (start: number) { }) as Counter;
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```
### Interface extends classes
最後這個很特別，介面繼承類，這個在其他物件導向的語言是無法的，一般而言會有一個 abstract class 虛假類，然而在 TS 中我們卻可以做到這件事情，讓我來梳理一下

我們先思考一下為什麼我們要定義類、介面，最後我們會討論一下虛假類。在 JAVA 或其他物件導向的程式語言中都存在的介面與類的概念，舉例：

現在我們要實作貓、狗、機器狗跟機器貓，我們要如何透過程式碼去規範他們該有的樣子，我們該如何定義？

#### 介面的概念
首先，我們將概念抽出為介面，如某種特性，所需要具備的相同功能；我們說，飛機(airplane)會飛，鳥(bird)也會飛，這兩個物件是不同種類的，可是他們都具有會飛的特性，差別在於飛行的方式不同，一個靠機械完成，一個則是拍動翅膀，所以，我們可以將飛行(Fly)寫成介面，物件只要繼承這個介面並且方法，該物件就具有飛行的特性了。

#### 類
類是針對某種具有相同性質的實例群體的樣板，如狗跟貓，我們能想像其真實的樣子，他們都繼承了 Animal 的介面

#### 抽象類
虛假類跟介面有點相似，他們都無法被實例化，必須透過被類去繼承或實現，不能具有主體。如貓跟狗都是動物、機器貓跟機器狗都是機器，動物跟機器都是代表一種概念上的東西，是抽象的，我們講到動物跟機器你會聯想到的某種具有同樣性質的集合特性，而非實例，這即為介面（interface）的概念

> 如果沒有接觸過其他物件導向的語言，比如 Java 的我們會感到困惑，因為在 JavaScript 中我們沒有抽象類的概念，因此在 JS 的世界，Interface 把過去在 Java 中 Interface 與 Abstract 的角色都承擔了
> 

#### 到此我們明白 interface 不具有實例，你永遠不會去 new 一個 interface
到此，我們回頭思考標題，interface extends class 你會不會覺得有點奇怪的地方？
類是可以被實例化的（new）而介面無法，可是 TS 卻允許 interface 去繼承 class？這是什麼回事？繼承後我們就能實例化了嗎？

答案是不行，在 TS 中當 interface 繼承類的時候，並不包含 contructor 的部分，以下為官方原文，大致的意思是，我們僅會繼承其靜態屬性的部分而不會包含實現的部分
> *When an interface type extends a class type it inherits the members of the class but not their implementations*
> 

#### Private and Protected Properties
當介面繼承的類中包含了 Private 或 Protected 的屬性時，該介面只能被其繼承類的子類所實現

```typescript=
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}

class TextBox extends Control {
    select() { }
}

// Error: Property 'state' is missing in type 'Image'.
class Image implements SelectableControl {
    private state: any;
    select() { }
}

class Location {

}
```
上面的範例中介面 SelectableControl 繼承了類 Control，而其擁有私有屬性 state，我們另外定義了 Button 與 TextBox 兩個類，其都繼承了 Control，其中 Button 同時顯式的實現了 SelectableControl 而 TextBox 則是在其類中定義了介面 SelectableControl 所要求的 select 方法（隱式的實現），故他們都滿足 SelectableControl 的要求，都能算是其子型

然而 Image 雖然顯式的實現了 SelectableControl，但其並未繼承 Control 故其並沒有擁有 Control 之私有屬性 state（**其另外自定義的私有屬性是無效的**），無法順利實現 SelectableControl（報錯）

> 僅有 private 與 protected 屬性有這樣的限制

### Declaration Merging
介面可以重複宣告，然後最後 merge 成為一個最終的介面，重複宣告的介面屬性不能有衝突
```typescript=
interface Box {
    height: number;
    width: number;
}

interface Box {
    scale: number;
    // width: string Error 這樣會有衝突
}

let box: Box = {height: 5, width: 6, scale: 10};
```

### 鎖定屬性值
介面也能直接鎖死屬性值，使這個 interface 內的某個屬性值只能是某個值
```typescript=
 interface Action  {
    type: 'SELECT_AREA';
    payload: {
        areaId: number;
        areaName: string;
    };
 };

let a: Action = {
    type: 'SELECT_AREA', // 必須是'SELECT_AREA'
    payload: {
        areaId: 1,
        areaName: 'test'
    }
}
```

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>介面 Interface</b> End  
</p><hr/>

## Function
### 定義 function 的參數與回傳值型別
接下來這部分我們要介紹 TS 中如何界定 function 的型別，先來看下基本款：
```typescript=
function basicTSfunc(argu:string):void{
    //blablabla...
}

// OR

let basicTSfunc2 = function(argu:string):void{

}

// argu:string ＝> 定義了 argu 參數的型別
// :void ＝> 沒有回傳值

```
猜猜上方的這兩種有沒有什麼差別？ 或者說已到目前我們所了解關於 TS 的知識，你們認為上方的 func1 與 func2 型別上有沒有差別？

請問下方這行會不會報錯呢？
```typescript=
// 接續之前的上下文
// ...

let basicTSfunc2 = function(argu:string):void{

}

basicTSfunc2 = function(argu:number):void{

}
```
有些人可能覺得不會，會這樣認為是因為我們認為 basicTSfunc2 並沒有被指定型別，只是被賦值了一個被定義了型別的匿名函數

這個思考方向是沒錯的，但 TS 存在有一個特性，我們之前也有稍微提及的 - 型別推論（Type Inferring）
```typescript=
let basicTSfunc2 = function(argu:number):void{

}
/* 等同於
let basicTSfunc2:(num:number) => void =
    function(argu:number):void{

}
眼尖的有沒有發現什麼？ 沒錯我故意換了一個變數名稱， TS不在意定義型別時與實體被賦值時變數的名稱差別只要型別對應一致就可以了
*/

// 以下這行會報錯，值與型別不符合
basicTSfunc2 = function(argu:number):void{

}
```
```typescript=
// myAdd has the full function type
let myAdd = function(x: number, y: number): number { return  x + y; };

// The parameters 'x' and 'y' have the type number
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```

> TS 會根據變數被賦予的值去推論它的型別，因此一但變數被賦值了，同時我們也顯式或隱式地定義了其型別
> 

### 可選參數（optional）
我們先來討論 TS 的可選參數，由於我們必須預先定義傳入參數的型別，**同時 null 與 undefined 的型別又為其本身**，在這樣的情況下，如果我們傳入的參數為空值則將會報錯，因此我們需要可選參數
```typescript=
function buildName(firstName: string, lastName?: string) {
    // ...
}
```
如此一來，last name 可允許被傳入空值或不傳入，再來，我們需要提及 TS 對於可選屬性的限制，那就是在 TS 中可選屬性僅允許存在於必要屬性之後
```typescript=
function optional (arg1?:number,arg2:number) { 
    return arg1 + arg2;
}

// A required parameter cannot follow an optional parameter
```
在可選屬性後不能放置任何必要屬性，TS 會報錯且不會檢查放置於可選屬性後的必選屬性型別

### 參數預設值（default value）
如果對於這個語法不熟悉的可以去參考 [MDN](https://www.typescriptlang.org/docs/handbook/functions.html) 上的說明，在這裡我想重點討論與 TS 可選參數的結合應用

思考一下如果這個參數同時被設為選又被賦予了預設值會發生什麼事情？直接來看結果：
```typescript=
// 看來直接給你報錯 
// Parameter cannot have question mark and initializer.
```
最後對於參數預設值的語法，TS 不存再如同可選屬性那樣的限制，沒有一定要寫於必要屬性之後
> 這個語法在 ES6 已經被提出，在過去所有參數的預設值都是 undefined，但現在我們可以設定為我們預定的值
> 
> 由於這是 JS 原生就有的語法，因此必須寫於實際的 fuction 上，不能應用於 overlaod 時，再加以定義應對傳入型別給予不同預設值

### Rest Parameter
在 TS 中你也可以使用 Rest Operator 或稱 Spread Operator，即 “...” ，一樣的我們需要規範其型別，TS 將其視為一種陣列，你可以傳遞任意個數的參數，同時也可以不傳（optional）
```typescript=
// 既然具有 optional 的特性，就必須放於必要參數之後
// 視為陣列，以陣列的方式去定義其型別
function buildName(firstName: string, ...restOfName: string[]) {
    return firstName + " " + restOfName.join(" ");
}

// employeeName will be "Joseph Samuel Lucas MacKinzie"
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

### This 
這邊不會花太多篇幅解釋 this 的原理，如果接下來的內容不能理解的話，就在自行去了解一下 JS 中的 this 是如何運作的

回歸正題，我們都明白 this 的指向發生在 function 被引用的當下，TS 官方的原文如下：

> *In JavaScript, this is a variable that’s set when a function is called.*
> 
又因為 JS 中，函數可以且經常被作為參數傳遞，所以當我們在函數中呼叫 this 時，隨著呼叫的方式不同，其 this 的指向可能會超出我們當初的預期，如下：
```typescript=
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        return function() {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

// card 沒錯；但 suit 要報錯了
alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```
原因是 deck.createCardPicker 本身所回傳的 function 被賦值給了 cardPicker，cardPicker 執行時其 this 並不指向 deck，因此 this.suit 並不存在（Error）

TS 在這個問題上提供了一種解決方案，即定義 this 的型別，接下來我們來逐步介紹

想像一下生產中我們實際會經常遇到需要將我們寫好的 fucntion 傳遞至他們寫好的 library 或 api 中，假如我們需要限定 this 的使用，我們可以聲明 this 該有的樣子，如下：
```typescript=
// 他們維護的 library
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}
// 我們需要傳遞 onClick 進入 addClickListener
// onclick 被限定其 this 的類型為 void
```
TS 指定 this 型別的方式，將 this 作為第一個參數，void 代表這個 function 內禁止顯示定義 this 關鍵字

接著我們如果這樣寫我們傳入的 function 
```typescript=
class Handler {
    info: string;
    // 指定 onClickBad 傳遞 this 的型別為 Handler
    onClickBad(this: Handler, e: Event) {
        // oops, used `this` here. using this callback would crash at runtime
        this.info = e.message;
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickBad); // error!
```
上方這段會報錯，因為我們已經聲明了 addClickListener 的 onclick 參數，其 function 不能有顯示定義 this
```typescript=
class Handler {
    info: string;
    onClickGood(this: void, e: Event) {
        // can't use `this` here because it's of type void!
        console.log('clicked!');
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickGood);
// 這樣就 ok 了
```
那如果 library 已經聲明了 **this:void** 但我們又必須使用 this 關鍵字呢？ 箭頭函式，因為箭頭函式是使用來自函式外層的 this ，因此仍符合 this:void 的要求

> this 如果未被聲明其類型，如一般的情況，會被默認為 any

### Overloads 過載
如果我們需要一個 function 存在多種不同參數組合及其對應的回傳值時，我們就需要用這樣的方式實現

請注意我的上所提及的文字 “不同參數組合及其對應的回傳值” ，這跟 TS 中聯合型別的概念又有所不同，Overloads 為 TS 或其他程式語言中 function 常會存在的一種多型的概念

以下以程式碼說明
```typescript=
function pickCard(x: { suit: string, card: number }[], y:number): number;
function pickCard(x: number): {suit: string; card: number; };
```
看到上方我們針對同一個 function 定義了兩種不同的型別規範，TS 會認定 pickCard 存在兩種參數對應其回傳值的型別規範：
* 當傳入的參數 x 為陣列時，回傳值必須為數字
* 當傳入的參數 x 為數字時，回傳值必須為符合定義格式之物件
```typescript=
function pickCard(x:any): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
```
最後，我們定義了 function 的主體，注意上方的 (x:any):any 不是多型定義的一部分，僅是 function 實體的定義，這裡的型別定義必須是前面多型部分的超集

```typescript=
// 所以你也可這樣寫，當然，這沒必要
function pickCard(x: number | { suit: string; card: number; }[])
: void | number | { suit: string; card: number;} {
...
}
```
<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>Function | Before 5/29</b> End  
</p><hr/>

## 類 Classes
關於 ES6 類的如果不熟悉的，可以先看這篇筆記 [ECMAScript2015 class feature](https://hackmd.io/nFViebOiQrWZnfVluqutXw)
### 定義實例屬性與方法的型別
```typescript=
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}
```
### 繼承 Inheritance
```typescript=
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

// 上方 Dog 內雖然沒有顯示的宣告建構式及引用 super 方法，但背後 javascript 已經隱式的完成了

const dog = new Dog();
dog.bark();
dog.move(10);
dog.bark();
```
再看一個複雜一點的範例：
```typescript=
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); }
    // override Animal 實例的 move
    move(distanceInMeters = 5) {
        console.log("Slithering...");
        super.move(distanceInMeters);
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    // override Animal 實例的 move
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);
```
### Override（覆載）and Overload（過載）
#### Override 
覆載指子類繼承父類時，在子類宣告了與父類同名且其參數數量及類型相同、回傳值類型相同，這個情況下，當子類實例引用該方法時，不在指向父類的方法而是指向子類新宣告的這個方法

#### OverLoad
超載指定義兩個或多個擁有相同的 function 名稱，但不同參數的 function ，最後程序會根據你傳入的參數不同而呼叫相對應的 function

嚴格來說，TS 為 JS 的超集，在 JS 執行前先進行型別的判斷，TS 最終仍會轉譯成 JS 執行，而 JS 本身並不存在 overload 的特性，TS 並無法真正的實現真正的 overload

TS 中 function 的 overload 是透過 TS 建立多個針對某函式的介面（參數組合型別｜回傳值型別），最後只宣告一個函式（一個主體），實質產生的 JS 只存在一個函式（javascript 本身沒有限制參數的型別與數量），以這樣的特性實現過載

> Note：
> 1. Overload 的預設參數僅能定義在 function 的主體上
> 2. function 僅能有一個主體！
```typescript=
// typescript

// function overload(argu1='string'): string;
// function overload(argu1=10): number; 
// 預設參數僅能定義在 function 的主體上，報錯！！

function overload(argu1: string): string;
function overload(argu1: number): number;

// function 僅能有一個主體！
function overload(argu1:any):any { 
    return argu1;
}
```
```javascript=
// javascript
"use strict";
function overload(argu1) {
    return argu1;
}
```
TS 類中實現超載
```typescript=
// typescript
class Animal {
    name: string;
    // constructor(theName: string) { this.name = theName; }
    constructor(distanceInMeters: number)
    constructor(distanceInMeters: string)
    constructor(distanceInMeters: any) { 
        this.name = 'Animal';
    }
    move(desc: string): void;
    move(distance: number): void;
    move(argu1:any=10) { 

    }
}

// javascript
// 實際執行
"use strict";
class Animal {
    constructor(distanceInMeters) {
        this.name = 'Animal';
    }
    move(argu1 = 10) {
    }
}
```

### Public, Private and Protected 修飾符
public, private and protected 這三個修飾符用於聲明被修飾變數的 scope，即該變數能多大範圍的被訪問或使用。

#### Public as default 
public 是預設值，代表如果不特別宣告的情況的情況下，TS 會默認該值是 public 即公開的，允許物件外部直接訪問該值或引用該方法
```typescript=
class Animal {
    public name: string;
    public constructor(theName: string) { this.name = theName; }
    public move(distanceInMeters: number) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
let HERO = new Animal('HERO');
console.log(HERO.name) // HERO
```

#### Private 修飾符
TypeScript 3.8 版本後，TS 支持 ES2019 Private 的語法，所以下方兩種寫法都是 work 的：
```typescript=
class Animal {
    #name: string;
    constructor(theName: string) { this.#name = theName; }
}

class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}
```
上方 # 代表 private 關鍵字，為 ES2019 推出的新語法，但目前瀏覽器的支援度不算太穩定，但 TS 3.8 以上支持

```javascript=
// 上方的 # 會變成這樣

"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var _name;
class Animal {
    constructor(theName) {
        _name.set(this, void 0);
        __classPrivateFieldSet(this, _name, theName);
    }
}
```

那 private 關鍵字修飾的屬性的會產生什麼結果，如同其字意，當屬性被宣告為 private 該屬性不能直接被外部訪問：

```typescript=
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // Error: 'name' is private;
```
這適合確保某些屬性的值是我們可控的，透過將特性控制屬性的值設為 private 我們可以確保他不能直接被外部更改，而必須透過我們提供的窗口（function），舉例：
```typescript=
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
    getName() { 
        return this.name
    }
    setName(str:string) { 
        this.name = str;
    }
}
```
上方確保了 Name 一定會是字符串類型，不會是數字，甚至我們可做更多的限制，比如用正則表達式去除我們不希望出現的字元等等

#### Protected 修飾符
protected 與 private 有點相似，不能直接被外部訪問或串改，但可以直接被其子類訪問使用，上菜！
```typescript=
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name);
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}

let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // error
```
可以看到子類 Employee 內部可以直接使用 父類 Person 的 name 屬性，但你無法在外部直接使用 name 

#### Readonly modifier 
readonly 修飾符如同其語意，只能訪問不能修改，透過 readonly 修飾屬性則有了如 const 般的作用
```typescript=
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor (theName: string) {
        this.name = theName;
    }
}
let dad = new Octopus("Man with the 8 strong legs");
dad.name = "Man with the 3-piece suit"; // error! name is readonly.
Parameter properties #
```

#### 在建構式參數中定義類屬性型別
到目前為止我們在設定類的屬性時，我們必須在 constructor 前先定義好類的屬性，然後再於建構式中給予賦值，實在有些麻煩，TS 透過定義建構式參數屬性簡化這個流程
```typescript=
class Octopus {
    readonly numberOfLegs: number = 8;
    // readonly name:string;
    constructor(readonly name: string) {
    }
}
```
#### getter and setter
這部分用法跟 JS 一樣，沒有什麼太多額外的擴展，想了解類與物件的屬性存取器可以參考 [MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Obsolete_Pages/Obsolete_Pages/Obsolete_Pages/%E6%96%B0%E7%89%A9%E4%BB%B6%E7%9A%84%E5%BB%BA%E7%AB%8B/Getter_%E5%92%8C_Setter_%E7%9A%84%E5%AE%9A%E7%BE%A9) 這篇中文文章

#### static
起初這部分我以為與 JS 於 ECMA2015(ES6) 釋出的功能（同樣可以參考 [MDN](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Classes/static) 這篇）沒有太大的差別，但查了一下發現 ES6 所推出的 static 修飾符僅針對靜態方法

而這邊的 static 修飾符可以修飾類屬性，但用法如同 ES6 static，以下展示一下 TS 與其編譯過後的 JS 部分
```typescript=
// typescript
class Grid {
    static origin = { x: 0, y: 0 };
    static showOrigin() { 
        console.log(Grid.origin);
    }
    calculateDistanceFromOrigin(point: {x: number; y: number;}) {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }
    constructor (public scale: number) { }
}

// javascript 
let Grid = /** @class */ (() => {
    class Grid {
        constructor(scale) {
            this.scale = scale;
        }
        static showOrigin() {
            console.log(Grid.origin);
        }
        calculateDistanceFromOrigin(point) {
            let xDist = (point.x - Grid.origin.x);
            let yDist = (point.y - Grid.origin.y);
            return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
        }
    }
    // 以立即函式於類外部賦值給類
    Grid.origin = { x: 0, y: 0 };
    return Grid;
})();

> **注意：** static 修飾的屬性或方法僅能被訪問讀取，但不能被修改（'static' modifier must precede 'readonly' modifier.）
```
#### Abstract Classes
虛假類，無法被實例化，必須透過被繼承後，由子類去實例化，因此虛假類不能被定義實體，即建構子不能建構出實例，即引用 this 去指向類的實例賦值，但可以定義虛假屬性或設定建構式參數之型別

藉此來限定規範子類的繼承：
```typescript=
abstract class Animal {
    abstract makeSound(): void;
    // 不能存在主體
    abstract subClass: string;
    constructor(subClass:string) { 
        this.subClass = subClass;
        // 報錯
        // Abstract property 'subClass' in class 'Animal' cannot be accessed in the constructor.(271
    }
    move(): void {
        console.log("roaming the earth...");
    }
}
```
另外參數型別於虛假類內不會同時去定義類屬性：
```typescript=
abstract class Animal {
    constructor(gender:string subClass:string) { 
        this.gender = gender;
        // error
        // Property 'gender' does not exist on type 'Animal'
    }
}
```
最後，類中定義的方法可以存在實體，但一樣的如果由 abstract 修飾的方法同樣也不能存在主體

> **注意：** 原生 JS 並沒有虛假類的概念，因此如果你定義了一個虛假類但實質在 JS 上他仍然是可以被實例化的，因為其實他就是一般的類

#### Advanced Techniques

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>類 Classes | Before 6/7</b> End  
</p><hr/>

## 枚舉 Enums

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>枚舉 Enums | Before 6/12</b> End  
</p><hr/>

## 多型 Generics

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>多型 Generics | Before 6/15</b> End  
</p><hr/>

## Literal Types

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>Literal Types | Before 5/30</b> End  
</p><hr/>

## 聯合與交叉型別 Union Types and Intersection Types

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>聯合與交叉型別 | Before 6/1</b> End  
</p><hr/>

## 在 TS 中應用 JSX 語法 
> 基本設定
> 
想在 TS 中寫 JSX 需要先滿足兩個條件：
1. 檔案擴展名需設為 .tsx
2. 在 tsconfig.json 檔案中添加設定 jsx 選項，值有以下三種 option
    - **preserve**
輸出 jsx 並將擴展名更動為 .jsx
    - **react**
輸出 jsx 經 babel 轉譯完後的 javascript 語法，擴展名為 .js
    - **react-native**
輸出 jsx 並將擴展名設為 .js

> 斷言： as 關鍵字
> 
```javascript=
// 在一般的 TS 中，我們採用以下方式斷言
var foo = <foo>bar;
// 在 JSX 中，這會帶來解析上的困難，故改採以下方式
var foo = bar as foo;
// as 在 .ts 與 .tsx 中都能使用
```

### 類型檢查
> TS 會對 JSX 中的元素進行類型檢查; 其中將元素分成固有元素（intrisic）與基於值的元素(value-based)
#### Intrisic Element
固有元素指的是那些原生 HTML 元素（ex: div, h1...），這些元素都被宣告定義在了 namespace JSX 的 interface IntrinsicElements 內，所以 TS 能認得這些元素，而我們也可以透過擴展 interface IntrinsicElements 的方式，添加新的 Intrisic Element：
```javascript=
declare namespace JSX {
    interface IntrinsicElements {
        foo: any
    }
}

<foo />; // ok, 因為我們在 IntrinsicElements 內擴展了 foo 類別
<bar />; // error
```
#### Value-based Element
基於值得元素則是對應到了其值的類別定義
```javascript=
import MyComponent from "./myComponent";

<MyComponent />; // ok
```
> 有兩種方式可以定義基於值的元素：
#### FC, Functional Component
TS 限制了 FC 的參數與返回值的型別，參數必須是 props 物件，而返回值則必須是 JSX.Element 這個 TS 定義的物件類型(JSX.Element，必須包含 type, props and key 等屬性)
```javascript=
interface FooProp {
  name: string;
  X: number;
  Y: number;
}

// AnotherComponent 沒有聲明回傳值則莫認為 any
declare function AnotherComponent(prop: {name: string});//:any 包含 JSX.Element 

function ComponentFoo(prop: FooProp) {
  return <AnotherComponent name={prop.name} />;
}

const Button = (prop: {value: string}, context: { color: string }) => <button>
```
FC 因為本質上即為 javascipt 的 function，因此具有多載（overload）的特性
```javascript=
interface ClickableProps {
  children: JSX.Element[] | JSX.Element
}

interface HomeProps extends ClickableProps {
  home: JSX.Element;
}

interface SideProps extends ClickableProps {
  side: JSX.Element | string;
}

function MainButton(prop: HomeProps): JSX.Element;
function MainButton(prop: SideProps): JSX.Element {
  ...
}

```
> Note: 官方原文補充
> Function Components were formerly known as Stateless Function Components (SFC). As Function Components can no longer be considered stateless in recent versions of react, the type SFC and its alias StatelessComponent were deprecated
#### Class Component
- 分辨 class type and instance type
在開始探討 Class Component 之前我們必須要搞懂這兩個 TS 的專有名詞：
    1. Class Type
類別類型，可以透過物件的生成方式去分成兩類，透過 class 及 new 所生成的物件其 Class Type 為其 class；而透過工廠模式（Function）所生成的物件其 Class Type 為其 Function 本身
    2. Instance Type
實例類型，即生成物件的結構型態
```javascript=
class MyComponent {
  render() {}
}

// use a construct signature
var myComponent = new MyComponent();

// element class type => MyComponent
// element instance type => { render: () => void }

function MyFactoryFunction() {
  return {
    render: () => {
    }
  }
}

// use a call signature
var myComponent = MyFactoryFunction();

// element class type => MyFactoryFunction
// element instance type => { render: () => void }
```
> JSX 生成之物件，其實例類型必須是 JSX.ElementClass 的型別，包含了多種 RC 的屬性如：state, props, refs, context, forceUpdate and setState 等 

> 這兩種方式對於 TS 進行解析時難以分辨，TS 採用先視為 FC 的方式去解析，如果失敗，在採用 Class Component 的方式；如果兩種都失敗則報錯

### Namespace JSX

總結看來目前 TS 對 JSX 的命名空間至少定義了三個不同的 Interface：

- JSX.IntrinsicElements
Interface 定義了 JSX 接受的固有元素及其型別。
- JSX.Element
Interface 定義了 JSX Functional Component 接受 RetureValue 之型別。
- JSX.ElementClass
JSX 接受的元素實例型別

> 我自己的理解是：以 functional component 來說， JSX.Element 為 class type 之回傳值型別，JSX.ElementClass 則為實例函數的型別

- JSX.ElementAttributesProperty
用於定義 JSX Attribute 目標物件，僅接受一個值

```typescript=
declare namespace JSX {
  interface ElementAttributesProperty {
    props; // specify the property name to use
  }
}

class MyComponent {
  // specify the property on the element instance type
  props: {
    foo?: string;
  }
}

// element attributes type for 'MyComponent' is '{foo?: string}'
<MyComponent foo="bar" />
```
- JSX.IntrinsicAttributes
JSX 通用的 Attribute 與其型別定義
> Additionally, the JSX.IntrinsicAttributes interface can be used to specify extra properties used by the JSX framework which are not generally used by the components’ props or arguments - for instance key in React.
- JSX.IntrinsicClassAttributes
> JSX.IntrinsicClassAttributes\<T> type may also be used to specify the same kind of extra attributes just for class components (and not Function Components). In this type, the generic parameter corresponds to the class instance type. In React, this is used to allow the ref attribute of type Ref\<T>.

> **Note**
Generally speaking, all of the properties on these interfaces should be optional, unless you intend that users of your JSX framework need to provide some attribute on every tag
一般而言，自定義的 JSX.interface 型別擴充最好採用 optional 的方式，除非情境傾向每個 tag 都須包含這些屬性


```typescript=
// The spread operator also works:
var props = { requiredProp: "bar" };
<foo {...props} />; // ok

var badProps = {};
<foo {...badProps} />; // error
```

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>JSX | Before 6/19</b> End  
</p><hr/>

## Advanced Types

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b> Advanced Types | Before 6/26</b> End  
</p><hr/>

## Global Utility Type

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>Global Utility Type | Before 6/30</b> End  
</p><hr/>

## Iterators and Generators

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>Iterators and Generators | Before 7/2</b> End  
</p><hr/>

## Decorators

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>Decorators | Before 7/6</b> End  
</p><hr/>

## Mixins

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>Mixins | Before 7/8</b> End  
</p><hr/>

## DOM Manipulation

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>DOM Manipulation | Before 7/11</b> End  
</p><hr/>

## Variable Declaration

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>Variable Declaration | Before 7/17</b> End  
</p><hr/>

## Modules

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>Modules | Before 7/24</b> End  
</p><hr/>

## Module Resolution

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>Module Resolution | Before 7/27</b> End  
</p><hr/>

## Namespaces

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>Module Resolution | Before 7/31</b> End  
</p><hr/>

## Namespaces and Modules

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>Namespaces and Modules | Before 8/2</b> End  
</p><hr/>

## Declaration Merging

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>Declaration Merging | Before 8/5</b> End  
</p><hr/>

## Type Compatibility

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>Type Compatibility | Before 8/8</b> End  
</p><hr/>

## Type Inference

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>Type Inference | Before 8/9</b> End  
</p><hr/>

## Type Checking JavaScript Files

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>Type Checking JavaScript Files | Before 8/16</b> End  
</p><hr/>

## Symbols

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>Symbols | Before 8/21</b> End  
</p><hr/>

## Triple-Slash Directives

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>Triple-Slash Directives | Before 8/23</b> End  
</p><hr/>
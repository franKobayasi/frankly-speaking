# Styled component 中文筆記
> **Summary：**
> Author：Frank Lin
> Email: alinktofrank@gmail.com
> Status：已完成（2020/5/29） 
> Description:
> 本文是針對 Styled Component v5.1.0 版本，並無包含完整的 React Native 相關的資訊，以下簡稱 styled component 為 SdC，react component 為 RC

## 導航欄
[TOC]
 
## Motivation 
> SdC 專注在如何將 CSS 與 RC 做到最大的結合
> SdC 具有以下的特點
>
- Automatic critical CSS
SdC 自動追蹤畫面上的 component 並注入相對應的 CSS，實現了代碼分離，只注入當前所需要的最少代碼。
- No class name bug
SdC 對應每一個 style 自動生成獨一無二的 classname，因此我們不再需要擔心 classname 命名問題 
- Easier deletion of CSS
由於 SdC 與 component 緊密相連，在有任何 style 不被需要時（即代表其所綁定的 component 不再被需要使用），SdC 會與該 compoent 一起被刪除，不會被遺忘而殘留。
- Simple dynamic styling
SdC 與 RC 緊密結合，能夠接受 RC 的 props，而動態因應改變其樣式，我們不必要在維護多種 CSS 就能達成相同的效果。
- Painless maintenance
藉由 SdC 可以於js中撰寫，藉由可以與 RC 撰寫在一起，不需要在跨檔案尋找對應的 CSS 去維護。
- Automatic vender prefixing
write your CSS to the current standard and let styled-components handle the rest.
You get all of these benefits while still writing the CSS you know and love, just bound to individual components.

## Installatioln
``` node.js=
npm install --save styled-components
```
``` javascript=
// CDN
<script src="https://unpkg.com/styled-components/dist/styled-components.min.js"></script>
```

## Getting Started
讓我們來先寫一個簡單的 SdC
```javascript=
const Title = styled.h1`
    color:red;
    text-align:center
`
```
SdC 利用兩個“\`”區隔出 CSS 撰寫區域（或稱樣板文字 template literal ），styled.h1 這個方法即生成了一個 h1 的 RC，然後我們將其賦值給了變數 Title。

上方我們完成了基本 RC 的建置並且也注入了 style，SdC 在背後自動生成了對應的 classname，我們不需要在手動維護 CSS 或煩惱命名問題。

## Adaption based on props
SdC 樣板文字同時可以接受 function 作為 style attribute 的值，並接受 RC 的 props 來達到動態 style 的特性
```javascript=
// 常見的用法如 Link 當在當前頁面時，顏色不同
const Link = styled.a`
    color: ${props=>props.isActive ? 'red' : 'black'}
`
```
> 以上我們已經學會了 SdC 中最基礎的語法應用，以上已經基本上達到了我們最一開始提及的那些特性，接下來我們來學習一些實際生產中我們會需要學習的內容，可以再回到一開始複習一下 SdC 有哪些特性，然後再繼續閱讀。

## Extending Styles
我們到目前為止學習了 SdC 基本的語法，但在實際生產時會有某些 RC 十分相似，僅有一小部分的 style 可能不同，這時候針對這類極為相似的 SdC ，我們不該重複撰寫相同的 style ，而是提取相同的部分並重複利用，SdC 提供了這樣的功能
```javascript=
const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

// A new component based on Button, but with some override styles
//更改了文字與邊框顏色
const TomatoButton = styled(Button)`
  color: tomato; 
  border-color: tomato;
`;
```
透過將基礎的 SdC 傳入新的 SdC 即可達成 style 的複用。

在另外一種情境中，我們可能會有不同的 RC 需要用到幾乎完全相同的 style 這時候我們可以用另外一種方法置換 RC 然後保留原來的 style。
如下方的例子，當我們需要一個 \<a> 需要用到與 Button 完全相同的 style 時，我們可以用 as 語法，將 Button SdC 的 \<button> 替換成 \<a> 

```javascript=
const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;

const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

render(
  <div>
    <Button>Normal Button</Button>
    <Button as="a" href="/">Link with Button styles</Button>
    <TomatoButton as="a" href="/">Link with Tomato Button styles</TomatoButton>
  </div>
);
```
> **Note:** as 語法僅 styled-components v4 以上支援，v4 之前的版本需要用 .withCompoent or .extend 來替代（這兩種語法皆有計畫會在未來淘汰）。
> 

## Styling any component
style()，也可用於自定義的 RC，但必須傳入 className
> 這是因為 SdC 是透過傳遞 className 的方式擴展 style 的，如前一個範例 styled(Button)，因為 Button 本身就是一個 SdC，其本身就有幫我們傳遞所接收到的 className，而我們自定義的 RC 則是要手動傳遞接收到的 className
```javascript=
// This could be react-router-dom's Link for example
const Link = ({ className, children }) => (
  <a className={className}>
    {children}
  </a>
);
const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
`;
render(
  <div>
    <Link>Unstyled, boring Link</Link>
    <br />
    <StyledLink>Styled, exciting Link</StyledLink>
  </div>
);

```

## Passed props
我們前面提到了，SdC 可以傳遞參數動態改變 style，而其機制如下：
可以分成原生 HTML 物件與 RC 兩種，當 SdC 的目標是原生 HTML 元素時， SdC 會傳遞所有已知的 HTML attr 至 DOM; 反之如果是 RC 則傳遞所有的 props 
```javascript=
// Create an Input component that'll render an <input> tag with some styles
const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: ${props => props.type==="password":'1px':'none' };
  border-radius: 3px;
`;
// Render a styled text input with the standard input color, and one with a custom input color
render(
  <div>
    <Input defaultValue="@probablyup" type="text" />
    <Input defaultValue="@geelen" type="text" inputColor="rebeccapurple" />
  </div>
);
```
> SdC 能聰明的辨別哪些為正式的 attr 應該傳入 DOM，因此在 DOM 內你不會看到 inputColor 這個自定義的 attr，然而會被傳入 RC 內

## Coming from CSS
### 那我們如何在 RC 內寫 SdC?
我們以往都會在 RC 內寫 JSX，其實就如同過去的方式，可以把 SdC 當作一種 RC，依樣用 JSX 的方式，如下：
```javascript=
import React from 'react'
import styled from 'styled-components'

const StyledCounter = styled.div`
  /* ... */
`
const Paragraph = styled.p`
  /* ... */
`
const Button = styled.button`
  /* ... */
`

export default class Counter extends React.Component {
  state = { count: 0 }

  increment = () => this.setState({ count: this.state.count + 1 })
  decrement = () => this.setState({ count: this.state.count - 1 })

  render() {
    return (
      <StyledCounter>
        <Paragraph>{this.state.count}</Paragraph>
        <Button onClick={this.increment}>+</Button>
        <Button onClick={this.decrement}>-</Button>
      </StyledCounter>
    )
  }
}
``` 
> 當 SdC 的目標是一個 RC 時，記得命名上需要與原來的 RC 有所差別，不然會產生命名衝突的問題。
> 
```javascript=
\\ 我們可以這樣寫
\\ SdC 加上 Styled 前綴
function Link(props){
    return <a>props.title</a>
}

const StyledLink = styled(Link);
```
> 不要把你的 SdC 定義在 RC 的 render method，即不要把你的 SdC 定義在 RC 內部。
> 
### 結合而外的 CSS 語法
> 偽元素、偽選擇器及鑲嵌語法
> 
```javascript=
// & 指向自己
const Thing = styled.div.attrs((/* props */) => ({ tabIndex: 0 }))`
  color: blue;

  &:hover {
    color: red; // 鼠标悬浮在<Thing> 上面
  }

  & ~ & {
    background: tomato; // <Thing> 的同级<Thing>组件，不一定是相邻的
  }

  & + & {
    background: lime; // <Thing> 的下一个 <Thing>组件
  }

  &.something {
    background: orange; // 有something class的<Thing>组件，注意跟上面一节没&的区分
  }
  .something-else & {
    border: 1px solid; // 位于其他有".something-else"类标记的组件里面的<Thing>组件
  }
`
```
```javascript=
// && 用於全局衝突時，提升優先級
const Thing = styled.div`
  && {
    color: blue;
  }
`
const GlobalStyle = createGlobalStyle`
  div${Thing} {
    color: red;
  }
`
render(
  <React.Fragment>
    <GlobalStyle />
    <Thing>
      I'm blue, da ba dee da ba daa
    </Thing>
  </React.Fragment>
)
```
> 以官方說法，其實 styled.div 是便利開發而產生的額外的別名擴充，兩者效果相同，以下為官方原文：
> *You can also pass tag names into the styled() factory call, like so: styled("div"). In fact, the styled.tagname helpers are just aliases that do the same.*
```javascript=
// 以下兩種效果相同
styled(div)`

`
styled.div`

`
```

## Attaching additional props
> 如果我們需要因應動態改變的不是 style，而是 element attributes 的情況，我們該如何做呢： ＳdC 提供了 .attrs() 這個方法讓我們能透過 props 動態改變 attributes
>
```javascript=
const Input = styled.input.attrs(props => ({
  // we can define static props
  type: "password",
  // or we can define dynamic ones
  size: props.size || "1em",
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /* here we use the dynamically computed prop */
  margin: ${props => props.size};
  padding: ${props => props.size};
`;
```
> **Note:** .attr() 內的參數為一個回傳物件的 function
> 

## Animations 
### 那我們如何透過 SdC 寫動畫呢？
同樣的 SdC 也提供語法 keyframes 關鍵字（keyframes helper）
```javascript=
// Create the keyframes
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
// Here we create a component that will rotate everything we pass in over two seconds
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;
render(
  <Rotate>&lt; 💅 &gt;</Rotate>
);

```
keyframes 在 v3 版本過後進行了代碼的分離，採 lazy inject 的方式，產生了以下的差別：
```javascript=
const rotate = keyframes``

// ❌ This will throw an error! 在 v3 版之前是ＯＫ的
const styles = `
  animation: ${rotate} 2s linear infinite;
`;

// ✅ This will work as intended
const styles = css`
  animation: ${rotate} 2s linear infinite;
`
```
> **Note:** keyframes helper 不支援 react-native，取而代之的是 ReactNative.Animated API
 
## 進階 Advance
### ThemeProvider
SdC 提供了 ThemeProvider 來同時將 props.theme 傳遞到其內部多個 component 中，其背後的原理是透過 React Context API 實現。讓我們來看看如何應用：下方兩個 Buttton 物件都接收到了 props.theme
```javascript=
// Button SdC 接收了 props.theme 
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

const theme = {
  main: "mediumseagreen"
};

render(
  <div>
    <Button>Normal</Button>
    <ThemeProvider theme={theme}>
      <Button>Themed</Button>
      <Button>Themed</Button> 
    </ThemeProvider>
  </div>
);
```
### ThemeProvider Theme 值可以是 Function
Function 接受上層或外層所接受到的 pre-theme 並回傳新的 theme：下方這個例子，將接受到的 theme 作了反轉後回傳。
```javascript=
const invertTheme = ({ fg, bg }) => ({
  fg: bg,
  bg: fg
});
render(
  <ThemeProvider theme={theme}>
    <div>
      <Button>Default Theme</Button>
      <ThemeProvider theme={invertTheme}>
        <Button>Inverted Theme</Button>
      </ThemeProvider>
    </div>
  </ThemeProvider>
);
```
### Getting the theme without styled components
透過 withTheme 我們可以直接從外部獲得 props.theme，只要是該物件有被包覆在 ThemeProvider 內，類似於 HOC 的做法：
```javascript=
import { withTheme } from 'styled-components';

class MyComponent extends React.Component {
  render() {
    console.log('Current theme: ', this.props.theme);
    // ...
  }
}

export default withTheme(MyComponent);
```
### ThemeContext
SdC 也支援 Hook ，透過 useContext 我們能訪問到 Theme：
```javascript=
import { ThemeContext } from "styled-components";
import { useContext } from "react";

function GetThemeViaHook(){
    const themeContext = useContext(ThemeContext);
    console.log(`current theme: ${themeContext}`);
}
```
### 修改 theme props
我們可以透過直接修改 JSX 的 theme key 的值，傳入其他的 theme:
```javascript=
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

// Define what main theme will look like
const theme = {
  main: "mediumseagreen"
};

render(
  <div>
    <Button theme={{ main: "royalblue" }}>Ad hoc theme</Button>
    <ThemeProvider theme={theme}>
      <div>
        <Button>Themed</Button>
        <Button theme={{ main: "darkorange" }}>Overidden</Button>
      </div>
    </ThemeProvider>
  </div>
);
```
### 安全意識
在處理或應用使用者輸入的值至程序中必須小心謹慎的跳脫某些敏感的關鍵字，避免遭受攻擊
```javascript=
const userInput = '/api/withdraw-funds'

const ArbitraryComponent = styled.div`
  background: url(${userInput});
  /* More styles here... */
`
```
### 將 SdC 與現存的 CSS 結合
由於 SdC 會動態生成隨機而獨立的 class name，在一般情況其優先級會高於單獨的 class name，因為其 style 是寫入到 head 的最尾端，這將導致如果 class name 與 SdC 同時描述相同 CSS 屬性時，SdC 會 override class name。
```javascript=
// MyComponent.js
const MyComponent = styled.div`background-color: green;`;

// my-component.css
.red-bg {
  background-color: red;
}

// For some reason this component still has a green background,
// even though you're trying to override it with the "red-bg" class!
<MyComponent className="red-bg" />
```
那如果我想呈現的是我 class name 的 style 時怎麼做？提高優先級（id, 多層級或重複 class name）
```javascript=
/* my-component.css */
.red-bg.red-bg {
  background-color: red;
}
```

### Avoiding conflicts with third-party styles and scripts
反之今天如果我們想呈現的是 SdC 的 style 但 class name 的優先及更高時我們該如何？ 一個方法是降低 class name 的優先級

但如果有其他考量導致無法這樣做時，我們可以透過  [babel-plugin-styled-components-css-namespace](https://github.com/QuickBase/babel-plugin-styled-components-css-namespace) 去提高 SdC 的優先級

或者用我們先前提到的 && 也能有相同的效果
```javascript=
const StyledDiv = styled('div')`
    background-color: ${props=>props.theme.bgColor};
    && {
        color: red;
    }
`
```
### Tagged Template Literals
這是 ES6 新增的語法，英文稱作 Tagged Template Literals，可以到 Babel 上去實驗看看，這邊直接上 Code：
```javascript=
// 我們在寫 SdC 是透過下方的語法
styled.button`
	color:red;
	background-color: ${props => props.color};
`

// 其實透過他就是 Tagged Template Literals，透過 Babel 轉譯後
styled.button(_t || (_t = _`
	color:red;
	background-color: ${0};
`), props => props.color);
```
### Server Side Rendering
這邊的篇幅是為了解決 SdC 在 Server Side Render 時可能會遇到的一些不穩定的問題，官方文件推薦我們使用 Babel 去轉譯 TS，而不要去依賴 ts-loader 

### Referring to other components
這裡直接上情境，想像一下，你有一段文字和一張圖片，你希望當鼠標移動至文字上時，圖片的 style 發生變化，該如何做？

SdC 提供了一個非常簡便的方式：
```javascript=
const Link = styled.a`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  background: papayawhip;
  color: palevioletred;
`;
const Icon = styled.svg`
  flex: none;
  transition: fill 0.25s;
  width: 48px;
  height: 48px;
  ${Link}:hover & {
    fill: rebeccapurple;
  }
`;

// Link 被 :hover 時， icon 變色
```
但這個語法有一些限制，\$\{ SdC only }，無法放入 RC 但可以放入 extended SdC，即：
```javascript=
// Error
class A extends React.Component {
  render() {
    return <div />
  }
}

const B = styled.div`
  ${A} {
  }
`

// OK
class A extends React.Component {
  render() {
    return <div className={this.props.className} />
  }
}

const StyledA = styled(A)``

const B = styled.div`
  ${StyledA} {
  }
`
```
### Style Objects
最後，SdC 支援以 Object 的格式去形容 style，看 code：
```javascript=
const Box = styled.div({
  background: 'palevioletred',
  height: '50px',
  width: '50px'
});

// Adapting based on props
const PropsBox = styled.div(props => ({
  background: props.background,
  height: '50px',
  width: '50px'
}));
```

<br/><br/>
<p style="
    color:gray; 
    text-align:center;
    ">  Chapter <b>進階 Advance</b> End  
</p><hr/>

> 完 
> [styled component API 的部分請直接參考官網的資訊，這邊就不贅述了](https://styled-components.com/docs/api)
> 

## 補充
### createGlobalStyle
createGlobalStyle 直接將 style 注入全域，應用方式如下：
```javascript=
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    color: ${props => (props.whiteColor ? 'white' : 'black')};
  }
`

// later in your app
<React.Fragment>
  <GlobalStyle whiteColor />
  <Navigation /> {/* example of other top-level stuff */}
</React.Fragment>
```
非常好用的功能，在此補充


## 意見回饋
> 歡迎留下您的寶貴建議
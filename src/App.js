import './App.css';
import React from 'react';
import { CardList } from "./component/card-list/card-list.component";
import { SearchBox } from "./component/search-box/search-box.component";


//从functional component切换成class component的原因是可以对state进行操作
//在引用constructor中state object的属性时应用大括号包裹类似{this.state.string},括号中的都为变量
//在使用类似onclick触发this.setState，格式应类似于onClick = {() => this.setState( { string: "balabala..."} )}
//以上两条接遵守了jsx语法规则
//当state updating时会触发rerender the component

class App extends React.Component {
    state = {
      monsters: [],
      searchField: ''
    }

//当不涉及props时，constructor可以省略掉
//{condition?statement(true):statement2(false)} javaScript的if..else

//life-cycle method
//Mounting phase: constructor->render->componentDidMount
//Updating phase: new props/setState/forceUpdate()(先决条件)->componentShouldUpdate(比较props和state决定是否进行下去)->render(updating component)->componentDidUpdate
//Unmounting phase: componentWillUnmount当component断开与DOM的联系时使用（例如log out)
//只有当有new props传入或者setState时，componentDidUpdate才会被call，因为只有使用了new props或者setState才会进入Updating phase
//同理适用于shouldCompinentUpdate,他将决定是否render和componentDidUpdate,返回值会true会，返回值为false则不会
//当parenting component的setState，即使没有传入到子component中，子component也会rerender，因为是parenting component的一部分
//可以通过严格比较nextprop.attribute和this.props.attribute所返回的boolean值来决定是否render(updating component)与componentDidUpdate
//通过比较nextprops和this.props，我们可以避免子component没有必要的update，从而提升整个web的性能
//componentDidMount会在第一次render application时使用，所以fetching data以及和API相关的内容都放入其中，优先加载
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(reponse => reponse.json()) //异步方法，此过程结束后会继续下一步的方法，得到数据转为json格式
    .then(user => this.setState({monsters: user}))//将得到的数据利用setState设置为monsters的数据
    .catch(error => console.log("oppos!I have an error")) 
  }

  handleChange = (e) => {
    this.setState((prevState,prevProps) => ({searchField: e.target.value}))
  }
  
  // handleChange = () => {
  //   this.setState((prevState,prevProps) => ({searchField: prevState.searchField + "!"}),
  //   ()=>console.log(this.state.searchField))
  // }
  // 在使用this.setState这类方法时，最好不要直接在里面用object，应为没办法确定state是the latest version,可以使用arrow function
  // 并使用参数prevState,prevProps这样会更好
  /*使用errow function这个方法会自动binding在class component所在的context，因此可以使用this关键词，这种方法独立出来一旦
  带了this关键字，不用errow function，必须要在constructor里binding*/

//在<div>标签之间使用{}也是jsx格式
//{monster.id},{monster.name}都符合变量用{}wrap
//map是一个针对于array的方法，会对array中的每一个变量进行操作
//props.children是在两个<component>间的内容，按jsx的格式也是以{}来包裹，在component文件中引用时直接用props.children
//<input>标签中type设置为search,就可以使用placeholder,onChange会监听input内容的变化，需要使用的为e(事件)，e.target.value为输入的值
/*this.setState是一个异步方法，不会立即执行完，需要它和另外一个方法同时执行，
我们需要引进callback,在括号中（）=> method作为第二个参数来使用*/
//每一次使用this.setState方法都会rerender
/*使用google font字体时，第一步get link放在index.html里，第二步在app.css里设置font-family(字体名称) 
size和color,整体背景颜色的设置在index.css里
*/
  render() {
    const { monsters,searchField } = this.state //destructre
    const filterMonster = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase()));// filter这个array method会根据判定bollean值返回一个新array原来的array不变,includes 会根据是否包含此元素返回boolean值
    return (
      <div className="App">
        <h1>Monster Rolodex</h1>
        <SearchBox placeholder='search monster' 
        handleChange = {this.handleChange}
        />  
        <CardList monsters={filterMonster}/>  
      </div>
    )
  }
}
/*我们也可以用plain javascript而非jsx来完成react项目，主要使用React.createElement(component,props<{class,cardlist}>,children),置于<script>
标签之中 */

export default App;

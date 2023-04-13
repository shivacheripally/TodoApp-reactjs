import React from 'react';
import './App.css';

class TodoItems extends React.Component{
  constructor(props){
    super(props);
    this.createTasks = this.createTasks.bind(this);
  } 

  delete(key){
    this.props.delete(key);
  }
  
  createTasks(item){
    return <li onClick={()=> this.delete(item.key)} key={item.key}>{item.text}</li>
  }
  render(){
    var todoEntries = this.props.entries;
    var listItem = todoEntries.map(this.createTasks);

    return(
      <ul className='theList'>
        {listItem}
      </ul>
    );
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    }

    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  addItem(e) {
    var itemsArray = this.state.items;

    if(this._inputElement.value !== ""){
      itemsArray.unshift({
        text: this._inputElement.value,
        key:Date.now()
      });
    

    this.setState({
      items:itemsArray
    });

      this._inputElement.value = "";
    }
    console.log(itemsArray);
    e.preventDefault();
  }

  deleteItem(key){
      var filteredItems = this.state.items.filter(function(item){
        return (item.key !== key);
      }
    )

    this.setState({
      items:filteredItems
    });
  }

  render() {
    return (
      <div className="App">
        <div className="todolist">
          <form onSubmit={this.addItem} className='form-div'>
            <input ref={(a) => this._inputElement = a} placeholder='Enter a task: ' className='input-div' />
            <button type='submit' className='add'>Add</button>
          </form>
          <TodoItems entries = {this.state.items} delete={this.deleteItem}/>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <TodoList />
  );
}

export default App;
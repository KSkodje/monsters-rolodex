import React, { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: '',
    };

    //this.handleChange = this.handleChange.bind(this); used for below function
    // 
    //handleChange(e) {
    //  this.setState({searchField: e.target.value})
    //}
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({monsters: users}));// users here is the returned 'response' in the "then" above
  }

  handleChange= (e) => {
    this.setState({searchField: e.target.value})
  }

  //<input type='search' placeholder='search monsters' onChange={e => this.setState({searchField: e.target.value}, () => console.log(this.state.searchField))} />  the second paramaeter is a callback that enable us to log the immediate value, doing it straight after (outside the setState) will lag behindd due to it being async
  // const { monsters, searchField } = this.state; same as const monsters = this.state.monsters & const searchField = this.state.searchField
  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster => monster.name.toLowerCase().includes(searchField.toLowerCase()));

    return (
     <div className='App'>
      <h1>Monsters Rolodex</h1>
      <SearchBox placeholder='search monster' handleChange={this.handleChange} />
      <CardList monsters={filteredMonsters} />
     </div>
    );
  }
}

export default App;

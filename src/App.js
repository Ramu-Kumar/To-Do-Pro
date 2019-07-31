import React, { Component } from 'react';
import './App.css';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class App extends Component {
  state = {
    isChecked: false,
    inputText: '',
    data: [],
    filteredItems: [],
  }
  onInputChange = (event) => {
    this.setState({ inputText: event.target.value })
  }
  onAddList = (event) => {
    event.preventDefault();
    const data = this.state.data;
    if (this.state.inputText) {
      data.push({
        text: this.state.inputText,
        isChecked: false,
      })
      this.setState({ data }, () => {
        this.setState({ inputText: '' })
      })
    }
  }
  removeClick = (index) => {
    const data = this.state.data;
    if (!this.state.isChecked) {
      data.splice(index, 1)
      this.setState({ data })
    }
  }
  onCheckboxUpdate = (index) => {
    const data = this.state.data;
    data[index].isChecked = !data[index].isChecked
    this.setState({ data })
  }
  onAllCheck = () => {
    const data = this.state.data;
    const filteredItems = data.filter((item) => item.isChecked)
    this.setState({
      isChecked: !this.state.isChecked,
      filteredItems
    })
  }
  render() {
    return (
      <div>
        <div className='header'>
          Todo App
        </div>
        <form onSubmit={this.onAddList} className='section'>
          <TextField
            id="standard-name"
            label="Name"
            value={this.state.inputText}
            onChange={this.onInputChange}
            margin="normal"
          />
          <button className='submit-btn' type='submit'> <img alt='' className='plus-img' src='https://icons-for-free.com/iconfiles/png/512/append+circle+create+green+new+plus+icon-1320196710849480257.png' /></button>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.isChecked}
                  onChange={this.onAllCheck}
                  value="all"
                  color="primary"
                />
              }
              label='Show completed items'
            />
          </div>
          <div className='list-container'>
            {
              (this.state.isChecked ? this.state.filteredItems : this.state.data).map((item, index) => {
                return (
                  <div className='check-list' key={index}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={item.isChecked}
                          onChange={() => this.onCheckboxUpdate(index)}
                          value="checkedB"
                          color="primary"
                        />
                      }
                      label={item.text}
                    />
                    <img alt='' onClick={() => this.removeClick(index)} className='close-icon' src='https://image.flaticon.com/icons/png/128/579/579006.png' />
                  </div>
                )
              })
            }
          </div>
        </form>
      </div>
    );
  }
}

export default App;

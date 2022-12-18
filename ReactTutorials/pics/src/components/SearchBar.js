import React from "react";

class SearchBar extends React.Component {
  //   onInputChange(event) {
  //     console.log(event.target.value);
  //   }

  //? automatically bind the value of this to class' instance
  onFormSubmit = (event) => {
    event.preventDefault();

    //? call back function passed by the parent element
    //* props are called in this way in the class Component
    this.props.onSubmit(this.state.term);
  };

  state = { term: "" };
  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>Image Search</label>
            <input
              type="text"
              //? controlled component
              value={this.state.term}
              onChange={(e) => this.setState({ term: e.target.value })}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;

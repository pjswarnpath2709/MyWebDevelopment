import React from "react";
import { connect } from "react-redux";

import { selectSong } from "../actions";

class SongList extends React.Component {
  renderList() {
    return this.props.songs.map((song) => {
      return (
        <div key={song.title} className="item">
          <div className="right floated content">
            <button
              onClick={() => this.props.selectSong(song)}
              className="ui button primary"
            >
              Select
            </button>
          </div>
          <div className="content">{song.title}</div>
        </div>
      );
    });
  }
  render() {
    return <div className="ui divided list">{this.renderList()}</div>;
  }
}
//? Conventional way to write and name this function
//? this function is called as many times as our state update
const mapStateToProps = (state) => {
  //   console.log(state);
  //* get the state as parameter , and extract things used by your Components
  //* as a prop
  return {
    songs: state.songs,
  };
};

//? connect is a component here
//? connect take a mapping function as an Argument which takes out the required property as props from the global state Object
//? it return a function that takes a Component as an Argument

export default connect(mapStateToProps, {
  selectSong,
})(SongList);

import React from "react";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";

class App extends React.Component {
  // Constructor function
  /* 
  
  constructor(props) {
    super(props);

    // this is our state object
    //? this is the only time when we do direct assignment to State Object
    this.state = {
      lat: null,
      errorMessage: null,
    };
  }

  */

  //* no need to define state in the constructor method , we can directly assign this like that : ->
  state = { lat: null, errorMessage: null };

  //? these is called when the component is first time rendered on screen
  componentDidMount() {
    // console.log("component loaded/mounted first time");

    //* we can do one time things here just like calling an Api for fetching data!
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        //* we called setState to update the state of the Object
        //* only the lat property will change errorMessage will have no effect
        this.setState({ lat: position.coords.latitude });

        //! we don't want to do this
        //  this.state.lat = position.coords.latitude
      },
      (err) => {
        //* only the errorMessage property will change , lat will have no effect
        this.setState({ errorMessage: err.message });
      }
    );
  }

  //? this is called whenever component updates itself
  componentDidUpdate() {
    console.log("component updated!");
  }

  //? this will be called whenever we stop showing the component on the screen
  componentWillUnmount() {
    console.log("component stopped showing!!");
  }

  //* helper function to take out the render logic
  _renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error : {this.state.errorMessage}</div>;
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    return <Spinner message="Please Accept Location Request!!!" />;
  }

  //? React says that we have to define render function
  //* render method is called multiple times
  render() {
    return <div>{this._renderContent()}</div>;
  }
}

export default App;

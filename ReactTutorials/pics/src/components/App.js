import React from "react";
import unsplash from "../api/unsplash";
import SearchBar from "./SearchBar";
import ImageList from "./ImageList";

class App extends React.Component {
  state = {
    images: [],
  };
  onSearchSubmit = async (term) => {
    try {
      const res = await unsplash.get("/search/photos", {
        params: {
          query: term,
        },
      });
      this.setState({ images: res.data.results });
    } catch (err) {
      console.error(err.message);
    }
  };

  render() {
    return (
      <div className="ui container" style={{ marginTop: "10px" }}>
        <SearchBar onSubmit={this.onSearchSubmit} />
        <ImageList images={this.state.images}></ImageList>
      </div>
    );
  }
}

export default App;

import React from "react";

class ImageCard extends React.Component {
  constructor(props) {
    super(props);

    //? using the imageRef system of React
    //* this give the direct access to the element in the DOM
    this.imageRef = React.createRef();

    this.state = { spans: 0 };
  }

  setSpans = () => {
    const height = this.imageRef.current.clientHeight;

    const spans = Math.ceil(height / 10);

    this.setState({ spans });
  };

  componentDidMount() {
    //? taking advantage of the componentDidMount Method as it called after render function
    this.imageRef.current.addEventListener("load", this.setSpans);
  }

  render() {
    const { description, urls } = this.props.image;
    return (
      <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
        <img ref={this.imageRef} alt={description} src={urls.regular}></img>
      </div>
    );
  }
}

export default ImageCard;

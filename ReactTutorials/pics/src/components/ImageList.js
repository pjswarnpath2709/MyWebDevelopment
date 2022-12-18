import React from "react";
import "./ImageList.css";
import ImageCard from "./ImageCard";

class ImageList extends React.Component {
  render() {
    const images = this.props.images.map((image) => {
      return <ImageCard image={image} key={image.id}></ImageCard>;
    });
    return <div className="image-list">{images}</div>;
  }
}

export default ImageList;

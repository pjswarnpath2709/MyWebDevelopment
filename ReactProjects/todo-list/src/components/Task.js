import React from "react";

class Task extends React.Component {
  onCompleteClick = (event) => {
    event.preventDefault();
    this.props.onTaskCompleted(this.props.taskData.date);
  };

  onEditClick = (event) => {
    event.preventDefault();
    const newText = prompt("Enter the new title for task");
    this.props.onTaskEdited(this.props.taskData.date, newText);
  };

  onDeleteClick = (event) => {
    event.preventDefault();
    this.props.onTaskDeleted(this.props.taskData.date);
  };
  render() {
    const taskData = this.props.taskData;
    return (
      <div
        className="ui segment"
        style={{
          marginTop: "10px",
          background: this.props.taskData.isCompleted ? "lightGrey" : "",
        }}
      >
        <div className="ui grid">
          <div className="row">
            <div className="twelve wide column">
              <div className="ui header">{taskData.text}</div>
            </div>
            <div className="four wide column">
              <div className="ui grey statistic">
                {taskData.date.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="eight wide column">
              <button
                className={`ui button primary ${
                  this.props.taskData.isCompleted ? "disabled" : ""
                }`}
                onClick={this.onCompleteClick}
              >
                COMPLETE
              </button>
              <button className="ui button red" onClick={this.onDeleteClick}>
                DELETE
              </button>
              <button className="ui button green" onClick={this.onEditClick}>
                EDIT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Task;

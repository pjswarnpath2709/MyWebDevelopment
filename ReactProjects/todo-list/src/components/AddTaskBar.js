import React from "react";

class AddTaskBar extends React.Component {
  onButtonClick = (event) => {
    event.preventDefault();
    const taskData = {
      text: this.state.term,
      date: new Date(),
      isCompleted: false,
    };
    this.props.onAddTask(taskData);
    this.setState({ term: "" });
  };
  state = { term: "" };
  render() {
    return (
      <div className="ui container" style={{ marginTop: "20px" }}>
        <div className="ui segment">
          <div className="ui form">
            <div className="field">
              <div className="content">
                <div className="ui header">Add Task</div>
              </div>
            </div>
            <div className="field">
              <input
                type="text"
                value={this.state.term}
                onChange={(event) =>
                  this.setState({ term: event.target.value })
                }
              ></input>
            </div>
            <div className="field">
              <button onClick={this.onButtonClick} className="ui button green">
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddTaskBar;

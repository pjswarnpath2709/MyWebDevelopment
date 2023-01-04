import React from "react";
import Task from "./Task";

class TaskList extends React.Component {
  renderList = () => {
    const taskList = this.props.tasks.map((task) => {
      return (
        <div key={task.date}>
          <Task
            taskData={task}
            onTaskCompleted={this.props.onTaskCompleted}
            onTaskDeleted={this.props.onTaskDeleted}
            onTaskEdited={this.props.onTaskEdited}
          />
        </div>
      );
    });
    return taskList;
  };
  render() {
    return <div>{this.renderList()}</div>;
  }
}

export default TaskList;

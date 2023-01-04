import React from "react";
import AddTaskBar from "./AddTaskBar";
import TaskList from "./TaskList";

class App extends React.Component {
  state = {
    tasks: [],
  };

  addToLocalStorage = (tasks) => {
    const tasksToStore = JSON.stringify(tasks);
    window.localStorage.setItem("storedTasks", tasksToStore);
  };

  componentDidMount() {
    const tasks = JSON.parse(window.localStorage.getItem("storedTasks"));
    if (tasks) {
      tasks.forEach((element) => {
        element.date = new Date(element.date);
      });
      this.setState({ tasks });
    }
  }
  onAddTask = (newTask) => {
    const newTasks = this.state.tasks;
    newTasks.push(newTask);
    this.addToLocalStorage(newTasks);
    this.setState({ tasks: newTasks });
  };
  onTaskCompleted = (date) => {
    const newTasks = this.state.tasks.map((task) => {
      if (task.date === date) {
        return { ...task, isCompleted: true };
      }
      return task;
    });
    this.addToLocalStorage(newTasks);
    this.setState({ tasks: newTasks });
  };
  onTaskDeleted = (date) => {
    const newTasks = this.state.tasks.filter((task) => task.date !== date);
    this.addToLocalStorage(newTasks);
    this.setState({ tasks: newTasks });
  };
  onTaskEdited = (date, newText) => {
    const newTasks = this.state.tasks.map((task) => {
      if (task.date === date) {
        return { ...task, text: newText };
      }
      return task;
    });
    this.addToLocalStorage(newTasks);
    this.setState({ tasks: newTasks });
  };

  render() {
    return (
      <div className="ui container">
        <div>
          <AddTaskBar onAddTask={this.onAddTask} />
        </div>
        <div>
          <TaskList
            onTaskCompleted={this.onTaskCompleted}
            onTaskDeleted={this.onTaskDeleted}
            onTaskEdited={this.onTaskEdited}
            tasks={this.state.tasks}
          />
        </div>
      </div>
    );
  }
}

export default App;

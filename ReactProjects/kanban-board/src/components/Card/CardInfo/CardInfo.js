import React, { useEffect, useState } from "react";
import { Type, List, Calendar, Tag, CheckSquare, Trash } from "react-feather";

import COLORS from "../../../utils/colors";
import { getUniqueKey } from "../../../utils/uuid";

import Modal from "../../Modal/Modal";
import Chip from "../../Chip/Chip";
import Editable from "../../Editable/Editable";

import "./CardInfo.css";
import { cloneDeep } from "lodash";

//////-------------------------------------------------------------------------------------------------------------------------------//////

const CardInfo = ({ card, boardID, updateCard, onClose }) => {
  //////********************************//////
  const [activeColor, setActiveColor] = useState("");

  const [cardValues, setCardValues] = useState({
    ...card,
  });

  //////********************************//////

  useEffect(() => {
    updateCard(card.id, boardID, cardValues);
  }, [cardValues]);

  //////********************************//////

  const calculatePercentage = () => {
    if (cardValues.tasks.length === 0) return 0;
    const completedTasks = cardValues.tasks.filter(
      (task) => task.completed
    ).length;
    return (completedTasks / cardValues.tasks.length) * 100;
  };

  const addLabel = (text, color) => {
    const tempCardValues = cloneDeep(cardValues);
    tempCardValues.labels.push({ text, color });
    setCardValues(tempCardValues);
  };

  const removeLabel = (text, color) => {
    const tempCardValues = cloneDeep(cardValues);
    tempCardValues.labels = tempCardValues.labels.filter(
      (label) => label.text !== text || label.color !== color
    );
    setCardValues(tempCardValues);
  };

  const addTask = (text) => {
    const taskObj = {
      id: getUniqueKey("Task"),
      text: text,
      completed: false,
    };

    const tempCardValues = cloneDeep(cardValues);
    tempCardValues.tasks.push(taskObj);
    setCardValues(tempCardValues);
  };

  const updateTask = (taskId, newTask) => {
    const tempCardValues = cloneDeep(cardValues);
    const tIndex = tempCardValues.tasks.findIndex((task) => task.id === taskId);
    tempCardValues.tasks[tIndex] = newTask;
    setCardValues(tempCardValues);
  };

  const deleteTask = (taskId) => {
    const tempCardValues = cloneDeep(cardValues);
    tempCardValues.tasks = tempCardValues.tasks.filter(
      (task) => task.id !== taskId
    );
    setCardValues(tempCardValues);
  };

  //////+++++++++++++++++++++++++++++++++++++++++//////

  const getCardInfoBox = ({
    boxType,
    iconComponent,
    text,
    buttonText,
    placeholder,
    defaultText,
  }) => {
    let containerComponent = "";
    switch (boxType) {
      case "Date":
        containerComponent = getDateBox({
          defaultText,
        });
        break;
      case "Labels":
        containerComponent = getLabelBox({
          text,
          buttonText,
          placeholder,
          defaultText,
        });
        break;
      case "Tasks":
        containerComponent = getTaskBox({
          text,
          buttonText,
          placeholder,
          defaultText,
        });
        break;
      default:
        containerComponent = (
          <div className="card-info_box_body">
            <Editable
              text={text}
              defaultText={defaultText}
              placeholder={placeholder}
              buttonText={buttonText}
              onSubmit={(value) => {
                if (boxType === "Title") {
                  setCardValues({ ...cardValues, title: value });
                } else {
                  setCardValues({ ...cardValues, description: value });
                }
              }}
            />
          </div>
        );
        break;
    }
    return (
      <div className="card-info_box">
        <div className="card-info_box_title">
          {iconComponent}
          {boxType}
        </div>
        <div className="card-info_box_container">{containerComponent}</div>
      </div>
    );
  };

  //////********************************//////

  const getDateBox = ({ defaultText }) => {
    return (
      <div className="card-info_box_body">
        <input
          type={"date"}
          defaultValue={defaultText}
          onChange={(e) => {
            setCardValues({ ...cardValues, date: e.target.value });
          }}
        />
      </div>
    );
  };

  //////********************************//////

  const getLabelBox = ({ text, buttonText, placeholder, defaultText }) => {
    return (
      <>
        {/* <>&nbsp;</> */}
        <div className="card-info_box_labels">
          {cardValues.labels?.map((label) => {
            return (
              <Chip
                close={true}
                onClose={() => {
                  removeLabel(label.text, label.color);
                }}
                color={label.color}
                text={label.text}
                key={getUniqueKey("Chip")}
              />
            );
          })}
        </div>
        <>&nbsp;</>
        <div className="card-info_box_colors">
          {COLORS.map((color, index) => {
            return (
              <li
                key={index}
                className={color === activeColor ? "active" : ""}
                style={{ backgroundColor: color }}
                onClick={() => {
                  setActiveColor(color);
                }}
              />
            );
          })}
        </div>
        <>&nbsp;</>
        <div className="card-info_box_body">
          <Editable
            text={text}
            defaultText={defaultText}
            buttonText={buttonText}
            placeholder={placeholder}
            onSubmit={(value) => {
              addLabel(value, activeColor);
              setActiveColor("");
            }}
          />
        </div>
      </>
    );
  };

  //////********************************//////

  const getTaskBox = ({ text, buttonText, placeholder, defaultText }) => {
    return (
      <>
        <div className="card-info_box_progress-bar">
          <div
            className={`card-info_box_progress ${
              calculatePercentage() === 100
                ? "card-info_box_progress-active"
                : ""
            }`}
            style={{ width: `${calculatePercentage()}%`, transition: "300ms" }}
          />
        </div>
        <>&nbsp;</>
        <div className="card-info_box_list">
          {cardValues.tasks.map((task) => {
            return (
              <div className="card-info_task" key={task.id}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={(e) => {
                    updateTask(task.id, {
                      id: task.id,
                      completed: e.target.checked,
                      text: task.text,
                    });
                  }}
                />
                <p>{task.text}</p>
                <Trash
                  onClick={() => {
                    deleteTask(task.id);
                  }}
                />
              </div>
            );
          })}
        </div>
        <>&nbsp;</>
        <div className="card-info_box_body">
          <Editable
            text={text}
            defaultText={defaultText}
            buttonText={buttonText}
            placeholder={placeholder}
            onSubmit={(value) => {
              addTask(value);
            }}
          />
        </div>
      </>
    );
  };

  //////+++++++++++++++++++++++++++++++++++++++++//////

  return (
    <Modal onClose={onClose}>
      <div className="card-info">
        {getCardInfoBox({
          boxType: "Title",
          iconComponent: <Type />,
          text: cardValues.title,
          placeholder: "Enter title here",
          buttonText: "Set Title",
          defaultText: cardValues.title,
        })}
        {getCardInfoBox({
          boxType: "Description",
          iconComponent: <List />,
          text: cardValues.description,
          placeholder: "Enter your description here",
          defaultText: cardValues.description,
          buttonText: "Set Description",
        })}
        {getCardInfoBox({
          boxType: "Date",
          defaultText: cardValues.date
            ? new Date(cardValues.date).toISOString().substr(0, 10)
            : "",
          iconComponent: <Calendar />,
        })}
        {getCardInfoBox({
          boxType: "Labels",
          iconComponent: <Tag />,
          text: "Add Labels",

          defaultText: "Add Labels",
          placeholder: "Enter label here...",
          buttonText: "Add Label",
        })}
        {getCardInfoBox({
          boxType: "Tasks",
          defaultText: "Add new Task",
          text: "Add new Task",
          placeholder: "Enter Tasks here...",
          buttonText: "Add new Task",
          iconComponent: <CheckSquare />,
        })}
      </div>
    </Modal>
  );
};

export default CardInfo;

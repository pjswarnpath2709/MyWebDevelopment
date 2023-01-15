import React, { useState } from "react";
import Dropdown from "../Dropdown/Dropdown";
import moment from "moment";
import "./Card.css";
import { CheckSquare, Clock, MoreHorizontal } from "react-feather";
import Chip from "../Chip/Chip";
import CardInfo from "./CardInfo/CardInfo";
const Card = ({
  card,
  removeCard,
  boardID,
  handleDragEnter,
  handleDragEnd,
  updateCard,
}) => {
  //////********************************//////

  const [showDropdown, setShowDropdown] = useState(false);

  const [showModal, setShowModal] = useState(false);

  //////********************************//////

  const displayDropdown = () => {
    if (showDropdown === true) {
      return (
        <Dropdown
          onClose={() => {
            setShowDropdown(false);
          }}
        >
          <div className="card_dropdown">
            <p onClick={() => removeCard(card.id, boardID)}>Delete Card</p>
          </div>
        </Dropdown>
      );
    } else {
      return "";
    }
  };

  //////********************************//////

  return (
    <>
      {showModal && (
        <CardInfo
          card={card}
          boardID={boardID}
          updateCard={updateCard}
          onClose={() => {
            setShowModal(false);
          }}
        />
      )}
      <div
        className="card"
        draggable
        onDragEnd={() => handleDragEnd(card.id, boardID)}
        onDragEnter={() => handleDragEnter(card.id, boardID)}
        onClick={() => {
          setShowModal(true);
        }}
      >
        <div className="card_top">
          <div className="card_top_labels">
            {card.labels.map((label) => {
              return (
                <Chip key={label.text} text={label.text} color={label.color} />
              );
            })}
          </div>
          <div
            className="card_top_more"
            onClick={(event) => {
              event.stopPropagation();
              setShowDropdown(true);
            }}
          >
            <MoreHorizontal />
            {displayDropdown()}
          </div>
        </div>
        <div className="card_title">{card.title}</div>
        <div className="card_description">{card.description}</div>
        <div className="card_footer">
          {card?.date ? (
            <p>
              <Clock />
              {moment(new Date(card.date)).format("Do MMM YY")}
            </p>
          ) : (
            ""
          )}
          {card.tasks.length > 0 && (
            <p>
              <CheckSquare />
              {card.tasks.filter((task) => task.completed).length}/
              {card.tasks.length}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;

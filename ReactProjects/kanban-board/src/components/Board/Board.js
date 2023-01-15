import React, { useState } from "react";

import "./Board.css";
import { MoreHorizontal } from "react-feather";
import Card from "../Card/Card";
import Editable from "../Editable/Editable";
import Dropdown from "../Dropdown/Dropdown";

const Board = ({
  board,
  removeBoard,
  addCard,
  removeCard,
  handleDragEnter,
  handleDragEnd,
  updateCard,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const displayDropdown = () => {
    if (showDropdown === true) {
      return (
        <Dropdown
          onClose={() => {
            setShowDropdown(false);
          }}
        >
          <div className="board_dropdown">
            <p
              onClick={() => {
                removeBoard(board.id);
              }}
            >
              Delete Board
            </p>
          </div>
        </Dropdown>
      );
    } else {
      return "";
    }
  };

  return (
    <div
      className="board"
      onDragEnter={
        board.cards.length === 0
          ? () => {
              handleDragEnter("_", board.id);
            }
          : null
      }
    >
      <div className="board_top">
        <p className="board_top_title">
          {board.title} &nbsp; <span>{board.cards.length}</span>
        </p>

        <div
          className="board_top_more"
          onClick={(event) => {
            event.stopPropagation();
            setShowDropdown(true);
          }}
        >
          <MoreHorizontal />
          {displayDropdown()}
        </div>
      </div>
      <div className="board_cards custom-scroll">
        {board.cards.map((card) => {
          return (
            <Card
              key={card.id}
              card={card}
              removeCard={removeCard}
              boardID={board.id}
              handleDragEnter={handleDragEnter}
              handleDragEnd={handleDragEnd}
              updateCard={updateCard}
            />
          );
        })}
        <Editable
          displayClass="board_cards_add"
          buttonText="Add Card"
          text="Add Item"
          placeholder="Enter Card title"
          onSubmit={(title) => addCard(title, board.id)}
        />
      </div>
    </div>
  );
};

export default Board;

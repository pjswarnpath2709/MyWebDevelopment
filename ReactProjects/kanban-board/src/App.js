import React, { useEffect, useState } from "react";

import { cloneDeep } from "lodash";
import Editable from "./components/Editable/Editable";
import Board from "./components/Board/Board";
import { getBoardId, getCardId } from "./utils/uuid";

import "./App.css";

const App = () => {
  //////+++++++++++++++++++++++++++++++++++++++++//////

  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem("boards")) || []
  );

  const [target, setTarget] = useState({
    cid: " ",
    bid: "",
  });

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  //////+++++++++++++++++++++++++++++++++++++++++//////

  const addCard = (title, boardId) => {
    const card = {
      id: getCardId(),
      title,
      labels: [],
      tasks: [],
      date: "",
      description:
        "update title , set description ,set labels , assign tasks by clicking on card.You can drag and drop cards from one board to another",
    };

    const index = boards.findIndex((board) => board.id === boardId);
    if (index < 0) {
      return;
    }
    const tempBoards = cloneDeep(boards);
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
  };

  //////********************************//////

  const handleDragEnter = (cardId, boardId) => {
    setTarget({
      cid: cardId,
      bid: boardId,
    });
  };

  //////********************************//////

  const handleDragEnd = (cardId, boardId) => {
    let s_bIndex, s_cIndex, t_bIndex, t_cIndex;
    s_bIndex = boards.findIndex((board) => board.id === boardId);
    if (s_bIndex < 0) return;

    s_cIndex = boards[s_bIndex].cards.findIndex((card) => card.id === cardId);
    if (s_cIndex < 0) return;

    t_bIndex = boards.findIndex((board) => board.id === target.bid);
    if (t_bIndex < 0) return;

    if (target.cid === "_") {
      t_cIndex = 0;
    } else {
      t_cIndex = boards[t_bIndex].cards.findIndex(
        (card) => card.id === target.cid
      );
    }

    if (t_cIndex < 0) return;

    const tempBoards = cloneDeep(boards);

    tempBoards[t_bIndex].cards.splice(
      t_cIndex,
      0,
      tempBoards[s_bIndex].cards.splice(s_cIndex, 1)[0]
    );
    setBoards(tempBoards);
  };

  //////********************************//////

  const addBoard = (title) => {
    const board = {
      id: getBoardId(),
      title: title,
      cards: [],
    };
    const tempBoards = cloneDeep(boards);
    tempBoards.push(board);

    setBoards(tempBoards);
  };

  //////********************************//////

  const removeBoard = (boardId) => {
    const tempBoards = boards.filter((board) => board.id !== boardId);

    setBoards(tempBoards);
  };

  //////********************************//////

  const removeCard = (cardId, boardId) => {
    const tempCards = boards
      ?.find((board) => board.id === boardId)
      ?.cards?.filter((card) => card.id !== cardId);

    const tempBoards = cloneDeep(boards);
    tempBoards.find((board) => board.id === boardId).cards = tempCards;

    setBoards(tempBoards);
  };

  //////********************************//////

  const updateCard = (cardId, boardId, card) => {
    const bIndex = boards.findIndex((board) => board.id === boardId);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((card) => card.id === cardId);
    if (cIndex < 0) return;

    const tempBoards = cloneDeep(boards);
    tempBoards[bIndex].cards[cIndex] = card;

    setBoards(tempBoards);
  };

  //////+++++++++++++++++++++++++++++++++++++++++//////

  return (
    <div className="app">
      <div className="app_navbar">
        <h1>Kanban</h1>
      </div>
      <div className="app_outer">
        <div className="app_outer_boards">
          {boards.map((board) => {
            return (
              <Board
                key={board.id}
                board={board}
                removeBoard={removeBoard}
                addCard={addCard}
                removeCard={removeCard}
                handleDragEnter={handleDragEnter}
                handleDragEnd={handleDragEnd}
                updateCard={updateCard}
              />
            );
          })}
          <div className="app_boards_board">
            <Editable
              buttonText="Add Board"
              text="Add Board"
              placeholder="Enter Board title"
              displayClass="app_boards_board_add"
              onSubmit={(value) => addBoard(value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  //////+++++++++++++++++++++++++++++++++++++++++//////
};

export default App;

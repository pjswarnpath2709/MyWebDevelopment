import { React } from "react";
import ReactDOM from "react-dom";
import faker from "faker";
import CommentDetail from "./CommentDetail";
import ApprovalCard from "./ApprovalCard";

const App = function () {
  return (
    <div className="ui container comments">
      <ApprovalCard>
        <CommentDetail
          author="Sam"
          timeAgo="Today at 6PM"
          commentContent="Pulkit is goddddd!"
          imageUrl={faker.image.abstract()}
        />
      </ApprovalCard>

      <ApprovalCard>
        <CommentDetail
          author="Ajay"
          timeAgo="Today at 5PM"
          commentContent=" Oh my god!!! PULKIT 🤩🤩 !"
          imageUrl={faker.image.imageUrl()}
        />
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail
          author="Chia"
          timeAgo="Tomorrow at 4PM"
          commentContent="You are awesome Pulkit love you so much ❤️!"
          imageUrl={faker.image.image()}
        />
      </ApprovalCard>
      <ApprovalCard>
        <CommentDetail
          author="Jia"
          timeAgo="Yesterday at 3PM"
          commentContent="Pulkit take me home 🥺💕❤️"
          imageUrl={faker.image.cats()}
        />
      </ApprovalCard>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));

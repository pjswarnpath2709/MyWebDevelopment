import React, { useEffect, useRef } from "react";

import "./Header.css";

const Header = ({ expression, result, history }) => {
  const resultRef = useRef();
  const expressionRef = useRef();

  useEffect(() => {
    resultRef.current.scrollIntoView();
  }, [history]);

  useEffect(() => {
    expressionRef.current.scrollLeft = expressionRef.current.scrollWidth;
  }, [expression]);

  return (
    <div className="header custom-scroll">
      <div className="header_history">
        {history &&
          history?.map((exp, index, _) => {
            return <p key={exp + new Date().toISOString + index}>{exp}</p>;
          })}
      </div>
      <br />
      <div ref={expressionRef} className="header_expression custom-scroll">
        <p>{expression ? expression : 0}</p>
      </div>
      <br />
      <p
        ref={resultRef}
        className="header_result"
        style={{ color: "var(--text-color-1)" }}
      >
        {result}
      </p>
    </div>
  );
};

export default Header;

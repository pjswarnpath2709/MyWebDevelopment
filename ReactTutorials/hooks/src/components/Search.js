import React, { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [term, setTerm] = useState("programing");
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  //? if arrow function is provided with an empty array
  //* hence it will run only one time , i.e. at the time of render
  //   useEffect(() => {
  //     console.log("RUN FOR FIRST TIME");
  //   }, []);

  //? if arrow function is provided with an non-empty array
  //* run first time render is called and every time when element of this array updates in a render
  //! we cannot mark the callback function of useEffect as async -- not allowed
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get("https://en.wikipedia.org/w/api.php", {
        params: {
          action: "query",
          list: "search",
          origin: "*",
          format: "json",
          srsearch: debouncedTerm,
        },
      });
      setResults(data?.query?.search);
    };
    search();
  }, [debouncedTerm]);
  /*
  useEffect(() => {
    if (term && results.length === 0) {
        search();
      } else {
        const timer = setTimeout(() => {
          if (term.length > 0) {
            console.log("New results Uploaded");
            search();
          }
        }, 1000);
        //? only a function is allowed to be return called as CleanUp function
        //? CleanUp function is called before when we rerender on a update
        //* first time useEffect is called when we render the component first time
        //* then this function is returned. When ever the term changes the returned
        //* function is called first then only the callback function is called
  
        return () => {
          clearTimeout(timer);
          console.log("Clean Up");
        };
      }
  }, [term]);
  */

  //? if arrow function function is provided with nothing
  //* hence it will run first time when render is called and every time when render is called
  //   useEffect(() => {
  //     console.log("I RAN ON EVERY RENDER");
  //   });

  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
            className="ui button"
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">{result.title}</div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div className="ui container">
      <div className="ui segment ">
        <div className="ui form">
          <div className="field">
            <label>Enter Search Term</label>
            <input
              value={term}
              onChange={(event) => setTerm(event.target.value)}
              className="input"
            />
          </div>
        </div>
      </div>
      <div className="ui celled list">{renderedResults}</div>
    </div>
  );
};

export default Search;

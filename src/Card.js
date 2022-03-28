// components
import React from "react";

// style
import styled from "styled-components";

// packages
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Card = (props) => {
  const history = useHistory();
  const redux_data = useSelector((state) => state.dictionary.list);

  console.log(redux_data);

  return (
    <>
      {redux_data.map(
        ({ word, pinyin, meaning, example, example_meaning }, idx) => {
          return (
            <CardContainer key={idx}>
              <div>
                <button
                  onClick={() => {
                    history.push("/edit/" + idx);
                  }}
                >
                  수정
                </button>
              </div>
              <div>
                <h4>{word}</h4>
                <span>{pinyin}</span>
              </div>
              <p>{meaning}</p>
              <div>{example}</div>
              <div>{example_meaning}</div>
            </CardContainer>
          );
        }
      )}
    </>
  );
};

const CardContainer = styled.article`
  border: 2px solid black;
  height: 161px;
  width: 420px;
`;

export default Card;

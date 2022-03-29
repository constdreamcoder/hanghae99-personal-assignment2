// components
import React from "react";

// style
import styled from "styled-components";
import "./Card.css";

// packages
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loadDictionaryFB,
  deleteDictionaryFB,
} from "./redux/modules/dictionary";

const Card = (props) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadDictionaryFB());
  }, []);

  const history = useHistory();
  const redux_data = useSelector((state) => state.dictionary.list);

  console.log("카드 컴포넌트", redux_data);

  return (
    <>
      {redux_data.map(
        ({ id, word, pinyin, meaning, example, example_translation }, idx) => {
          return (
            <div key={idx} className="col">
              <div className="container">
                <div className="front">
                  <div className="inner">
                    <div>
                      <h4>{word}</h4>
                      <span>{pinyin}</span>
                    </div>
                  </div>
                </div>
                <div className="back">
                  <div className="inner">
                    <div>
                      <button
                        onClick={() => {
                          history.push("/edit/" + id);
                        }}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => {
                          dispatch(deleteDictionaryFB(id));
                        }}
                      >
                        삭제
                      </button>
                    </div>
                    <p>{meaning}</p>
                    <div>{example}</div>
                    <div>{example_translation}</div>
                  </div>
                </div>
              </div>
            </div>
            // <CardContainer key={idx}>
            //   <div>
            //     <button
            //       onClick={() => {
            //         history.push("/edit/" + id);
            //       }}
            //     >
            //       수정
            //     </button>
            //     <button
            //       onClick={() => {
            //         dispatch(deleteDictionaryFB(id));
            //       }}
            //     >
            //       삭제
            //     </button>
            //   </div>
            //   <div>
            //     <h4>{word}</h4>
            //     <span>{pinyin}</span>
            //   </div>
            //   <p>{meaning}</p>
            //   <div>{example}</div>
            //   <div>{example_translation}</div>
            // </CardContainer>
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

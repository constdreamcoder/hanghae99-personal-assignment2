// components
import React from "react";
import { useState } from "react";

// style
import "./Form.css";
import styled, { css } from "styled-components";

// packages
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addDictionaryFB,
  updateDictionaryFB,
} from "./redux/modules/dictionary";

const AddCard = (props) => {
  console.log(props);
  // props가 true이면 카드 추가, false면 카드 수정
  const add_or_edit = props.add_or_edit;
  const history = useHistory();

  const id = useParams().id;
  const redux_data = useSelector((state) => state.dictionary.list);
  const clickedCard = redux_data.filter((ele) => ele.id === id)[0];

  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    word: add_or_edit ? "" : clickedCard.word,
    pinyin: add_or_edit ? "" : clickedCard.pinyin,
    meaning: add_or_edit ? "" : clickedCard.meaning,
    example: add_or_edit ? "" : clickedCard.example,
    example_translation: add_or_edit ? "" : clickedCard.example_translation,
  });

  // 비구조 할당을 통해 값 추출
  // const { word, pinyin, meaning, example, example_translation } = inputs;

  const handleChange = (event) => {
    const { name, value } = event.target; // 태그 요소인 name값과 value 값을 받는다.
    setInputs({
      ...inputs, // spread - 리액트의 불변성을 지키기 위해 새로운 객체를 만들어 거기에 변화를 준다.
      [name]: value, // name 키를 가진 값을 value로 설정
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(add_or_edit ? "추가 컴포넌트" : "수정 컴포넌트", inputs);
  };

  return (
    <div className="shade">
      <Blackboard add_or_edit={add_or_edit} className="blackboard">
        <form className="form" onSubmit={handleSubmit}>
          <p>
            <label htmlFor="input-word">단어:</label>
            <input
              type="text"
              name="word"
              id="input-word"
              value={inputs.word}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="input-pinyin">병음:</label>
            <input
              type="text"
              name="pinyin"
              id="input-pinyin"
              value={inputs.pinyin}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="input-meaning">의미:</label>
            <input
              type="text"
              name="meaning"
              id="input-meaning"
              value={inputs.meaning}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="input-example">예문:</label>
            <input
              type="text"
              name="example"
              id="input-example"
              value={inputs.example}
              onChange={handleChange}
            />
          </p>
          <p>
            <label htmlFor="input-example_translation">해석:</label>
            <input
              type="text"
              name="example_translation"
              id="input-example_translation"
              value={inputs.example_translation}
              onChange={handleChange}
            />
          </p>
          <p className="wipeout">
            <input
              type="submit"
              value={add_or_edit ? "추가하기" : "수정하기"}
              onClick={() => {
                add_or_edit
                  ? dispatch(addDictionaryFB(inputs))
                  : dispatch(updateDictionaryFB(inputs, clickedCard.id));
                history.push("/");
              }}
            />
          </p>
        </form>
      </Blackboard>
    </div>
  );
};

const Blackboard = styled.div`
  ${(props) => {
    switch (props.add_or_edit) {
      case true:
        return css`
          &:before {
            content: "단어 추가하기";
          }
        `;
      case false:
        return css`
          &:before {
            content: "단어 수정하기";
          }
        `;
      default:
        return css`
          &:before {
            content: "아무것도 없음";
          }
        `;
    }
  }}
`;
export default AddCard;

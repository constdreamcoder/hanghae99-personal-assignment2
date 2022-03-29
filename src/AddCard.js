// components
import React from "react";
import { useState } from "react";

// style
import styled from "styled-components";

// packages
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addDictionaryFB } from "./redux/modules/dictionary";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const AddCard = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    word: "",
    pinyin: "",
    meaning: "",
    example: "",
    example_translation: "",
  });

  // 비구조 할당을 통해 값 추출
  const { word, pinyin, meaning, example, example_translation } = inputs;

  const handleChange = (event) => {
    const { name, value } = event.target; // 태그 요소인 name값과 value 값을 받는다.
    setInputs({
      ...inputs, // spread - 리액트의 불변성을 지키기 위해 새로운 객체를 만들어 거기에 변화를 준다.
      [name]: value, // name 키를 가진 값을 value로 설정
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("추가 컴포넌트", inputs);
  };

  return (
    <EidtContainer>
      <EditTitle>단어 추가하기</EditTitle>
      <form onSubmit={handleSubmit}>
        <Input>
          <label htmlFor="input-word">단어</label>
          <input
            type="text"
            name="word"
            id="input-word"
            value={inputs.word}
            onChange={handleChange}
          />
        </Input>
        <Input>
          <label htmlFor="input-pinyin">병음</label>
          <input
            type="text"
            name="pinyin"
            id="input-pinyin"
            value={inputs.pinyin}
            onChange={handleChange}
          />
        </Input>
        <Input>
          <label htmlFor="input-meaning">의미</label>
          <input
            type="text"
            name="meaning"
            id="input-meaning"
            value={inputs.meaning}
            onChange={handleChange}
          />
        </Input>
        <Input>
          <label htmlFor="input-example">예문</label>
          <input
            type="text"
            name="example"
            id="input-example"
            value={inputs.example}
            onChange={handleChange}
          />
        </Input>
        <Input>
          <label htmlFor="input-example_translation">해석</label>
          <input
            type="text"
            name="example_translation"
            id="input-example_translation"
            value={inputs.example_translation}
            onChange={handleChange}
          />
        </Input>
        <Rectify
          type="submit"
          onClick={() => {
            dispatch(addDictionaryFB(inputs));
            history.goBack();
          }}
        >
          추가하기
        </Rectify>
      </form>
    </EidtContainer>
  );
};

const EidtContainer = styled.div`
  width: 400px;
  height: 80vh;
  background-color: yellow;
  margin: 70px auto 0px auto;
`;

const EditTitle = styled.p`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  color: rgb(10, 112, 41);
`;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Rectify = styled.button`
  text-align: center;
`;

export default AddCard;

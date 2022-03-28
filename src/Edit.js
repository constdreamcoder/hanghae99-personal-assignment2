// components
import React from "react";
import { useState } from "react";

// style
import styled from "styled-components";

// packages
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateDictionaryFB } from "./redux/modules/dictionary";

const Edit = (props) => {
  const history = useHistory();
  const id = useParams().id;

  // console.log(id);

  const redux_data = useSelector((state) => state.dictionary.list);
  const clickedCard = redux_data.filter((ele) => ele.id === id)[0];
  // console.log(redux_data);
  // console.log(clickedCard);

  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    id: clickedCard.id,
    word: clickedCard.word,
    pinyin: clickedCard.pinyin,
    meaning: clickedCard.meaning,
    example: clickedCard.example,
    example_translation: clickedCard.example_translation,
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
    console.log(inputs);
  };

  return (
    <EidtContainer>
      <EditTitle>단어 수정하기</EditTitle>
      <form onSubmit={handleSubmit}>
        <Input>
          <label htmlFor="input-word">단어</label>
          <input
            type="text"
            name="word"
            id="input-word"
            // defaultValue={clickedCard.word}
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
            // defaultValue={clickedCard.pinyin}
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
            // defaultValue={clickedCard.meaning}
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
            // defaultValue={clickedCard.example}
            value={inputs.example}
            onChange={handleChange}
          />
        </Input>
        <Input>
          <label htmlFor="input-example-translation">해석</label>
          <input
            type="text"
            name="example_translation"
            id="input-example_translation"
            // defaultValue={clickedCard.example_translation}
            value={inputs.example_translation}
            onChange={handleChange}
          />
        </Input>
        <Rectify
          type="submit"
          onClick={() => {
            dispatch(updateDictionaryFB(inputs));
            history.push("/");
          }}
        >
          수정하기
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
export default Edit;

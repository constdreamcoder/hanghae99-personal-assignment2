// components
import React from "react";
import { useState } from "react";

// style
import styled from "styled-components";

// packages
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Edit = (props) => {
  const history = useHistory();
  const index = useParams().index;

  console.log(index);

  const redux_data = useSelector((state) => state.dictionary.list);
  const redux_data2 = useSelector((state) => state);
  const clickedCard = redux_data.filter(
    (ele, idx) => idx === parseInt(index)
  )[0];
  console.log(redux_data);
  console.log(clickedCard);
  console.log(redux_data2);

  const [inputs, setInputs] = useState({});

  // const handleChange = (event) => {
  //   const word = event.target.word;
  //   const pinyin = event.target.pinyin;
  //   const meaning = event.target.meaning;
  //   const example = event.target.example;
  //   const example_translation = event.target.example_translation;
  //   // setInputs(values => ({...values, [name]: value}))
  // };

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
            defaultValue={clickedCard.word}
            // placeholder={clickedCard.word}
            // onChange={handleChange}
          />
        </Input>
        <Input>
          <label htmlFor="input-pinyin">병음</label>
          <input
            type="text"
            name="pinyin"
            id="input-pinyin"
            defaultValue={clickedCard.pinyin}
            // placeholder={clickedCard.pinyin}
            // onChange={handleChange}
          />
        </Input>
        <Input>
          <label htmlFor="input-meaning">의미</label>
          <input
            type="text"
            name="meaning"
            id="input-meaning"
            defaultValue={clickedCard.meaning}
            // placeholder={clickedCard.meaning}
            // onChange={handleChange}
          />
        </Input>
        <Input>
          <label htmlFor="input-example">예문</label>
          <input
            type="text"
            name="example"
            id="input-example"
            defaultValue={clickedCard.example}
            // placeholder={clickedCard.example}
            // onChange={handleChange}
          />
        </Input>
        <Input>
          <label htmlFor="input-example-translation">해석</label>
          <input
            type="text"
            name="example_translation"
            id="input-example_translation"
            defaultValue={clickedCard.example_translation}
            // placeholder={clickedCard.example_translation}
            // onChange={handleChange}
          />
        </Input>
        <Rectify
          type="submit"
          onClick={() => {
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

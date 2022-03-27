// components
import React from "react";
import { useState } from "react";

// style
import styled from "styled-components";

// packages
import { useHistory } from "react-router-dom";

const Edit = (props) => {
  const history = useHistory();
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const word = event.target.word;
    const pinyin = event.target.pinyin;
    const meaning = event.target.meaning;
    const example = event.target.example;
    const example_translation = event.target.example_translation;
    // setInputs(values => ({...values, [name]: value}))
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
            values={inputs.word}
            onChange={handleChange}
          />
        </Input>
        <Input>
          <label htmlFor="input-pinyin">병음</label>
          <input
            type="text"
            name="pinyin"
            id="input-pinyin"
            values="#"
            onChange={handleChange}
          />
        </Input>
        <Input>
          <label htmlFor="input-meaning">의미</label>
          <input
            type="text"
            name="meaning"
            id="input-meaning"
            values="#"
            onChange={handleChange}
          />
        </Input>
        <Input>
          <label htmlFor="input-example">예문</label>
          <input
            type="text"
            name="example"
            id="input-example"
            values="#"
            onChange={handleChange}
          />
        </Input>
        <Input>
          <label htmlFor="input-example-translation">해석</label>
          <input
            type="text"
            name="example_translation"
            id="input-example_translation"
            values="#"
            onChange={handleChange}
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

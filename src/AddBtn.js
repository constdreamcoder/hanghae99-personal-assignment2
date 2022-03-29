import React from "react";

// style
import styled, { keyframes } from "styled-components";
import AddTwoToneIcon from "@material-ui/icons/AddTwoTone";

// packages
import { useHistory } from "react-router-dom";

const AddBtn = (props) => {
  const history = useHistory();
  return (
    <Addbutton
      style={{
        marginLeft: "20px",
        position: "fixed",
        bottom: "30px",
        right: "30px",
      }}
      onClick={() => {
        history.push("/add");
      }}
    >
      <AddTwoToneIcon
        style={{
          fontSize: 30,
        }}
      />
    </Addbutton>
  );
};

const Addbutton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: none;
  text-decoration: none;
  color: white;
  background-color: rgb(10, 112, 41);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 300ms ease-in-out;
  &:hover {
    transform: rotate(90deg);
  }
`;

export default AddBtn;

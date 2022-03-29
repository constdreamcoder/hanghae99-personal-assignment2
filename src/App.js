import React from "react";

// Components
import Card from "./Card";
import Edit from "./Edit";
import AddCard from "./AddCard";

// style
import styled from "styled-components";

// packages
import { Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { db } from "./firebase";

function App() {
  const history = useHistory();

  return (
    <div className="App">
      <Header>
        <HeadContainer href="/">
          <HeaderTitle>프랑스어 단어장</HeaderTitle>
        </HeadContainer>
        <button
          style={{ marginLeft: "20px" }}
          onClick={() => {
            history.push("/add");
          }}
        >
          추가
        </button>
      </Header>
      <HomeBody style={{ marginTop: "60px" }}>
        <Route path="/" exact>
          <CardSection>
            <Card />
          </CardSection>
        </Route>
        <Route path="/edit/:id" exact>
          <Edit />
        </Route>
        <Route path="/add" exact>
          <AddCard />
        </Route>
      </HomeBody>
    </div>
  );
}

const Header = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 10;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: rgb(255, 255, 255);
  border-bottom: 2px solid rgb(219, 232, 216);
`;

const HeadContainer = styled.a`
  text-decoration: none;
  color: black;
  display: flex;
`;

const HeaderTitle = styled.h1`
  color: rgb(10, 112, 41);
  font-size: 30px;
  font-weight: 600;
`;

const HomeBody = styled.div`
  // background-color: yellow;
  // width: 1400px;
  // height: 800px;
  // margin: 60px auto;
  width: 90%;
  margin: 0 auto;
  max-width: 80rem;
`;

const CardSection = styled.div`
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-around;
  // gap: 20px;

  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
`;

export default App;

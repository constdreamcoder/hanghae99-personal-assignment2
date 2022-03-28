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
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const history = useHistory();

  React.useEffect(async () => {
    console.log(db);
    const query = await getDocs(collection(db, "dictionary"));
    console.log(query);
    query.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
    // addDoc(collection(db, "dictionary"), {
    //   word: "procrastinate",
    //   pinyin: "[proʊ|kræstɪneɪt]",
    //   meaning: "(해야 할 일을 보통 하기가 싫어서) 미루다[질질 끌다]",
    //   example: "It's hard to not procrastinate, isn't it?",
    //   example_translation: "근데 미루지 않기가 힘들죠?",
    // });

    // const docRef = doc(db, "dictionary", "QIXY3c3s5KRR6tcuZ2F0");
    // updateDoc(docRef, { word: "라면먹기" });

    // const docRef = doc(db, "dictionary", "QIXY3c3s5KRR6tcuZ2F0");
    // deleteDoc(docRef);
  }, []);

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
      <HomeBody>
        <Route path="/" exact>
          <CardSection>
            <Card />
          </CardSection>
        </Route>
        <Route path="/edit/:index" exact>
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
  background-color: yellow;
  width: 1400px;
  height: 800px;
  margin: 60px auto;
`;

const CardSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
`;

export default App;

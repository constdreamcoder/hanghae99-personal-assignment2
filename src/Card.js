// components
import React from "react";

// style
import "./Card.css";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddBtn from "./AddBtn";

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
                      <p></p>
                      <span>{pinyin}</span>
                    </div>
                  </div>
                </div>
                <div
                  className="back"
                  onClick={() => {
                    history.push();
                  }}
                >
                  <div className="inner">
                    <p>{meaning}</p>
                    <div
                      style={{
                        marginBottom: "8px",
                      }}
                    >
                      {example}
                    </div>
                    <div>{example_translation}</div>
                    <div className="button">
                      <IconButton
                        onClick={() => {
                          history.push("/edit/" + id);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          dispatch(deleteDictionaryFB(id));
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      )}
      <AddBtn />
    </>
  );
};

export default Card;

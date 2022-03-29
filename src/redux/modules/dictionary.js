import { db } from "../../firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Actions
const CREATE = "dictionary/CREATE";
const LOAD = "dictionary/LOAD";
const UPDATE = "dictionary/UPDATE";
const DELETE = "dictionary/DELETE";

const initialState = {
  list: [],
};

// Action Creators
export function createDictionary(dictionary) {
  console.log("생성 액션 함수");
  return { type: CREATE, dictionary };
}

export function loadDictionary(dictionary_list) {
  console.log("로드 액션 함수");
  return { type: LOAD, dictionary_list };
}

export function updateDictionary(dictionary) {
  console.log("수정 액션 함수");
  return { type: UPDATE, dictionary };
}

export function deleteDictionary(dictionary_index) {
  console.log("삭제 액션 함수");
  return { type: DELETE, dictionary_index };
}

// Middlewares
export const loadDictionaryFB = () => {
  return async function (dispatch) {
    const dictionary_data = await getDocs(collection(db, "dictionary"));
    // console.log(dictionary_data);

    let dictionary_list = [];
    console.log("로드 미들웨어", dictionary_data);
    dictionary_data.forEach((doc) => {
      // console.log("로드 미들웨어", doc.data());
      dictionary_list = [...dictionary_list, { id: doc.id, ...doc.data() }];
    });

    console.log("로드 미들웨어", dictionary_list);

    dispatch(loadDictionary(dictionary_list));
  };
};

export const addDictionaryFB = (dictionary) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "dictionary"), dictionary);
    // const _dictionary = await getDoc(docRef);
    // const dictionary_data = { id: docRef.id, ...dictionary };

    // console.log("추가 미들웨어", dictionary_data);

    // dispatch(createDictionary(dictionary_data));
  };
};

export const updateDictionaryFB = (dictionary, dictionary_id) => {
  return async function (dispatch) {
    console.log("수정 미들웨어");
    const docRef = doc(db, "dictionary", dictionary_id);
    await updateDoc(docRef, {
      word: dictionary.word,
      pinyin: dictionary.pinyin,
      meaning: dictionary.meaning,
      example: dictionary.example,
      example_translation: dictionary.example_translation,
    });

    dispatch(updateDictionary(dictionary));
  };
};

export const deleteDictionaryFB = (dictionary_id) => {
  return async function (dispatch, getState) {
    console.log("삭제 미들웨어");
    if (!dictionary_id) {
      window.alert("id가 없네요!");
      return;
    }
    const docRef = doc(db, "dictionary", dictionary_id);
    await deleteDoc(docRef);

    const _dictionary_list = getState().dictionary.list;
    const dictionary_index = _dictionary_list.findIndex((d) => {
      return d.id === dictionary_id;
    });

    dispatch(deleteDictionary(dictionary_index));
  };
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    // case "dictionary/CREATE": {
    //   const new_dictionary_list = [...state.list, action.dictionary];
    //   console.log("생성 리듀서", new_dictionary_list);
    //   return { list: new_dictionary_list };
    // }

    case "dictionary/LOAD": {
      // console.log(action);
      console.log("로드 리듀서", action.dictionary_list);
      return { list: action.dictionary_list };
    }

    case "dictionary/UPDATE": {
      const new_dictionary_list = state.list.map((l, idx) => {
        if (action.dictionary.id === l.id) {
          return {
            ...l,
            word: action.dictionary.word,
            pinyin: action.dictionary.pinyin,
            meaning: action.dictionary.meaning,
            example: action.dictionary.example,
            example_translation: action.dictionary.example_translation,
          };
        } else {
          return l;
        }
      });
      console.log("수정 리듀서", state);
      console.log("수정 리듀서", { list: new_dictionary_list });
      return { ...state, list: new_dictionary_list };
    }

    case "dictionary/DELETE": {
      const new_dictionary_list = state.list.filter((l, idx) => {
        return parseInt(action.dictionary_index) !== idx;
      });
      console.log("삭제 리듀서", new_dictionary_list);
      return { ...state, list: new_dictionary_list };
    }
    default:
      return state;
  }
}

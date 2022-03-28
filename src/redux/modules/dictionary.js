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
  list: [
    // {
    //   word: "procrastinate",
    //   pinyin: "[proʊ|kræstɪneɪt]",
    //   meaning: "(해야 할 일을 보통 하기가 싫어서) 미루다[질질 끌다]",
    //   example: "It's hard to not procrastinate, isn't it?",
    //   example_translation: "근데 미루지 않기가 힘들죠?",
    // },
    // {
    //   word: "articulate",
    //   pinyin: "[ɑːr|tɪkjuleɪt]",
    //   meaning: "(생각감정을) 분명히 표현하다[설명하다]",
    //   example: "She struggled to articulate her thoughts.",
    //   example_translation: "그녀는 자기 생각을 분명히 표현하려고 애를 썼다.",
    // },
    // {
    //   word: "audacious",
    //   pinyin: "[ɔːˈdeɪʃəs]",
    //   meaning: "대담한",
    //   example: "It was audacious of you to say no to your boss.",
    //   example_translation: "상사한테 싫다고 하다니 자넨 간도 크군.",
    // },
    // {
    //   word: "audacious",
    //   pinyin: "[ɔːˈdeɪʃəs]",
    //   meaning: "대담한",
    //   example: "It was audacious of you to say no to your boss.",
    //   example_translation: "상사한테 싫다고 하다니 자넨 간도 크군.",
    // },
    // {
    //   word: "audacious",
    //   pinyin: "[ɔːˈdeɪʃəs]",
    //   meaning: "대담한",
    //   example: "It was audacious of you to say no to your boss.",
    //   example_translation: "상사한테 싫다고 하다니 자넨 간도 크군.",
    // },
    // {
    //   word: "audacious",
    //   pinyin: "[ɔːˈdeɪʃəs]",
    //   meaning: "대담한",
    //   example: "It was audacious of you to say no to your boss.",
    //   example_translation: "상사한테 싫다고 하다니 자넨 간도 크군.",
    // },
  ],
};

// Action Creators
export function createDictionary(dictionary) {
  return { type: CREATE, dictionary };
}

export function loadDictionary(dictionary_list) {
  return { type: LOAD, dictionary_list };
}

export function updateDictionary(dictionary) {
  return { type: UPDATE, dictionary };
}

export function deleteDictionary(dictionary_index) {
  return { type: DELETE, dictionary_index };
}

// Middlewares
export const loadDictionaryFB = () => {
  return async function (dispatch) {
    const dictionary_data = await getDocs(collection(db, "dictionary"));
    // console.log(dictionary_data);

    let dictionary_list = [];

    dictionary_data.forEach((doc) => {
      // console.log(doc.data());
      dictionary_list = [...dictionary_list, { id: doc.id, ...doc.data() }];
    });

    console.log("미들웨어", dictionary_list);

    dispatch(loadDictionary(dictionary_list));
  };
};

export const addDictionaryFB = (dictionary) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "dictionary"), dictionary);
    // const _dictionary = await getDoc(docRef);
    const dictionary_data = { id: docRef.id, ...dictionary };

    console.log(dictionary_data);

    dispatch(createDictionary(dictionary_data));
  };
};

export const updateDictionaryFB = (dictionary) => {
  return async function (dispatch) {
    // console.log(dictionary_id);
    const docRef = doc(db, "dictionary", dictionary.id);
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
    case "dictionary/CREATE": {
      const new_dictionary_list = [...state.list, action.dictionary];
      return { list: new_dictionary_list };
    }

    case "dictionary/LOAD": {
      // console.log(action);
      console.log("리듀서", action.dictionary_list);
      return { list: action.dictionary_list };
    }

    case "dictionary/UPDADE": {
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
      console.log(state);
      console.log({ list: new_dictionary_list });
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

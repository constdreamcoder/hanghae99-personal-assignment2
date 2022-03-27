// Actions
const CREATE = "dictionary/CREATE";

const initialState = {
  list: [
    {
      word: "procrastinate",
      pinyin: "[proʊ|kræstɪneɪt]",
      meaning: "(해야 할 일을 보통 하기가 싫어서) 미루다[질질 끌다]",
      example: "It's hard to not procrastinate, isn't it?",
      example_meaning: "근데 미루지 않기가 힘들죠?",
    },
    {
      word: "articulate",
      pinyin: "[ɑːr|tɪkjuleɪt]",
      meaning: "(생각감정을) 분명히 표현하다[설명하다]",
      example: "She struggled to articulate her thoughts.",
      example_meaning: "그녀는 자기 생각을 분명히 표현하려고 애를 썼다.",
    },
    {
      word: "audacious",
      pinyin: "[ɔːˈdeɪʃəs]",
      meaning: "대담한",
      example: "It was audacious of you to say no to your boss.",
      example_meaning: "상사한테 싫다고 하다니 자넨 간도 크군.",
    },
    {
      word: "audacious",
      pinyin: "[ɔːˈdeɪʃəs]",
      meaning: "대담한",
      example: "It was audacious of you to say no to your boss.",
      example_meaning: "상사한테 싫다고 하다니 자넨 간도 크군.",
    },
    {
      word: "audacious",
      pinyin: "[ɔːˈdeɪʃəs]",
      meaning: "대담한",
      example: "It was audacious of you to say no to your boss.",
      example_meaning: "상사한테 싫다고 하다니 자넨 간도 크군.",
    },
    {
      word: "audacious",
      pinyin: "[ɔːˈdeɪʃəs]",
      meaning: "대담한",
      example: "It was audacious of you to say no to your boss.",
      example_meaning: "상사한테 싫다고 하다니 자넨 간도 크군.",
    },
  ],
};

// Action Creators
export function createDictionary(dictionary) {
  return { type: CREATE, dictionary };
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "dictionary/CREATE": {
      const new_dictionary_list = [...state.list, action.dictionary];
      return { list: new_dictionary_list };
    }
    default:
      return state;
  }
}

import {
  IS_WRONG_HIRAGANA,
  IS_WRONG_KATAKANA,
  CHOOSE_WRONG_ANSWERS,
  GET_SYLLABARY,
  RESTART_CHOICE,
  SET_USER
} from "../actions/auth";

const initialState = {
  isUserHasWrongHiraganaAnswers: false,
  isUserHasWrongKatakanaAnswers: false,
  isUserChooseIncorrectAnswers: false,
  syllabaryFromDatabase: [],
  user: null
}

export default (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
        // TODO get rid of it once we fix all component connections
        isAuthenticated: action.user !== null
      }
    case IS_WRONG_HIRAGANA:
      return {
        ...state,
        isUserHasWrongHiraganaAnswers: action.isUserHasWrongHiraganaAnswers
      };
    case IS_WRONG_KATAKANA:
      return {
        ...state,
        isUserHasWrongKatakanaAnswers: action.isUserHasWrongKatakanaAnswers
      };

    case CHOOSE_WRONG_ANSWERS:
      return {
        ...state,
        isUserChooseIncorrectAnswers: true
      };
    case GET_SYLLABARY:
      return {
        ...state,
        syllabaryFromDatabase: action.syllabaryFromDatabase
      };

    case RESTART_CHOICE:
      return {
        ...state,
        syllabaryFromDatabase: [],
        isUserChooseIncorrectAnswers: false
      };
    default:
      return state;
  }
};

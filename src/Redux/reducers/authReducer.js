import {
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER,
  IS_WRONG_HIRAGANA,
  IS_WRONG_KATAKANA,
  CHOOSE_WRONG_ANSWERS,
  GET_SYLLABARY,
  RESTART_CHOICE
} from "../actions/auth";

export default (
  state = {
    isAuthenticated: false,
    isUserHasWrongHiraganaAnswers: false,
    isUserHasWrongKatakanaAnswers: false,
    user: null,
    isUserChooseIncorrectAnswers: false,
    syllabaryFromDatabase: []
  },
  action
) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        isUserHasWrongHiraganaAnswers: false,
        isUserHasWrongKatakanaAnswers: false,
        user: ""
      };
    case REGISTER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user
      };
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

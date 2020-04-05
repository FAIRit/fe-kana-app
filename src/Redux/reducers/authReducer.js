import {
  CHOOSE_WRONG_ANSWERS,
  GET_SYLLABARY,
  RESTART_CHOICE,
  SET_USER,
} from "../actions/auth";

const initialState = {
  isUserChooseIncorrectAnswers: false,
  syllabaryFromDatabase: [],
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
        // TODO get rid of it once we fix all component connections
        isAuthenticated: action.user !== null,
      };
    case CHOOSE_WRONG_ANSWERS:
      return {
        ...state,
        isUserChooseIncorrectAnswers: action.isUserChooseIncorrectAnswers,
      };
    case GET_SYLLABARY:
      return {
        ...state,
        syllabaryFromDatabase: action.syllabaryFromDatabase,
      };

    case RESTART_CHOICE:
      return {
        ...state,
        syllabaryFromDatabase: [],
        isUserChooseIncorrectAnswers: false,
      };
    default:
      return state;
  }
};

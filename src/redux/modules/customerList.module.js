import { createActions, handleActions} from 'redux-actions';

export const actions = createActions({
    list:{
        LOAD_LIST: action => action,

    },
    header:{
        SET_LIST_FILTER: action => action,
    },
    customer:{
        DELETE_CUSTOMER: action => action,
        ADD_CUSTOMER: action => action,
    }
});

export const reducer = handleActions(
  {
      [actions.list.loadList]:(state,action) =>({
          ...state,
          list: action.payload,
      }),
      [actions.header.setListFilter]:(state,action) =>({
        ...state,
        filter: action.payload,
    })
  },
  {
      list:[],
      filter: '',
  }
);
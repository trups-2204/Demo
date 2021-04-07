import { createActions, handleActions} from 'redux-actions';

export const actions = createActions({
  
    header:{
        SET_SEARCH_FILTER: action => action,
        SET_SORT_FILTER: action => action,
    },
    customer:{
        DELETE_CUSTOMER: action => action,
        ADD_CUSTOMER: action => action,
        SET_CUSTOMER_LIST: action => action,

    }
});

export const reducer = handleActions(
  {
      [actions.customer.setCustomerList]:(state,action) =>({
          ...state,
          list: action.payload,
      }),
      [actions.header.setSearchFilter]:(state,action) =>({
        ...state,
        searchfilter: action.payload,
    }),
    [actions.header.setSortFilter]:(state,action) =>({
        ...state,
        sortFilter: action.payload,
    })
  },
  {
      list:[],
      searchfilter: '',
      sortFilter: ''
  }
);
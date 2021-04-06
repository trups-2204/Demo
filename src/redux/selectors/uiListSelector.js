import { createSelector } from 'reselect';;
import { get } from 'lodash';

export const getUiSelector = state => get(state, 'ui',null);

export const getListFilterOptions = createSelector([getUiSelector], customer =>
     get(customer, 'filter',null),
);
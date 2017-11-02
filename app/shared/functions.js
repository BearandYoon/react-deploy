import { createSelector } from 'reselect';
import { requestBackend } from 'utils/request';
import { filesEndpoint } from 'shared/constants';

// Used in mapStateToProps
export const prepareSelector = (reducer, path) => createSelector(
  state => state.get(reducer),
  state => state.get(path),
);

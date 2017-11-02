/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS } from 'immutable';

import {
  LOAD_LESSONS,
  LOAD_LESSONS_SUCCESS,
  LOAD_LESSONS_FAIL,

  REORDER_LESSONS,
  REORDER_LESSONS_SUCCESS,
  REORDER_LESSONS_FAIL
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: true,
  changingStatus: false,
  loadError: '',
  reorderedLessons: false
})
  .set('lessons', {});

function lessonsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LESSONS:
      return state
        .set('loading', true)
        .set('loadError', '')
        .set('lessons', {});
    case LOAD_LESSONS_FAIL:
      return state
        .set('loading', false)
        .set('loadError', action.error);
    case LOAD_LESSONS_SUCCESS:
      return state
        .set('loading', false)
        .set('lessons', action.payload);
    case REORDER_LESSONS:
      return state
        .set('loading', true)
        .set('reorderedLessons', false)
        .set('loadError', '');
    case REORDER_LESSONS_FAIL:
      return state
        .set('loading', false)
        .set('reorderedLessons', false)
        .set('loadError', action.error);
    case REORDER_LESSONS_SUCCESS:
      return state
        .set('reorderedLessons', true)
        .set('loading', false);
    default:
      return state;
  }
}

export default lessonsReducer;

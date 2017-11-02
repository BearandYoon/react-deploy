import { fromJS } from 'immutable';

import {
  ADD_NEW_LESSON,
  ADD_NEW_LESSON_SUCCESS,
  ADD_NEW_LESSON_FAIL,

  UPDATE_LESSON_IMAGE,
  UPDATE_LESSON_IMAGE_SUCCESS,
  UPDATE_LESSON_IMAGE_FAIL
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  message: '',
  addedLesson: false,
  lessonImageUpdated: false,
  lessonImageUrl: ''
})
  .set('newLesson', {});

function newLessonReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_NEW_LESSON:
      return state
        .set('loading', true)
        .set('error', false)
        .set('message', '')
        .set('addedLesson', false)
        .set('newLesson', {});
    case ADD_NEW_LESSON_FAIL:
      return state
        .set('loading', false)
        .set('addedLesson', false)
        .set('error', true)
        .set('message', 'Loading Error!');
    case ADD_NEW_LESSON_SUCCESS:
      return state
        .set('loading', false)
        .set('newLesson', action.payload)
        .set('error', false)
        .set('message', 'Added New Lesson Successfully!')
        .set('addedLesson', true);
    case UPDATE_LESSON_IMAGE:
      return state
        .set('loading', true)
        .set('error', false)
        .set('message', '');
    case UPDATE_LESSON_IMAGE_FAIL:
      return state
        .set('loading', false)
        .set('error', true)
        .set('lessonImageUrl', '')
        .set('lessonImageUpdated', false)
        .set('message', 'Lesson Image Updating Failed!');
    case UPDATE_LESSON_IMAGE_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('lessonImageUrl', action.payload.URL)
        .set('lessonImageUpdated', true)
        .set('message', 'Lesson Image Updated successfully!');
    default:
      return state;
  }
}

export default newLessonReducer;

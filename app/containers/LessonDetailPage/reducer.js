import { fromJS } from 'immutable';

import {
  LOAD_LESSON,
  LOAD_LESSON_SUCCESS,
  LOAD_LESSON_FAIL,

  UPDATE_LESSON,
  UPDATE_LESSON_SUCCESS,
  UPDATE_LESSON_FAIL,

  UPDATE_LESSON_IMAGE,
  UPDATE_LESSON_IMAGE_SUCCESS,
  UPDATE_LESSON_IMAGE_FAIL,

  DELETE_LESSON,
  DELETE_LESSON_SUCCESS,
  DELETE_LESSON_FAIL,

  LOAD_EXERCISES,
  LOAD_EXERCISES_SUCCESS,
  LOAD_EXERCISES_FAIL,

  UPDATE_EXERCISES,
  UPDATE_EXERCISES_SUCCESS,
  UPDATE_EXERCISES_FAIL,

  DELETE_EXERCISE,
  DELETE_EXERCISE_SUCCESS,
  DELETE_EXERCISE_FAIL,

  ADD_NEW_EXERCISE,
  ADD_NEW_EXERCISE_SUCCESS,
  ADD_NEW_EXERCISE_FAIL,

  REORDER_EXERCISE,
  REORDER_EXERCISE_SUCCESS,
  REORDER_EXERCISE_FAIL
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  message: '',
  exercises: [],
  isDeleted: false,
  exerciseAdded: false,
  exerciseUpdated: false,
  lessonImageUpdated: false,
  reorderedExercises: false
})
  .set('lesson', {});

function lessonReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LESSON:
      return state
        .set('loading', true)
        .set('error', false)
        .set('isDeleted', false)
        .set('exerciseAdded', false)
        .set('lessonImageUpdated', false)
        .set('message', '')
        .set('lesson', {});
    case LOAD_LESSON_FAIL:
      return state
        .set('loading', false)
        .set('error', true)
        .set('lessonImageUpdated', false)
        .set('message', 'Lesson loading Failed!');
    case LOAD_LESSON_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('isDeleted', false)
        .set('lessonImageUpdated', false)
        .set('lesson', action.payload);
    case UPDATE_LESSON:
      return state
        .set('loading', true)
        .set('error', false)
        .set('lessonImageUpdated', false)
        .set('message', '');
    case UPDATE_LESSON_FAIL:
      return state
        .set('loading', false)
        .set('error', true)
        .set('message', 'Lesson Updating Failed!');
    case UPDATE_LESSON_SUCCESS:
      return state
        .set('loading', false)
        .set('lesson', action.payload)
        .set('error', false)
        .set('message', 'Lesson Updated successfully!');
    case UPDATE_LESSON_IMAGE:
      return state
        .set('loading', true)
        .set('error', false)
        .set('message', '');
    case UPDATE_LESSON_IMAGE_FAIL:
      return state
        .set('loading', false)
        .set('error', true)
        .set('lessonImageUpdated', false)
        .set('message', 'Lesson Image Updating Failed!');
    case UPDATE_LESSON_IMAGE_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('lessonImageUpdated', true)
        .set('message', 'Lesson Image Updated successfully!');
    case DELETE_LESSON:
      return state
        .set('loading', true)
        .set('error', false)
        .set('message', '');
    case DELETE_LESSON_FAIL:
      return state
        .set('loading', false)
        .set('error', true)
        .set('message', 'Lesson Deleted Failed!');
    case DELETE_LESSON_SUCCESS:
      return state
        .set('loading', false)
        .set('lesson', action.payload)
        .set('error', false)
        .set('isDeleted', true)
        .set('message', 'Lesson Deleted successfully!');
    case ADD_NEW_EXERCISE:
      return state
        .set('loading', true)
        .set('exerciseAdded', false)
        .set('message', '')
        .set('error', false);
    case ADD_NEW_EXERCISE_FAIL:
      return state
        .set('loading', false)
        .set('exerciseAdded', false)
        .set('error', true)
        .set('message', 'Sorry, New Exercise Failed!');
    case ADD_NEW_EXERCISE_SUCCESS:
      return state
        .set('loading', false)
        .set('exerciseAdded', true)
        .set('error', false)
        .set('message', 'New Exercise added successfully!');
    case LOAD_EXERCISES:
      return state
        .set('loading', true)
        .set('exerciseUpdated', false)
        .set('message', '')
        .set('error', false);
    case LOAD_EXERCISES_FAIL:
      return state
        .set('loading', false)
        .set('error', true)
        .set('exerciseUpdated', false)
        .set('message', 'Sorry, Exercises Loading Failed!');
    case LOAD_EXERCISES_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('message', '')
        .set('exerciseUpdated', false)
        .set('exercises', action.payload);
    case UPDATE_EXERCISES:
      return state
        .set('loading', true)
        .set('exerciseUpdated', false)
        .set('message', '')
        .set('error', false);
    case UPDATE_EXERCISES_FAIL:
      return state
        .set('loading', false)
        .set('error', true)
        .set('exerciseUpdated', false)
        .set('message', 'Sorry, Exercises Updating Failed!');
    case UPDATE_EXERCISES_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('message', 'Exercise updated successfully!')
        .set('exerciseUpdated', true);
    case DELETE_EXERCISE:
      return state
        .set('loading', true)
        .set('message', '')
        .set('error', false);
    case DELETE_EXERCISE_FAIL:
      return state
        .set('loading', false)
        .set('error', true)
        .set('message', 'Sorry, Exercises Deleting Failed!');
    case DELETE_EXERCISE_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('message', 'Exercise deleted successfully!')
        .update('exercises', exercises => {
          return exercises.filter(function(exercise){
            return exercise.ID !== action.deletedExercise.ID;
          });
        });
    case REORDER_EXERCISE:
      return state
        .set('loading', true)
        .set('message', '')
        .set('reorderedExercises', false)
        .set('error', false);
    case REORDER_EXERCISE_FAIL:
      return state
        .set('loading', false)
        .set('error', true)
        .set('reorderedExercises', false)
        .set('message', 'Sorry, Exercises ReOrdering Failed!');
    case REORDER_EXERCISE_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('reorderedExercises', true)
        .set('message', 'Exercise ReOrdering successfully!');
    default:
      return state;
  }
}

export default lessonReducer;

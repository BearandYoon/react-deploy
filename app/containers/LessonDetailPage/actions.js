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

export function loadLesson(lessonId) {
  return {
    type: LOAD_LESSON,
    lessonId
  };
}

export function loadLessonSuccess(payload) {
  return {
    type: LOAD_LESSON_SUCCESS,
    payload
  };
}

export function loadLessonFail(error) {
  return {
    type: LOAD_LESSON_FAIL,
    error
  };
}

export function updateLesson(lesson) {
  return {
    type: UPDATE_LESSON,
    lesson
  };
}

export function updateLessonSuccess(payload) {
  return {
    type: UPDATE_LESSON_SUCCESS,
    payload
  };
}

export function updateLessonFail(error) {
  return {
    type: UPDATE_LESSON_FAIL,
    error
  };
}

export function updateLessonImage(lesson) {
  return {
    type: UPDATE_LESSON_IMAGE,
    lesson
  };
}

export function updateLessonImageSuccess(payload) {
  return {
    type: UPDATE_LESSON_IMAGE_SUCCESS,
    payload
  };
}

export function updateLessonImageFail(error) {
  return {
    type: UPDATE_LESSON_IMAGE_FAIL,
    error
  };
}

export function deleteLesson(lessonId) {
  return {
    type: DELETE_LESSON,
    lessonId
  };
}

export function deleteLessonSuccess(payload) {
  return {
    type: DELETE_LESSON_SUCCESS,
    payload
  };
}

export function deleteLessonFail(error) {
  return {
    type: DELETE_LESSON_FAIL,
    error
  };
}

export function loadExercises(lessonId) {
  return {
    type: LOAD_EXERCISES,
    lessonId
  };
}

export function loadExercisesSuccess(payload) {
  return {
    type: LOAD_EXERCISES_SUCCESS,
    payload
  };
}

export function loadExercisesFail(error) {
  return {
    type: LOAD_EXERCISES_FAIL,
    error
  };
}

export function updateExercise(lessonId, newExercise) {
  return {
    type: UPDATE_EXERCISES,
    lessonId,
    newExercise
  };
}

export function updateExerciseSuccess(payload) {
  return {
    type: UPDATE_EXERCISES_SUCCESS,
    payload
  };
}

export function updateExerciseFail(error) {
  return {
    type: UPDATE_EXERCISES_FAIL,
    error
  };
}

export function deleteExercise(lessonId, exerciseId) {
  return {
    type: DELETE_EXERCISE,
    lessonId,
    exerciseId
  };
}

export function deleteExerciseSuccess(deletedExercise) {
  return {
    type: DELETE_EXERCISE_SUCCESS,
    deletedExercise
  };
}

export function deleteExerciseFail(error) {
  return {
    type: DELETE_EXERCISE_FAIL,
    error
  };
}

export function addNewExercise(lessonId, newExercise) {
  return {
    type: ADD_NEW_EXERCISE,
    lessonId,
    newExercise
  };
}

export function addNewExerciseSuccess(payload) {
  return {
    type: ADD_NEW_EXERCISE_SUCCESS,
    payload
  };
}

export function addNewExerciseFail(error) {
  return {
    type: ADD_NEW_EXERCISE_FAIL,
    error
  };
}

export function reorderExercise(exerciseIds) {
  return {
    type: REORDER_EXERCISE,
    exerciseIds
  };
}

export function reorderExerciseSuccess(payload) {
  return {
    type: REORDER_EXERCISE_SUCCESS
  };
}

export function reorderExerciseFail(error) {
  return {
    type: REORDER_EXERCISE_FAIL,
    error
  };
}

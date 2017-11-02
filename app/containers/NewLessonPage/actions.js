import {
  ADD_NEW_LESSON,
  ADD_NEW_LESSON_SUCCESS,
  ADD_NEW_LESSON_FAIL,

  UPDATE_LESSON_IMAGE,
  UPDATE_LESSON_IMAGE_SUCCESS,
  UPDATE_LESSON_IMAGE_FAIL
} from './constants';

export function addNewLesson(lessonInfo) {
  return {
    type: ADD_NEW_LESSON,
    lesson: lessonInfo
  };
}

export function addNewLessonSuccess(payload) {
  return {
    type: ADD_NEW_LESSON_SUCCESS,
    payload
  };
}

export function addNewLessonFail(error) {
  return {
    type: ADD_NEW_LESSON_FAIL,
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

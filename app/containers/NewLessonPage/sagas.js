import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { requestBackend } from 'utils/request';

import { addNewLessonSuccess, addNewLessonFail, updateLessonImageSuccess, updateLessonImageFail } from './actions';
import { ADD_NEW_LESSON, UPDATE_LESSON_IMAGE } from './constants';

export function* addNewLesson(lesson) {
  try {
    const items = yield call(requestBackend, `/lessons`, {
      method: 'POST',
      body: JSON.stringify({ ...lesson.lesson }),
    });
    yield put(addNewLessonSuccess(items));
  } catch (err) {
    yield put(addNewLessonFail(err));
  }
}

export function* addNewLessonWatcher() {
  const watcher = yield takeLatest(ADD_NEW_LESSON, addNewLesson);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* updateLessonImage(lesson) {
  try {
    const items = yield call(requestBackend, `/lessons/${lesson.lesson.ID}/image`, {
      isImage: true,
      method: 'POST',
      body: lesson.lesson.Img,
    });
    yield put(updateLessonImageSuccess(items));
  } catch (err) {
    yield put(updateLessonImageFail(err));
  }
}

export function* updateLessonImageWatcher() {
  const watcher = yield takeLatest(UPDATE_LESSON_IMAGE, updateLessonImage);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  addNewLessonWatcher,
  updateLessonImageWatcher
];

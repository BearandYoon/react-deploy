
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { requestBackend } from 'utils/request';

import { loadLessonsSuccess, loadLessonsFail, reorderLessonsSuccess, reorderLessonsFail } from './actions';
import { LOAD_LESSONS, REORDER_LESSONS } from './constants';

export function* loadLessons() {
  try {
    const items = yield call(requestBackend, `/lessons`, {
      method: 'GET'
    });
    yield put(loadLessonsSuccess(items));
  } catch (err) {
    yield put(loadLessonsFail(err));
  }
}

export function* loadLessonsWatcher() {
  const watcher = yield takeLatest(LOAD_LESSONS, loadLessons);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* reorderLessons(data) {
  try {
    const items = yield call(requestBackend, `/lessons/order`, {
      method: 'PUT',
      body: JSON.stringify( data.lessons )
    });
    yield put(reorderLessonsSuccess(items));
  } catch (err) {
    yield put(reorderLessonsFail(err));
  }
}

export function* reorderLessonsWatcher() {
  const watcher = yield takeLatest(REORDER_LESSONS, reorderLessons);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  loadLessonsWatcher,
  reorderLessonsWatcher
];

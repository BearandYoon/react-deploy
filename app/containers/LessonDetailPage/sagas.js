
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { requestBackend } from 'utils/request';

import { loadLessonSuccess, loadLessonFail,
          updateLessonSuccess, updateLessonFail,
          updateLessonImageSuccess, updateLessonImageFail,
          deleteLessonSuccess, deleteLessonFail,
          loadExercisesSuccess, loadExercisesFail,
          addNewExerciseSuccess, addNewExerciseFail,
          updateExerciseSuccess, updateExerciseFail,
          deleteExerciseSuccess, deleteExerciseFail,
          reorderExerciseSuccess, reorderExerciseFail
} from './actions';

import { LOAD_LESSON, UPDATE_LESSON, UPDATE_LESSON_IMAGE, DELETE_LESSON,
          LOAD_EXERCISES, ADD_NEW_EXERCISE, UPDATE_EXERCISES,
          DELETE_EXERCISE, REORDER_EXERCISE } from './constants';

export function* loadLesson(lesson) {
  try {
    const items = yield call(requestBackend, `/lessons/${lesson.lessonId}`, {
      method: 'GET'
    });
    yield put(loadLessonSuccess(items));
  } catch (err) {
    yield put(loadLessonFail(err));
  }
}

export function* loadLessonWatcher() {
  const watcher = yield takeLatest(LOAD_LESSON, loadLesson);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* updateLesson(lesson) {
  try {
    const items = yield call(requestBackend, `/lessons/${lesson.lesson.ID}`, {
      method: 'PUT',
      body: JSON.stringify({ ...lesson.lesson }),
    });
    yield put(updateLessonSuccess(items));
  } catch (err) {
    yield put(updateLessonFail(err));
  }
}

export function* updateLessonWatcher() {
  const watcher = yield takeLatest(UPDATE_LESSON, updateLesson);
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

export function* deleteLesson(lesson) {
  try {
    const items = yield call(requestBackend, `/lessons/${lesson.lessonId}`, {
      method: 'DELETE',
    });
    yield put(deleteLessonSuccess(items));
  } catch (err) {
    yield put(deleteLessonFail(err));
  }
}

export function* deleteLessonWatcher() {
  const watcher = yield takeLatest(DELETE_LESSON, deleteLesson);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* addNewExercise(data) {
  try {
    const items = yield call(requestBackend, `/lessons/${data.lessonId}/exercise`, {
      method: 'POST',
      body: JSON.stringify({ ...data.newExercise }),
    });
    yield put(addNewExerciseSuccess(items));
  } catch (err) {
    yield put(addNewExerciseFail(err));
  }
}

export function* addNewExerciseWatcher() {
  const watcher = yield takeLatest(ADD_NEW_EXERCISE, addNewExercise);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* loadExercises(data) {
  try {
    const items = yield call(requestBackend, `/lessons/${data.lessonId}/exercise`, {
      method: 'GET',
    });
    yield put(loadExercisesSuccess(items));
  } catch (err) {
    yield put(loadExercisesFail(err));
  }
}

export function* loadExercisesWatcher() {
  const watcher = yield takeLatest(LOAD_EXERCISES, loadExercises);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* updateExercise(data) {
  try {
    const items = yield call(requestBackend, `/lessons/${data.lessonId}/exercise/${data.newExercise.ID}`, {
      method: 'PUT',
      body: JSON.stringify({ ...data.newExercise })
    });
    yield put(updateExerciseSuccess(items));
  } catch (err) {
    yield put(updateExerciseFail(err));
  }
}

export function* updateExerciseWatcher() {
  const watcher = yield takeLatest(UPDATE_EXERCISES, updateExercise);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* deleteExercise(data) {
  try {
    const items = yield call(requestBackend, `/lessons/${data.lessonId}/exercise/${data.exerciseId}`, {
      method: 'DELETE',
    });
    yield put(deleteExerciseSuccess(items));
  } catch (err) {
    yield put(deleteExerciseFail(err));
  }
}

export function* deleteExerciseWatcher() {
  const watcher = yield takeLatest(DELETE_EXERCISE, deleteExercise);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* reorderExercise(data) {
  try {
    const items = yield call(requestBackend, `/lessons/exercises/order`, {
      method: 'PUT',
      body: JSON.stringify( data.exerciseIds )
    });
    yield put(reorderExerciseSuccess(items));
  } catch (err) {
    yield put(reorderExerciseFail(err));
  }
}

export function* reorderExerciseWatcher() {
  const watcher = yield takeLatest(REORDER_EXERCISE, reorderExercise);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  loadLessonWatcher,
  updateLessonWatcher,
  updateLessonImageWatcher,
  deleteLessonWatcher,
  loadExercisesWatcher,
  addNewExerciseWatcher,
  updateExerciseWatcher,
  deleteExerciseWatcher,
  reorderExerciseWatcher
];

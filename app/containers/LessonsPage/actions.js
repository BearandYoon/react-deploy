/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_LESSONS,
  LOAD_LESSONS_SUCCESS,
  LOAD_LESSONS_FAIL,

  REORDER_LESSONS,
  REORDER_LESSONS_SUCCESS,
  REORDER_LESSONS_FAIL
} from './constants';

export function loadLessons() {
  return {
    type: LOAD_LESSONS,
  };
}

export function loadLessonsSuccess(payload) {
  return {
    type: LOAD_LESSONS_SUCCESS,
    payload
  };
}

export function loadLessonsFail(error) {
  return {
    type: LOAD_LESSONS_FAIL,
    error
  };
}

export function reorderLessons(lessons) {
  return {
    type: REORDER_LESSONS,
    lessons
  };
}

export function reorderLessonsSuccess(payload) {
  return {
    type: REORDER_LESSONS_SUCCESS,
    payload
  };
}

export function reorderLessonsFail(error) {
  return {
    type: REORDER_LESSONS_FAIL,
    error
  };
}

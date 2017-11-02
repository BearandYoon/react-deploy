/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_LESSONS = 'LOAD_LESSONS';
export const LOAD_LESSONS_SUCCESS = 'LOAD_LESSONS_SUCCESS';
export const LOAD_LESSONS_FAIL = 'LOAD_LESSONS_FAIL';

export const REORDER_LESSONS = 'REORDER_LESSONS';
export const REORDER_LESSONS_SUCCESS = 'REORDER_LESSONS_SUCCESS';
export const REORDER_LESSONS_FAIL = 'REORDER_LESSONS_FAIL';

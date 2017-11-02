import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'lessons',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/LessonsPage/reducer'),
          import('containers/LessonsPage/sagas'),
          import('containers/LessonsPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('lessons', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/lesson/:id',
      name: 'lesson',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/LessonDetailPage/reducer'),
          import('containers/LessonDetailPage/sagas'),
          import('containers/LessonDetailPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('lesson', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/newLesson',
      name: 'newLesson',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/NewLessonPage/reducer'),
          import('containers/NewLessonPage/sagas'),
          import('containers/NewLessonPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('newLesson', reducer.default);
          injectSagas(sagas.default);

          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}

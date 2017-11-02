import React from 'react';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import IconButton from 'material-ui/IconButton';
import UpWard from 'material-ui/svg-icons/Navigation/arrow-upward';
import DownWard from 'material-ui/svg-icons/Navigation/arrow-downward';
import NotificationSystem from 'react-notification-system';

import { loadLesson, updateLesson, updateLessonImage, deleteLesson, loadExercises,
          addNewExercise, updateExercise, deleteExercise, reorderExercise } from './actions';
import { prepareSelector } from 'shared/functions';

import './style.css';

Array.prototype.move = function(from, to){
  this.splice(to, 0, this.splice(from, 1)[0]);
  return this;
};

export class LessonsDetailPage extends React.PureComponent {
  state = {
    lessonId: 0,
    lesson: null,
    newExercise: {
      IntroText: '',
      ModuleText: '',
      ExerciseTitle: 'New Exercise',
      Img: 'https://i.imgur.com/LMAS2l3.png',
      Target: '',
      Time: '',
      Active: false,
      Script: ''
    },
    openNewExercise: false,
    exercises: null,
    isDeleted: false
  };

  _handleLessonImageChange = this._handleLessonImageChange.bind(this);

  _notificationSystem = null;

  componentWillMount() {
    if (this.props.params) {
      this.setState({
        lessonId: this.props.params.id
      });
      this.props.dispatchLoadLesson(this.props.params.id);
      this.props.dispatchLoadExercises(this.props.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lesson) {
      let newLesson = nextProps.lesson;
      if (newLesson.Img && newLesson.Img.indexOf('https://storage.googleapis.com') !== -1) {
        newLesson.Img = nextProps.lesson.Img + '?' + new Date().getTime();
      }
      this.setState({
        lesson: newLesson
      });
    }

    if (nextProps.exercises) {
      this.setState({
        exercises: nextProps.exercises
      });
    }

    if (nextProps.isDeleted) {
      browserHistory.push('/');
    }

    if (nextProps.exerciseAdded) {
      this.props.dispatchLoadLesson(this.props.params.id);
      this.props.dispatchLoadExercises(this.props.params.id);
      this.setState({
        openNewExercise: false,
        newExercise: {
          IntroText: '',
          ModuleText: '',
          ExerciseTitle: 'New Exercise',
          Img: 'https://i.imgur.com/LMAS2l3.png',
          Target: '',
          Time: '',
          Active: false,
          Script: ''
        }
      })
    }

    if (nextProps.exerciseUpdated) {
      this.props.dispatchLoadExercises(this.props.params.id);
    }

    if (nextProps.lessonImageUpdated) {
      this.props.dispatchLoadLesson(this.props.params.id);
    }

    if (nextProps.reorderedExercises !== this.props.reorderedExercises) {
      this.props.dispatchLoadExercises(this.props.params.id);
    }

    if (nextProps.message) {
      if (nextProps.error) {
        this._notificationSystem.addNotification({
          message: nextProps.message,
          level: 'error'
        });
      } else {
        this._notificationSystem.addNotification({
          message: nextProps.message,
          level: 'success'
        });
      }
    }
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  };

  _handleLessonImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      let lesson = this.state.lesson;
      lesson.Img = reader.result;

      this.setState({
        lesson: lesson
      });

      this.props.dispatchUpdateLessonImage(lesson);
    };

    reader.readAsDataURL(file)
  }

  onChangeLessonTitle = (event, newValue) => {
    this.setState({
      lesson: {
        ...this.state.lesson,
        Title: newValue
      }
    })
  };

  switchLessonStatus = (event, isInputChecked) => {
    this.setState({
      lesson: {
        ...this.state.lesson,
        Active: isInputChecked
      }
    })
  };

  onChangeLessonCode = (event, newValue) => {
    this.setState({
      lesson: {
        ...this.state.lesson,
        Code: newValue
      }
    })
  };

  onChangeLessonBlurb = (event, newValue) => {
    this.setState({
      lesson: {
        ...this.state.lesson,
        ShortBlurb: newValue
      }
    })
  };

  onChangeLessonIntro = (event, newValue) => {
    this.setState({
      lesson: {
        ...this.state.lesson,
        IntroText: newValue
      }
    })
  };

  openAddNewExercise = () => {
    this.setState({
      openNewExercise: true
    })
  };

  cancelNewExercise = () => {
    this.setState({
      openNewExercise: false
    })
  };

  addNewExercise = () => {
    this.state.newExercise.Script = this.state.newExercise.Script.replace(new RegExp('\n', 'g'), '\\n');
    this.props.dispatchAddNewExercise(this.state.lessonId, this.state.newExercise);
  };

  switchNewExerciseStatus = (event, newStatus) => {
    this.setState({
      newExercise: {
        ...this.state.newExercise,
        Active: newStatus
      }
    });
  };

  onChangeNewExerciseScript = (event, newScript) => {
    this.setState({
      newExercise: {
        ...this.state.newExercise,
        Script: newScript
      }
    });
  };

  onChangeNewExerciseModuleTxt = (event, newModuleTxt) => {
    this.setState({
      newExercise: {
        ...this.state.newExercise,
        ModuleText: newModuleTxt,
        ExerciseText: newModuleTxt
      }
    });
  };

  updateLesson = () => {
    console.log('updateLesson = ', this.state.lesson);
    this.props.dispatchUpdateLesson(this.state.lesson);
  };

  deleteLesson = () => {
    this.props.dispatchDeleteLesson(this.state.lessonId);
  };

  cancelUpdateLesson = () => {
    browserHistory.push('/');
  };

  handleExerciseScript = (event, newValue, exerciseId) => {
    let newExercises = [];
    this.state.exercises.forEach(exercise => {
      let newExercise = {
        ...exercise
      };
      if (exercise.ID === exerciseId) {
        newExercise.Script = newValue;
      }

      newExercises.push(newExercise);
    });
    this.setState({
      exercises: newExercises
    });
  };

  handleExerciseModule = (event, newValue, exerciseId) => {
    let newExercises = [];
    this.state.exercises.forEach(exercise => {
      let newExercise = {
        ...exercise
      };
      if (exercise.ID === exerciseId) {
        newExercise.ModuleText = newValue;
      }

      newExercises.push(newExercise);
    });
    this.setState({
      exercises: newExercises
    });
  };

  handleExerciseStatus = (event, value, exerciseId) => {
    let newExercises = [];
    this.state.exercises.forEach(exercise => {
      let newExercise = {
        ...exercise
      };
      if (exercise.ID === exerciseId) {
        newExercise.Active = value;
      }

      newExercises.push(newExercise);
    });
    this.setState({
      exercises: newExercises
    });
  };

  updateExercise = (lessonId, exercise) => {
    exercise.Script = exercise.Script.replace(new RegExp('\n', 'g'), '\\n');
    this.props.dispatchUpdateExercise(lessonId, exercise);
  };

  deleteExercise = (exercise) => {
    this.props.dispatchDeleteExercise(this.state.lessonId, exercise.ID);
  };

  upOrderExercise = (event, exercise) => {
    let reorderedExercises = [];
    let movedExIndex = -1;
    if (this.state.exercises.length) {
      this.state.exercises.map(function (item, index) {
        if (exercise.ID === item.ID) {
          movedExIndex = index;
        }
        reorderedExercises.push(parseInt(item.ID));
      })
    }
    if (movedExIndex > 0) {
      reorderedExercises.move(movedExIndex, movedExIndex - 1);
    }
    this.props.dispatchReorderExercise({
      lessonId: parseInt(this.state.lessonId),
      exerciseOrder: reorderedExercises
    });
  };

  downOrderExercise = (event, exercise) => {
    let reorderedExercises = [];
    let movedExIndex = -1;
    if (this.state.exercises.length) {
      this.state.exercises.map(function (item, index) {
        if (exercise.ID === item.ID) {
          movedExIndex = index;
        }
        reorderedExercises.push(parseInt(item.ID));
      })
    }
    if (movedExIndex !== -1 && movedExIndex < reorderedExercises.length - 1) {
      reorderedExercises.move(movedExIndex, movedExIndex + 1);
    }
    this.props.dispatchReorderExercise({
      lessonId: parseInt(this.state.lessonId),
      exerciseOrder: reorderedExercises
    });
  };

  loadExercises = () => {
    let exercises = [];
    const textFieldStyle = {
      fontSize: '20px',
      width: '100%',
    };
    if (this.state.exercises.length) {
      this.state.exercises.map(function (exercise, index) {
        exercise.Script = exercise.Script.replace(new RegExp('\\\\n', 'g'), '\n');
        exercises.push(
          <div className="exercise-list-item" key={index}>
            <Paper className="exercise-item">
              <div className="exercise-header">
                <TextField
                  hintText="Exercise Title"
                  style={{ display: 'inline-block', marginRight: '50px', fontSize: '24px' }}
                  value={exercise.Title}
                  disabled={true}
                />
                <Toggle
                  label="Active"
                  labelStyle={{width: '100px', fontSize: '20px'}}
                  style={{display: 'inline-block', width: '15%'}}
                  toggled={exercise.Active}
                  onToggle={(event, value) => this.handleExerciseStatus(event, value, exercise.ID)}
                />
                <div className="exercise-order-container">
                  <IconButton>
                    <UpWard onClick={(event) => this.upOrderExercise(event, exercise)} />
                  </IconButton>
                  <IconButton>
                    <DownWard onClick={(event) => this.downOrderExercise(event, exercise)} />
                  </IconButton>
                </div>
              </div>
              <div className="exercise-body">
                <TextField
                  hintText="Module Text"
                  floatingLabelText="Module Text"
                  multiLine={true}
                  style={textFieldStyle}
                  value={exercise.ModuleText}
                  maxLength="1023"
                  onChange={(event, newModuleTxt) => this.handleExerciseModule(event, newModuleTxt, exercise.ID)}
                />

                <TextField
                  hintText="Script"
                  floatingLabelText="Script"
                  style={textFieldStyle}
                  multiLine={true}
                  value={exercise.Script}
                  onChange={(event, newScript) => this.handleExerciseScript(event, newScript, exercise.ID)}
                />

                <div className="lesson-action-container">
                  <FlatButton label="Update" className="btn-add" onClick={() => this.updateExercise(this.state.lessonId, exercise)}/>
                  <FlatButton label="Delete" className="btn-delete" onClick={() => this.deleteExercise(exercise)} />
                </div>
              </div>
            </Paper>
          </div>
        );
      }.bind(this));
      return exercises;
    }
  };

  render() {
    const textFieldStyle = {
      fontSize: '20px',
      width: '100%',
    };
    const { lesson, newExercise, openNewExercise } = this.state;
    const { exercises } = this.props;

    let avatarStyle = {
      backgroundImage: 'none'
    };

    if ( this.props.lesson && this.props.lesson.Img ) {
      avatarStyle = {
        backgroundImage: `url(${this.props.lesson.Img})`
      };
    }

    return (
      <article className="article">
        <Helmet
          title="Lesson Detail Page"
          meta={[
            { name: 'description', content: 'Lesson Detail Page' },
          ]}
        />
        <div>
          <NotificationSystem ref="notificationSystem" />
        </div>
        {
          lesson ?
            <div className="page-container">
              <div className="lesson-content-container">
                <h1 className="page-title"></h1>
                <Paper className="lesson-container">
                  <div className="lesson-header">
                    <TextField
                      hintText="Lesson Title"
                      style={{ fontSize: '30px', width: '100%' }}
                      value={lesson.Title}
                      maxLength="30"
                      onChange={this.onChangeLessonTitle}
                    />
                  </div>

                  <div className="lesson-content">
                    <div className="lesson-content-detail">
                      <Toggle
                        label="Active"
                        labelStyle={{ width: '150px', fontSize: '20px' }}
                        style={{ width: '15%' }}
                        toggled={lesson.Active}
                        onToggle={this.switchLessonStatus}
                      />

                      <TextField
                        hintText="Access Code"
                        floatingLabelText="Access Code"
                        style={textFieldStyle}
                        value={lesson.Code}
                        maxLength="256"
                        onChange={this.onChangeLessonCode}
                      />

                      <TextField
                        hintText="Short Blurb"
                        floatingLabelText="Short Blurb"
                        multiLine={true}
                        rows={2}
                        style={textFieldStyle}
                        value={lesson.ShortBlurb}
                        maxLength="244"
                        onChange={this.onChangeLessonBlurb}
                      />

                      <TextField
                        hintText="Intro Text"
                        floatingLabelText="Intro Text"
                        style={textFieldStyle}
                        multiLine={true}
                        value={lesson.IntroText}
                        maxLength="1024"
                        onChange={this.onChangeLessonIntro}
                      />
                    </div>
                    <div className="lesson-logo-container">
                      <div className="logo-container">
                        <div className="lesson-logo" style={avatarStyle}>
                        </div>
                        <label className="custom-file-upload">
                          <input id="file-upload" type="file" accept="image/x-png" onChange={this._handleLessonImageChange} />
                          Change Lesson Image
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="lesson-action-container">
                    <FlatButton label="Update Lesson" className="btn-add" onClick={this.updateLesson}/>
                    <FlatButton label="Delete Lesson" className="btn-delete" onClick={this.deleteLesson}/>
                    <FlatButton label="Cancel" className="btn-add" onClick={this.cancelUpdateLesson} />
                  </div>
                </Paper>
              </div>

              <div className="exercise-container">
                {
                  (exercises || openNewExercise) &&
                    <div className="exercise-container-header">
                      <h1 className="header">
                        Exercises
                      </h1>
                    </div>
                }
                {
                  exercises &&
                  <div className="exercise-list-container">
                  {
                    this.loadExercises()
                  }
                  </div>
                }
                {
                  openNewExercise &&
                    <div className="exercise-list-container">
                      <div className="exercise-list-item">
                        <Paper className="exercise-item">
                          <div className="exercise-header">
                            <TextField
                              hintText="Exercise Title"
                              style={{ display: 'inline-block', marginRight: '50px', fontSize: '24px' }}
                              value={newExercise.ExerciseTitle}
                              disabled={true}
                            />
                            <Toggle
                              label="Active"
                              labelStyle={{width: '100px', fontSize: '20px'}}
                              style={{display: 'inline-block', width: '50%'}}
                              toggled={newExercise.Active}
                              onToggle={this.switchNewExerciseStatus}
                            />
                          </div>
                          <div className="exercise-body">
                            <TextField
                              hintText="Module Text"
                              floatingLabelText="Module Text"
                              multiLine={true}
                              style={textFieldStyle}
                              value={newExercise.ModuleText}
                              maxLength="1023"
                              onChange={this.onChangeNewExerciseModuleTxt}
                            />

                            <TextField
                              hintText="Script"
                              floatingLabelText="Script"
                              style={textFieldStyle}
                              multiLine={true}
                              value={newExercise.Script}
                              onChange={this.onChangeNewExerciseScript}
                            />

                            <div className="lesson-action-container">
                              <FlatButton label="Add" className="btn-add" onClick={this.addNewExercise}/>
                              <FlatButton label="Cancel" className="btn-delete" onClick={this.cancelNewExercise}/>
                            </div>
                          </div>
                        </Paper>
                      </div>
                    </div>
                }
                {
                  !this.state.openNewExercise &&
                  <FlatButton className="btn-add-exercise"
                              label="Add new exercise"
                              labelStyle={{ textTransform: 'none', fontSize: '18px' }}
                              onClick={this.openAddNewExercise}
                  />
                }
              </div>
            </div>
            : null
        }
      </article>
    );
  }
}

LessonsDetailPage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.bool,
  message: React.PropTypes.string,
  lesson: React.PropTypes.any,
  exercises: React.PropTypes.any,
  isDeleted: React.PropTypes.bool,
  dispatchLoadLesson: React.PropTypes.func.isRequired,
  dispatchUpdateLesson: React.PropTypes.func.isRequired,
  dispatchUpdateLessonImage: React.PropTypes.func.isRequired,
  dispatchDeleteLesson: React.PropTypes.func.isRequired,
  dispatchLoadExercises: React.PropTypes.func.isRequired,
  dispatchAddNewExercise: React.PropTypes.func.isRequired,
  dispatchDeleteExercise: React.PropTypes.func.isRequired,
  dispatchReorderExercise: React.PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  // API
  dispatchLoadLesson: (lessonId) => dispatch(loadLesson(lessonId)),
  dispatchUpdateLesson: (lesson) => dispatch(updateLesson(lesson)),
  dispatchUpdateLessonImage: (lesson) => dispatch(updateLessonImage(lesson)),
  dispatchDeleteLesson: (lessonId) => dispatch(deleteLesson(lessonId)),
  dispatchLoadExercises: (lessonId) => dispatch(loadExercises(lessonId)),
  dispatchAddNewExercise: (lessonId, newExercise) => dispatch(addNewExercise(lessonId, newExercise)),
  dispatchUpdateExercise: (lessonId, newExercise) => dispatch(updateExercise(lessonId, newExercise)),
  dispatchDeleteExercise: (lessonId, exerciseId) => dispatch(deleteExercise(lessonId, exerciseId)),
  dispatchReorderExercise: (exerciseIds) => dispatch(reorderExercise(exerciseIds)),
});

const prepareLessonsSelector = value => prepareSelector('lesson', value);
const mapStateToProps = createStructuredSelector({
  lesson: prepareLessonsSelector('lesson'),
  loading: prepareLessonsSelector('loading'),
  error: prepareLessonsSelector('error'),
  message: prepareLessonsSelector('message'),
  exercises: prepareLessonsSelector('exercises'),
  isDeleted: prepareLessonsSelector('isDeleted'),
  exerciseAdded: prepareLessonsSelector('exerciseAdded'),
  exerciseUpdated: prepareLessonsSelector('exerciseUpdated'),
  lessonImageUpdated: prepareLessonsSelector('lessonImageUpdated'),
  reorderedExercises: prepareLessonsSelector('reorderedExercises')
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(LessonsDetailPage);

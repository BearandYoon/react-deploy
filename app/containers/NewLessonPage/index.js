import React from 'react';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { prepareSelector } from 'shared/functions';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import NotificationSystem from 'react-notification-system';

import { addNewLesson, updateLessonImage } from './actions';

import './style.css';

export class NewLessonPage extends React.PureComponent {
  state = {
    lesson: {
      Title: '',
      Enabled: false,
      Code: '',
      ShortBlurb: '',
      IntroText: '',
      Img: 'https://i.imgur.com/LMAS2l3.png'
    },
    newExercise: null
  };
  _notificationSystem = null;

  _handleLessonImageChange = this._handleLessonImageChange.bind(this);

  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.addedLesson) {
      browserHistory.push('/');
    }

    if (nextProps.lessonImageUpdated) {
      let lessonImageUrl = nextProps.lessonImageUrl;
      if (lessonImageUrl && lessonImageUrl.indexOf('https://storage.googleapis.com') !== -1) {
        let updatedLesson = this.state.lesson;
        updatedLesson.Img = updatedLesson.Img + '?' + new Date().getTime();
        this.setState({
          lesson: updatedLesson
        })
      }
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
        Enabled: isInputChecked
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

  addNewLesson = () => {
    this.props.dispatchAddNewLesson(this.state.lesson);
  };

  cancelNewLesson = () => {
    browserHistory.push('/');
  };

  render() {
    const { lesson } = this.state;
    const { loading } = this.props;
    const textFieldStyle = {
      fontSize: '20px',
      width: '100%',
    };

    let avatarStyle = {
      backgroundImage: 'none'
    };

    if ( this.state.lesson && this.state.lesson.Img ) {
      avatarStyle = {
        backgroundImage: `url(${this.state.lesson.Img})`
      };
    }

    return (
      <article className="article">
        <Helmet
          title="Lesson Detail Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application Lesson' },
          ]}
        />
        <div>
          <NotificationSystem ref="notificationSystem" />
        </div>
        <div className="page-container">
          <div className="lesson-content-container">
            <h1 className="page-title"></h1>
            <Paper className="lesson-container">
              <div className="lesson-header">
                <TextField
                  hintText="Lesson Title"
                  style={{ fontSize: '30px', width: '100%' }}
                  value={lesson.Title}
                  onChange={this.onChangeLessonTitle}
                />
              </div>

              <div className="lesson-content">
                <div className="lesson-content-detail">
                  <Toggle
                    label="Enabled"
                    labelStyle={{ width: '150px', fontSize: '20px' }}
                    toggled={lesson.Enabled}
                    onToggle={this.switchLessonStatus}
                  />

                  <TextField
                    hintText="Access Code"
                    floatingLabelText="Access Code"
                    style={textFieldStyle}
                    value={lesson.Code}
                    onChange={this.onChangeLessonCode}
                  />

                  <TextField
                    hintText="Short Blurb"
                    floatingLabelText="Short Blurb"
                    multiLine={true}
                    rows={1}
                    style={textFieldStyle}
                    value={lesson.ShortBlurb}
                    onChange={this.onChangeLessonBlurb}
                  />

                  <TextField
                    hintText="Intro Text"
                    floatingLabelText="Intro Text"
                    multiLine={true}
                    style={textFieldStyle}
                    value={lesson.IntroText}
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
              {
                !loading &&
                <div className="lesson-action-container">
                  <FlatButton label="Add" className="btn-add" onClick={this.addNewLesson} />
                  <FlatButton label="Cancel" className="btn-delete" onClick={this.cancelNewLesson} />
                </div>
              }
            </Paper>
          </div>
        </div>
      </article>
    );
  }
}

NewLessonPage.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  error: React.PropTypes.bool.isRequired,
  message: React.PropTypes.string.isRequired,
  addedLesson: React.PropTypes.bool.isRequired,
  lessonImageUrl: React.PropTypes.string,
  dispatchAddNewLesson: React.PropTypes.func.isRequired,
  dispatchUpdateLessonImage: React.PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  // API
  dispatchAddNewLesson: (lessonInfo) => dispatch(addNewLesson(lessonInfo)),
  dispatchUpdateLessonImage: (lesson) => dispatch(updateLessonImage(lesson))
});

const prepareLessonsSelector = value => prepareSelector('newLesson', value);
const mapStateToProps = createStructuredSelector({
  loading: prepareLessonsSelector('loading'),
  error: prepareLessonsSelector('error'),
  message: prepareLessonsSelector('message'),
  addedLesson: prepareLessonsSelector('addedLesson'),
  lessonImageUpdated: prepareLessonsSelector('lessonImageUpdated'),
  lessonImageUrl: prepareLessonsSelector('lessonImageUrl')
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(NewLessonPage);

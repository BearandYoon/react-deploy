import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import DragSortableList from 'react-drag-sortable'

import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';
import { grey400 } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import addLessonImage from 'assets/images/add.png';

import { loadLessons, reorderLessons } from './actions';
import { prepareSelector } from 'shared/functions';
import { endpoint } from 'shared/constants';

export class LessonsPage extends React.PureComponent {

  componentWillMount() {
    this.props.dispatchLoadLesson();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.reorderedLessons !== nextProps.reorderedLessons) {
      this.props.dispatchLoadLesson();
    }
  }

  lessonList = () => {
    if (this.props.lessons.length) {
      let lessonList = [];
      this.props.lessons.map(function(lesson, index) {
        lessonList.push(
          {
            content:
                    (<div key={lesson.ID}>
                      <Link to={`/lesson/${lesson.ID}`}>
                        <ListItem
                          leftAvatar={<Avatar src={lesson.Img} />}
                          primaryText={lesson.Title}
                        />
                      </Link>
                      <Divider />
                    </div>)
          }
        )
      }.bind(this));
      return lessonList;
    }
  };

  onSort = (sortedList, dropEvent) => {
    let sortedLessons = [];
    if (sortedList.length) {
      sortedList.forEach(item => {
        sortedLessons.push(parseInt(item.content.key));
      });
      this.props.dispatchReorderLessons(sortedLessons);
    }
  };

  render() {
    const iconButtonElement = (
      <IconButton
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400} />
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    );

    return (
      <article className="article">
        <Helmet
          title="Lessons Page"
          meta={[
            { name: 'description', content: 'Lessons List Page' },
          ]}
        />
        <div className="page-container">
          <h1 className="page-title">
            Exercises & Lessons
          </h1>
          <Paper zDepth={1}>
            <div className="list-header-container">
              <h1 className="list-header-title">
                Lessons
              </h1>
              <div className="actions-container">
                <button className="btn-lesson-action">Save</button>
                <button className="btn-lesson-action">Cancel</button>
              </div>
            </div>

            <div className="lesson-list-container">
              <List className="lesson-list">
                <DragSortableList items={this.lessonList()} onSort={this.onSort} dropBackTransitionDuration={0.3} type="vertical"/>
                <Link to="/newLesson">
                  <ListItem
                    leftAvatar={<Avatar src={addLessonImage} />}
                    primaryText="Add New Lesson"
                  />
                </Link>
              </List>
            </div>
          </Paper>
        </div>
      </article>
    );
  }
}

LessonsPage.propTypes = {
  loading: React.PropTypes.bool,
  dispatchLoadLesson: React.PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  // API
  dispatchLoadLesson: () => dispatch(loadLessons()),
  dispatchReorderLessons: (lessons) => dispatch(reorderLessons(lessons))
});

const prepareLessonsSelector = value => prepareSelector('lessons', value);
const mapStateToProps = createStructuredSelector({
  lessons: prepareLessonsSelector('lessons'),
  loading: prepareLessonsSelector('loading'),
  reorderedLessons: prepareLessonsSelector('reorderedLessons'),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(LessonsPage);

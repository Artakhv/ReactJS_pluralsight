import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';

class CoursesPage extends Component {
    componentDidMount() {
        this.props.actions.loadCourses().catch(error => {
            alert("Loading courses error" + error)
        });
    }

    render() {
        return (
            <Fragment>
                <h2>Courses</h2>
                <CourseList courses={this.props.courses} />
            </Fragment>
        )
    }
}

CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        courses: state.courses
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // createCourse: course => dispatch(courseActions.createCourse(course))
        actions: bindActionCreators(courseActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

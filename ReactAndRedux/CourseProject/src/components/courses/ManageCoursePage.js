import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";

function ManageCoursePage(props) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({ ...props.errors });

  useEffect(() => {
    //// here I can use destructuring
    if (props.courses.length === 0) {
      props.loadCourses().catch((error) => {
        alert("Loading courses error" + error);
      });
    } else {
      setCourse({...props.course})
    }


    if (props.authors.length === 0) {
      props.loadAuthors().catch((error) => {
        alert("Loading authors error" + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((prevCourse) => {
      // debugger;
      return {
        ...prevCourse,
        [name]: name === "authorId" ? parseInt(value, 10) : value,
      };
    });
  }

  function handleSave(event) {
    event.preventDefault();
    console.log(course);
    props.saveCourse(course).then(() => {
      props.history.push("/courses");
    });
  }

  return (
    <Fragment>
      <CourseForm
        course={course}
        errors={errors}
        authors={props.authors}
        onChange={handleChange}
        onSave={handleSave}
      />
    </Fragment>
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course: course,
    courses: state.courses,
    authors: state.authors,
  };
}

// object way, good way for me
const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  saveCourse: courseActions.saveCourse,
};

// bind way
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: {
//       loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
//       loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
//     },
//   };
// }

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);

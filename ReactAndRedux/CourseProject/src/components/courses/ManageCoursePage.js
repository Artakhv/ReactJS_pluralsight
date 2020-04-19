import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";

function ManageCoursePage(props) {
  useEffect(() => {
    //// here I can use destructuring
    if (props.courses.length === 0) {
      props.loadCourses().catch((error) => {
        alert("Loading courses error" + error);
      });
    }
    if (props.authors.length === 0) {
      props.loadAuthors().catch((error) => {
        alert("Loading authors error" + error);
      });
    }
  },[]);

  return (
    <Fragment>
      <h2>Manage Course</h2>
    </Fragment>
  );
}

ManageCoursePage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors,
  };
}

// object way, good way for me
const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
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

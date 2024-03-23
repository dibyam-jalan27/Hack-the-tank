import React from 'react';
import '../components/css/courseDetails.css';

function CourseDetails() {
  return (
   <div>
       <div className="container">      
      </div>

      {/* Fixed Top */}

      {/* Section */}
      <section className="sub-banner bg-image" style={{ backgroundImage: "url('https://mdbootstrap.com/img/Photos/Slides/img%20(68).jpg')" }}>
        <div className="overlay"></div>
        <div className="container">
          <div className="title-wrapper">
            <h3>My First Bootstrap Page</h3>
          </div>
        </div>
      </section>
      {/* Section End */}

      <div className="course-in-detail">
        <div className="container">
          <div className="row">
            {/* Course details */}
            <div className="col-md-12">
              <div className="card left">
                <div className="course-title-single">
                  <h1 className="bold">UI-UX Web Design, Graphic Design</h1>
                  {/* Course features */}
                  <div className="course-widget-price d-none d-sm-block">
                    <h4 className="course-title">COURSE FEATURES</h4>
                    <ul>
                      {/* List items */}
                    </ul>
                    <h5 className="bt-course">Course Price: 270.00 <span className="small"> (INR)</span></h5>
                    <a className="flat-button bg-orange btn btn-block" href="#">Enroll this Course</a>
                  </div>
                  <div className="entry-content">
                    {/* Course content */}
                  </div>
                </div>
              </div>
            </div>

            {/* Different features */}
            <div className="col-md-12 our-features">
              <h3 className="headline text-center ">Why we are Different</h3>
              <div className="row">
                {/* Feature items */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course materials */}
      <section className="bg-light course-materials">
        <div className="container">
          <h3 className="headline text-center ">Course Materials</h3>
          <div className="row">
            {/* Material items */}
          </div>
        </div>
      </section>
      </div>
  )
}

export default CourseDetails

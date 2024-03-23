import React from 'react'
import '../components/css/courseDetails.css';
function CourseDetails() {
  return (
    <>
        <div class="course-container">
    <section>
  <div class="banner">
    <div class="content">
        <h1>Catchy Headline</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consectetur, leo nec consectetur interdum, est neque elementum diam, quis eleifend odio magna eget metus.</p>
        <div class="btn-box">
        <button class="btn">Learn More</button>
        <button class="btn">Get Started</button>
        </div>
      </div>
    <div class="video-container">
      <video autoplay loop muted poster="poster.jpg">
        <source src="your-video.mp4" type="video/mp4"/>
      </video>
    </div>
  </div>
</section>

<section>
    <div class="border-box">
        <div class="section">
          <img src="happy-students.jpg" alt="Happy Students Icon"/>
          <h3>Happy Students</h3>
          <p>10,000+</p>
        </div>
        <div class="section">
          <img src="lectures.jpg" alt="Lectures Icon"/>
          <h3>Total Lectures</h3>
          <p>500</p>
        </div>
        <div class="section">
          <img src="contents.jpg" alt="Course Contents Icon"/>
          <h3>Course Contents</h3>
          <p>30 Modules</p>
        </div>
      </div>
</section>
</div>
    </>
  )
}

export default CourseDetails

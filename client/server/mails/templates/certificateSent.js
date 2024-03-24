require("dotenv").config()
const certificateTemplate = (name, course, hrs) => {
  return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>Certificate Sent Email</title>
		<style>
			body {
    font-family: Roboto;
}

.certificate-container {
    padding: 50px;
    width: 1024px;
}
.certificate {
    border: 20px solid #0C5280;
    padding: 25px;
    height: 600px;
    position: relative;
}

.certificate:after {
    content: '';
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    position: absolute;
    background-image: url(https://image.ibb.co/ckrVv7/water_mark_logo.png);
    background-size: 100%;
    z-index: -1;
}

.certificate-header > .logo {
    width: 80px;
    height: 80px;
}

.certificate-title {
    text-align: center;    
}

.certificate-body {
    text-align: center;
}

h1 {

    font-weight: 400;
    font-size: 48px;
    color: #0C5280;
}

.student-name {
    font-size: 24px;
}

.certificate-content {
    margin: 0 auto;
    width: 750px;
}

.about-certificate {
    width: 380px;
    margin: 0 auto;
}

.topic-description {

    text-align: center;
}
		</style>
	
	</head>
	
	<body> 
        <div class="certificate-container">
    <div class="certificate">
        <div class="water-mark-overlay"></div>
        <div class="certificate-header">
            <img src="https://diy-assets.classplus.co/_next/image?url=https://ali-cdn-diy-public.classplus.co/prod/2_1699159409371.png&w=1920&q=75" class="logo" alt="">
        </div>
        <div class="certificate-body">
           
            <p class="certificate-title"><strong>Raja Rani Tailor Teaching Team</strong></p>
            <h1>Certificate of Completion</h1>
            <p class="student-name">${name}</p>
            <div class="certificate-content">
                <div class="about-certificate">
                    <p>
                has completed ${course} hours on topic title here online on Date ${Date.now()}
                </p>
                </div>
                <p class="topic-title">
                    The Topic consists of ${hrs} Continuity hours and includes the following:
                </p>
                <div class="text-center">
                    <p class="topic-description text-muted">Contract adminitrator - Types of claim - Claim Strategy - Delay analysis - Thepreliminaries to a claim - The essential elements to a successful claim - Responses - Claim preparation and presentation </p>
                </div>
            </div>
            <div class="certificate-footer text-muted">
                <div class="row">
                    <div class="col-md-6">
                        <p>Principal: Priya Ma'am</p>
                    </div>
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-6">
                                <p>
                                    Accredited by : ${name}
                                </p>
                            </div>
                            <div class="col-md-6">
                                <p>
                                    Endorsed by : Raja Rani Coaching
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
	</body>
	
	</html>`
}
module.exports = certificateTemplate

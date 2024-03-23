require("dotenv").config()
exports.resetPasswordLinkTemplate = (email, name, recoverylink) => {
  return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Password Update Confirmation</title>
        <style>
            body {
                background-color: #ffffff;
                font-family: Arial, sans-serif;
                font-size: 16px;
                line-height: 1.4;
                color: #333333;
                margin: 0;
                padding: 0;
            }
    
    
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                text-align: center;
            }
    
            .logo {
                max-width: 200px;
                margin-bottom: 20px;
            }
    
            .message {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 20px;
            }
    
            .body {
                font-size: 16px;
                margin-bottom: 20px;
            }
    
            .support {
                font-size: 14px;
                color: #999999;
                margin-top: 20px;
            }
    
            .highlight {
                font-weight: bold;
            }
        </style>
    
    </head>
    
    <body>
        <div class="container">
            <a href=${process.env.REACT_APP_LINK}><img class="logo"
                    src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo"></a>
            <div class="message">Password Recovery Link</div>
            <div class="body">
                <p>Hey ${name},</p>
                <p>You recently requested to reset the password for your StudyNotion account [registered email with us : ${email}]. Click the link below to proceed.
                </p>
                <a href=${recoverylink}>${recoverylink}</a>       
                </a>
             <p>If you did not request this password change, please contact us immediately to secure your account.</p>
            </div>
            <div class="support">If you have any questions or need further assistance, please feel free to reach out to us
                at
                <a href="mailto:${process.env.INFO_MAIL}">${process.env.INFO_MAIL}</a>. We are here to help!
            </div>
        </div>
    </body>
    
    </html>`
}

import nodemailer from "nodemailer";
import { EMAIL_USERNAME, EMAIL_PASSWORD, FRONTEND_URL, FRONTEND_PORT } from '../../../config';

const EMAIL_SERVICE = "gmail";
const USER_VERIFICATION_BASE_URL = `${FRONTEND_URL}:${FRONTEND_PORT}/api/auth/verify?`;

export default class EmailSender {

    private static instance: EmailSender;
    private transporter: any;


    private constructor() {
        this.transporter = nodemailer.createTransport({
            service: EMAIL_SERVICE,
            auth: {
                user: EMAIL_USERNAME,
                pass: EMAIL_PASSWORD
            }
        });
    }

    public static getTransporterInstance(): EmailSender {
        if (!EmailSender.instance) {
            EmailSender.instance = new EmailSender();
        }
        return EmailSender.instance;
    }

    public sendConfirmationEmailToUser(userEmail: string, userNickname: string, jwt_token: string) {
        const userAccessLink = USER_VERIFICATION_BASE_URL + "jwt_token=" + jwt_token;

        const mailOptions = {
            from: EMAIL_USERNAME,
            to: userEmail,
            subject: "Dixit - Please confirm your email",
            html: `<h1>Hello, ${userNickname}</h1>
                    <br/> <p>Thank you for the registration in Dixit!</p>
                <a href="${userAccessLink}">Click here to start playing!</a>`
        };

        this.transporter.sendMail(mailOptions, (error: Error, info: any) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`Email to ${userEmail} was sent ` + info.response);
            }
        });
    }
}



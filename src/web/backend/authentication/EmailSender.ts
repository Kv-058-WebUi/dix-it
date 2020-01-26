import nodemailer from "nodemailer";
import { EMAIL_USERNAME, EMAIL_PASSWORD, CLIENT_URL, CLIENT_PORT } from '../../../config';
import { DixitUser } from "../entities/User";

const EMAIL_SERVICE = "gmail";
const USER_VERIFICATION_BASE_URL = `${CLIENT_URL}/api/auth/verify?`;

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

    public sendInvitationEmailToUser(email:string, nickname:string, password:string, jwt_token:string) {

        const userAccessLink = USER_VERIFICATION_BASE_URL + "jwt_token=" + jwt_token;

        const mailOptions = {
            from: EMAIL_USERNAME,
            to: email,
            subject: "Dixit - Invitational",
            html: `<h1>Hello, stranger</h1>
                    <br/> 
                    <p>We are invite you to play our game!</p>
                    <br/>
                    <p>Here is your nickname: ${nickname}</p>
                    <p>Here is your password: ${password}</p>
                <a href="${userAccessLink}">Click here to start playing!</a>`
        };

        this.transporter.sendMail(mailOptions, (error: Error, info: any) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`Email to ${email} was sent ` + info.response);
            }
        });
    }

    public sendDefaultPass(user: DixitUser, password: string) {
        const mailOptions = {
            from: EMAIL_USERNAME,
            to: user.email,
            subject: "Dixit - Thanks for joining",
            html: `<h1>Hello, ${user.nickname}</h1>
            <br/>
            <p>Thank you for the registration in Dixit!</p>
            <p>Your default password: ${password}</p>
            <a href="${CLIENT_URL}">Click here to start playing!</a>`
        };

        this.transporter.sendMail(mailOptions, (error: Error, info: any) => {
            if (error) {
                console.log(error);
            } else {
                console.log(`Email to ${user.email} was sent ` + info.response);
            }
        });
    }
    public sendBanNotification(user: DixitUser, banReason?: string) {
        let mailOptions
        if (banReason) {
            mailOptions = {
                from: EMAIL_USERNAME,
                to: user.email,
                subject: "Dixit - You got banned",
                html: `<h1>Hello, ${user.nickname}</h1>
                <br/>
                <p>You were banned because were misbehaved</p>
                <p>Have any questions? <a href='mailto:dixit.webui@gmail.com'>Contact Us</a>!</p>
                <p>Ban reason:</p>
                <p>${banReason}</p>`
            };
        }
        else if(banReason === undefined) {
            mailOptions = {
                from: EMAIL_USERNAME,
                to: user.email,
                subject: "Dixit - You got unbanned",
                html: `<h1>Hello, ${user.nickname}</h1>
                <br/>
                <p>Your account was successfully unbanned!</p>
                <p>Good luck have fun!</p>`
            };
        }
        this.transporter.sendMail(mailOptions)
    }
    public sendNewPassword(user: DixitUser, password: string) {
        const mailOptions = {
            from: EMAIL_USERNAME,
            to: user.email,
            subject: "Dixit - Password reset",
            html: `<h1>Hello, ${user.nickname}</h1>
            <br/>
            <p>We are glad to tell you that your password was successfully dropped</p>
            <p>Here is your new password</p>
            <p>${password}</p>`
        };
        this.transporter.sendMail(mailOptions)
    }
}



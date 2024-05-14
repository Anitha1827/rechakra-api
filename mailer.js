import nodemailer from "nodemailer";
import dotenv from "dotenv";

// dotenv configaration
dotenv.config();

export async function MailSender({data}){
    //Create Transport
    let sender = nodemailer.createTransport({
        service:"gmail",
        auth:{
            mailid:process.env.user,
            pass:process.env.pass,
        },
    });
    let reciever = data.email;
    let subject = data.subject;
    let message = data.message;
    let from = {
        name:"Rechakra",
        address:process.env.user
    };

    // Mail content
    let mailContent = {
        from:from,
        to:reciever,
        subject:subject,
        text:message,
    };

    sender.sendMail(mailContent, function (error, info){
        if(error){
            console.log("Error in sending mail", error);
            return false
        }
    });
    return true;
}
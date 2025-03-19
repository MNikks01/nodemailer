
import fs from 'fs';
import path from 'path';
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the data
// import data from './data.json';
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'), 'utf-8'));

// Create a transporter using your email credentials
const transporter = createTransport({
    service: 'gmail', // or 'hotmail', 'yahoo', etc.
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

// const sendEmail = async (hr_name, email, company_name) => {
//     const mailOptions = {
//         from: process.env.EMAIL,
//         to: email,
//         subject: 'Job Application for MERN Developer',
//         html: `
//       <p>Dear ${hr_name},</p>
//       <p>I am writing to express my interest in the MERN Developer position at your esteemed company. 
//       Please find my resume attached for your reference.</p>
//       <p>Looking forward to your kind response.</p>
//       <p>Best Regards,<br>Your Name</p>
//     `,
//         attachments: [
//             {
//                 filename: 'Nikhil_MERN.pdf',
//                 path: path.join(__dirname, 'Nikhil_MERN.pdf')
//             }
//         ]
//     };

//     try {
//         const result = await transporter.sendMail(mailOptions);
//         console.log(`✅ Email sent to ${email}:`, result.response);
//     } catch (error) {
//         console.error(`❌ Failed to send email to ${email}:`, error.message);
//     }
// };
const sendEmail = async (name, email, company) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Application for MERN Developer Position at ${company}`,
        html: `
            <p>Dear ${name},</p>
            <p>I am excited to apply for the <strong>MERN Developer</strong> position at <strong>${company}</strong>. With over <strong>5 years of experience</strong> in developing React-based applications and around <strong>1 year of experience with the MERN stack</strong>, I am confident in my ability to contribute effectively to your team.</p>
            
            <p>At <strong>Softronix IT Solution</strong>, I developed and optimized multiple React-based web applications, improving performance and user experience significantly. Additionally, my experience in building scalable MERN applications and integrating RESTful APIs has strengthened my ability to deliver high-quality, efficient code.</p>
            
            <p>I look forward to the possibility of discussing how my skills and experience align with your team’s goals. Thank you for considering my application.</p>

            <p>Please find my resume attached for your reference.</p>
            
            <p>Best regards,<br>Nikhil Meshram<br>Mobile Number : +91 9561446382</p>
        `,
        attachments: [
            {
                filename: 'Nikhil_MERN.pdf',
                path: path.join(__dirname, 'Nikhil_MERN.pdf')
            }
        ]
    };

    try {
        const result = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent to ${email}: ${result.response}`);
    } catch (error) {
        console.error(`❌ Failed to send email to ${email}:`, error.message);
    }
};


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const sendAllEmails = async () => {
    for (const { hr_name, email, company_name } of data) {
        await sendEmail(hr_name, email, company_name);
        console.log(`Sent to: ${hr_name} at ${email}`);
        await delay(2000); // Add a 2-second delay
    }
};

sendAllEmails();
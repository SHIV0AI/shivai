import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import nodemailer from 'nodemailer';

// Store submissions in a text file
function storeSubmission(data: any) {
  try {
    const timestamp = new Date().toISOString();
    const submissionText = `
=====================================
CONTACT FORM SUBMISSION
=====================================
Date: ${timestamp}
Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Message: ${data.message}
=====================================
`;

    const submissionsDir = path.join(process.cwd(), 'submissions');
    
    // Create submissions directory if it doesn't exist
    if (!fs.existsSync(submissionsDir)) {
      fs.mkdirSync(submissionsDir, { recursive: true });
    }

    const fileName = `submission_${Date.now()}.txt`;
    const filePath = path.join(submissionsDir, fileName);
    
    fs.writeFileSync(filePath, submissionText, 'utf-8');
    return true;
  } catch (error) {
    console.error('Error storing submission:', error);
    return false;
  }
}

// Send email notification
async function sendEmail(data: any) {
  try {
    // Create a test account if no email service is configured
    // For production, use your own SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || 'your-email@gmail.com',
        pass: process.env.SMTP_PASSWORD || 'your-app-password',
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@shivai.com',
      to: 'shiv0.0ai@gmail.com',
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted at: ${new Date().toISOString()}</small></p>
      `,
      replyTo: data.email,
    };

    // Try to send email, but don't fail if SMTP is not configured
    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
      return true;
    } catch (emailError) {
      console.log('Email service not configured, submission stored locally only');
      return true; // Still return success since we stored it locally
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return true; // Still return success since we stored it locally
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store the submission
    const stored = storeSubmission(data);
    
    if (!stored) {
      return NextResponse.json(
        { error: 'Failed to store submission' },
        { status: 500 }
      );
    }

    // Send email notification
    await sendEmail(data);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for your submission! We will get back to you soon.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

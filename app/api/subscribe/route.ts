import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import nodemailer from 'nodemailer';

// Store subscriptions in a text file (only for local development)
function storeSubscription(email: string) {
  try {
    // Only store locally in development, not in production serverless environments
    if (process.env.NODE_ENV === 'production') {
      console.log('Production mode: Skipping local file storage (read-only filesystem)');
      return true;
    }

    const timestamp = new Date().toISOString();
    const subscriptionText = `
=====================================
NEWSLETTER SUBSCRIPTION
=====================================
Date: ${timestamp}
Email: ${email}
=====================================
`;

    const submissionsDir = path.join(process.cwd(), 'submissions');
    
    // Create submissions directory if it doesn't exist
    if (!fs.existsSync(submissionsDir)) {
      fs.mkdirSync(submissionsDir, { recursive: true });
    }

    const fileName = `subscription_${Date.now()}.txt`;
    const filePath = path.join(submissionsDir, fileName);
    
    fs.writeFileSync(filePath, subscriptionText, 'utf-8');
    console.log('Subscription stored locally:', fileName);
    return true;
  } catch (error) {
    console.error('Error storing subscription locally:', error);
    return true;
  }
}

// Send subscription confirmation email
async function sendSubscriptionEmail(email: string) {
  try {
    // Check if SMTP credentials are configured
    if (!process.env.SMTP_USER || process.env.SMTP_USER === 'your-gmail@gmail.com') {
      console.log('Email service not configured, subscription stored locally only');
      return false;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@shivai.com',
      to: email,
      subject: 'Welcome to SHiV.Ai Newsletter!',
      html: `
        <h2>Welcome to SHiV.Ai Newsletter!</h2>
        <p>Thank you for subscribing to our newsletter.</p>
        <p>You'll now receive the latest updates on:</p>
        <ul>
          <li>AI innovation and breakthroughs</li>
          <li>Product updates and features</li>
          <li>Industry insights and trends</li>
          <li>Exclusive content and resources</li>
        </ul>
        <hr>
        <p><small>You can manage your subscription preferences anytime.</small></p>
        <p>Best regards,<br>The SHiV.Ai Team</p>
      `,
      replyTo: 'founders@shivai.co.in',
    };

    // Also send notification to founders
    const founderNotification = {
      from: process.env.SMTP_FROM || 'noreply@shivai.com',
      to: 'founders@shivai.co.in',
      subject: 'New Newsletter Subscription',
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${new Date().toISOString()}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      await transporter.sendMail(founderNotification);
      console.log('Subscription confirmation email sent');
      return true;
    } catch (emailError) {
      console.log('Email service not configured, subscription stored locally only');
      return false;
    }
  } catch (error) {
    console.error('Error sending subscription email:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate email
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Store the subscription
    storeSubscription(data.email);
    
    // Try to send confirmation email
    const emailSent = await sendSubscriptionEmail(data.email);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you for subscribing! Check your email for confirmation.',
        emailSent: emailSent
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

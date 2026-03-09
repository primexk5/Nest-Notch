## Email OTP Configuration

To make the Real Email Verification work, you MUST create a `.env.local` file in the root of your project (`/home/newking/Desktop/Global/projects/nest-notch/.env.local`) and add your SMTP credentials.

Example for Gmail:
1. Go to your Google Account -> Security -> 2-Step Verification.
2. Scroll to bottom and click "App passwords".
3. Create a new App Password (name it "Nest Notch").
4. Add the following to your `.env.local` file:

```env
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-16-character-app-password
```

**Note:** Never commit this file to GitHub! We have a `.gitignore` to prevent this, but be careful. 

After adding this file, remember to restart your Next.js development server (`CTRL+C` then `npm run dev`) for the variables to take effect!

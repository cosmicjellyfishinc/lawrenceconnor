import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL = 'Lawrence Connor <lawrence@lawrenceconnor.com>';

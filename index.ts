/// <reference types="./index.d.ts" />
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {
  changePassword,
  createAccount,
  forgotPassword,
  getMeInitial,
  login,
  resetPassword,
} from 'routes/auth';
import { getConfig, updateConfig } from 'routes/config';
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from 'routes/events';
import { getGallery } from 'routes/gallery';
import { createGallery } from 'routes/gallery';
import { updateGallery } from 'routes/gallery';
import { deleteGallery } from 'routes/gallery';
import { getNotices } from 'routes/notices';
import { createNotice } from 'routes/notices';
import { updateNotice } from 'routes/notices';
import { deleteNotice } from 'routes/notices';
import { getTestCenters } from 'routes/test-centers';
import { createTestCenter } from 'routes/test-centers';
import { updateTestCenter } from 'routes/test-centers';
import { deleteTestCenter } from 'routes/test-centers';
import { getUsers } from 'routes/user';
import { getAllRegistrations } from 'routes/registration';
import { initialGet } from 'routes/misc';

const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

app.get('/', (req, res) => res.send('Hello World'));
app.get('/health', (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    responseTime: process.hrtime(),
    message: 'OK',
    timestamp: Date.now(),
  };
  try {
    return res.status(200).send(healthCheck);
  } catch (error: any) {
    healthCheck.message = error;
    return res.status(503).send(healthCheck);
  }
});

app.post('/login', login);
app.post('/me', getMeInitial);
app.post('/create-account', createAccount);
app.post('/change-password', changePassword);
app.post('/forgot-password', forgotPassword);
app.post('/reset-password', resetPassword);

app.get('/config', getConfig);
app.put('/config', updateConfig);

app.get('/events', getEvents);
app.post('/events', createEvent);
app.put('/events', updateEvent);
app.delete('/events', deleteEvent);

app.get('/gallery', getGallery);
app.post('/gallery', createGallery);
app.put('/gallery', updateGallery);
app.delete('/gallery', deleteGallery);

app.get('/notice', getNotices);
app.post('/notice', createNotice);
app.put('/notice', updateNotice);
app.delete('/notice', deleteNotice);

app.get('/test-centers', getTestCenters);
app.post('/test-centers', createTestCenter);
app.put('/test-centers', updateTestCenter);
app.delete('/test-centers', deleteTestCenter);

app.get('/users', getUsers);

app.get('/registrations', getAllRegistrations);

app.get('/initial', initialGet);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server Ready on: ' + port));

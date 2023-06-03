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
import { getProfile, initialGet } from 'routes/misc';
import mongoose from 'mongoose';
import { checkAuth } from 'middlewares/auth';
import { upload } from 'middlewares/upload';

const app = express();
mongoose.set('debug', true);
app.use(
  cors({
    origin: [
      'https://shiblirca.in',
      'http://localhost:3000',
      'https://shiblirca.netlify.app',
      'https://647793280995750909f5cb8c--shiblirca.netlify.app',
      'https://6478a013330dda08ae3fde07--shiblirca.netlify.app',
    ],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.url, req.body);
  return next();
});

app.get('/', (req, res) => res.send('<h1>Hello World</h1>'));
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
app.get('/me', checkAuth, getMeInitial);
app.post('/create-account', createAccount);
app.post('/change-password', checkAuth, changePassword);
app.post('/forgot-password', forgotPassword);
app.post('/reset-password', resetPassword);

app.get('/config', getConfig);
app.put('/config', updateConfig);

app.get('/events', getEvents);
app.post('/events', checkAuth, createEvent);
app.put('/events', checkAuth, updateEvent);
app.delete('/events', checkAuth, deleteEvent);

app.get('/gallery', getGallery);
app.post('/gallery', checkAuth, createGallery);
app.put('/gallery', checkAuth, updateGallery);
app.delete('/gallery', checkAuth, deleteGallery);

app.get('/notices', getNotices);
app.post('/notices', checkAuth, createNotice);
app.put('/notices', checkAuth, updateNotice);
app.delete('/notices', checkAuth, deleteNotice);

app.get('/test-centers', getTestCenters);
app.post('/test-centers', checkAuth, createTestCenter);
app.put('/test-centers', checkAuth, updateTestCenter);
app.delete('/test-centers', checkAuth, deleteTestCenter);

app.get('/users', checkAuth, getUsers);

app.get('/registrations', checkAuth, getAllRegistrations);

app.post('/upload', checkAuth, upload.single('file'), (req, res) => {
  const file = req.file;
  return res.status(200).json({ url: file?.path, name: file?.filename });
});

app.get('/initial', checkAuth, initialGet);
app.get('/profile', checkAuth, getProfile);

const port = process.env.PORT || 4000;
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!!);
    console.log('Connected to the database');
    app.listen(port, () => console.log('Server Ready on: ' + port));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

startServer().then().catch();

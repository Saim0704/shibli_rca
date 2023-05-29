import { Request, Response } from 'express';
import { Event, IEvent } from 'models/event';

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find({});
    return res.status(200).json({ error: null, data: events });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const event = new Event<IEvent>({ ...body });
    const newEvent = await event.save();
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { _id, ...updates } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id', data: [] });
    const updatedEvent = await Event.findByIdAndUpdate(_id, { ...updates });
    return res.status(200).json({ error: null, data: updatedEvent });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id', data: null });
    const deletedEvent = await Event.findByIdAndDelete(_id);
    return res.status(200).json({ error: null, data: deletedEvent });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

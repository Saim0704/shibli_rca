import { Request, Response } from 'express';
import { INotice, Notice } from 'models/notice';
import { PaginatedRequestQueryParams } from './base';

export const getNotices = async (
  req: PaginatedRequestQueryParams,
  res: Response
) => {
  try {
    const notices = await Notice.paginate(
      {},
      {
        sort: { createdAt: -1 },
        lean: true,
        page: req.query.pageNumber,
        limit: req.query.pageSize,
      }
    );
    return res.status(200).json(notices);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const createNotice = async (req: Request, res: Response) => {
  try {
    const { title, description, issuedBy } = req.body;
    if (!title || !description || !issuedBy) {
      return res
        .status(400)
        .json({ error: 'Missing title/description/issuedBy', data: null });
    }
    const notice = new Notice<INotice>({ title, description, issuedBy });
    const newNotice = await notice.save();
    return res.status(200).json(newNotice);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const updateNotice = async (req: Request, res: Response) => {
  try {
    const { _id, ...updates } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id', data: [] });
    const updatedNotice = await Notice.findByIdAndUpdate(_id, {
      ...updates,
    });
    return res.status(200).json(updatedNotice);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const deleteNotice = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id', data: null });

    const deletedNotice = await Notice.findByIdAndDelete(_id);
    return res.status(200).json(deletedNotice);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

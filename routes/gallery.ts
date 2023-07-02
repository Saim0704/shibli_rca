import { Request, Response } from 'express';
import { Gallery, IGallery } from 'models/gallery';
import { PaginatedRequestQueryParams } from './base';

export const getGallery = async (
  req: PaginatedRequestQueryParams,
  res: Response
) => {
  try {
    const gallery = await Gallery.paginate(
      {},
      {
        sort: { createdAt: -1 },
        lean: true,
        page: req.query.pageNumber,
        limit: req.query.pageSize,
      }
    );
    return res.status(200).json(gallery);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const createGallery = async (req: Request, res: Response) => {
  try {
    const { name, image, description } = req.body;
    if (!name || !image) {
      return res.status(400).json({ error: 'Missing name/image', data: null });
    }

    const gallery = new Gallery<IGallery>({ name, image, description });
    const newGallery = await gallery.save();
    return res.status(200).json(newGallery);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const updateGallery = async (req: Request, res: Response) => {
  try {
    const { _id, ...updates } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id', data: [] });
    const updatedGallery = await Gallery.findByIdAndUpdate(_id, {
      ...updates,
    });
    return res.status(200).json(updatedGallery);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const deleteGallery = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id', data: null });
    const deletedGallery = await Gallery.findByIdAndDelete(_id);
    return res.status(200).json(deletedGallery);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

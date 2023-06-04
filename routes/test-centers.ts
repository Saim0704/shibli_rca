import { Request, Response } from 'express';
import { ITestCenter, TestCenter } from 'models/testCenter';

export const getTestCenters = async (req: Request, res: Response) => {
  try {
    const testCenters = await TestCenter.find({});
    return res.status(200).json(testCenters);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const createTestCenter = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const testCenter = new TestCenter<ITestCenter>({ ...body });
    const newTestCenter = await testCenter.save();
    return res.status(200).json(newTestCenter);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const updateTestCenter = async (req: Request, res: Response) => {
  try {
    const { _id, ...updates } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id', data: [] });
    const updatedTestCenter = await TestCenter.findByIdAndUpdate(_id, {
      ...updates,
    });
    return res.status(200).json(updatedTestCenter);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const deleteTestCenter = async (req: Request, res: Response) => {
  try {
    const { _id } = req.body;
    if (!_id) return res.status(400).json({ error: 'Missing _id', data: null });
    const deletedTestCenter = await TestCenter.findByIdAndDelete(_id);
    return res.status(200).json(deletedTestCenter);
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

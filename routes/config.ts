import { Request, Response } from 'express';
import { Config } from 'models/configs';

export const getConfig = async (req: Request, res: Response) => {
  try {
    const config = await Config.find({});
    return res.status(200).json({ error: null, data: config });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

export const updateConfig = async (req: Request, res: Response) => {
  try {
    const { name, value } = req.body;
    const config = await Config.findOne({ name: name });
    if (!config)
      return res.status(400).json({ error: 'Missing config', data: [] });
    const updatedConfig = await Config.findOneAndUpdate(
      { name: name },
      { value: value }
    );
    return res.status(200).json({ error: null, data: updatedConfig });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({
      message: err.message || 'Internal server error',
    });
  }
};

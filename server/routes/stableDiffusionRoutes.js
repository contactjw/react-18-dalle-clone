import express from 'express';
import * as dotenv from 'dotenv';
import { InferenceClient } from '@huggingface/inference';

dotenv.config();

const router = express.Router();
const hf = new InferenceClient(process.env.HUGGINGFACE_API_TOKEN);

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from Stable Diffusion!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const output = await hf.textToImage({
      model: 'latent-consistency/lcm-lora-sdxl',
      inputs: prompt,
      parameters: {
        width: 512,
        height: 512,
      },
    });

    const buffer = await output.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');

    res.status(200).json({ photo: base64Image });
  } catch (error) {
    console.error('Hugging Face API error:', error);
    res.status(500).json({
      error: error.message || 'Image generation failed.',
    });
  }
});

export default router;

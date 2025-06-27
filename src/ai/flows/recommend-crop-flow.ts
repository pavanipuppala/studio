'use server';

/**
 * @fileOverview An AI agent that recommends crops and a suitable vertical farming method based on location.
 *
 * - recommendCrop - A function that handles the crop recommendation process.
 * - RecommendCropInput - The input type for the recommendCrop function.
 * - RecommendCropOutput - The return type for the recommendCrop function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendCropInputSchema = z.object({
  city: z.string().describe('The city where the farm is located.'),
  state: z.string().describe('The state where the farm is located.'),
});
export type RecommendCropInput = z.infer<typeof RecommendCropInputSchema>;

const RecommendCropOutputSchema = z.object({
  cropName: z.string().describe('The name of the recommended crop.'),
  reason: z.string().describe('A detailed explanation for the recommendation.'),
  predictedFarmType: z.string().describe('The most suitable vertical farming method (e.g., "Hydroponics", "Aeroponics") for the location.'),
});
export type RecommendCropOutput = z.infer<typeof RecommendCropOutputSchema>;

export async function recommendCrop(
  input: RecommendCropInput
): Promise<RecommendCropOutput> {
  return recommendCropFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendCropPrompt',
  input: {schema: RecommendCropInputSchema},
  output: {schema: RecommendCropOutputSchema},
  prompt: `You are an agricultural expert specializing in vertical farming in India.

Based on the location provided, recommend a single, highly suitable crop to grow and the most appropriate vertical farming method (e.g., Hydroponics, Aeroponics, Aquaponics).

Your recommendation should consider the general climate of the region, local market demand, and resource availability (like water and electricity) that might favor one farming technique over another.

Location: {{{city}}}, {{{state}}}, India

Provide a clear, concise reason for your crop recommendation.
The output 'predictedFarmType' field should contain the name of the single recommended farming method.`,
});

const recommendCropFlow = ai.defineFlow(
  {
    name: 'recommendCropFlow',
    inputSchema: RecommendCropInputSchema,
    outputSchema: RecommendCropOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

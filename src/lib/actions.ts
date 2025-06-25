'use server';

import { optimizeCropYield, type OptimizeCropYieldOutput } from '@/ai/flows/optimize-crop-yield';
import { AiOptimizerSchema } from './schemas';

export async function getAiOptimization(
    formData: unknown
): Promise<{ data?: OptimizeCropYieldOutput; error?: string }> {
  const validatedFields = AiOptimizerSchema.safeParse(formData);

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return { error: 'Invalid input.' };
  }

  try {
    const result = await optimizeCropYield(validatedFields.data);
    return { data: result };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { error: `Failed to get optimization suggestions: ${errorMessage}` };
  }
}

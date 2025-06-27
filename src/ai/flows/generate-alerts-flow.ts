'use server';
/**
 * @fileOverview An AI agent that generates realistic system alerts for a vertical farm.
 *
 * - generateAlerts - A function that generates a list of alerts.
 * - GenerateAlertsInput - The input type for the generateAlerts function.
 * - GenerateAlertsOutput - The return type for the generateAlerts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AlertSchema = z.object({
  severity: z.enum(['High', 'Medium', 'Low']).describe('The severity of the alert.'),
  component: z.string().describe('The farm component that the alert originates from (e.g., "Nutrient Tank A", "Lighting System - Rack 3").'),
  message: z.string().describe('A concise, descriptive message about the alert.'),
  timestamp: z.string().describe('A relative timestamp for when the alert occurred (e.g., "5m ago", "2h ago", "1 day ago").'),
  status: z.enum(['Active', 'Resolved']).describe('The current status of the alert.'),
});

const GenerateAlertsInputSchema = z.object({
  city: z.string().describe('The city where the farm is located.'),
  state: z.string().describe('The state where the farm is located.'),
  cropName: z.string().describe('The primary crop being grown.'),
  farmType: z.string().describe('The type of vertical farm (e.g., "Hydroponics").'),
});
export type GenerateAlertsInput = z.infer<typeof GenerateAlertsInputSchema>;

const GenerateAlertsOutputSchema = z.object({
  alerts: z.array(AlertSchema).describe('A list of 5 to 10 generated alerts.'),
});
export type GenerateAlertsOutput = z.infer<typeof GenerateAlertsOutputSchema>;

export async function generateAlerts(
  input: GenerateAlertsInput
): Promise<GenerateAlertsOutput> {
  return generateAlertsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAlertsPrompt',
  input: {schema: GenerateAlertsInputSchema},
  output: {schema: GenerateAlertsOutputSchema},
  prompt: `You are a vertical farm monitoring system. Based on the provided location, crop, and farm type, generate a list of 5 to 10 realistic system alerts.

Consider potential issues related to the local climate of '{{{city}}}, {{{state}}}', the specific needs of '{{{cropName}}}', and the common challenges of a '{{{farmType}}}' system.

The alerts should cover a range of severities (High, Medium, Low) and components (e.g., pumps, sensors, nutrient tanks, lighting). Timestamps should be recent and relative.

Return only the structured data.`,
});

const generateAlertsFlow = ai.defineFlow(
  {
    name: 'generateAlertsFlow',
    inputSchema: GenerateAlertsInputSchema,
    outputSchema: GenerateAlertsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

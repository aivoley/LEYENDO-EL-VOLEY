'use server';

/**
 * @fileOverview A Genkit flow to generate a new volleyball situation using AI.
 *
 * - generateVolleyballSituation - A function that generates a volleyball situation.
 * - GenerateVolleyballSituationInput - The input type for the generateVolleyballSituation function.
 * - GenerateVolleyballSituationOutput - The output type for the generateVolleyballSituation function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateVolleyballSituationInputSchema = z.object({
  situationType: z.enum(['ofensiva', 'defensiva']).describe('The type of volleyball situation to generate (ofensiva or defensiva).'),
});
export type GenerateVolleyballSituationInput = z.infer<typeof GenerateVolleyballSituationInputSchema>;

const GenerateVolleyballSituationOutputSchema = z.object({
  description: z.string().describe('A description of the volleyball game situation.'),
  options: z.array(
    z.object({
      text: z.string().describe('Possible action for the player.'),
      correct: z.boolean().describe('Whether the action is correct for the described situation.'),
    })
  ).describe('An array of possible actions and whether they are correct for the situation.'),
});
export type GenerateVolleyballSituationOutput = z.infer<typeof GenerateVolleyballSituationOutputSchema>;

export async function generateVolleyballSituation(input: GenerateVolleyballSituationInput): Promise<GenerateVolleyballSituationOutput> {
  return generateVolleyballSituationFlow(input);
}

const generateVolleyballSituationPrompt = ai.definePrompt({
  name: 'generateVolleyballSituationPrompt',
  input: {
    schema: GenerateVolleyballSituationInputSchema,
  },
  output: {
    schema: GenerateVolleyballSituationOutputSchema,
  },
  prompt: `You are a volleyball coach creating game situations for players to practice their decision-making.

Generate a challenging volleyball situation of the following type: {{{situationType}}}.

The situation should include a description of the player positions, ball position, and opposing team arrangement.
Provide 3 possible actions for the player. One of the actions must be the optimal action for the described situation.

Description:
Options:`,
});

const generateVolleyballSituationFlow = ai.defineFlow<
  typeof GenerateVolleyballSituationInputSchema,
  typeof GenerateVolleyballSituationOutputSchema
>(
  {
    name: 'generateVolleyballSituationFlow',
    inputSchema: GenerateVolleyballSituationInputSchema,
    outputSchema: GenerateVolleyballSituationOutputSchema,
  },
  async input => {
    const {output} = await generateVolleyballSituationPrompt(input);
    return output!;
  }
);

'use server';
/**
 * @fileOverview A Genkit flow to provide tactical feedback to a volleyball player based on a game situation and their chosen action.
 *
 * - provideTacticalFeedback - A function that accepts a game situation and chosen action, and returns tactical feedback.
 * - ProvideTacticalFeedbackInput - The input type for the provideTacticalFeedback function, including the game situation and chosen action.
 * - ProvideTacticalFeedbackOutput - The output type for the provideTacticalFeedback function, which is the tactical feedback.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ProvideTacticalFeedbackInputSchema = z.object({
  gameSituation: z.string().describe('Description of the game situation, including player positions, ball position, and opposing team arrangement.'),
  chosenAction: z.string().describe('The action chosen by the player (e.g., attack, block, pass).'),
});
export type ProvideTacticalFeedbackInput = z.infer<typeof ProvideTacticalFeedbackInputSchema>;

const ProvideTacticalFeedbackOutputSchema = z.object({
  feedback: z.string().describe('Tactical feedback on the chosen action, considering the game situation.'),
});
export type ProvideTacticalFeedbackOutput = z.infer<typeof ProvideTacticalFeedbackOutputSchema>;

export async function provideTacticalFeedback(input: ProvideTacticalFeedbackInput): Promise<ProvideTacticalFeedbackOutput> {
  return provideTacticalFeedbackFlow(input);
}

const provideTacticalFeedbackPrompt = ai.definePrompt({
  name: 'provideTacticalFeedbackPrompt',
  input: {
    schema: ProvideTacticalFeedbackInputSchema,
  },
  output: {
    schema: ProvideTacticalFeedbackOutputSchema,
  },
  prompt: `You are a volleyball coach providing tactical feedback to a player.

Given the following game situation and the player's chosen action, provide tactical feedback on the decision.

Game Situation: {{{gameSituation}}}
Chosen Action: {{{chosenAction}}}

Feedback:
`,
});

const provideTacticalFeedbackFlow = ai.defineFlow<
  typeof ProvideTacticalFeedbackInputSchema,
  typeof ProvideTacticalFeedbackOutputSchema
>(
  {
    name: 'provideTacticalFeedbackFlow',
    inputSchema: ProvideTacticalFeedbackInputSchema,
    outputSchema: ProvideTacticalFeedbackOutputSchema,
  },
  async input => {
    const {output} = await provideTacticalFeedbackPrompt(input);
    return output!;
  }
);

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
  gameSituation: z.string().describe('Descripción de la situación del juego, incluyendo las posiciones de los jugadores, la posición de la pelota y la disposición del equipo contrario.'),
  chosenAction: z.string().describe('La acción elegida por el jugador (ej., ataque, bloqueo, pase).'),
});
export type ProvideTacticalFeedbackInput = z.infer<typeof ProvideTacticalFeedbackInputSchema>;

const ProvideTacticalFeedbackOutputSchema = z.object({
  feedback: z.string().describe('Feedback táctico sobre la acción elegida, considerando la situación del juego.'),
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
  prompt: `Eres un entrenador de voleibol que proporciona feedback táctico a un jugador.

Dada la siguiente situación de juego y la acción elegida por el jugador, proporciona feedback táctico sobre la decisión.
Utiliza términos y expresiones comunes en el voleibol latinoamericano.

Situación de Juego: {{{gameSituation}}}
Acción Elegida: {{{chosenAction}}}

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


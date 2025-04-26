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
<<<<<<< HEAD
<<<<<<< HEAD
  gameSituation: z.string().describe('Descripción de la situación del juego, incluyendo las posiciones de las jugadoras, la posición de la pelota y la disposición del equipo contrario.'),
  chosenAction: z.string().describe('La acción elegida por la jugadora (ej., ataque, bloqueo, pase).'),
=======
  gameSituation: z.string().describe('Description of the game situation, including player positions, ball position, and opposing team arrangement.'),
  chosenAction: z.string().describe('The action chosen by the player (e.g., attack, block, pass).'),
>>>>>>> 3fe51ad (Update app)
=======
  gameSituation: z.string().describe('Descripción de la situación del juego, incluyendo las posiciones de los jugadores, la posición de la pelota y la disposición del equipo contrario.'),
  chosenAction: z.string().describe('La acción elegida por el jugador (ej., ataque, bloqueo, pase).'),
>>>>>>> 35eb4d3 (en español latinoamericano por favor)
});
export type ProvideTacticalFeedbackInput = z.infer<typeof ProvideTacticalFeedbackInputSchema>;

const ProvideTacticalFeedbackOutputSchema = z.object({
<<<<<<< HEAD
<<<<<<< HEAD
  feedback: z.string().describe('Feedback táctico sobre la acción elegida, considerando la situación del juego.'),
=======
  feedback: z.string().describe('Tactical feedback on the chosen action, considering the game situation.'),
>>>>>>> 3fe51ad (Update app)
=======
  feedback: z.string().describe('Feedback táctico sobre la acción elegida, considerando la situación del juego.'),
>>>>>>> 35eb4d3 (en español latinoamericano por favor)
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
<<<<<<< HEAD
<<<<<<< HEAD
  prompt: `Sos una entrenadora de voleibol que proporciona feedback táctico a una jugadora.

Dada la siguiente situación de juego y la acción elegida por la jugadora, proporciona feedback táctico sobre la decisión.
Utiliza términos y expresiones comunes en el voleibol latinoamericano.

Situación de Juego: {{{gameSituation}}}
Acción Elegida: {{{chosenAction}}}
=======
  prompt: `You are a volleyball coach providing tactical feedback to a player.
=======
  prompt: `Eres un entrenador de voleibol que proporciona feedback táctico a un jugador.
>>>>>>> 35eb4d3 (en español latinoamericano por favor)

Dada la siguiente situación de juego y la acción elegida por el jugador, proporciona feedback táctico sobre la decisión.
Utiliza términos y expresiones comunes en el voleibol latinoamericano.

<<<<<<< HEAD
Game Situation: {{{gameSituation}}}
Chosen Action: {{{chosenAction}}}
>>>>>>> 3fe51ad (Update app)
=======
Situación de Juego: {{{gameSituation}}}
Acción Elegida: {{{chosenAction}}}
>>>>>>> 35eb4d3 (en español latinoamericano por favor)

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


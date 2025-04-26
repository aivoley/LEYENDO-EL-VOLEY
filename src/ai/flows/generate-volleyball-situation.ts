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
  situationType: z.enum(['ofensiva', 'defensiva']).describe('El tipo de situación de voleibol a generar (ofensiva o defensiva).'),
});
export type GenerateVolleyballSituationInput = z.infer<typeof GenerateVolleyballSituationInputSchema>;

const GenerateVolleyballSituationOutputSchema = z.object({
  description: z.string().describe('Una descripción de la situación del juego de voleibol.'),
  options: z.array(
    z.object({
      text: z.string().describe('Posible acción para el jugador.'),
      correct: z.boolean().describe('Si la acción es correcta para la situación descrita.'),
    })
  ).describe('Un array de posibles acciones y si son correctas para la situación.'),
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
  prompt: `Eres un entrenador de voleibol que crea situaciones de juego para que los jugadores practiquen su toma de decisiones.

Genera una situación de voleibol desafiante del siguiente tipo: {{{situationType}}}.

La situación debe incluir una descripción de las posiciones de los jugadores, la posición de la pelota y la disposición del equipo contrario.
Proporciona 3 posibles acciones para el jugador. Una de las acciones debe ser la acción óptima para la situación descrita.
Utiliza términos y expresiones comunes en el voleibol latinoamericano.

Descripción:
Opciones:`,
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


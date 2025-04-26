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

const SituationType = z.enum(['ofensiva', 'defensiva']);

const GenerateVolleyballSituationInputSchema = z.object({
  situationType: SituationType.describe('El tipo de situación de voleibol a generar (ofensiva o defensiva).'),
  questionCount: z.number().min(1).max(20).default(3).describe('El número de preguntas a generar.'),
});
export type GenerateVolleyballSituationInput = z.infer<typeof GenerateVolleyballSituationInputSchema>;

const GenerateVolleyballSituationOutputSchema = z.object({
  description: z.string().describe('Una descripción de la situación del juego de voleibol.'),
  correctOption: z.string().describe('La acción correcta para la situación descrita.'),
  incorrectOptions: z.array(z.string()).describe('Un array de acciones incorrectas para la situación.'),
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
  prompt: `Sos un entrenador de voley argentino que crea situaciones de juego para que los jugadores practiquen su toma de decisiones.

Generá una situación de voley desafiante del siguiente tipo: {{{situationType}}}.

La situación debe incluir una descripción de las posiciones de los jugadores, la posición de la pelota y la disposición del equipo contrario.
La descripción debe ser concisa, pero informativa, para que el jugador pueda tomar una decisión informada.
Proporcioná una acción correcta y {{{questionCount}}} acciones incorrectas para el jugador.
Utilizá términos y expresiones comunes en el voley argentino. No seas repetitivo con las opciones incorrectas, y hacelas creibles.
Asegurate de que solo haya una opcion correcta.

Formato de salida:
\`\`\`json
{
  "description": "...",
  "correctOption": "...",
  "incorrectOptions": ["...", "..."]
}
\`\`\`

Respuesta:`,
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

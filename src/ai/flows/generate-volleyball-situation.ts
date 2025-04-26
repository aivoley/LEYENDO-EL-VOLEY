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

<<<<<<< HEAD
const SituationType = z.enum(['ofensiva', 'defensiva']);

const GenerateVolleyballSituationInputSchema = z.object({
  situationType: SituationType.describe('El tipo de situación de voleibol a generar (ofensiva o defensiva).'),
  questionCount: z.number().min(3).max(20).default(4).describe('El número de preguntas a generar.'),
=======
const GenerateVolleyballSituationInputSchema = z.object({
  situationType: z.enum(['ofensiva', 'defensiva']).describe('The type of volleyball situation to generate (ofensiva or defensiva).'),
>>>>>>> e1f6941 (pueden ser 20 preguntas y que sean diferentes cada vez, generadas por IA?)
});
export type GenerateVolleyballSituationInput = z.infer<typeof GenerateVolleyballSituationInputSchema>;

const GenerateVolleyballSituationOutputSchema = z.object({
<<<<<<< HEAD
  description: z.string().describe('Una descripción de la situación del juego de voleibol.'),
  correctOption: z.string().describe('La acción correcta para la situación descrita.'),
  incorrectOptions: z.array(z.string()).describe('Un array de acciones incorrectas para la situación.'),
=======
  description: z.string().describe('A description of the volleyball game situation.'),
  options: z.array(
    z.object({
      text: z.string().describe('Possible action for the player.'),
      correct: z.boolean().describe('Whether the action is correct for the described situation.'),
    })
  ).describe('An array of possible actions and whether they are correct for the situation.'),
>>>>>>> e1f6941 (pueden ser 20 preguntas y que sean diferentes cada vez, generadas por IA?)
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
<<<<<<< HEAD
  prompt: `Sos una entrenadora de voley argentina que crea situaciones de juego desafiantes para que las jugadoras practiquen su toma de decisiones.

Generá una situación de voley del siguiente tipo: {{{situationType}}}.

La situación debe incluir una descripción clara y concisa de las posiciones de las jugadoras, la ubicación de la pelota y la disposición del equipo contrario, permitiendo a la jugadora tomar una decisión informada.
Proporcioná una única acción correcta y {{{questionCount}}} acciones incorrectas para la situación.
Usá términos y expresiones comunes en el voley argentino, evitando la repetición en las opciones incorrectas y asegurando que sean creíbles y lógicas dentro del contexto del juego.
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
=======
  prompt: `You are a volleyball coach creating game situations for players to practice their decision-making.

Generate a challenging volleyball situation of the following type: {{{situationType}}}.

The situation should include a description of the player positions, ball position, and opposing team arrangement.
Provide 3 possible actions for the player. One of the actions must be the optimal action for the described situation.

Description:
Options:`,
>>>>>>> e1f6941 (pueden ser 20 preguntas y que sean diferentes cada vez, generadas por IA?)
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

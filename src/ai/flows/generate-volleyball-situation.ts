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
<<<<<<< HEAD
=======
>>>>>>> 41d68e4 (depura el front y en español argentino)
const SituationType = z.enum(['ofensiva', 'defensiva']);

const GenerateVolleyballSituationInputSchema = z.object({
  situationType: SituationType.describe('El tipo de situación de voleibol a generar (ofensiva o defensiva).'),
<<<<<<< HEAD
  questionCount: z.number().min(3).max(20).default(4).describe('El número de preguntas a generar.'),
=======
const GenerateVolleyballSituationInputSchema = z.object({
<<<<<<< HEAD
  situationType: z.enum(['ofensiva', 'defensiva']).describe('The type of volleyball situation to generate (ofensiva or defensiva).'),
>>>>>>> e1f6941 (pueden ser 20 preguntas y que sean diferentes cada vez, generadas por IA?)
=======
  situationType: z.enum(['ofensiva', 'defensiva']).describe('El tipo de situación de voleibol a generar (ofensiva o defensiva).'),
>>>>>>> 35eb4d3 (en español latinoamericano por favor)
=======
  questionCount: z.number().min(1).max(20).default(3).describe('El número de preguntas a generar.'),
>>>>>>> 41d68e4 (depura el front y en español argentino)
});
export type GenerateVolleyballSituationInput = z.infer<typeof GenerateVolleyballSituationInputSchema>;

const GenerateVolleyballSituationOutputSchema = z.object({
<<<<<<< HEAD
<<<<<<< HEAD
  description: z.string().describe('Una descripción de la situación del juego de voleibol.'),
  correctOption: z.string().describe('La acción correcta para la situación descrita.'),
  incorrectOptions: z.array(z.string()).describe('Un array de acciones incorrectas para la situación.'),
<<<<<<< HEAD
=======
  description: z.string().describe('A description of the volleyball game situation.'),
=======
  description: z.string().describe('Una descripción de la situación del juego de voleibol.'),
>>>>>>> 35eb4d3 (en español latinoamericano por favor)
  options: z.array(
    z.object({
      text: z.string().describe('Posible acción para el jugador.'),
      correct: z.boolean().describe('Si la acción es correcta para la situación descrita.'),
    })
<<<<<<< HEAD
  ).describe('An array of possible actions and whether they are correct for the situation.'),
>>>>>>> e1f6941 (pueden ser 20 preguntas y que sean diferentes cada vez, generadas por IA?)
=======
  ).describe('Un array de posibles acciones y si son correctas para la situación.'),
>>>>>>> 35eb4d3 (en español latinoamericano por favor)
=======
>>>>>>> 41d68e4 (depura el front y en español argentino)
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
<<<<<<< HEAD
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
=======
  prompt: `Eres un entrenador de voleibol que crea situaciones de juego para que los jugadores practiquen su toma de decisiones.
>>>>>>> 35eb4d3 (en español latinoamericano por favor)
=======
  prompt: `Sos un entrenador de voley argentino que crea situaciones de juego para que los jugadores practiquen su toma de decisiones.
>>>>>>> 41d68e4 (depura el front y en español argentino)

Generá una situación de voley desafiante del siguiente tipo: {{{situationType}}}.

La situación debe incluir una descripción de las posiciones de los jugadores, la posición de la pelota y la disposición del equipo contrario.
La descripción debe ser concisa, pero informativa, para que el jugador pueda tomar una decisión informada.
Proporcioná una acción correcta y {{{questionCount}}} acciones incorrectas para el jugador.
Utilizá términos y expresiones comunes en el voley argentino. No seas repetitivo con las opciones incorrectas, y hacelas creibles.
Asegurate de que solo haya una opcion correcta.

<<<<<<< HEAD
<<<<<<< HEAD
Description:
Options:`,
>>>>>>> e1f6941 (pueden ser 20 preguntas y que sean diferentes cada vez, generadas por IA?)
=======
Descripción:
Opciones:`,
>>>>>>> 35eb4d3 (en español latinoamericano por favor)
=======
Formato de salida:
\`\`\`json
{
  "description": "...",
  "correctOption": "...",
  "incorrectOptions": ["...", "..."]
}
\`\`\`

Respuesta:`,
>>>>>>> 41d68e4 (depura el front y en español argentino)
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

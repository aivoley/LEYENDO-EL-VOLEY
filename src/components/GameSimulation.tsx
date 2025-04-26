"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { analyzeVolleyballIQ } from "@/services/volleyball-iq";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { provideTacticalFeedback } from "@/ai/flows/provide-tactical-feedback";

const initialSituation = {
  id: 1,
  type: "ofensiva",
  description: "Recepción perfecta, armadora en zona 2, central disponible, punta bien parada.",
  options: [
    { text: "Pase rápido a la central", correct: true },
    { text: "Pelota alta a la punta", correct: false },
    { text: "Pase atrás a la opuesta", correct: false },
  ],
  animation: {
    ballPath: [
      { x: 100, y: 300 }, // recepción
      { x: 250, y: 200 }, // armadora zona 2
      { x: 250, y: 100 }, // central
    ],
  },
}

const GameSimulation = () => {
  const [situation, setSituation] = useState(initialSituation);
  const [feedback, setFeedback] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const router = useRouter();

  const { toast } = useToast()

  const handleOptionSelect = async (option: { text: string; correct: boolean }) => {
    if (option.correct) {
      setFeedback("¡Correcto!");
      setCorrectCount(correctCount + 1);
      toast({
        title: 'Correct!',
        description: 'Nice one.',
      })
    } else {
      setFeedback("Incorrecto. ¡Intenta de nuevo!");
      setIncorrectCount(incorrectCount + 1);
      toast({
        variant: "destructive",
        title: "Bummer",
        description: "Try again."
      })
    }

    const playEvent = {
      reactionTime: 0.5,
      actionType: 'attack',
      success: option.correct,
    };

    const iqFeedback = await analyzeVolleyballIQ(playEvent);
    setFeedback(iqFeedback.feedbackMessage);

    const tacticalFeedback = await provideTacticalFeedback({gameSituation: situation.description, chosenAction: option.text})
    setFeedback(tacticalFeedback.feedback)
    router.refresh()

  };

  const handleNextSituation = () => {
    // Basic logic to switch to the next situation (can be improved)
    const nextSituation = {
      id: 2,
      type: "defensiva",
      description: "Armadora rival en 3, dos atacantes en zona 4 y 2, el central salta temprano.",
      options: [
        { text: "Cubrir zona 6, posible finta", correct: true },
        { text: "Ir al bloqueo en zona 4", correct: false },
        { text: "Desplazarse a zona 1", correct: false },
      ],
      animation: {
        ballPath: [
          { x: 250, y: 200 },
          { x: 200, y: 120 },
        ],
      },
    };
    setSituation(nextSituation);
    setFeedback("");
  };

  return (
    <Card className="w-[800px] bg-secondary">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-primary">Situación: {situation.type}</h2>
        <p className="mb-4">{situation.description}</p>
        <div className="mb-4">
          {situation.options.map((option, index) => (
            <Button key={index} variant="outline" className="mr-2" onClick={() => handleOptionSelect(option)}>
              {option.text}
            </Button>
          ))}
        </div>
        {feedback && <p className="mt-4 font-medium text-accent">Feedback: {feedback}</p>}
        <div className="flex justify-between mt-4">
          <p className="text-sm">Correctas: {correctCount}</p>
          <p className="text-sm">Incorrectas: {incorrectCount}</p>
        </div>
        <Button onClick={handleNextSituation} className="mt-4">Siguiente Jugada</Button>
      </CardContent>
    </Card>
  );
};

export default GameSimulation;

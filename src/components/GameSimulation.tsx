"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { analyzeVolleyballIQ } from "@/services/volleyball-iq";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { provideTacticalFeedback } from "@/ai/flows/provide-tactical-feedback";
import { generateVolleyballSituation } from "@/ai/flows/generate-volleyball-situation";

const GameSimulation = () => {
  const [situation, setSituation] = useState<any>(null);
  const [feedback, setFeedback] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const router = useRouter();

  const { toast } = useToast()

  useEffect(() => {
    generateNewSituation();
  }, []);

  const generateNewSituation = async () => {
    const newSituation = await generateVolleyballSituation({ situationType: Math.random() > 0.5 ? "ofensiva" : "defensiva" });
    setSituation(newSituation);
  };

  const handleOptionSelect = async (option: { text: string; correct: boolean }) => {
    if (option.correct) {
      setFeedback("¡Correcto!");
      setCorrectCount(correctCount + 1);
      toast({
        title: 'Correct!',
        description: 'Nice one.',
      });
    } else {
      setFeedback("Incorrecto. ¡Intenta de nuevo!");
      setIncorrectCount(incorrectCount + 1);
      toast({
        variant: "destructive",
        title: "Bummer",
        description: "Try again."
      });
    }

    if (situation) {
      const tacticalFeedback = await provideTacticalFeedback({ gameSituation: situation.description, chosenAction: option.text });
      setFeedback(tacticalFeedback.feedback);
    }
    router.refresh();
  };

  const handleNextSituation = async () => {
    await generateNewSituation();
    setFeedback("");
  };

  if (!situation) {
    return <div>Cargando situación...</div>;
  }

  return (
    <Card className="w-[800px] bg-secondary">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-primary">Situación: {situation.situationType}</h2>
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

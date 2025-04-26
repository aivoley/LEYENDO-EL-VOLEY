"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { cn } from "@/lib/utils"
import { provideTacticalFeedback } from "@/ai/flows/provide-tactical-feedback";
import { generateVolleyballSituation, GenerateVolleyballSituationOutput } from "@/ai/flows/generate-volleyball-situation";

const GameSimulation = () => {
  const [situation, setSituation] = useState<GenerateVolleyballSituationOutput | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [correctOption, setCorrectOption] = useState<string>("");
  const [feedback, setFeedback] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const router = useRouter();

  const { toast } = useToast()

  useEffect(() => {
    generateNewSituation();
  }, []);

  const generateNewSituation = async () => {
    const newSituation = await generateVolleyballSituation({ situationType: Math.random() > 0.5 ? "ofensiva" : "defensiva", questionCount: 3 });

    setSituation(newSituation);
    if (newSituation) {
      const allOptions = [newSituation.correctOption, ...newSituation.incorrectOptions].sort(() => Math.random() - 0.5);
      setOptions(allOptions);
      setCorrectOption(newSituation.correctOption);
    }
  };

  const handleOptionSelect = async (option: string) => {
    if (option === correctOption) {
      setFeedback("¡Correcto, che!");
      setCorrectCount(correctCount + 1);
      toast({
        title: '¡Correcto, che!',
        description: '¡Bien ahí!',
      });
    } else {
      setFeedback("¡Incorrecto, loco! ¡Intenta de nuevo!");
      setIncorrectCount(incorrectCount + 1);
      toast({
        variant: "destructive",
        title: "¡Lástima, che!",
        description: "¡Dale, intenta de nuevo, vos podés!"
      });
    }

    if (situation) {
      const tacticalFeedback = await provideTacticalFeedback({ gameSituation: situation.description, chosenAction: option });
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
        <h2 className="text-xl font-semibold mb-2 text-primary">Situación: {situation.description}</h2>
        <p className="mb-4">{situation.description}</p>
        <div className="mb-4">
          {options.map((option, index) => (
            <Button key={index} variant="outline" className="mr-2" onClick={() => handleOptionSelect(option)}>
              {option}
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

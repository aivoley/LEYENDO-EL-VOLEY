"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast"
import { useRouter } from 'next/navigation'
import { provideTacticalFeedback } from "@/ai/flows/provide-tactical-feedback";
import { generateVolleyballSituation, GenerateVolleyballSituationOutput } from "@/ai/flows/generate-volleyball-situation";

const GameSimulation = () => {
  const [situation, setSituation] = useState<GenerateVolleyballSituationOutput | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [correctOption, setCorrectOption] = useState<string>("");
  const [feedback, setFeedback] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  const generateNewSituation = useCallback(async () => {
    setIsLoading(true);
    try {
      const newSituation = await generateVolleyballSituation({ situationType: Math.random() > 0.5 ? "ofensiva" : "defensiva" });
      setSituation(newSituation);
      if (newSituation) {
        const allOptions = [newSituation.correctOption, ...newSituation.incorrectOptions].sort(() => Math.random() - 0.5);
        setOptions(allOptions);
        setCorrectOption(newSituation.correctOption);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "¡Ups! Parece que hubo un problema al generar la situación. Intenta de nuevo más tarde."
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    generateNewSituation();
  }, [generateNewSituation]);

  const handleOptionSelect = async (option: string) => {
    if (!situation) return;

    const isCorrect = option === correctOption;
    let title: string, description: string, variant: "default" | "destructive";

    if (isCorrect) {
      title = "¡Correcto, che!";
      description = "¡Bien ahí!";
      variant = "default";
      setCorrectCount(prevCount => prevCount + 1);
    } else {
      title = "¡Incorrecto, loco!";
      description = "¡Dale, intenta de nuevo, vos podés!";
      variant = "destructive";
      setIncorrectCount(prevCount => prevCount + 1);
    }

    toast({ title, description, variant });

    try {
      const tacticalFeedback = await provideTacticalFeedback({ gameSituation: situation.description, chosenAction: option });
      setFeedback(tacticalFeedback.feedback);
    } catch (error) {
      setFeedback("No se pudo obtener feedback táctico en este momento.");
    }
    router.refresh();
  };

  const handleNextSituation = () => {
    generateNewSituation();
    setFeedback("");
  };

  if (isLoading) {
    return <div>Cargando situación...</div>;
  }

  if (!situation) {
    return <div>Error al cargar la situación.</div>;
  }

  return (
    <Card className="w-[800px] bg-secondary">
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-primary">Situación:</h2>
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

"use client";

import React, { useState } from 'react';
import GameSimulation from '@/components/GameSimulation';
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster"

const Home = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
      <h1 className="text-4xl font-bold mb-4 text-primary">LEYENDO EL VOLEY</h1>
      {!gameStarted ? (
        <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <p className="text-lg mb-8">
            ¡Bienvenido a Leyendo el Voley! Poné a prueba tus conocimientos tácticos
            en situaciones de juego generadas por IA. Analizá la situación, elegí la
            mejor opción y recibí feedback personalizado para mejorar tu toma de decisiones.
          </p>
          <Button onClick={handleStartGame} className="mt-4">
            ¡Empezar a jugar!
          </Button>
        </div>
      ) : (
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <GameSimulation />
        </main>
      )}
      <Toaster />
    </div>
  );
};

export default Home;

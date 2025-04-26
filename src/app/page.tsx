"use client";

import React from 'react';
import GameSimulation from '@/components/GameSimulation';
import { Toaster } from "@/components/ui/toaster"

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background">
      <h1 className="text-4xl font-bold mb-4 text-primary">Lee y Juega Pro</h1>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <GameSimulation />
      </main>
      <Toaster />
    </div>
  );
};

export default Home;



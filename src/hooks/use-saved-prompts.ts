
'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'effect-spark-saved-prompts';
const MAX_PROMPTS = 5;

export function useSavedPrompts() {
  const [prompts, setPrompts] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedPrompts = localStorage.getItem(STORAGE_KEY);
      if (storedPrompts) {
        setPrompts(JSON.parse(storedPrompts));
      }
    } catch (error) {
      console.error('Failed to load saved prompts from localStorage', error);
    }
  }, []);

  const savePrompts = useCallback((newPrompts: string[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrompts));
      setPrompts(newPrompts);
    } catch (error) {
      console.error('Failed to save prompts to localStorage', error);
    }
  }, []);

  const addPrompt = useCallback(
    (prompt: string) => {
      if (!prompt || prompt.length < 10) return;

      const newPrompts = [
        prompt,
        ...prompts.filter((p) => p !== prompt),
      ].slice(0, MAX_PROMPTS);
      
      savePrompts(newPrompts);
    },
    [prompts, savePrompts]
  );

  return { prompts, addPrompt };
}

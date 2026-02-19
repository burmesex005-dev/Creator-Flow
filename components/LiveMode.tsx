import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createGeminiClient } from '../services/geminiService';
import { createPcmBlob } from '../utils/audioUtils';
import { Visualizer } from './Visualizer';
import { LiveServerMessage, Modality } from '@google/genai';
import { Mic, MicOff, AlertCircle, Trash2, Copy } from 'lucide-react';

export const LiveMode: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  // Refs for audio handling to avoid re-renders
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sessionRef = useRef<any>(null); // Type 'any' used because Session type isn't fully exported in all context yet or complicated to mock
  
  
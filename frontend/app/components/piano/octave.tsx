import React from 'react';
import PianoKey from './piano-key.component';

export default function Octave({ pitch, sustain }) {
  const notes = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ];

  const createKey = (n) => (
    <PianoKey
      key={n + pitch}
      note={n + pitch}
      className={`flex justify-center items-end select-none list-none bg-gray-100 text-gray-800 border border-gray-400 border-r-0 rounded-b-md ${
        n.length === 1
          ? 'bg-white w-[36px] h-[125px]'
          : 'bg-black w-[28px] h-[80px] mx-0 my-[-15px] z-20'
      }`}
      sustain={sustain}
    />
  );

  const createOctave = (pitch) => {
    if (pitch === 0) return notes.slice(-3).map((n) => createKey(n));
    if (pitch === 8) return notes.slice(0, 1).map((n) => createKey(n));
    return notes.map((n) => createKey(n));
  };

  return <ul className='flex m-0 p-0'>{createOctave(pitch)}</ul>;
}

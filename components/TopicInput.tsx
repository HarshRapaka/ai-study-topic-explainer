"use client";

import { useState } from "react";

interface TopicInputProps {
  onExplain: (topic: string) => void;
}

export default function TopicInput({ onExplain }: TopicInputProps) {
  const [topic, setTopic] = useState("");

  return (
    <div className="flex flex-col items-center gap-4 mt-6 w-full max-w-md">
      <input
        type="text"
        placeholder="Enter a study topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full p-3 rounded border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-2 rounded font-medium"
        onClick={() => onExplain(topic)}
      >
        Explain Topic
      </button>
    </div>
  );
}
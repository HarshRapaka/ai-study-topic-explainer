"use client";

import { useState } from "react";
import TopicInput from "@/components/TopicInput";
import ExplanationCard from "@/components/ExplanationCard";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleExplain = async (inputTopic: string) => {
  if (!inputTopic.trim()) {
    alert("Please enter a topic to continue.");
    return;
  }

  setTopic(inputTopic);
  setExplanation("");
  setLoading(true);

  try {
    const res = await fetch("/api/explain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic: inputTopic }),
    });

    const data = await res.json();

    // show backend error message instead of generic error
    if (!res.ok) {
      setExplanation(data.error || "AI service unavailable.");
      return;
    }

    setExplanation(data.explanation || "No explanation returned.");
  } catch (err) {
    setExplanation("Unable to connect to the AI service.");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="flex flex-col items-center justify-start min-h-screen gap-5 p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center mt-6">
        AI Study Topic Explainer
      </h1>

      <TopicInput onExplain={handleExplain} />

      {loading && (
        <p className="mt-4 text-gray-400 font-medium animate-pulse">
          Generating explanation...
        </p>
      )}

      {!loading && explanation && (
        <ExplanationCard topic={topic} explanation={explanation} />
      )}
    </main>
  );
}
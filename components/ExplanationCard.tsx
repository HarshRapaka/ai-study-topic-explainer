interface ExplanationCardProps {
  topic: string;
  explanation: string;
}

export default function ExplanationCard({ topic, explanation }: ExplanationCardProps) {
  if (!explanation) return null;

  return (
    <div className="mt-6 p-6 rounded-lg bg-gray-800 shadow-lg max-w-xl border border-gray-700">
      <h2 className="text-lg font-semibold mb-2 text-white">Topic: {topic}</h2>
      <p className="text-gray-200">{explanation}</p>
    </div>
  );
}
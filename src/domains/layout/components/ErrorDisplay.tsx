interface ErrorDisplayProps {
  error: string;
}

export default function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <div className="fixed bottom-11 md:bottom-0 left-0 w-full z-50 bg-red-600 text-white p-3 text-center text-sm font-medium">
      {error}
    </div>
  );
} 
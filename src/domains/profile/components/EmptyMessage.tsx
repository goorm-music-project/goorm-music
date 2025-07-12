interface EmptyMessageProps {
  message: string;
}

export default function EmptyMessage({ message }: EmptyMessageProps) {
  return (
    <div className="flex justify-center items-center min-h-[200px] text-center text-gray-400 py-12 w-full">
      {message}
    </div>
  );
}

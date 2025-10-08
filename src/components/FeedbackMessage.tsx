import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface FeedbackMessageProps {
  type: 'success' | 'error' | 'hint';
  message: string;
  isVisible: boolean;
}

export function FeedbackMessage({ type, message, isVisible }: FeedbackMessageProps) {
  if (!isVisible) return null;

  const styles = {
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      icon: <XCircle className="w-5 h-5 text-red-600" />,
    },
    hint: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      icon: <AlertCircle className="w-5 h-5 text-blue-600" />,
    },
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} border-2 rounded-lg p-4 flex items-start gap-3 animate-slideDown`}>
      {style.icon}
      <p className={`${style.text} font-medium flex-1`}>{message}</p>
    </div>
  );
}

import { Trophy, X } from 'lucide-react';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNextLesson: () => void;
  points: number;
  isLastLesson: boolean;
}

export function CelebrationModal({
  isOpen,
  onClose,
  onNextLesson,
  points,
  isLastLesson,
}: CelebrationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-scaleIn">
        <button
          onClick={onClose}
          className="float-right text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-4 animate-bounce">
            <Trophy className="w-12 h-12 text-yellow-500" />
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Congratulations!
          </h2>

          <p className="text-lg text-gray-600 mb-4">
            {isLastLesson
              ? "You've completed all lessons!"
              : 'You completed this lesson!'}
          </p>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-semibold">
              + {points} Points Earned!
            </p>
          </div>

          {!isLastLesson ? (
            <button
              onClick={onNextLesson}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Continue to Next Lesson
            </button>
          ) : (
            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

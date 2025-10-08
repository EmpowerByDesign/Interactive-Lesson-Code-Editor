import { useState } from 'react';
import { Eye, Ear, Hand, ArrowRight } from 'lucide-react';
import { UserPreferences } from '../types';

interface QuizScreenProps {
  onComplete: (preferences: UserPreferences) => void;
}

export function QuizScreen({ onComplete }: QuizScreenProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [preferences, setPreferences] = useState<UserPreferences>({
    learningStyle: null,
    experienceLevel: null,
    goal: null,
  });

  const questions = [
    {
      question: 'How do you learn best?',
      options: [
        {
          value: 'visual' as const,
          label: 'Visual',
          description: 'I learn by seeing diagrams and examples',
          icon: <Eye className="w-8 h-8" />,
        },
        {
          value: 'auditory' as const,
          label: 'Auditory',
          description: 'I learn by listening and discussing',
          icon: <Ear className="w-8 h-8" />,
        },
        {
          value: 'hands-on' as const,
          label: 'Hands-On',
          description: 'I learn by doing and experimenting',
          icon: <Hand className="w-8 h-8" />,
        },
      ],
      key: 'learningStyle' as keyof UserPreferences,
    },
    {
      question: "What's your experience level?",
      options: [
        {
          value: 'beginner' as const,
          label: 'Beginner',
          description: 'New to coding, starting from scratch',
          icon: <div className="text-3xl">🌱</div>,
        },
        {
          value: 'intermediate' as const,
          label: 'Intermediate',
          description: 'Some coding experience, ready to grow',
          icon: <div className="text-3xl">🌿</div>,
        },
        {
          value: 'advanced' as const,
          label: 'Advanced',
          description: 'Experienced, want to master skills',
          icon: <div className="text-3xl">🌳</div>,
        },
      ],
      key: 'experienceLevel' as keyof UserPreferences,
    },
    {
      question: 'What do you want to build?',
      options: [
        {
          value: 'websites' as const,
          label: 'Websites',
          description: 'Beautiful, responsive web pages',
          icon: <div className="text-3xl">🌐</div>,
        },
        {
          value: 'apps' as const,
          label: 'Web Apps',
          description: 'Interactive applications and tools',
          icon: <div className="text-3xl">📱</div>,
        },
        {
          value: 'games' as const,
          label: 'Games',
          description: 'Fun, interactive browser games',
          icon: <div className="text-3xl">🎮</div>,
        },
      ],
      key: 'goal' as keyof UserPreferences,
    },
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleSelect = (value: string) => {
    const updatedPreferences = {
      ...preferences,
      [currentQ.key]: value,
    };
    setPreferences(updatedPreferences);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
      }, 300);
    } else {
      setTimeout(() => {
        onComplete(updatedPreferences);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-teal-500 to-cyan-500 flex items-center justify-center p-8">
      <div className="max-w-3xl w-full">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-white text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl animate-scaleIn">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            {currentQ.question}
          </h2>

          <div className="space-y-4">
            {currentQ.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="w-full bg-gray-50 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-500 rounded-xl p-6 transition-all text-left group"
              >
                <div className="flex items-center gap-4">
                  <div className="text-gray-600 group-hover:text-blue-600 transition-colors">
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-lg mb-1">
                      {option.label}
                    </div>
                    <div className="text-gray-600 text-sm">{option.description}</div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

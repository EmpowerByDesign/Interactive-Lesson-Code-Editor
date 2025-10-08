import { CheckCircle, ArrowRight } from 'lucide-react';
import { UserPreferences } from '../types';

interface ResultsScreenProps {
  preferences: UserPreferences;
  onContinue: () => void;
}

export function ResultsScreen({ preferences, onContinue }: ResultsScreenProps) {
  const getRecommendations = () => {
    const recs = {
      learningStyle: {
        visual: 'Your lessons will include plenty of diagrams, code examples, and visual demonstrations.',
        auditory: 'Your lessons will emphasize clear explanations and conceptual understanding.',
        'hands-on': 'Your lessons will focus on practical exercises and real-world projects.',
      },
      experienceLevel: {
        beginner: 'We\'ll start with the fundamentals and build up gradually.',
        intermediate: 'We\'ll review basics quickly and dive into advanced concepts.',
        advanced: 'We\'ll focus on best practices and professional techniques.',
      },
      goal: {
        websites: 'Your path includes HTML, CSS, responsive design, and modern layouts.',
        apps: 'Your path includes JavaScript, interactivity, and dynamic applications.',
        games: 'Your path includes animation, canvas, and game development fundamentals.',
      },
    };

    return {
      style: recs.learningStyle[preferences.learningStyle || 'hands-on'],
      level: recs.experienceLevel[preferences.experienceLevel || 'beginner'],
      goal: recs.goal[preferences.goal || 'websites'],
    };
  };

  const recommendations = getRecommendations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center p-8">
      <div className="max-w-3xl w-full animate-scaleIn">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Your Learning Path is Ready!
            </h2>
            <p className="text-gray-600">
              Based on your preferences, we've customized your experience
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">👁️</span>
                Learning Style: {preferences.learningStyle?.charAt(0).toUpperCase() +
                  (preferences.learningStyle?.slice(1) || '')}
              </h3>
              <p className="text-blue-800 text-sm">{recommendations.style}</p>
            </div>

            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
              <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Experience Level: {preferences.experienceLevel?.charAt(0).toUpperCase() +
                  (preferences.experienceLevel?.slice(1) || '')}
              </h3>
              <p className="text-green-800 text-sm">{recommendations.level}</p>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
              <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Your Goal: {preferences.goal?.charAt(0).toUpperCase() +
                  (preferences.goal?.slice(1) || '')}
              </h3>
              <p className="text-amber-800 text-sm">{recommendations.goal}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-6">
            <h3 className="font-bold text-lg mb-2">What's Next?</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Complete interactive coding exercises</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Build real projects from scratch</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Earn points and track your progress</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onContinue}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl text-lg shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3"
          >
            Start Your First Lesson
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

import { Award, Flame } from 'lucide-react';

interface ProgressHeaderProps {
  points: number;
  streak: number;
  currentLesson: number;
  totalLessons: number;
}

export function ProgressHeader({
  points,
  streak,
  currentLesson,
  totalLessons,
}: ProgressHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold text-gray-900">HTML Learning Platform</h1>
        <div className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-full">
          Lesson {currentLesson} of {totalLessons}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-lg border border-amber-200">
          <Award className="w-5 h-5 text-amber-600" />
          <span className="font-bold text-amber-900">{points}</span>
          <span className="text-sm text-amber-700">points</span>
        </div>

        <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg border border-orange-200">
          <Flame className="w-5 h-5 text-orange-600" />
          <span className="font-bold text-orange-900">{streak}</span>
          <span className="text-sm text-orange-700">day streak</span>
        </div>
      </div>
    </div>
  );
}

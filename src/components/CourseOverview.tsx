import { Check, Lock } from 'lucide-react';
import { lessons } from '../lessons';

interface CourseOverviewProps {
  completedLessons: number[];
  currentLessonIndex: number;
  onSelectLesson: (index: number) => void;
}

export function CourseOverview({
  completedLessons,
  currentLessonIndex,
  onSelectLesson,
}: CourseOverviewProps) {
  const totalLessons = lessons.length;
  const completedCount = completedLessons.length;
  const progressPercentage = (completedCount / totalLessons) * 100;

  const isLessonUnlocked = (lessonId: number, lessonIndex: number) => {
    if (lessonIndex === 0) return true;
    const previousLesson = lessons[lessonIndex - 1];
    return completedLessons.includes(previousLesson.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Course Overview
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Track your progress and jump to any unlocked lesson
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-700">
                Overall Progress
              </span>
              <span className="text-sm font-bold text-blue-600">
                {completedCount} of {totalLessons} Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isUnlocked = isLessonUnlocked(lesson.id, index);
            const isCurrent = index === currentLessonIndex;

            return (
              <button
                key={lesson.id}
                onClick={() => isUnlocked && onSelectLesson(index)}
                disabled={!isUnlocked}
                className={`
                  relative bg-white rounded-xl p-6 shadow-md transition-all text-left
                  ${
                    isUnlocked
                      ? 'hover:shadow-xl hover:scale-105 cursor-pointer'
                      : 'opacity-50 cursor-not-allowed'
                  }
                  ${isCurrent ? 'ring-2 ring-blue-500' : ''}
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                      w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                      ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isUnlocked
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-200 text-gray-400'
                      }
                    `}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6" />
                      ) : isUnlocked ? (
                        index + 1
                      ) : (
                        <Lock className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Lesson {index + 1}
                      </div>
                      {isCurrent && (
                        <div className="text-xs font-semibold text-blue-600 mt-1">
                          Current
                        </div>
                      )}
                    </div>
                  </div>

                  {isCompleted && (
                    <div className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                      Done
                    </div>
                  )}
                  {!isUnlocked && (
                    <div className="bg-gray-100 text-gray-500 text-xs font-semibold px-2 py-1 rounded">
                      Locked
                    </div>
                  )}
                </div>

                <h3
                  className={`font-bold text-lg mb-2 ${
                    isUnlocked ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {lesson.title.replace(/^Lesson \d+:\s*/, '')}
                </h3>

                <p
                  className={`text-sm ${
                    isUnlocked ? 'text-gray-600' : 'text-gray-400'
                  }`}
                >
                  {lesson.sections[0]?.content.substring(0, 80)}...
                </p>

                {!isUnlocked && (
                  <div className="mt-4 text-xs text-gray-500 flex items-center gap-1">
                    <Lock className="w-3 h-3" />
                    Complete previous lesson to unlock
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {completedCount === totalLessons && (
          <div className="mt-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-8 text-center text-white shadow-xl">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
            <p className="text-lg text-green-50">
              You've completed all {totalLessons} lessons. You're now ready to build amazing web projects!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

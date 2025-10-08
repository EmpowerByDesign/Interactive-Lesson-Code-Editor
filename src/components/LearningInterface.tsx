import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Lightbulb, ChevronRight } from 'lucide-react';
import { lessons } from '../lessons';
import { UserProgress } from '../types';
import { validateCode } from '../utils/validation';
import { CelebrationModal } from './CelebrationModal';
import { FeedbackMessage } from './FeedbackMessage';
import { ProgressHeader } from './ProgressHeader';

const PROGRESS_STORAGE_KEY = 'codelearn_progress';

const loadProgress = (): { progress: UserProgress; lessonIndex: number } => {
  const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return {
        progress: parsed.progress || {
          currentLesson: 1,
          points: 0,
          streak: 3,
          completedLessons: [],
        },
        lessonIndex: parsed.lessonIndex || 0,
      };
    } catch (e) {
      console.error('Failed to parse saved progress');
    }
  }
  return {
    progress: {
      currentLesson: 1,
      points: 0,
      streak: 3,
      completedLessons: [],
    },
    lessonIndex: 0,
  };
};

const saveProgress = (progress: UserProgress, lessonIndex: number) => {
  localStorage.setItem(
    PROGRESS_STORAGE_KEY,
    JSON.stringify({ progress, lessonIndex })
  );
};

export function LearningInterface() {
  const initialData = loadProgress();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(initialData.lessonIndex);
  const currentLesson = lessons[currentLessonIndex];

  const [code, setCode] = useState(currentLesson.starterCode);
  const [previewContent, setPreviewContent] = useState(currentLesson.starterCode);

  const [progress, setProgress] = useState<UserProgress>(initialData.progress);

  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error' | 'hint';
    message: string;
    isVisible: boolean;
  }>({
    type: 'success',
    message: '',
    isVisible: false,
  });

  const [showCelebration, setShowCelebration] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    saveProgress(progress, currentLessonIndex);
  }, [progress, currentLessonIndex]);

  const handleRunCode = () => {
    setPreviewContent(code);

    const validation = validateCode(code, currentLesson);

    if (validation.isValid) {
      const isAlreadyCompleted = progress.completedLessons.includes(currentLesson.id);

      setFeedback({
        type: 'success',
        message: validation.message,
        isVisible: true,
      });

      setTimeout(() => {
        setFeedback((prev) => ({ ...prev, isVisible: false }));

        if (!isAlreadyCompleted) {
          setShowCelebration(true);
          setProgress((prev) => ({
            ...prev,
            points: prev.points + 10,
            completedLessons: [...prev.completedLessons, currentLesson.id],
          }));
        }
      }, 1500);
    } else {
      setFeedback({
        type: 'error',
        message: validation.message,
        isVisible: true,
      });

      setTimeout(() => {
        setFeedback((prev) => ({ ...prev, isVisible: false }));
      }, 5000);
    }
  };

  const handleGetHint = () => {
    if (currentLesson.hints.length === 0) return;

    const hint = currentLesson.hints[currentHintIndex];
    setFeedback({
      type: 'hint',
      message: hint,
      isVisible: true,
    });

    setCurrentHintIndex((prev) => (prev + 1) % currentLesson.hints.length);

    setTimeout(() => {
      setFeedback((prev) => ({ ...prev, isVisible: false }));
    }, 8000);
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      const nextIndex = currentLessonIndex + 1;
      const nextLesson = lessons[nextIndex];

      setCurrentLessonIndex(nextIndex);
      setCode(nextLesson.starterCode);
      setPreviewContent(nextLesson.starterCode);
      setCurrentHintIndex(0);
      setFeedback({ type: 'success', message: '', isVisible: false });
      setShowCelebration(false);
      setProgress((prev) => ({
        ...prev,
        currentLesson: prev.currentLesson + 1,
      }));
    }
  };

  const handleCelebrationClose = () => {
    setShowCelebration(false);
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      localStorage.removeItem(PROGRESS_STORAGE_KEY);
      window.location.reload();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 animate-fadeIn">
      <ProgressHeader
        points={progress.points}
        streak={progress.streak}
        currentLesson={currentLessonIndex + 1}
        totalLessons={lessons.length}
        onResetProgress={handleResetProgress}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* LEFT PANEL - Lesson Content */}
        <div className="w-[40%] bg-white overflow-y-auto">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {currentLesson.title}
            </h1>

            <div className="space-y-6 text-gray-700">
              {currentLesson.sections.map((section, index) => (
                <section key={index}>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {section.heading}
                  </h2>
                  <p className="leading-relaxed mb-3">{section.content}</p>
                  {section.codeExample && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 font-mono text-sm whitespace-pre-wrap">
                      {section.codeExample}
                    </div>
                  )}
                </section>
              ))}
            </div>

            <div className="mt-8 space-y-3">
              <button
                onClick={handleGetHint}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Lightbulb className="w-5 h-5" />
                Get Hint
              </button>

              {progress.completedLessons.includes(currentLesson.id) &&
                currentLessonIndex < lessons.length - 1 && (
                  <button
                    onClick={handleNextLesson}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                  >
                    Next Lesson
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Split into Preview and Editor */}
        <div className="flex-1 flex flex-col">
          {/* RIGHT TOP PANEL - Live Preview */}
          <div className="h-1/2 bg-gray-800 border-b border-gray-700">
            <div className="h-full flex flex-col">
              <div className="bg-gray-800 px-6 py-3 border-b border-gray-700">
                <h3 className="text-white font-semibold">Live Preview</h3>
              </div>
              <div className="flex-1 bg-white p-4">
                <FeedbackMessage
                  type={feedback.type}
                  message={feedback.message}
                  isVisible={feedback.isVisible}
                />
                <div className="h-full mt-4">
                  <iframe
                    ref={iframeRef}
                    srcDoc={previewContent}
                    className="w-full h-full border border-gray-200 rounded-lg"
                    title="preview"
                    sandbox="allow-scripts"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT BOTTOM PANEL - Code Editor */}
          <div className="h-1/2 bg-gray-900 flex flex-col">
            <div className="bg-gray-800 px-6 py-3 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-white font-semibold">Code Editor</h3>
              <button
                onClick={handleRunCode}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Play className="w-4 h-4" />
                Run Code
              </button>
            </div>
            <div className="flex-1">
              <Editor
                height="100%"
                defaultLanguage="html"
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <CelebrationModal
        isOpen={showCelebration}
        onClose={handleCelebrationClose}
        onNextLesson={handleNextLesson}
        points={10}
        isLastLesson={currentLessonIndex === lessons.length - 1}
      />
    </div>
  );
}

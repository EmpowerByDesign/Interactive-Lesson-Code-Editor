import { useState, useEffect } from 'react';
import { OnboardingStep, UserPreferences } from './types';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { LearningInterface } from './components/LearningInterface';

const STORAGE_KEY = 'codelearn_preferences';
const PROGRESS_STORAGE_KEY = 'codelearn_progress';

function App() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [preferences, setPreferences] = useState<UserPreferences>({
    learningStyle: null,
    experienceLevel: null,
    goal: null,
  });

  useEffect(() => {
    const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
    const savedPreferences = localStorage.getItem(STORAGE_KEY);

    if (savedProgress && savedPreferences) {
      try {
        const parsedPrefs = JSON.parse(savedPreferences);
        setPreferences(parsedPrefs);
        setCurrentStep('learning');
      } catch (e) {
        console.error('Failed to parse saved data');
      }
    } else if (savedPreferences) {
      try {
        const parsedPrefs = JSON.parse(savedPreferences);
        setPreferences(parsedPrefs);
        setCurrentStep('learning');
      } catch (e) {
        console.error('Failed to parse saved preferences');
      }
    }
  }, []);

  const handleStartOnboarding = () => {
    setCurrentStep('quiz');
  };

  const handleQuizComplete = (userPreferences: UserPreferences) => {
    setPreferences(userPreferences);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userPreferences));
    setCurrentStep('results');
  };

  const handleContinueToLearning = () => {
    setCurrentStep('learning');
  };

  return (
    <>
      {currentStep === 'welcome' && (
        <WelcomeScreen onStart={handleStartOnboarding} />
      )}
      {currentStep === 'quiz' && (
        <QuizScreen onComplete={handleQuizComplete} />
      )}
      {currentStep === 'results' && (
        <ResultsScreen
          preferences={preferences}
          onContinue={handleContinueToLearning}
        />
      )}
      {currentStep === 'learning' && <LearningInterface />}
    </>
  );
}

export default App;

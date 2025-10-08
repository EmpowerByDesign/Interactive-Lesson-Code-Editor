import { useState, useEffect } from 'react';
import { OnboardingStep, UserPreferences } from './types';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { LearningInterface } from './components/LearningInterface';

const STORAGE_KEY = 'codelearn_preferences';

function App() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [preferences, setPreferences] = useState<UserPreferences>({
    learningStyle: null,
    experienceLevel: null,
    goal: null,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedPrefs = JSON.parse(saved);
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

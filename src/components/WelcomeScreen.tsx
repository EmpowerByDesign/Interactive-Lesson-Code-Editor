import { Code2, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center p-8">
      <div className="max-w-2xl text-center animate-fadeIn">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-8 shadow-2xl">
          <Code2 className="w-12 h-12 text-blue-600" />
        </div>

        <h1 className="text-5xl font-bold text-white mb-4">
          Welcome to CodeLearn
        </h1>

        <p className="text-xl text-blue-100 mb-8 leading-relaxed">
          Master HTML, CSS, and JavaScript through interactive lessons designed
          just for you. Write code, see instant results, and build real projects.
        </p>

        <div className="grid grid-cols-3 gap-6 mb-12">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
            <div className="text-3xl font-bold text-white mb-2">50+</div>
            <div className="text-blue-100 text-sm">Interactive Lessons</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
            <div className="text-3xl font-bold text-white mb-2">100%</div>
            <div className="text-blue-100 text-sm">Hands-On Learning</div>
          </div>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 border border-white border-opacity-20">
            <div className="text-3xl font-bold text-white mb-2">Real</div>
            <div className="text-blue-100 text-sm">Projects Built</div>
          </div>
        </div>

        <button
          onClick={onStart}
          className="group bg-white hover:bg-blue-50 text-blue-600 font-bold py-4 px-12 rounded-full text-lg shadow-2xl transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
        >
          Start Learning
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        </button>

        <p className="text-blue-200 text-sm mt-8">
          No credit card required. Start learning in 2 minutes.
        </p>
      </div>
    </div>
  );
}

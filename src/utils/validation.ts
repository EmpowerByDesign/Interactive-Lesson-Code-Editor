import { Lesson } from '../types';

export function validateCode(code: string, lesson: Lesson): {
  isValid: boolean;
  message: string;
} {
  if (!code.trim()) {
    return {
      isValid: false,
      message: 'Your code is empty. Try writing some HTML!',
    };
  }

  if (lesson.validationRules.requiredTags) {
    for (const tag of lesson.validationRules.requiredTags) {
      if (!code.includes(tag)) {
        return {
          isValid: false,
          message: `Missing required tag: ${tag}. Make sure your HTML structure is complete!`,
        };
      }
    }
  }

  if (lesson.validationRules.requiredText) {
    for (const text of lesson.validationRules.requiredText) {
      if (!code.includes(text)) {
        return {
          isValid: false,
          message: `Missing required content: "${text}". Check the lesson requirements!`,
        };
      }
    }
  }

  if (lesson.validationRules.customValidation) {
    const result = lesson.validationRules.customValidation(code);
    if (!result.isValid) {
      return {
        isValid: false,
        message: result.message || 'Your code needs some adjustments.',
      };
    }
  }

  return {
    isValid: true,
    message: 'Great job! Your code looks perfect!',
  };
}

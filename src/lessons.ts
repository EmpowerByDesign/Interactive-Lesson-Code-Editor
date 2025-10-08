import { Lesson } from './types';

export const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Lesson 1: Your First HTML Page',
    sections: [
      {
        heading: 'What is HTML?',
        content: 'HTML (HyperText Markup Language) is the standard language for creating web pages. It describes the structure of a web page using markup tags.',
      },
      {
        heading: 'Basic Structure',
        content: 'Every HTML page has a basic structure with these essential elements:',
        codeExample: `<!DOCTYPE html>
<html>
  <head>
    ...page metadata...
  </head>
  <body>
    ...page content...
  </body>
</html>`,
      },
      {
        heading: 'Your Task',
        content: 'Modify the code to include your name in the heading and add a paragraph about yourself. Keep the basic HTML structure intact!',
      },
    ],
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        h1 {
            color: #2563eb;
        }
    </style>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first HTML page.</p>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        h1 {
            color: #2563eb;
        }
    </style>
</head>
<body>
    <h1>Hello, I'm John!</h1>
    <p>I'm learning HTML and web development.</p>
</body>
</html>`,
    hints: [
      'Try changing the text inside the <h1> tags to include your name.',
      'Update the paragraph to tell us something about yourself.',
      'Make sure to keep all the HTML tags properly closed!',
    ],
    validationRules: {
      requiredTags: ['<!DOCTYPE html>', '<html>', '<head>', '<body>', '<h1>', '<p>'],
    },
  },
  {
    id: 2,
    title: 'Lesson 2: Adding Links and Images',
    sections: [
      {
        heading: 'HTML Links',
        content: 'Links allow users to navigate between pages. They are created using the <a> tag with an href attribute.',
        codeExample: '<a href="https://example.com">Click here</a>',
      },
      {
        heading: 'HTML Images',
        content: 'Images are added using the <img> tag. The src attribute specifies the image URL, and alt provides alternative text.',
        codeExample: '<img src="photo.jpg" alt="Description">',
      },
      {
        heading: 'Your Task',
        content: 'Add at least one link and one image to your page. Use any valid URL for testing!',
      },
    ],
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Links and Images</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        h1 {
            color: #10b981;
        }
        img {
            max-width: 300px;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <h1>My Favorite Things</h1>
    <p>I love learning web development!</p>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html>
<head>
    <title>Links and Images</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        h1 {
            color: #10b981;
        }
        img {
            max-width: 300px;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <h1>My Favorite Things</h1>
    <p>I love learning web development!</p>
    <a href="https://developer.mozilla.org">Visit MDN</a>
    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" alt="Computer">
</body>
</html>`,
    hints: [
      'Add a link using <a href="URL">Link Text</a>',
      'Add an image using <img src="URL" alt="description">',
      'You can use any valid URL for the href and src attributes.',
    ],
    validationRules: {
      requiredTags: ['<a', '<img'],
      customValidation: (code: string) => {
        const hasHref = code.includes('href=');
        const hasSrc = code.includes('src=');
        const hasAlt = code.includes('alt=');

        if (!hasHref || !hasSrc) {
          return {
            isValid: false,
            message: 'Make sure to include both a link (with href) and an image (with src).',
          };
        }
        if (!hasAlt) {
          return {
            isValid: false,
            message: 'Don\'t forget to add an alt attribute to your image for accessibility!',
          };
        }
        return { isValid: true };
      },
    },
  },
  {
    id: 3,
    title: 'Lesson 3: Lists and Styling',
    sections: [
      {
        heading: 'HTML Lists',
        content: 'There are two main types of lists: ordered lists (<ol>) with numbers and unordered lists (<ul>) with bullets.',
        codeExample: `<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>`,
      },
      {
        heading: 'CSS Styling',
        content: 'CSS allows you to style your HTML. You can change colors, fonts, spacing, and much more using CSS rules in the <style> section.',
      },
      {
        heading: 'Your Task',
        content: 'Create a list of at least 3 items (your hobbies, favorite foods, etc.) and style it with CSS. Make the list items a different color!',
      },
    ],
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>My List</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        h1 {
            color: #8b5cf6;
        }
    </style>
</head>
<body>
    <h1>My Favorite Hobbies</h1>
    <p>Here are some things I enjoy:</p>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html>
<head>
    <title>My List</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        h1 {
            color: #8b5cf6;
        }
        li {
            color: #2563eb;
            margin: 8px 0;
        }
    </style>
</head>
<body>
    <h1>My Favorite Hobbies</h1>
    <p>Here are some things I enjoy:</p>
    <ul>
        <li>Reading books</li>
        <li>Playing guitar</li>
        <li>Coding</li>
    </ul>
</body>
</html>`,
    hints: [
      'Create a list using <ul> and <li> tags.',
      'Add at least 3 list items using <li>.',
      'Style the list items by adding CSS rules for the li selector.',
    ],
    validationRules: {
      requiredTags: ['<ul>', '<li>'],
      customValidation: (code: string) => {
        const liCount = (code.match(/<li>/g) || []).length;
        const hasLiStyle = code.includes('li {') || code.includes('li{');

        if (liCount < 3) {
          return {
            isValid: false,
            message: 'You need at least 3 list items. Add more <li> tags!',
          };
        }
        if (!hasLiStyle) {
          return {
            isValid: false,
            message: 'Don\'t forget to add CSS styling for your list items (li selector).',
          };
        }
        return { isValid: true };
      },
    },
  },
];

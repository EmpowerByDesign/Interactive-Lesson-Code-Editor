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
  {
    id: 4,
    title: 'Lesson 4: CSS Box Model and Padding',
    sections: [
      {
        heading: 'The CSS Box Model',
        content: 'Every HTML element is a box with margin (space outside), border, padding (space inside), and content. Understanding this is key to creating beautiful layouts!',
        codeExample: `div {
  margin: 20px;
  padding: 15px;
  border: 2px solid blue;
}`,
      },
      {
        heading: 'Creating Containers',
        content: 'The <div> tag creates a container to group content. It\'s like a box you can style and position.',
      },
      {
        heading: 'Your Task',
        content: 'Create a styled card using a <div> with a heading and paragraph inside. Add padding, margin, border, and a background color!',
      },
    ],
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Box Model</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f0f0f0;
        }
    </style>
</head>
<body>
    <h1>My Card</h1>
    <p>Add a styled card below this text.</p>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html>
<head>
    <title>Box Model</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f0f0f0;
        }
        .card {
            background-color: white;
            padding: 20px;
            margin: 20px 0;
            border: 2px solid #2563eb;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <h1>My Card</h1>
    <p>Add a styled card below this text.</p>
    <div class="card">
        <h2>Card Title</h2>
        <p>This is my styled card with padding and borders!</p>
    </div>
</body>
</html>`,
    hints: [
      'Create a <div> element to act as your card container.',
      'Add CSS styling for the div with padding, margin, and border properties.',
      'Try adding background-color and border-radius for a polished look.',
    ],
    validationRules: {
      requiredTags: ['<div>'],
      customValidation: (code: string) => {
        const hasPadding = code.includes('padding:') || code.includes('padding :');
        const hasMargin = code.includes('margin:') || code.includes('margin :');
        const hasBorder = code.includes('border:') || code.includes('border :');

        if (!hasPadding) {
          return {
            isValid: false,
            message: 'Add padding to create space inside your card!',
          };
        }
        if (!hasMargin) {
          return {
            isValid: false,
            message: 'Add margin to create space outside your card!',
          };
        }
        if (!hasBorder) {
          return {
            isValid: false,
            message: 'Add a border to define your card\'s edges!',
          };
        }
        return { isValid: true };
      },
    },
  },
  {
    id: 5,
    title: 'Lesson 5: CSS Flexbox Basics',
    sections: [
      {
        heading: 'What is Flexbox?',
        content: 'Flexbox is a powerful layout system that makes it easy to align and distribute items in a container. Perfect for navigation bars, galleries, and more!',
      },
      {
        heading: 'Flexbox Properties',
        content: 'Key properties include display: flex (activates flexbox), justify-content (horizontal alignment), and align-items (vertical alignment).',
        codeExample: `.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}`,
      },
      {
        heading: 'Your Task',
        content: 'Create a horizontal navigation bar with at least 3 links using Flexbox. Style it with colors and proper spacing!',
      },
    ],
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Flexbox Nav</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
    </style>
</head>
<body>
    <h1>My Website</h1>
    <p>Create a navigation bar above this text.</p>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html>
<head>
    <title>Flexbox Nav</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        nav {
            display: flex;
            justify-content: space-around;
            align-items: center;
            background-color: #2563eb;
            padding: 15px;
        }
        nav a {
            color: white;
            text-decoration: none;
            padding: 10px;
        }
    </style>
</head>
<body>
    <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
    </nav>
    <h1>My Website</h1>
    <p>Create a navigation bar above this text.</p>
</body>
</html>`,
    hints: [
      'Create a <nav> element with at least 3 <a> links inside.',
      'Add "display: flex" to the nav element in your CSS.',
      'Use justify-content to space out the links horizontally.',
    ],
    validationRules: {
      requiredTags: ['<nav>'],
      customValidation: (code: string) => {
        const hasDisplayFlex = code.includes('display: flex') || code.includes('display:flex');
        const linkCount = (code.match(/<a/g) || []).length;
        const hasJustifyContent = code.includes('justify-content');

        if (linkCount < 3) {
          return {
            isValid: false,
            message: 'Add at least 3 links in your navigation bar!',
          };
        }
        if (!hasDisplayFlex) {
          return {
            isValid: false,
            message: 'Use "display: flex" to activate Flexbox layout!',
          };
        }
        if (!hasJustifyContent) {
          return {
            isValid: false,
            message: 'Use justify-content to align your navigation items!',
          };
        }
        return { isValid: true };
      },
    },
  },
  {
    id: 6,
    title: 'Lesson 6: Adding Buttons and Interactivity',
    sections: [
      {
        heading: 'HTML Buttons',
        content: 'Buttons are interactive elements that users can click. They\'re created with the <button> tag and can trigger actions.',
        codeExample: '<button>Click Me!</button>',
      },
      {
        heading: 'JavaScript onclick',
        content: 'The onclick attribute lets you run JavaScript code when a button is clicked. You can use it to make your page interactive!',
        codeExample: '<button onclick="alert(\'Hello!\')">Say Hello</button>',
      },
      {
        heading: 'Your Task',
        content: 'Create a button that changes the heading text when clicked. Use onclick and basic JavaScript!',
      },
    ],
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Interactive Button</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        button {
            background-color: #10b981;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #059669;
        }
    </style>
</head>
<body>
    <h1 id="title">Original Text</h1>
    <p>Create a button below that changes the heading above!</p>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html>
<head>
    <title>Interactive Button</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        button {
            background-color: #10b981;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #059669;
        }
    </style>
</head>
<body>
    <h1 id="title">Original Text</h1>
    <p>Create a button below that changes the heading above!</p>
    <button onclick="document.getElementById('title').innerHTML = 'Text Changed!'">
        Change Text
    </button>
</body>
</html>`,
    hints: [
      'Add a <button> element with text inside.',
      'Use the onclick attribute to run JavaScript when clicked.',
      'Access the heading with document.getElementById and change its innerHTML.',
    ],
    validationRules: {
      requiredTags: ['<button>'],
      customValidation: (code: string) => {
        const hasOnclick = code.includes('onclick=');
        const hasGetElementById = code.includes('getElementById');
        const hasInnerHTML = code.includes('innerHTML');

        if (!hasOnclick) {
          return {
            isValid: false,
            message: 'Add an onclick attribute to your button!',
          };
        }
        if (!hasGetElementById) {
          return {
            isValid: false,
            message: 'Use document.getElementById to access the heading element!',
          };
        }
        if (!hasInnerHTML) {
          return {
            isValid: false,
            message: 'Use innerHTML to change the heading text!',
          };
        }
        return { isValid: true };
      },
    },
  },
  {
    id: 7,
    title: 'Lesson 7: JavaScript Variables and Console',
    sections: [
      {
        heading: 'Variables in JavaScript',
        content: 'Variables store data that you can use and change. Use "let" for variables that can change, and "const" for constants.',
        codeExample: `let age = 25;
const name = "Alex";
let city = "New York";`,
      },
      {
        heading: 'Console.log',
        content: 'console.log() prints messages to the browser console, which is great for debugging and checking values.',
        codeExample: 'console.log("Hello World");',
      },
      {
        heading: 'Your Task',
        content: 'Create at least 3 variables (using let or const) and log them to the console. Open the browser console (F12) to see your output!',
      },
    ],
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Variables</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
    </style>
</head>
<body>
    <h1>JavaScript Variables</h1>
    <p>Open the browser console (F12) to see your variables logged!</p>

    <script>
        // Create your variables here

    </script>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Variables</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
    </style>
</head>
<body>
    <h1>JavaScript Variables</h1>
    <p>Open the browser console (F12) to see your variables logged!</p>

    <script>
        const name = "Sarah";
        let age = 28;
        let favoriteColor = "blue";

        console.log(name);
        console.log(age);
        console.log(favoriteColor);
    </script>
</body>
</html>`,
    hints: [
      'Declare variables inside the <script> tags.',
      'Use const for values that won\'t change, let for values that might.',
      'Log each variable using console.log(variableName);',
    ],
    validationRules: {
      requiredTags: ['<script>'],
      customValidation: (code: string) => {
        const letCount = (code.match(/\blet\b/g) || []).length;
        const constCount = (code.match(/\bconst\b/g) || []).length;
        const consoleLogCount = (code.match(/console\.log/g) || []).length;
        const totalVars = letCount + constCount;

        if (totalVars < 3) {
          return {
            isValid: false,
            message: 'Create at least 3 variables using let or const!',
          };
        }
        if (consoleLogCount < 3) {
          return {
            isValid: false,
            message: 'Use console.log() to display at least 3 values!',
          };
        }
        return { isValid: true };
      },
    },
  },
  {
    id: 8,
    title: 'Lesson 8: JavaScript Functions',
    sections: [
      {
        heading: 'What are Functions?',
        content: 'Functions are reusable blocks of code that perform specific tasks. They help organize your code and avoid repetition.',
      },
      {
        heading: 'Creating Functions',
        content: 'Functions are defined with the "function" keyword, a name, parentheses, and curly braces containing the code.',
        codeExample: `function greet() {
  alert("Hello!");
}

greet(); // Call the function`,
      },
      {
        heading: 'Your Task',
        content: 'Create a function that displays an alert message, then add a button that calls your function when clicked!',
      },
    ],
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Functions</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        button {
            background-color: #f59e0b;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h1>JavaScript Functions</h1>
    <p>Create a function and a button to trigger it!</p>

    <script>
        // Create your function here

    </script>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html>
<head>
    <title>JavaScript Functions</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        button {
            background-color: #f59e0b;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h1>JavaScript Functions</h1>
    <p>Create a function and a button to trigger it!</p>
    <button onclick="showMessage()">Click Me</button>

    <script>
        function showMessage() {
            alert("You clicked the button!");
        }
    </script>
</body>
</html>`,
    hints: [
      'Create a function using the function keyword followed by a name.',
      'Inside the function, use alert() to show a message.',
      'Add a button with onclick that calls your function name.',
    ],
    validationRules: {
      requiredTags: ['<button>', '<script>'],
      customValidation: (code: string) => {
        const hasFunction = code.includes('function ');
        const hasAlert = code.includes('alert(');
        const hasOnclick = code.includes('onclick=');

        if (!hasFunction) {
          return {
            isValid: false,
            message: 'Create a function using the function keyword!',
          };
        }
        if (!hasAlert) {
          return {
            isValid: false,
            message: 'Use alert() inside your function to show a message!',
          };
        }
        if (!hasOnclick) {
          return {
            isValid: false,
            message: 'Add a button with onclick to call your function!',
          };
        }
        return { isValid: true };
      },
    },
  },
  {
    id: 9,
    title: 'Lesson 9: Changing HTML with JavaScript',
    sections: [
      {
        heading: 'DOM Manipulation',
        content: 'JavaScript can change any HTML element on the page. This is called DOM (Document Object Model) manipulation.',
      },
      {
        heading: 'getElementById and innerHTML',
        content: 'getElementById selects an element by its id attribute. innerHTML changes the content inside that element.',
        codeExample: `let element = document.getElementById("demo");
element.innerHTML = "New content!";`,
      },
      {
        heading: 'Your Task',
        content: 'Create a paragraph with an id, and a button that changes the paragraph text when clicked!',
      },
    ],
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>DOM Manipulation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        #message {
            font-size: 18px;
            color: #2563eb;
            padding: 15px;
            background-color: #dbeafe;
            border-radius: 8px;
            margin: 20px 0;
        }
        button {
            background-color: #8b5cf6;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h1>Change Text with JavaScript</h1>

    <script>
        // Create your function here

    </script>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html>
<head>
    <title>DOM Manipulation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        #message {
            font-size: 18px;
            color: #2563eb;
            padding: 15px;
            background-color: #dbeafe;
            border-radius: 8px;
            margin: 20px 0;
        }
        button {
            background-color: #8b5cf6;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <h1>Change Text with JavaScript</h1>
    <p id="message">This is the original text.</p>
    <button onclick="changeText()">Change Text</button>

    <script>
        function changeText() {
            document.getElementById("message").innerHTML = "The text has been changed!";
        }
    </script>
</body>
</html>`,
    hints: [
      'Add a <p> element with an id attribute (like id="message").',
      'Create a function that uses getElementById to select that element.',
      'Change the element\'s innerHTML to new text.',
    ],
    validationRules: {
      requiredTags: ['<p', '<button>', '<script>'],
      customValidation: (code: string) => {
        const hasId = code.includes('id=');
        const hasGetElementById = code.includes('getElementById');
        const hasInnerHTML = code.includes('innerHTML');
        const hasFunction = code.includes('function ');

        if (!hasId) {
          return {
            isValid: false,
            message: 'Add an id attribute to your paragraph element!',
          };
        }
        if (!hasFunction) {
          return {
            isValid: false,
            message: 'Create a function to change the text!',
          };
        }
        if (!hasGetElementById) {
          return {
            isValid: false,
            message: 'Use document.getElementById() to select the element!',
          };
        }
        if (!hasInnerHTML) {
          return {
            isValid: false,
            message: 'Use innerHTML to change the text content!',
          };
        }
        return { isValid: true };
      },
    },
  },
  {
    id: 10,
    title: 'Lesson 10: Mini Project - Interactive Counter',
    sections: [
      {
        heading: 'Building a Real Project',
        content: 'Let\'s combine everything you\'ve learned! You\'ll build an interactive counter with buttons to increase and decrease the number.',
      },
      {
        heading: 'What You\'ll Need',
        content: 'A heading to display the count, two buttons (+ and -), and JavaScript functions to update the counter.',
      },
      {
        heading: 'Your Task',
        content: 'Build a complete counter app! Display a number (starting at 0), add a + button to increase it, and a - button to decrease it. Style it to look professional!',
      },
    ],
    starterCode: `<!DOCTYPE html>
<html>
<head>
    <title>Counter App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            text-align: center;
            background-color: #f0f9ff;
        }
        .container {
            background-color: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            max-width: 400px;
            margin: 50px auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Counter App</h1>
        <!-- Build your counter here -->
    </div>

    <script>
        // Add your JavaScript code here

    </script>
</body>
</html>`,
    solution: `<!DOCTYPE html>
<html>
<head>
    <title>Counter App</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            text-align: center;
            background-color: #f0f9ff;
        }
        .container {
            background-color: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            max-width: 400px;
            margin: 50px auto;
        }
        #counter {
            font-size: 48px;
            font-weight: bold;
            color: #2563eb;
            margin: 30px 0;
        }
        button {
            font-size: 24px;
            padding: 15px 30px;
            margin: 10px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .increase {
            background-color: #10b981;
            color: white;
        }
        .decrease {
            background-color: #ef4444;
            color: white;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Counter App</h1>
        <div id="counter">0</div>
        <button class="decrease" onclick="decrease()">-</button>
        <button class="increase" onclick="increase()">+</button>
    </div>

    <script>
        let count = 0;

        function increase() {
            count++;
            document.getElementById("counter").innerHTML = count;
        }

        function decrease() {
            count--;
            document.getElementById("counter").innerHTML = count;
        }
    </script>
</body>
</html>`,
    hints: [
      'Create a variable to store the count (starting at 0).',
      'Add a div or h2 with an id to display the current count.',
      'Create two functions: one to increase the count, one to decrease it.',
      'Each function should update the display using getElementById and innerHTML.',
      'Add two buttons that call these functions with onclick.',
    ],
    validationRules: {
      requiredTags: ['<button>', '<script>'],
      customValidation: (code: string) => {
        const buttonCount = (code.match(/<button/g) || []).length;
        const hasLet = code.includes('let ') || code.includes('let\n');
        const hasFunctions = (code.match(/function /g) || []).length >= 2;
        const hasGetElementById = code.includes('getElementById');
        const hasInnerHTML = code.includes('innerHTML');

        if (buttonCount < 2) {
          return {
            isValid: false,
            message: 'You need at least 2 buttons (+ and -)!',
          };
        }
        if (!hasLet) {
          return {
            isValid: false,
            message: 'Create a variable to store the count using let!',
          };
        }
        if (!hasFunctions) {
          return {
            isValid: false,
            message: 'Create at least 2 functions (one for increase, one for decrease)!',
          };
        }
        if (!hasGetElementById || !hasInnerHTML) {
          return {
            isValid: false,
            message: 'Use getElementById and innerHTML to update the displayed count!',
          };
        }
        return { isValid: true };
      },
    },
  },
];

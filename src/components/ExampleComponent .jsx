import { TypeAnimation } from 'react-type-animation';

const ExampleComponent = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Welcome to Library Management System',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Read, Dream, Repeat',
        1000,
        'Books: Your Passport to Infinite Worlds',
        1000,
        'The more you read, the more you will learn',
        1000
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '2em', display: 'inline-block' }}
      repeat={Infinity}
    />
  );
};

export default ExampleComponent;
interface MyComponentProps {
  name: string;
  age: number;
}

const MyComponent: React.FC<MyComponentProps> = ({ name, age }) => {
  return (
    <div>
      <p>Hello, {name}!</p>
      <p>You are {age} years old.</p>
    </div>
  );
};

export default MyComponent;

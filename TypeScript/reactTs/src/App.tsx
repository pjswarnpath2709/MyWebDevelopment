// import Box from "./components/Box";

/*
interface Person {
  name: string;
  age: number;
}

function App() {
  const [user, setUser] = useState<Person>({ name: " ", age: 0 });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <input
          type="number"
          value={user?.age}
          placeholder="age"
          onChange={(e) => {
            setUser((prevUser) => ({
              ...prevUser!,
              age: Number(e.target.value),
            }));
          }}
        />

        <input
          type="string"
          value={user?.name}
          placeholder="Name"
          onChange={(e) => {
            setUser((prevUser) => ({
              ...prevUser!,
              name: e.target.value,
            }));
          }}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
}


*/
import Box2 from "./components/Box2";
const App = () => {
  return <Box2 />;
};

export default App;

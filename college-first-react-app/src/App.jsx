import { Wrapper } from "./components/Wrapper";
import { UserCard } from "./components/UserCard";
function App() {
  const users = [{
    name : "Virat Kohli",
    Role : "Batsman",
    country : "India"
  },
{
    name : "  Ms.Dhoni",
    Role : "Bowler",
    country : "India"
  }

]
  return (
    <div>
     <h1>User Dashboard</h1>
     <Wrapper title= "userList">

      {users.map((data)=>(<UserCard data={data}/>))}
     </Wrapper>

    </div>
  );
}

export default App;
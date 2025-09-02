//import AuthForm from "./components/AuthForm";
import UserProfileForm from "./components/UserProfileForm";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <UserProfileForm />
    </AuthProvider>
  )
}

export default App;
import { fetchData } from "apis/userApi.js";
import { useState, useContext, createContext, useEffect } from "react";

const UserContext = createContext({
  users: [],
  setUsers: () => {}  // Default function that does nothing
});

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Use an IIFE (Immediately Invoked Function Expression) to handle async in useEffect
    (async () => {
      try {
        const data = await fetchData();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook
const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUsers must be used within a UserProvider');
  }
  return context;
};

export { useUsers, UserProvider };

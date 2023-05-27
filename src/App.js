import { useState } from "react";
import FirebaseAuthService from "./FirebaseAuthService";
import LoginForm from "./components/LoginForm";
import AddEditRecipeForm from "./components/AddEditRecipeForm";

import "./App.css";

import FirebaseFirestoreService from "./FirebaseFireStoreService";

function App() {
  const [user, setUser] = useState(null);

  FirebaseAuthService.subscribeToAuthChanges(setUser);

  async function handleAddRecipe(newRecipe) {
    try {
      const response = await FirebaseFirestoreService.createDocument("recipes", newRecipe);
      // const response = await FirebaseFirestoreRestService.createDocument(
      //   "recipes",
      //   newRecipe
      // );
      alert(`succesfully created a recipe with an ID = ${response.id}`);
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="App">
      <div className="title-row">
        <h1 className="title">FireBase Recipes</h1>
        <LoginForm existingUser={user} />
      </div>
      <div className="main">{user ? <AddEditRecipeForm handleAddRecipe={handleAddRecipe}></AddEditRecipeForm> : null}</div>
    </div>
  );
}

export default App;

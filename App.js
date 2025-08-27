import "./global.css"
import { Text, View } from "react-native";
import { useState } from "react";
import AuthComponent from "./components/authComponent";

function MainPage(){
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind!
      </Text>
    </View>
  );
}
 
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn ? <MainPage /> : <AuthComponent onSuccess={() => setLoggedIn(true)} />;
}
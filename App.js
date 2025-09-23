import "./global.css"
import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import AuthComponent from "./components/authComponent";
import { getLvlAndXp } from "./api";

function MainPage({ username, userData }) {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome {username}!
      </Text>
      {userData ? (
        <>
          <Text className="text-lg text-gray-800">Level: {userData.level}</Text>
          <Text className="text-lg text-gray-800">XP: {userData.xp}</Text>
        </>
      ) : (
        <Text className="text-red-500">Failed to load user data.</Text>
      )}
    </View>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      if (loggedIn && username) {
        setLoading(true);
        try {
          const data = await getLvlAndXp(username);
          setUserData(data);
        } catch (e) {
          Alert.alert("Error", "Server error");
        } finally {
          setLoading(false);
        }
      }
    };

    getUserData();
  }, [loggedIn, username]);

  if (!loggedIn) {
    return (
      <AuthComponent
        onSuccess={() => setLoggedIn(true)}
        setUsername={setUsername}
      />
    );
  }

  if (loading || !userData) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg text-gray-500">Loading user data...</Text>
      </View>
    );
  }



  return <MainPage username={username} userData={userData} />;
}
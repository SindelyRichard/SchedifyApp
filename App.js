import "./global.css"
import { Text, View } from "react-native";
import { useEffect, useState } from "react";
import AuthComponent from "./components/authComponent";
import { getLvlAndXp } from "./api";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import DailyTasks from "./components/dailyTasksComponent";

function MainPage({ username, userData, onNavigate }) {

  return (
    <LinearGradient colors={['#000000ff', '#8b5cf6']}
      style={{ flex: 1 }}
    >
      <View className="mt-10 items-center">

        {/* ---- Profile Card ----*/}
        <View className="w-11/12 rounded-3xl shadow-xl overflow-hidden border-2">
          <LinearGradient
            colors={["#8b5cf6", "#000000ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="flex-1 items-center justify-center"
          >
            {userData ? (
              <>
                <Text className="text-2xl font-bold text-white pl-3">
                  {username}
                </Text>
                <Text className="text-lg text-blue-100 pl-3">
                  Level: {userData.level}
                </Text>
              </>
            ) : (
              <Text className="text-red-200">Failed to load user data.</Text>
            )}
          </LinearGradient>
        </View>

        {/* ---- Daily Motivation Card ----*/}
        <View
          className="w-11/12 rounded-3xl shadow-xl overflow-hidden border mt-10"
          style={{ height: 160 }}
        >

          <LinearGradient
            colors={["#3b82f6", "#b400fcff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text className="text-3xl font-extrabold">🚀 Daily motivation:</Text>
          </LinearGradient>

        </View>

        {/* ---- Daily Tasks Card ----*/}
        <TouchableOpacity
          className="w-11/12 rounded-3xl shadow-xl overflow-hidden border mt-10"
          style={{ height: 160 }}
          onPress={() => onNavigate('daily')}
          activeOpacity={0.8}
        >

          <LinearGradient
            colors={["#3b82f6", "#b400fcff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text className="text-3xl font-extrabold">📋 Daily Tasks 📋</Text>
          </LinearGradient>

        </TouchableOpacity>

        {/* ---- My Tasks Card ----*/}
        <TouchableOpacity
          className="w-11/12 rounded-3xl shadow-xl overflow-hidden border mt-10"
          style={{ height: 160 }}
          //onPress={handleDailyTasks}
          activeOpacity={0.8}
        >

          <LinearGradient
            colors={["#3b82f6", "#b400fcff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text className="text-3xl font-extrabold">📝 My Tasks 📝</Text>
          </LinearGradient>

        </TouchableOpacity>

        {/* ---- Leaderboard Card ----*/}
        <TouchableOpacity
          className="w-11/12 rounded-3xl shadow-xl overflow-hidden border mt-10"
          style={{ height: 160 }}
          //onPress={handleDailyTasks}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["#3b82f6", "#b400fcff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text className="text-3xl font-extrabold">🏆 Leaderboard 🏆</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [screen, setScreen] = useState('home');

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

  if (screen === 'daily') {
    return <DailyTasks onBack={() => setScreen('home')} />
  }



  return <MainPage username={username} userData={userData} onNavigate={setScreen} />;
}
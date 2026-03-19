import "./global.css"
import { Text, View, ScrollView, FlatList } from "react-native";
import { useEffect, useState } from "react";
import AuthComponent from "./components/authComponent";
import { getLvlAndXp, getMotivation, getTopUser } from "./api";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import DailyTasks from "./components/dailyTasksComponent";
import Tasks from "./components/taskComponent";

function MainPage({ username, userData, onNavigate, motivation, topPlayers }) {

  return (
    <LinearGradient colors={['#000000ff', '#8b5cf6']}
      style={{ flex: 1 }}
    >
      <View className="items-center">

        {/* ---- Profile Card ----*/}
        <View className="w-11/12 rounded-3xl shadow-xl overflow-hidden border-2 mt-12">
          <LinearGradient
            colors={["#8b5cf6", "#000000ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="flex-1 items-center justify-center"
          >

            <Text className="text-2xl font-bold text-white pl-3">
              {username}
            </Text>
            <Text className="text-lg text-blue-100 pl-3">
              Level: {userData.level}
            </Text>

          </LinearGradient>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center"
        }}
        showsVerticalScrollIndicator={false}
      >

        {/* ---- Daily Motivation Card ----*/}
        <View
          className="w-11/12 rounded-3xl shadow-xl overflow-hidden border mt-10"
          style={{ height: 160 }}
        >

          <LinearGradient
            colors={["#3b82f6", "#b400fcff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="items-center justify-center p-6 w-full"
          >
            <Text className="text-3xl font-extrabold text-center">🚀 Daily motivation</Text>
            <Text className="text-base text-center mt-2">{motivation?.title}</Text>
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
          onPress={() => onNavigate('tasks')}
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
            <Text className="text-3xl font-extrabold">🏆 Leaderboard 🏆</Text>
            <FlatList
              data={topPlayers}
              scrollEnabled={false}
              renderItem={({ item, index }) => {
                return (
                  <Text className="text-3xl text-center">{index + 1}. {item.username} Level:{item.level}</Text>
                );
              }}
              keyExtractor={(item, idx, index) => String(item._id ?? idx, index)}
              ListEmptyComponent={<Text className="text-white/80">No players found</Text>}
              style={{ width: '100%' }}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </LinearGradient>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [motivation, setMotivation] = useState(null);
  const [topUsers, setTopUsers] = useState(null);

  const [screen, setScreen] = useState('home');

  useEffect(() => {

    const getTopUsers = async () => {
      try {
        const tops = await getTopUser();
        setTopUsers(tops.players);
      } catch (e) {
        Alert.alert("Error", "Failed to load top users");
      }
    };

    const getMotiv = async () => {
      try {
        const motiv = await getMotivation();
        setMotivation(motiv);
      } catch (e) {
        Alert.alert("Error", "Failed to load the motivation");
      }
    };

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

    getTopUsers();
    getMotiv();
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
    return <DailyTasks onBack={() => setScreen('home')} username={username} userData={userData} setUserData={setUserData} />;
  }

  if (screen === 'tasks') {
    return <Tasks onBack={() => setScreen('home')} username={username} userData={userData} setUserData={setUserData} />;

  }



  return <MainPage username={username} userData={userData} onNavigate={setScreen} motivation={motivation} topPlayers={topUsers} />;
}
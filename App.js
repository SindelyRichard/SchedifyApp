import "./global.css"
import { Text, View, ScrollView, FlatList, Alert, Modal, TextInput } from "react-native";
import { useEffect, useState } from "react";
import AuthComponent from "./components/authComponent";
import { getLvlAndXp, getMotivation, getTopUser, logout, deleteUser, updateUsername, getYourStats } from "./api";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native";
import DailyTasks from "./components/dailyTasksComponent";
import Tasks from "./components/taskComponent";

function MainPage({ username, setUsername ,userData, onNavigate, motivation, topPlayers, avg, completedTasks }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  const handleLogout = async () => {
    try {
      await logout();
      onNavigate('auth');
    } catch (e) {
      Alert.alert("Error", "Logout failed.");
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const applyDeleteAccModal = async () => {
    try {
      await deleteUser();
      setModalVisible(false)
      onNavigate('auth');

    } catch (e) {
      Alert.alert("Failed to delete the User");
    }
  };

  const applyUsernameModal = async () => {
    try {
      if (!newUsername) return;
      const res = await updateUsername(newUsername);
      if(res.success){
        setUsername(newUsername);
      }

      setNewUsername("");
      setModalVisible(false)

    } catch (e) {
      Alert.alert("Failed to edit the Username");
    }
  };

  return (
    <LinearGradient colors={['#000000ff', '#8b5cf6']}
      style={{ flex: 1 }}
    >
      <View className="items-center">

        {/* ---- Profile Card ----*/}
        <View className="w-11/12 rounded-3xl shadow-xl overflow-hidden border-2 mt-12 items-center">
          <LinearGradient
            colors={["#8b5cf6", "#000000ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="justify-center h-20"
          >
            <View className="flex-row w-full justify-between items-center">
              <View>
                <TouchableOpacity
                  style={{ width:'auto' }}
                  onPress={() => openModal()}
                  activeOpacity={0.8}
                >
                  <Text className="text-2xl font-bold text-white pl-3">
                    {username}
                  </Text>
                  <Text className="text-lg text-blue-100 pl-3">
                    Level: {userData.level}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  onPress={handleLogout}
                >
                  <Text className="text-white">
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
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

          {/* ---- Stat Card ----*/}
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
            <Text className="text-3xl font-extrabold">Stats</Text>
            <Text className="text-xl text-center">Completion: {avg}%</Text>
            <Text className="text-xl text-center">Completed tasks: {completedTasks}</Text>
          </LinearGradient>
          </View>


          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}>
            <View className="flex-1 justify-center items-center">
              <View className="w-80 bg-blue-500 rounded-2xl p-6 items-center">
                <TextInput
                  className="border border-gray-300 p-4 rounded-xl mb-4 w-full text-gray-800 placeholder-gray-400 bg-white"
                  placeholder="New username"
                  onChangeText={setNewUsername}
                />
                <View className="flex-row justify-between w-full mt-4">
                  <TouchableOpacity onPress={closeModal}>
                    <Text>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={applyUsernameModal}>
                    <Text>
                      Done
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity onPress={applyDeleteAccModal}>
                    <Text>
                      Delete account
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
  const [avg, setAvg] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const [screen, setScreen] = useState('home');

  useEffect(() => {

    const getTopUsers = async () => {
      try {
        const tops = await getTopUser();
        setTopUsers(tops.players);
      } catch (e) {
        Alert.alert('Error', 'Failed to load top users');
      }
    };

    const getMotiv = async () => {
      try {
        const motiv = await getMotivation();
        setMotivation(motiv);
      } catch (e) {
        Alert.alert('Error', 'Failed to load the motivation');
      }
    };

    const getUserData = async () => {
      if (loggedIn && username) {
        setLoading(true);
        try {
          const data = await getLvlAndXp(username);
          setUserData(data);
        } catch (e) {
          Alert.alert('Error', 'Server error');
        } finally {
          setLoading(false);
        }
      }
    };

    const getStats = async () =>{
      try{
        const res = await getYourStats();
        if(!res){
          return {success:false ,message:'Failed to get the stats'};
        }
        setAvg(res.avg);
        setCompletedCount(res.completed);
      }catch(e){
        Alert.alert('Error','Failed to load the stats');
      }

    };

    if (screen === 'home') {
      getTopUsers();
      getMotiv();
      getUserData();
      getStats();
    }

    if (screen === 'auth') {
      setLoggedIn(false);
      setUsername("");
      setUserData(null);
    }

  }, [loggedIn, username, screen]);

  if (!loggedIn) {
    return (
      <AuthComponent
        onSuccess={() => {
          setLoggedIn(true);
          setScreen('home');
        }}
        setUsername={setUsername}
      />
    );
  }

  if (loading || !userData) {
    return (
      <LinearGradient
        colors={["#a855f7", "#1f2937"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text className="text-lg text-white">Loading user data...</Text>
      </LinearGradient>
    );
  }


  if (screen === 'daily') {
    return <DailyTasks onBack={() => setScreen('home')} username={username} userData={userData} setUserData={setUserData} />;
  }

  if (screen === 'tasks') {
    return <Tasks onBack={() => setScreen('home')} username={username} userData={userData} setUserData={setUserData} />;

  }

  return <MainPage username={username} setUsername={setUsername} userData={userData} onNavigate={setScreen} motivation={motivation} topPlayers={topUsers} avg={avg} completedTasks={completedCount} />;
}
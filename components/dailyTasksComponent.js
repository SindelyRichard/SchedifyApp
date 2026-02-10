import { View, Text, Modal, TouchableOpacity, FlatList, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getDailyTask } from "../api";
import { useEffect, useState } from "react";

export default function DailyTasks({ onBack }) {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await getDailyTask();
        setTasks(Array.isArray(data) ? data : []);
      } catch (e) {
        Alert.alert("Error", "Failed to load daily tasks");
      }
    })();
  }, []);

  const openModal = (task) => {
    setModalVisible(true);
    setSelectedTask(task);
  };

  const applyModal = () => {
    setModalVisible(false)
    //calls api
    console.log("Api called");
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    <LinearGradient colors={['#000000ff', '#8b5cf6']} style={{ flex: 1 }}>
      <View className="flex-1 w-full px-4 pt-12 items-center">
        <Text className="text-2xl font-bold text-white mb-6">Daily Tasks</Text>
        <FlatList
          data={tasks}
          renderItem={({ item }) =>
          (
            <TouchableOpacity
              className="mt-10 rounded-3xl overflow-hidden"
              style={{ height: 100 }}
              onPress={() => openModal(item)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={["#3b82f6", "#b400fcff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
              >
                <Text className="text-gray-800 font-extrabold">{item.title ?? "Untitled task"}</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          keyExtractor={(item, idx) => String(item._id ?? idx)}
          ListEmptyComponent={<Text className="text-white/80">No tasks found</Text>}
          style={{ width: '100%' }}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <TouchableOpacity className="py-4 items-center rounded-xl" onPress={onBack}>
          <Text className="text-center mt-7 font-medium">Back</Text>
        </TouchableOpacity>

        {/* ---- Modal ----*/}
        
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}>
          <View className="flex-1 justify-center items-center">
            <View className="w-80 bg-blue-500 rounded-2xl p-6 items-center">
              <Text text-lg font-bold mb-4 text-center>
                {selectedTask.title}
              </Text>
              <View className="flex-row justify-between w-full mt-4">
                <TouchableOpacity onPress={closeModal}>
                  <Text>
                    ❌
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={applyModal}>
                  <Text>
                    ✅
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient >
  );
}
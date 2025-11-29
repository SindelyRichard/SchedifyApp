import {View, Text, TouchableOpacity, FlatList,Alert} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getDailyTask } from "../api";
import { useEffect, useState } from "react";

export default function DailyTasks({ onBack }){
    const [tasks,setTasks] = useState([]);

    useEffect(() => {
        (async () => {
        try{
            const data = await getDailyTask();
            setTasks(Array.isArray(data) ? data : []);
        }catch(e){
            Alert.alert("Error", "Failed to load daily tasks");
        }
        })();
    },[]);
  
   
    return (
        <LinearGradient colors={['#000000ff', '#8b5cf6']} style={{ flex: 1 }}>
          <View className="flex-1 w-full px-4 pt-10 items-center">
            <Text className="text-2xl font-bold text-white mb-6">Daily Tasks</Text>
            <FlatList
            data={tasks}
            renderItem={({item}) => 
              (
              <View
          className="w-11/12 rounded-3xl shadow-xl overflow-hidden border mt-10 ml-5"
          style={{ height: 100 }}
        >
               <LinearGradient
            colors={["#3b82f6", "#b400fcff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
                <Text className="text-gray-800 font-extrabold">{item.title ?? "Untitled task"}</Text>
                </LinearGradient>
              </View>
              )}
            keyExtractor={(item, idx) => String(item._id ?? idx)}
            ListEmptyComponent={<Text className="text-white/80">No tasks found</Text>}
              style={{ width: '100%' }}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
            
            <TouchableOpacity className="py-4 items-center rounded-xl" onPress={onBack}>
              <Text className="text-center mt-7 font-medium">Back</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      );
}
import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { login, register } from "../api";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";

export default function AuthComponent({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async () => {
    try {
      const fn = isLogin ? login : register;
      const res = await fn(username, password);
      if (res.success) {
        onSuccess();
      } else {
        Alert.alert("Error", res.message || "Error");
      }
    } catch (e) {
      Alert.alert("Error", "Server error");
    }
  };

  return (
    <LinearGradient colors={['#3b82f6', '#8b5cf6']}
      style={{ flex: 1 }}

    >
      <SafeAreaView className="flex-1 justify-center items-center">
        <StatusBar hidden={true} />
        <View className="mb-12 w-11/12">
          <Text className="mt-2 text-black text-6xl font-extrabold text-center tracking-widest drop-shadow-lg">
            Schedify
          </Text>

          <Text className="text-white/80 text-base text-center tracking-wide">
            Plan smarter. Live better. 🚀
          </Text>
        </View>
        <View className="bg-white/90 p-8 w-11/12 rounded-3xl shadow-2xl">
          <Text className="text-gray-800 text-3xl font-extrabold mb-6 text-center">
            {isLogin ? "Login" : "Register"}
          </Text>

          <TextInput
            className="border border-gray-300 p-4 rounded-xl mb-4 w-full text-gray-800 placeholder-gray-400"
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <TextInput
            className="border border-gray-300 p-4 rounded-xl mb-6 w-full text-gray-800 placeholder-gray-400"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />


          <LinearGradient
            colors={['#3b82f6', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="rounded-xl shadow-lg w-full"
          >
            <TouchableOpacity
              className="py-4 items-center rounded-xl"
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text className="text-white font-bold text-lg">
                {isLogin ? "Login" : "Register"}
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <Text
            className="text-blue-500 text-center mt-7 font-medium"
            onPress={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Register!"
              : "Already have an account? Log in!"}

          </Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
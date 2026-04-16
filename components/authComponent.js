import { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { login, register, sendEmailCode } from "../api";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";

export default function AuthComponent({ onSuccess, setUsername }) {
  const [localusername, setLocalUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [isForgotPasswd, setIsForgotPasswd] = useState(false);

  const handleSubmit = async () => {
    try {
      let res;
      if (!isLogin) {
        res = await register(localusername, password, email);
      } else {
        res = await login(localusername, password);
      }
      if (res.success) {
        setUsername(localusername);
        onSuccess();
      } else {
        Alert.alert("Error", res.message || "Error");
      }
    } catch (e) {
      Alert.alert("Error", "Server error");
    }
  };

  const sendEmail = async () => {
    try {
      const res = await sendEmailCode(email);
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  const setForgotPasswd = () => {
    setIsForgotPasswd(true);
    setEmail("");
  };

  const backToMain = () => {
    setIsForgotPasswd(false);
    setEmail("");
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
            {!isForgotPasswd && (isLogin ? "Login" : "Register")}
          </Text>

          {!isForgotPasswd && (
            <TextInput
              className="border border-gray-300 p-4 rounded-xl mb-4 w-full text-gray-800 placeholder-gray-400"
              placeholder="Username"
              value={localusername}
              onChangeText={setLocalUsername}
              autoCapitalize="none"
            />
          )}

          {!isForgotPasswd && (!isLogin && (
            <TextInput
              className="border border-gray-300 p-4 rounded-xl mb-4 w-full text-gray-800 placeholder-gray-400"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          ))}

          {isForgotPasswd && (
            <>
              <TextInput
                className="border border-gray-300 p-4 rounded-xl mb-4 w-full text-gray-800 placeholder-gray-400"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <LinearGradient
                colors={['#3b82f6', '#8b5cf6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="rounded-xl shadow-lg w-full"
              >
                <TouchableOpacity
                  className="py-4 items-center rounded-xl"
                  onPress={() => sendEmail()}
                  activeOpacity={0.8}
                >
                  <Text className="text-white font-bold text-lg">
                    Send code
                  </Text>
                </TouchableOpacity>
              </LinearGradient>

              <Text
                className="text-blue-500 text-center mt-7 font-medium"
                onPress={() => backToMain()}
              >
                Back
              </Text>
            </>
          )}

          {!isForgotPasswd && (
            <TextInput
              className="border border-gray-300 p-4 rounded-xl mb-6 w-full text-gray-800 placeholder-gray-400"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          )}

          {!isForgotPasswd && (
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
          )}

          <Text
            className="text-blue-500 text-center mt-7 font-medium"
            onPress={() => setIsLogin(!isLogin)}
          >
            {!isForgotPasswd && (isLogin
              ? "Don't have an account? Register!"
              : "Already have an account? Log in!")}

          </Text>

          {!isForgotPasswd &&
            <Text
              className="text-blue-500 text-center mt-7 font-medium"
              onPress={() => setForgotPasswd()}
            >
              Forgot password.
            </Text>
          }
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
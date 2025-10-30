import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from "react-native";
import { db } from "./src/firebaseConfig";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

interface Task {
  id?: string;
  title: string;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  const tasksCollection = collection(db, "tasks");

  const loadTasks = async () => {
    const snapshot = await getDocs(tasksCollection);
    const taskList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
    setTasks(taskList);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    await addDoc(tasksCollection, { title: newTask });
    setNewTask("");
    loadTasks();
  };

  const deleteTask = async (id: string) => {
    const taskDoc = doc(db, "tasks", id);
    await deleteDoc(taskDoc);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 TaskMate (Mobile)</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter new task"
          value={newTask}
          onChangeText={setNewTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id!}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.title}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id!)}>
              <Text style={styles.delete}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  inputContainer: { flexDirection: "row", marginBottom: 20, alignItems: "center" },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 10, marginRight: 10 },
  taskItem: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10, borderBottomWidth: 1, borderColor: "#eee", paddingBottom: 8 },
  taskText: { fontSize: 18 },
  delete: { fontSize: 18 },
});

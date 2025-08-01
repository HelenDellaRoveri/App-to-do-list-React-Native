import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BackBtn } from '../components/backBtn';
import CategoryPicker from '../components/categoriaPicker';

export default function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [pomodoros, setPomodoros] = useState('');
  const router = useRouter();

  const handleAdd = async () => {
    if (!title.trim()) return;

    // Garantir que pomodoros tenha pelo menos 1
    const pomodorosNumber = Math.min(parseInt(pomodoros) || 1, 1);

    const saved = await AsyncStorage.getItem('@tasks');
    const tasks = saved ? JSON.parse(saved) : [];

    const newTask = {
      id: Date.now(),
      title,
      description,
      category,
      pomodoros: pomodorosNumber,
      done: false,
    };

    const updated = [...tasks, newTask];
    await AsyncStorage.setItem('@tasks', JSON.stringify(updated));
    router.push('/');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={s.header}>
          <BackBtn />
          <Text style={s.text2}>To Do list</Text>
        </View>

        <ScrollView keyboardShouldPersistTaps="handled">
          <Text style={s.text}>Add</Text>
          <View style={s.container}>
            <TextInput
              placeholder="Nova tarefa..."
              value={title}
              onChangeText={setTitle}
              style={s.input}
            />
            <TextInput
              placeholder="Descrição da tarefa..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              maxLength={50}
              style={s.input}
            />

            <CategoryPicker value={category} onChange={setCategory} />

            <Text style={s.text3}>Quantos pomodoros para executar a tarefa?</Text>
            <TextInput
              placeholder="Ex: 1"
              value={pomodoros}
              onChangeText={(text) => {
                // só aceita números e evita string vazia
                const cleanText = text.replace(/[^0-9]/g, '');
                setPomodoros(cleanText === '' ? '1' : cleanText);
              }}
              keyboardType="numeric"
              returnKeyType="done"
              style={s.input}
            />

            <TouchableOpacity style={s.btnSalvar} onPress={handleAdd}>
              <Text style={s.btnSalvarText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  header: {
    color: '#ffffff',
    backgroundColor: '#090909',
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    color: '#090909',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  text2: {
    color: '#ffffff',
    backgroundColor: '#090909',
    paddingHorizontal: 20,
    paddingVertical: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 6,
    fontSize: 24,
    fontWeight: 'bold',
  },
  text3: {
    color: '#090909',
    backgroundColor: '#transparent',
    paddingVertical: 20,
    fontSize: 16,
  },
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  btnSalvar: {
    backgroundColor: '#090909',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  btnSalvarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

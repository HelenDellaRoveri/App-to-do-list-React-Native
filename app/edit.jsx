import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BackBtn } from '../components/backBtn';
import CategoryPicker from '../components/categoriaPicker';

export default function EditTask() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [pomodoros, setPomodoros] = useState(''); 

  const loadTask = useCallback(async () => {
  const saved = await AsyncStorage.getItem('@tasks');
  const parsed = saved ? JSON.parse(saved) : [];
  const task = parsed.find(t => t.id.toString() === id.toString());
  if (task) {
    setTitle(task.title);
    setDescription(task.description);
    setCategory(task.category);
    setPomodoros(task.pomodoros ? String(task.pomodoros) : '1');
  }
}, [id]); // id entra aqui porque é usado dentro da função

useEffect(() => {
  loadTask();
}, [loadTask]); // sem warning agora


  const saveTask = async () => {
    const saved = await AsyncStorage.getItem('@tasks');
    const parsed = saved ? JSON.parse(saved) : [];

    const updatedTasks = parsed.map(task => {
      if (task.id.toString() === id.toString()) {
        return {
          ...task,
          title,
          description,
          category,
          pomodoros: Math.max(parseInt(pomodoros) || 1, 1), // atualiza pomodoros, mínimo 1
        };
      }
      return task;
    });

    await AsyncStorage.setItem('@tasks', JSON.stringify(updatedTasks));
    router.push('/');
  };

  return (
    <SafeAreaView>
      <View style={s.header}>
        <BackBtn />
        <Text style={s.text2}>To Do list</Text>
      </View>
      <ScrollView>
        <Text style={s.text}>Editar</Text>
        <View style={s.container}>
          <TextInput
            placeholder="Título da tarefa..."
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

          <TextInput
            placeholder="Quantos pomodoros?"
            value={pomodoros}
            onChangeText={(text) => {
              // aceitar só números, evitar vazio
              const clean = text.replace(/[^0-9]/g, '');
              setPomodoros(clean === '' ? '1' : clean);
            }}
            keyboardType="numeric"
            style={s.input}
          />

          <TouchableOpacity style={s.btnSalvar} onPress={saveTask}>
            <Text style={s.btnSalvarText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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

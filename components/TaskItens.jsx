import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TaskItem({ task, onToggle, onStartPomodoro, onDelete, onEdit }) {
  return (
    <View style={s.task}>
      <TouchableOpacity onPress={onToggle}>
        <Ionicons
          name={task.done ? 'checkbox' : 'square-outline'}
          size={24}
          color={task.done ? 'green' : 'gray'}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={onEdit} style={s.textContainer}>
        <Text style={[s.title, task.done && s.done]} numberOfLines={1}>
          {task.title}
        </Text>
        <Text style={[s.description, task.done && s.done]}>{task.description}</Text>
        <Text style={[s.category, task.done && s.done]}>{task.category}</Text>
        <Text style={[s.category, task.done && s.done]}>Pomodoros: {task.pomodoros || 1}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onStartPomodoro}>
        <Ionicons name="play-circle-outline" size={24} color="blue" />
      </TouchableOpacity>

      <TouchableOpacity onPress={onDelete}>
        <Ionicons name="trash-outline" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  task: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
    gap: 10,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    maxWidth: '70%', // <- fixar largura
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    flexWrap: 'wrap',
  },
  category: {
    fontSize: 13,
    color: '#999',
  },
  done: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

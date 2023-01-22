import { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";

import { api } from '../lib/axios';

export function NewHabit() {
  const [weekDays, setWeekDays] = useState<number[]>([]);

  const [title, setTitle] = useState('');

  const avaiableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabádo']

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex]);
    }
  }

  async function handleCreateNewHabit(){
    try {
      if(!title.trim() || weekDays.length === 0 ){
       return Alert.alert('Novo hábito', 'Por favor, adicione um título para o seu novo hábito e escolha a peridiocidade.');
      }

      await api.post('/habits', {title, weekDays});

      setTitle('');
      setWeekDays([]);


      Alert.alert('Novo hábito', 'Hábito criado com sucesso!');
    } catch (error) {
      console.log(error)
      Alert.alert('Ops', 'Não foi possível criar o novo hábito');
    }
  }

    return (
      <View className="flex-1 bg-background px-8 pt-16">
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100}}>
          <BackButton />
          <Text className="mt-6 text-white font-extrabold text-2xl">
            Criar hábito
          </Text>

          <Text className="mt-6 text-white font-extrabold text-base">
            Qual o seu comprometimento?
          </Text>

          <TextInput
            className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-600"
            placeholder='ex.: exercicios, dormir bem, etc...'
            placeholderTextColor={colors.zinc[400]}
            onChangeText={setTitle}
            value={title}
          />

          <Text className='font-semibold mt-4 mb-3 text-white text-base'>
            Qual a recorrência?
          </Text>

          {
            avaiableWeekDays.map((weekDay, index) => (
              <Checkbox
                key={weekDay}
                title={weekDay}
                checked={weekDays.includes(index)}
                onPress={() => handleToggleWeekDay(index) }
              />
            ))
          }

          <TouchableOpacity
            activeOpacity={.7}
            className='w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6'
            onPress={handleCreateNewHabit}
          >
            <Feather
              name='check'
              size={20}
              color={colors.white}
            />
            <Text className='font-semibold text-base text-white ml-2'>
              Confirmar
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
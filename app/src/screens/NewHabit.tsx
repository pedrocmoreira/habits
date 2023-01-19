import { useState } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";

export function NewHabit() {
  const [weekDays, setWeekDays] = useState<number[]>([]);

  const avaiableWeekDays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sabádo']

  function handleToggleWeekDay(weekDayIndex: number) {
    if (weekDays.includes(weekDayIndex)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex));
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex]);
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
            className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600"
            placeholder='ex.: exercicios, dormir bem, etc...'
            placeholderTextColor={colors.zinc[400]}
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
import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native";
import clsx from "clsx";
import dayjs from 'dayjs';

import { generateProgressPercentage } from "../utils/generate-progress-percentage";

const week_days = 7;
const screen_horizontal_padding = (32 * 2) / 5;

export const day_margin_between = 8;
export const day_size = (Dimensions.get('screen').width / week_days) - (screen_horizontal_padding + 5);

interface Props extends TouchableOpacityProps {
  amountOfHabits?: number;
  amountCompleted?: number;
  date: Date;
}

export function HabitDay({ amountCompleted = 0,amountOfHabits = 0, date, ...rest }: Props) {
  const amountAcomplishedPercentage  = amountOfHabits > 0 ? generateProgressPercentage(amountOfHabits, amountCompleted) : 0;
  const today = dayjs().startOf('day').toDate();
  const isCurrentDay = dayjs(date).isSame(today);

  return (
    <TouchableOpacity
      className={clsx('rounded-lg border-2 m-1', {
        ['bg-zinc-900 border-zinc-800'] : amountAcomplishedPercentage  === 0,
        ['bg-violet-900 border-violet-700'] : amountAcomplishedPercentage  > 0 && amountAcomplishedPercentage < 20,
        ['bg-violet-800 border-violet-600'] : amountAcomplishedPercentage  >= 20 && amountAcomplishedPercentage < 40,
        ['bg-violet-700 border-violet-500'] : amountAcomplishedPercentage  >= 40 && amountAcomplishedPercentage < 60,
        ['bg-violet-600 border-violet-500'] : amountAcomplishedPercentage  >= 60 && amountAcomplishedPercentage < 80,
        ['bg-violet-500 border-violet-400'] : amountAcomplishedPercentage  >= 80,
        ['border-white border-3'] : isCurrentDay,

      })}
      style={{ width: day_size, height: day_size }}
      activeOpacity={.7}
      {...rest}   
    />
  )
}
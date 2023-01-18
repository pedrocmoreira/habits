import './styles/global.css'
import { Habit } from "./components/Habit";

export default function App(){
  return(
    <div className="bg-zinc-900 w-10 h-10 text-white rouded m-2 flex items-center justify-center">
      <Habit completed={3}/>
    </div>
  )
}
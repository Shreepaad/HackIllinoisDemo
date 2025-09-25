import { Home, Users, Gift, Calendar } from "lucide-react";
import './App.css'

export default function GlassTaskbar() {
  return (
    //AI for some of the border, blur styling
    <div className="w-max left-1/2 -translate-x-1/2 
    fixed top-6 flex gap-6 rounded-2xl bg-white/10 px-6 
    py-3 backdrop-blur-md border border-white/20 shadow-lg
    transform scale-90 sm:scale-100 z-2">
        <img src="src/assets/hackillinoislogo.svg" alt="Logo" className="sm:h-14 h-10 mt-1" />
      <button className="flex flex-col items-center hover:text-white/70 text-white sm:hover:bg-white/10 sm:p-2 rounded-xl 
      hover:scale-102 transition-all duration-300 ease-out">
        <Home className="h-10 w-5 mb-1 sm:h-5" />
        <span className="hidden sm:block">Home</span>
      </button>

      <button className="flex flex-col items-center hover:text-white/70 text-white sm:hover:bg-white/10 sm:p-2 rounded-xl 
      hover:scale-102 transition-all duration-300 ease-out">
        <Users className="h-10 w-5 mb-1 sm:h-5" />
        <span className="hidden sm:block">Mentors</span>
      </button>

      <button className="flex flex-col items-center hover:text-white/70 text-white sm:hover:bg-white/10 sm:p-2 rounded-xl 
      hover:scale-102 transition-all duration-300 ease-out">
        <Gift className="h-10 w-5 mb-1 sm:h-5" />
        <span className="hidden sm:block">Prizes</span>
      </button>

      <button className="flex flex-col items-center hover:text-white/70 text-white sm:hover:bg-white/10 sm:p-2 rounded-xl 
      hover:scale-102 transition-all duration-300 ease-out">
        <Calendar className="h-10 w-5 mb-1 sm:h-5" />
        <span className="hidden sm:block">Schedule</span>
      </button>
    </div>
  );
}

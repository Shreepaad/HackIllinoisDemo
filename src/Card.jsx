import { Clock, MapPin } from "lucide-react";



export default function Card( {event} ) {

    //AI for colors/gradients

    const getEventColor = () => {
    switch (event.eventType) {
    case "MINIEVENT":
        return "from-purple-500/20 to-pink-500/20 border-purple-400/30";
    case "OTHER":
        return "from-blue-500/20 to-cyan-500/20 border-blue-400/30";
    case "MEAL":
        return "from-green-500/20 to-emerald-500/20 border-green-400/30";
    case "SPEAKER":
        return "from-orange-500/20 to-yellow-500/20 border-orange-400/30";
    case "QNA":
        return "from-red-500/20 to-rose-500/20 border-red-400/30";
    case "WORKSHOP":
        return "from-amber-600/20 to-lime-500/20 border-amber-500/30";
    default:
        return "from-gray-500/20 to-slate-500/20 border-gray-400/30";
    }
    };

    const getEventBadgeClasses = (type) => {
    switch (type) {
        case "MINIEVENT":
            return "bg-purple-600/20 text-purple-200";
        case "OTHER":
            return "bg-sky-600/20 text-sky-200";       // keep this your “blue”
        case "MEAL":
            return "bg-emerald-600/20 text-emerald-200";
        case "SPEAKER":
            return "bg-orange-600/20 text-orange-200";
        case "QNA":
            return "bg-rose-600/20 text-rose-200";
        case "WORKSHOP":
            return "bg-lime-600/20 text-lime-200";     // distinct from green & blue
        default:
            return "bg-slate-600/20 text-slate-200";
    }
    };


    //AI for length formatting

    const formatLength = (minutes) => {
    if(minutes <= 0) {
        return "";
    }
    if (minutes >= 60) {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0
        ? `${hrs} hour${hrs > 1 ? "s" : ""}, ${mins} minute${mins > 1 ? "s" : ""}`
        : `${hrs} hour${hrs > 1 ? "s" : ""}`;
    }
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    };





    return (
    <div
      className={`
        flex flex-col          
      bg-white/10 backdrop-blur-md border rounded-2xl p-6 shadow-lg
      hover:bg-white/15 hover:scale-102 transition-all duration-300 ease-out
      bg-gradient-to-br ${getEventColor()}
    `}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-white mb-1">{event.name}</h3>
          <p className="text-white/70 text-sm max-w-[80%]">{event.description}</p>
        </div>
        <div className="flex items-center space-x-1 bg-white/10 rounded-lg px-2 py-1">
          <Clock size={14} className="text-white/70" />
          <span className="text-white/70 text-sm w-max">
            {event.start}
          </span>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between text-white/60 text-sm">
        <div className="flex items-center space-x-1">
          {event.location && <MapPin size={14} />}
          {event.location && <span>{event.location}</span>}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-white/50 text-sm">
            {formatLength(event.length)}
        </span>
        <span className={`px-2 py-1 rounded-lg text-xs ${getEventBadgeClasses(event.eventType)}`}>
        {event.eventType !== "MINIEVENT" ? event.eventType : "MINI-EVENT"}
        </span>

      </div>
    </div>
  );
}
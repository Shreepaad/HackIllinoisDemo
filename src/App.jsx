"use client"

import './App.css'
import GlassTaskbar from './Taskbar';
import { useEffect, useState, useMemo, useRef } from "react";
import Card from './Card';
import { motion, useScroll, useMotionValueEvent } from "framer-motion";



//AI for time calculations
function formatDateTime(ts) {
  if (!ts) return { date: "?", time: "?" };
  ts *= 1000; // seconds to ms
  const d = new Date(ts);

  // day as M/D
  const date = `${d.getMonth() + 1}/${d.getDate()}`;

  // Time as H:MM AM/PM
  let hours = d.getHours(); //0 - 23
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12; // 0 => 12 for regular clock
  const time = `${hours}:${minutes} ${ampm}`;

  return { date, time };
}

function formatEvent(ev) {
  return {
    name: ev.name ?? "Untitled",
    description: ev.description ?? "",
    eventType: ev.eventType ?? "",
    location:
      Array.isArray(ev.locations) && ev.locations.length
        ? ev.locations[0].description ?? ""
        : "",
    start: ev.startTime ? formatDateTime(ev.startTime).time : null,
    length: ev.endTime ? ((ev.endTime - ev.startTime)/60) : null,
    dayKey: ev.startTime ? formatDateTime(ev.startTime).date : "Unknown",
    startOriginal: ev.startTime ?? Infinity, // keep original for sorting
  };
}


export default function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);


  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://adonix.hackillinois.org/event/", {
          headers: { Accept: "application/json" },
          cache: "no-store",
        });
        const json = await res.json();
        const items = Array.isArray(json) ? json : json.events || json.data || [];
        setEvents(items.map(formatEvent));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // sort
  const sorted = useMemo(() => {
    return [...events].sort((a, b) => a.startOriginal - b.startOriginal);
  }, [events]);

  //map of events for each day
  const byDay = useMemo(() => {
    const map = new Map();
    for (const ev of sorted) {
      if (!map.has(ev.dayKey)) map.set(ev.dayKey, []);
      map.get(ev.dayKey).push(ev);
    }
  return map;
  }, [sorted]);

  //store all days (keys) from map
  const dayList = useMemo(() => Array.from(byDay.keys()), [byDay]);

  //default day selected is first day with events
  const activeDay = selectedDay ?? dayList[0];


  //filter events based on currently selected day
  const dayEvents = byDay.get(activeDay)




  return (
    
    // AI for the gradient colors
    <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden text-white'>


      {/* AI for these elements */}
      {/* Floating elements for depth */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-500" />

      <GlassTaskbar />

      <div className="pt-40 px-4 max-w-6xl mx-auto z-0 relative">
        <header className="mb-6 text-center">
          <h1 className="text-6xl font-bold">Schedule</h1>
          <h3 className="text-white/60 text-sm mt-4">Browse all events for HackIllinois 2026</h3>
        </header>

        {loading ? (
          <></>
        ) : (

          <div className="space-y-10">
            
<div className="flex justify-center">
<div className='flex gap-3 rounded-2xl 
    bg-white/10 px-3 py-3 backdrop-blur-md border border-white/20 shadow-lg 
    transform z-20'>

      {dayList.map((day) => (
    <button
      key={day}
      onClick={() => setSelectedDay(day)}
      className={`p-3 rounded-xl transition-all duration-300 ease-out
        ${day === activeDay 
          ? "bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg hover:bg-white/15 hover:scale-102 bg-gradient-to-br from-blue-500/20 to-purple-500/20"
          : "text-white hover:bg-white/10 hover:text-white/70 hover:scale-102 border border-white/0"
        }`}
    >
      <span>{day}</span>
    </button>
  ))}
    </div>
    </div>



          {Object.entries(
  (dayEvents).reduce((acc, ev) => {
    const key = ev.start || "TBD";
    (acc[key] ||= []).push(ev);
    // returns {time1 : [list1], time2: [list2], ....}
    return acc;
  }, {})
).map(([time, events]) => (
  <div key={time} className="relative grid grid-cols-[80px,1fr] gap-4 items-start">

    {/* AI for some framer motion settings, styling */}
    {/* THIS ROW'S “ON REVEAL” COLORED SEGMENT */}
    <motion.div
  className="absolute top-10.5 left-14 w-[5px] bg-purple-400 max-h-[calc(100%-2px)] z-2 hidden sm:block"
  initial={{ height: 0, opacity: 0 }}
  whileInView={{ height: "100%", opacity: 1 }}
  viewport={{ amount: "all", once: true }}   // waits until bar’s bottom is visible
  transition={{ duration: 1 }}
/>

    <div className="relative w-fit ml-3">
      <div className="relative bg-white/10 border border-white/20 rounded-lg px-4 py-2">
        <span className="relative z-10">{time}</span>
      </div>
    </div>

    {/* Cards */}
    <div
      className="grid gap-4 md:grid-cols-2 pl-5 pr-5 sm:pl-40"
    >
      {events.map((e) => (
        <Card event={e} />
      ))}
    </div>
  </div>
))}
          </div>

        )}



        <div className="h-24" />
      </div>
    </div>
    
  );
}
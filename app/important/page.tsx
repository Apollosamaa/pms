"use client";
import React from 'react'
import { useGlobalState } from '../context/globalProvider';
import Tasks from '../Components/Tasks/Tasks';

function page() {
  const { importantTasks } = useGlobalState();

  return (
    <div>
      <Tasks title="Important Tasks" tasks={importantTasks} />
    </div>
  )
}

export default page;

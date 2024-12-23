"use client"

import React from 'react'
import { useGlobalState } from '../context/globalProvider';
import Tasks from '../Components/Tasks/Tasks';

function page() {
  
  const { completedTasks} = useGlobalState();
  return (
    
    <div>
      <Tasks title="Completed Tasks" tasks={completedTasks} />
    </div>
  )
}

export default page

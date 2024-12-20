"use client"

import React from 'react'
import { useGlobalState } from '../context/globalProvider';
import Tasks from '../Components/Tasks/Tasks';

function page() {
  
  const { completedTask} = useGlobalState();
  return (
    
    <div>
      <Tasks title="Completed Tasks" tasks={completedTask} />;
    </div>
  )
}

export default page

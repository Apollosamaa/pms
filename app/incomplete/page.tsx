"use client"

import React from 'react'
import { useGlobalState } from '../context/globalProvider';
import Tasks from '../Components/Tasks/Tasks';

function page() {
  const { incompleteTasks } = useGlobalState();
  return (
    <div>
      <Tasks title="Incomplete Tasks" tasks={incompleteTasks} />;
    </div>
  )
}

export default page
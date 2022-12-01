export const logResponse = (task: string, response: any) => {
  console.log("Response for Task[", task, "]:", response);
}

export const measureMemoryAndTime = (taskLabel: string) => {
  console.timeEnd(taskLabel);

  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  console.log(`${taskLabel} used around ${Math.round(used * 100) / 100} MB of memory`);
}

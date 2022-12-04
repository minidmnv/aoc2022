export const logResponse = (task: string, response: any) => {
  console.log("Response for Task[", task, "]:", response);
}

export const measureMemoryAndTime = (taskLabel: string) => {
  console.timeEnd(taskLabel);

  const used = process.memoryUsage();
  console.log(`Memory: ${used.heapUsed} ${Math.round(used.heapUsed / 1024 / 1024 * 100) / 100} MB`);
  console.log(`Memory: ${used.external} ${Math.round(used.external / 1024 / 1024 * 100) / 100} MB`);
}

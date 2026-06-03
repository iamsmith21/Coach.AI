export function createLogger(moduleName: string) {
  return function(message: string, level: string = 'INFO') {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      module: moduleName,
      message
    };
    console.log(JSON.stringify(logEntry));
  };
}

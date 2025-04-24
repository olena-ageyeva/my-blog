export const calculateReadingTime = (content) => {
  if (!content) return 1;

  // Split content into lines and filter out empty lines
  const lines = content.split('\n').filter(line => line.trim().length > 0);

  // Assuming average reading speed of 10 lines per minute
  const minutes = Math.ceil(lines.length / 10);

  // Return at least 1 minute
  return Math.max(1, minutes);
};
"use client";
export function calcTimeLeft(due_date: string) {
  // Calculate the difference between now and the due date
  // Ensure due_date is a valid Date object

  // Explicitly convert Dates to timestamps for subtraction
  const diff = new Date(due_date).getTime() - new Date().getTime();

  // Calculate days, hours, and minutes remaining
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);

  let timeRemaining;

  // Determine what to display based on the time remaining
  if (days > 0) {
    timeRemaining = `In ${days} day${days > 1 ? "s" : ""}`;
  } else if (diff > 0) {
    timeRemaining = `In ${hours} hour${
      hours !== 1 ? "s" : ""
    } and ${minutes} minute${minutes !== 1 ? "s" : ""}`;
  } else {
    timeRemaining = `${-days} day${-days > 1 ? "s" : ""} ago`;
  }

  return timeRemaining;
}

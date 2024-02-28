"use client";

import { format } from "date-fns";
import { enGB } from "date-fns/locale";

export function calcTimeDifference(due_date: string) {
  // Calculate the difference between now and the due date
  const now = new Date().getTime();
  const dueTime = new Date(due_date).getTime();
  const diff = dueTime - now;

  // Calculate days, hours, and minutes remaining
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  let timeRemaining;

  // Check if due_date is in the past or future and format accordingly
  if (diff > 0) {
    // For future dates
    if (days > 0) {
      timeRemaining = `In ${days} day${days > 1 ? "s" : ""}`;
    } else {
      timeRemaining = `In ${hours} hour${hours !== 1 ? "s" : ""}`;
      if (hours < 1) {
        // If less than an hour, show minutes
        timeRemaining = `In ${minutes} minute${minutes !== 1 ? "s" : ""}`;
      }
    }
  } else {
    // For past dates
    const absHours = Math.abs(hours);
    const absMinutes = Math.abs(minutes);
    if (Math.abs(days) > 1) {
      timeRemaining = `${Math.abs(days)} day${
        Math.abs(days) > 1 ? "s" : ""
      } ago`;
    } else if (absHours > 0) {
      timeRemaining = `${absHours} hour${absHours !== 1 ? "s" : ""} ago`;
    } else {
      timeRemaining = `${absMinutes} minute${absMinutes !== 1 ? "s" : ""} ago`;
    }
  }

  return timeRemaining;
}

export function standardTimeFormatter(timestamp: Date) {
  const defaultDateFormat = "EE dd. MMM yyyy' 'HH:mm";

  return format(new Date(timestamp), defaultDateFormat, {
    locale: enGB,
  });
}

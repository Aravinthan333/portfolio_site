const IST_TIMEZONE = "Asia/Kolkata";

export function getBrowserTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return IST_TIMEZONE;
  }
}

export function getSupportedTimezones(): string[] {
  try {
    if (typeof Intl.supportedValuesOf === "function") {
      return Intl.supportedValuesOf("timeZone").sort();
    }
  } catch {
    /* fallback below */
  }
  return [
    "Asia/Kolkata",
    "America/New_York",
    "America/Los_Angeles",
    "America/Chicago",
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "Asia/Singapore",
    "Asia/Dubai",
    "Asia/Tokyo",
    "Australia/Sydney",
    "Pacific/Auckland",
  ];
}

function parseParts(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  return {
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
    second: Number(get("second")),
  };
}

/** Convert a local date/time in a timezone to a UTC Date */
export function zonedTimeToUtc(date: string, time: string, timeZone: string): Date {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0);
  let ms = utcGuess;

  for (let i = 0; i < 4; i++) {
    const p = parseParts(new Date(ms), timeZone);
    const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
    ms += utcGuess - asUtc;
  }

  return new Date(ms);
}

export function formatPreferredTimes(date: string, time: string, timeZone: string) {
  const utc = zonedTimeToUtc(date, time, timeZone);
  const localLabel =
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(utc) + ` (${timeZone})`;

  const istLabel =
    new Intl.DateTimeFormat("en-IN", {
      timeZone: IST_TIMEZONE,
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(utc) + " IST";

  return { localLabel, istLabel, utcIso: utc.toISOString() };
}

export function formatTimezoneLabel(tz: string) {
  try {
    const now = new Date();
    const offset =
      new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        timeZoneName: "shortOffset",
      })
        .formatToParts(now)
        .find((p) => p.type === "timeZoneName")?.value ?? "";
    return `${tz.replace(/_/g, " ")} ${offset}`;
  } catch {
    return tz;
  }
}

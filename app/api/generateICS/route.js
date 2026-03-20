import { createEvents } from "ics";

const REMINDER_RULES = [
  {
    daysBefore: 5,
    keywords: [
      "final exam",
      "final",
      "midterm",
      "exam",
      "test",
      "quiz",
    ],
  },
  {
    daysBefore: 3,
    keywords: ["presentation", "project", "paper", "lab"],
  },
  {
    daysBefore: 2,
    keywords: ["assignment", "homework", "hw", "due", "deadline"],
  },
];

function getReminderDaysBefore(event) {
  if (typeof event?.reminderDaysBefore === "number") {
    return Math.max(0, event.reminderDaysBefore);
  }

  const eventText = `${event?.title || ""} ${event?.description || ""}`.toLowerCase();

  const matchedRule = REMINDER_RULES.find(({ keywords }) =>
    keywords.some((keyword) => eventText.includes(keyword))
  );

  return matchedRule?.daysBefore ?? 1;
}

function buildReminderAlarm(event, daysBefore) {
  if (daysBefore <= 0) {
    return [];
  }

  return [
    {
      action: "display",
      description: `Reminder: ${event.title}`,
      trigger: { days: daysBefore, before: true },
    },
  ];
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { events } = body;

    if (!Array.isArray(events)) {
      console.error("❌ Events not an array:", events);
      return new Response(JSON.stringify({ error: "Invalid events" }), {
        status: 400,
      });
    }

    const formattedEvents = events.map((event) => {
      const [year, month, day] = event.date.split("-").map(Number);
      const reminderDaysBefore = getReminderDaysBefore(event);

      if (!year || !month || !day) {
        throw new Error(
          `Invalid date format in event: ${JSON.stringify(event)}`
        );
      }

      return {
        title: event.title,
        description: event.description || "",
        start: [year, month, day],
        duration: { hours: 1 },
        alarms: buildReminderAlarm(event, reminderDaysBefore),
      };
    });

    const { error, value } = createEvents(formattedEvents);

    if (error) {
      console.error("❌ ICS creation error:", error);
      return new Response(JSON.stringify({ error: error.message || error }), {
        status: 500,
      });
    }

    return new Response(value, {
      headers: {
        "Content-Type": "text/calendar",
        "Content-Disposition": "attachment; filename=syllabus-calendar.ics",
      },
    });
  } catch (err) {
    console.error("🔥 Server error in ICS API:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: err.message }),
      { status: 500 }
    );
  }
}

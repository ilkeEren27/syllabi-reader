"use client";
import { useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { CalendarPlus, Loader2, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

function GoogleCalendarButtonInner({ events }) {
  const t = useTranslations("EventEditor");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setStatus("loading");
      try {
        for (const event of events) {
          const [year, month, day] = event.date.split("-").map(Number);
          const endDate = new Date(year, month - 1, day + 1);
          const endDateStr = endDate.toISOString().split("T")[0];

          const res = await fetch(
            "https://www.googleapis.com/calendar/v3/calendars/primary/events",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${tokenResponse.access_token}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                summary: event.title,
                description: event.description || "",
                start: { date: event.date },
                end: { date: endDateStr },
              }),
            }
          );

          if (!res.ok) throw new Error("Failed to add event");
        }
        setStatus("success");
        setTimeout(() => setStatus("idle"), 3000);
      } catch {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    },
    onError: () => {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    },
    scope: "https://www.googleapis.com/auth/calendar.events",
  });

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return (
    <Button
      onClick={() => !isLoading && !isSuccess && login()}
      disabled={isLoading || isSuccess}
      variant="outline"
      className="flex-1 min-w-[160px] h-12 rounded-2xl transition-all duration-300 hover:scale-105 border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700"
    >
      {isLoading && <Loader2 className="h-5 w-5 mr-2 animate-spin" />}
      {isSuccess && <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />}
      {!isLoading && !isSuccess && <CalendarPlus className="h-5 w-5 mr-2" />}
      {isLoading
        ? t("adding")
        : isSuccess
        ? t("added")
        : t("addToGoogleCalendar")}
    </Button>
  );
}

export default function GoogleCalendarButton({ events }) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <GoogleCalendarButtonInner events={events} />
    </GoogleOAuthProvider>
  );
}

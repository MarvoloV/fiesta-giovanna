"use client";

import { useState, useEffect } from "react";
import Icon from "@/components/common/ui/AppIcon";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const targetDate = new Date("2026-01-17T21:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [isHydrated]);

  if (!isHydrated) {
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-background to-muted">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-12 bg-card rounded-lg mb-4 max-w-md mx-auto animate-pulse" />
            <div className="h-6 bg-card rounded-lg max-w-sm mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg p-6 animate-pulse">
                <div className="h-20 bg-muted rounded-lg mb-4" />
                <div className="h-6 bg-muted rounded-lg" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const timeUnits = [
    { value: timeLeft.days, label: "Días", icon: "CalendarDaysIcon" },
    { value: timeLeft.hours, label: "Horas", icon: "ClockIcon" },
    { value: timeLeft.minutes, label: "Minutos", icon: "ClockIcon" },
    { value: timeLeft.seconds, label: "Segundos", icon: "BoltIcon" },
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-background to-muted">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Icon
              name="ClockIcon"
              size={32}
              className="text-primary"
              variant="solid"
            />
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl text-foreground">
              Cuenta Regresiva
            </h2>
          </div>
          <p className="font-body text-lg text-muted-foreground">
            ¡La celebración está cada vez más cerca!
          </p>
        </div>

        {/* Countdown Display */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {timeUnits.map((unit, index) => (
            <div
              key={unit.label}
              className="bg-card rounded-lg p-6 md:p-8 shadow-celebration hover:shadow-countdown transition-all duration-300 hover:scale-105 animate-in zoom-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col items-center">
                <Icon
                  name={unit.icon as any}
                  size={32}
                  className="text-primary mb-4"
                  variant="solid"
                />
                <div className="text-5xl md:text-6xl lg:text-7xl font-headline text-primary mb-2 tabular-nums">
                  {String(unit.value).padStart(2, "0")}
                </div>
                <div className="text-sm md:text-base font-cta text-muted-foreground uppercase tracking-wider">
                  {unit.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Element */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
            <Icon
              name="SparklesIcon"
              size={20}
              className="text-primary"
              variant="solid"
            />
            <span className="font-script text-xl text-primary">
              ¡Nos vemos pronto!
            </span>
            <Icon
              name="SparklesIcon"
              size={20}
              className="text-primary"
              variant="solid"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownTimer;

export type PerformanceStatus = "BEFORE" | "LIVE" | "ENDED";

export function getPerformanceStatus(start: Date, end: Date) {
  const now = new Date();

  // 공연 전
  if (now < start) {
    const diff = start.getTime() - now.getTime();

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
      status: "BEFORE" as PerformanceStatus,
      text: `시작까지 ${String(hours).padStart(2, "0")}:${String(
        minutes,
      ).padStart(2, "0")}:${String(seconds).padStart(2, "0")} 남음`,
    };
  }

  // 공연 중
  if (now >= start && now <= end) {
    return {
      status: "LIVE" as PerformanceStatus,
      text: "라이브톡 참여하기",
    };
  }

  // 종료
  return {
    status: "ENDED" as PerformanceStatus,
    text: "공연종료",
  };
}

export const submissionStatuses = [
  { value: "new", label: "New" },
  { value: "in_review", label: "In review" },
  { value: "replied", label: "Replied" },
  { value: "closed", label: "Closed" },
] as const;

export const callStatuses = [
  { value: "new", label: "New" },
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
] as const;

export const scheduledCallStatuses = [
  { value: "scheduled", label: "Scheduled" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "no_show", label: "No show" },
] as const;

export type SubmissionStatus = (typeof submissionStatuses)[number]["value"];
export type CallStatus = (typeof callStatuses)[number]["value"];
export type ScheduledCallStatus = (typeof scheduledCallStatuses)[number]["value"];

export function submissionStatusClass(status: string) {
  switch (status) {
    case "in_review":
      return "status-badge status-badge-review";
    case "replied":
      return "status-badge status-badge-success";
    case "closed":
      return "status-badge status-badge-muted";
    default:
      return "status-badge status-badge-new";
  }
}

export function callStatusClass(status: string) {
  switch (status) {
    case "scheduled":
      return "status-badge status-badge-review";
    case "completed":
      return "status-badge status-badge-success";
    case "cancelled":
      return "status-badge status-badge-muted";
    default:
      return "status-badge status-badge-new";
  }
}

export function scheduledCallStatusClass(status: string) {
  switch (status) {
    case "completed":
      return "status-badge status-badge-success";
    case "cancelled":
      return "status-badge status-badge-muted";
    case "no_show":
      return "status-badge status-badge-muted";
    case "scheduled":
    default:
      return "status-badge status-badge-review";
  }
}

// Exporting route constants
export const HOME_ROUTE = "/";
export const LOGIN_ROUTE = "/login";
export const DASHBOARD_ROUTE = "/dashboard";
export const QUESTION_ROUTE = "/question";
export const UPGRADE_ROUTE = "/upgrade";
export const DOCS_ROUTE = "/docs";
export const PROFILE_ROUTE = "/profile";
export const SETTINGS_ROUTE = "/settings";
export const NOT_FOUND_ROUTE = "/404"; // For a 404 page if needed

// Function to generate dynamic routes
export const getInterviewRoute = (mockId) => `/interview/${mockId}`;
export const getInterviewStartRoute = (interviewId) => `/interview/${interviewId}/start`;


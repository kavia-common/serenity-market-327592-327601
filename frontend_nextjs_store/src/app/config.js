/**
 * App configuration boundary.
 *
 * Reads REACT_APP_* once and returns a normalized config object to prevent deep modules
 * from touching env directly.
 */

// PUBLIC_INTERFACE
export function getAppConfig() {
  /** Returns normalized runtime config (env-driven). */
  const apiBaseUrl = (process.env.REACT_APP_API_BASE || "").trim();
  const backendUrl = (process.env.REACT_APP_BACKEND_URL || "").trim();
  const frontendUrl = (process.env.REACT_APP_FRONTEND_URL || "").trim();
  const wsUrl = (process.env.REACT_APP_WS_URL || "").trim();
  const logLevel = (process.env.REACT_APP_LOG_LEVEL || "info").trim();

  return {
    apiBaseUrl,
    backendUrl,
    frontendUrl,
    wsUrl,
    logLevel
  };
}

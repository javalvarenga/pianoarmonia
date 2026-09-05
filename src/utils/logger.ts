/**
 * Logger simple en memoria.
 *
 * Acumula eventos (info / error) durante la sesión y permite descargarlos
 * como un archivo .txt mediante downloadLogs(). Pensado para diagnosticar
 * por qué el piano no suena: cada fallo de audio se registra aquí y el
 * usuario puede descargar el historial para consultarlo.
 */

export type LogLevel = 'INFO' | 'ERROR';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  details?: unknown;
}

const logStore: LogEntry[] = [];

/**
 * Devuelve una marca de tiempo ISO legible.
 */
function now(): string {
  return new Date().toISOString();
}

/**
 * Registra un evento de nivel INFO.
 */
export function logInfo(message: string, details?: unknown): void {
  const entry: LogEntry = { timestamp: now(), level: 'INFO', message, details };
  logStore.push(entry);
  // eslint-disable-next-line no-console
  console.log(`[INFO] ${entry.timestamp} — ${message}`, details ?? '');
}

/**
 * Registra un evento de nivel ERROR.
 */
export function logError(message: string, details?: unknown): void {
  const entry: LogEntry = { timestamp: now(), level: 'ERROR', message, details };
  logStore.push(entry);
  // eslint-disable-next-line no-console
  console.error(`[ERROR] ${entry.timestamp} — ${message}`, details ?? '');
}

/**
 * Devuelve una copia de los logs acumulados.
 */
export function getLogs(): LogEntry[] {
  return [...logStore];
}

/**
 * Convierte los logs acumulados a texto plano.
 */
export function logsToText(): string {
  if (logStore.length === 0) {
    return 'No hay logs registrados.';
  }
  return logStore
    .map((e) => {
      const base = `[${e.level}] ${e.timestamp} — ${e.message}`;
      if (e.details !== undefined) {
        const detailStr =
          typeof e.details === 'string'
            ? e.details
            : (() => {
                try {
                  return JSON.stringify(e.details, null, 2);
                } catch {
                  return String(e.details);
                }
              })();
        return `${base}\n${detailStr}`;
      }
      return base;
    })
    .join('\n\n');
}

/**
 * Genera un archivo .txt con el contenido acumulado de logs y lo descarga
 * en el navegador mediante un Blob + enlace temporal.
 */
export function downloadLogs(): void {
  const text = logsToText();
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `pianoarmonia-logs-${Date.now()}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Liberar la URL tras un breve delay para asegurar la descarga
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
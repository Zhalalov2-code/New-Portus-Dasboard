export const parseDate = (d?: string | null): Date | null => {
  if (!d) return null;
  const dt = new Date(d);
  return isNaN(dt.getTime()) ? null : dt;
};

export const daysUntil = (target?: string | null): number | null => {
  const dt = parseDate(target);
  if (!dt) return null;
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const end = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  const days = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return days;
};

export const formatRuDate = (dateStr?: string | null): string => {
  const dt = parseDate(dateStr);
  return dt ? dt.toLocaleDateString('ru-RU') : '';
};

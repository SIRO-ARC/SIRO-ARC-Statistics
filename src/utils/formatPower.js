export default function formatPower(value) {
  const num = Number(value);

  if (Number.isNaN(num)) return value;

  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + "B";
  }

  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "M";
  }

  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "K";
  }

  return num.toString();
}
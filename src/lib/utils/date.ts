/**
 * 数字を漢数字に変換
 */
function toKanjiNumber(num: number): string {
  const kanji = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const units = ['', '十', '百', '千'];

  if (num === 0) return kanji[0];
  if (num < 10) return kanji[num];

  let result = '';
  const digits = num.toString().split('').reverse();

  for (let i = 0; i < digits.length; i++) {
    const digit = parseInt(digits[i]);
    if (digit === 0) continue;

    if (digit === 1 && i > 0) {
      result = units[i] + result;
    } else {
      result = kanji[digit] + units[i] + result;
    }
  }

  return result;
}

/**
 * 西暦の日付文字列を和暦形式（漢数字）に変換
 * @param dateString - ISO形式の日付文字列 (例: "2026-01-01")
 * @returns 和暦形式の文字列 (例: "令和八年 一月")
 */
export function formatToJapaneseEra(dateString: string): string {
  const date = new Date(dateString);

  const formatter = new Intl.DateTimeFormat('ja-JP-u-ca-japanese', {
    era: 'long',
    year: 'numeric',
    month: 'long'
  });

  const formatted = formatter.format(date);

  return formatted
    .replace(/\d+/g, (match) => toKanjiNumber(parseInt(match)))
    .replace(/年(\S)/, '年 $1');
}

/**
 * @function pluralize
 * @description Утилита, позволяющая склонять существительные в зависимости от значения числа, с которым
 *  они используются. С помощью утилиты pluralize возможно создавать фрагменты фраз, для последующего использования
 *  в заголовках и блоках с описанием.<br>
 * Утилита принимает два аргумента:
 *  - число,
 *  - объект с конфигурацией.
 * Объект с конфигурацией содержит конкретные фрагменты текста, которые будут использоваться с переданным числом.<br>
 * Использование утилиты:
 * Утилиту необходимо импортировать в компонент и вызвать ее, передав необходимые аргументы.
 * Конфигурация может быть создана по месту использования утилиты, а может быть импортирована в компонент из
 *  отдельного файла конфигурации.
 * @param {Number} n - число
 * @param {Object} config -  конфиг утилиты
 * @property {String} zero - фрагмент текста, когда число равно 0
 * @property {String} one - фрагмент тектса, когда число равно 1 или заканчивается единицей, например 21, 31, но не 11
 * @property {String} few - фрагмент текста, когда число заканчивается на цифры от 2 до 4, например 2, 23, 34
 * @property {String} many - фрагмент текста, когда число занчивается цифрами 5 - 9, 11-19.
 * @property {Number} radix - делитель, для отделения от числа части, кратной этому делителю, по умолчанию 10
 * @property {Number} fewMax - параметр, устанавливающий смену склонения, по умолчанию 4
 * @public
 * @version 1.0.0
 * @example
 * const config = {
 *   zero: ', у Вас нет сохраненных статей',
 *   one: ', у Вас {} сохраненная статья',
 *   few: ', у Вас {} сохраненные статьи',
 *   many: ', у Вас {} сохраненных статей',
 * };
 * const phrase = pluralize(10, config);
 * Результат:
 * у Вас 10 сохраненных статей
 */
const pluralize = (n, { zero, one, few, many, radix, fewMax }) => {
  const order = n.toString().length; // порядок числа
  const mod = Math.abs(n) % radix;
  let pattern;

  if (order === 1) {
    // числа от 0 до 9 включительно
    if (n === 0) pattern = zero;
    else if (n === 1) pattern = one;
    else if (n > 1 && n <= fewMax) pattern = few;
    else pattern = many;
  } else if (order === 2) {
    // числа от 10 до 99 включительно
    const s = Math.floor(n / radix);
    if (s === 1) pattern = many;
    else if (s > 1) {
      if (mod === 0 || mod > fewMax) pattern = many;
      else if (mod > 1 && mod <= fewMax) pattern = few;
      else pattern = one;
    }
  } else {
    // числа от 100 и сколько душе угодно
    const stringNumber = n.toString();
    const newN = +stringNumber.slice(stringNumber.length - 2);
    const newS = Math.floor(newN / radix);
    const newMod = Math.abs(newN) % radix;
    if (newS === 1) pattern = many;
    else if (newS > 1) {
      if (newMod === 0 || newMod > fewMax) pattern = many;
      else if (newMod > 1 && newMod <= fewMax) pattern = few;
      else pattern = one;
    }
  }

  return pattern.replace('{}', n);
};

export default pluralize;

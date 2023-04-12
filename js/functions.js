+// Функция для проверки длины строки
function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}

// Функция для проверки, является ли строка палиндромом
function isPalindrome(str) {
  // Привожу строку к нижнему регистру и удаляю все пробелы
  str = str.toLowerCase().replace(/\s/g, '');

  // Использую метод reverse() для переворота строки
  // и сравниваю полученную строку с исходной
  return str === str.split('').reverse().join('');
}

// Функция, которая принимает строку
function extractNumberFromString(str) {
  const numString = str.replace(/[^0-9]/g, '');
  return numString.length > 0 ? parseInt(numString) : NaN;
}

//Функция, которая принимает три параметра

function addPadding(str, length, padding) {
  const paddingLength = length - str.length;

  if (paddingLength <= 0) {
    return str;
  }

  let result = padding;

  while (result.length < paddingLength) {
    result += padding;
  }

  return result.slice(0, paddingLength) + str;
}

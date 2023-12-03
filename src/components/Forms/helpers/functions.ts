export const convertBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const checkPasswordDifficult = (password: string) => {
  const ruLetters =
    'абвгдеёжзийклмнопрстуфхцчшщъыьэюяabcdefghijklmnopqrstuvwxyz';
  const enLetters =
    'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const specialSymbols = '~!@#$%^&*()_+"№;:?*';

  let isIncludeRuLetters = false;
  let isIncludeEnLetters = false;
  let isIncludeDigits = false;
  let isIncludeSymbols = false;

  let difficultLevel = 0;
  let difficultMessage = '';

  for (let i = 0; i < password.length; i++) {
    if (!isIncludeRuLetters && ruLetters.indexOf(password[i]) != -1) {
      isIncludeRuLetters = true;
      difficultLevel += 1;
    }
    if (!isIncludeEnLetters && enLetters.indexOf(password[i]) != -1) {
      isIncludeEnLetters = true;
      difficultLevel += 1;
    }
    if (!isIncludeDigits && digits.indexOf(password[i]) != -1) {
      isIncludeDigits = true;
      difficultLevel += 1;
    }
    if (!isIncludeSymbols && specialSymbols.indexOf(password[i]) != -1) {
      isIncludeSymbols = true;
      difficultLevel += 1;
    }
  }

  if (password.length <= 5) {
    difficultMessage = 'Easy password';
  }
  if (password.length <= 6 && difficultLevel === 1) {
    difficultMessage = 'Easy password';
  }
  if (password.length >= 6 && difficultLevel === 2) {
    difficultMessage = 'Medium password';
  }
  if (password.length >= 6 && difficultLevel === 3) {
    difficultMessage = 'Hard password';
  }
  if (password.length >= 6 && difficultLevel === 4) {
    difficultMessage = 'Crazy password';
  }
  return difficultMessage;
};

// Enhanced captcha generator with letters and patterns
export class CaptchaService {
  static generateCaptcha(): { question: string; answer: string } {
    const captchaTypes = ['math', 'letterMath', 'wordPattern', 'sequence'];
    const type = captchaTypes[Math.floor(Math.random() * captchaTypes.length)];
    
    switch (type) {
      case 'math':
        return this.generateMathCaptcha();
      case 'letterMath':
        return this.generateLetterMathCaptcha();
      case 'wordPattern':
        return this.generateWordPatternCaptcha();
      case 'sequence':
        return this.generateSequenceCaptcha();
      default:
        return this.generateMathCaptcha();
    }
  }

  private static generateMathCaptcha(): { question: string; answer: string } {
    const num1 = Math.floor(Math.random() * 15) + 1;
    const num2 = Math.floor(Math.random() * 15) + 1;
    const operations = ['+', '-', '*'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let answer: number;
    let question: string;
    
    switch (operation) {
      case '+':
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
        break;
      case '-':
        const larger = Math.max(num1, num2);
        const smaller = Math.min(num1, num2);
        answer = larger - smaller;
        question = `${larger} - ${smaller} = ?`;
        break;
      case '*':
        const smallNum1 = Math.floor(Math.random() * 6) + 1;
        const smallNum2 = Math.floor(Math.random() * 6) + 1;
        answer = smallNum1 * smallNum2;
        question = `${smallNum1} × ${smallNum2} = ?`;
        break;
      default:
        answer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
    }
    
    return { question, answer: answer.toString() };
  }

  private static generateLetterMathCaptcha(): { question: string; answer: string } {
    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const letterValues: { [key: string]: number } = {
      'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8
    };
    
    const letter1 = letters[Math.floor(Math.random() * letters.length)];
    const letter2 = letters[Math.floor(Math.random() * letters.length)];
    const operations = ['+', '-'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let result: number;
    if (operation === '+') {
      result = letterValues[letter1] + letterValues[letter2];
      const question = `If A=1, B=2, C=3... what is ${letter1} ${operation} ${letter2}?`;
      return { question, answer: result.toString() };
    } else {
      const val1 = letterValues[letter1];
      const val2 = letterValues[letter2];
      if (val1 >= val2) {
        result = val1 - val2;
        const question = `If A=1, B=2, C=3... what is ${letter1} ${operation} ${letter2}?`;
        return { question, answer: result.toString() };
      } else {
        result = val2 - val1;
        const question = `If A=1, B=2, C=3... what is ${letter2} ${operation} ${letter1}?`;
        return { question, answer: result.toString() };
      }
    }
  }

  private static generateWordPatternCaptcha(): { question: string; answer: string } {
    const patterns = [
      {
        question: "What comes next in: RED, BLUE, GREEN, ?",
        answer: "RED"
      },
      {
        question: "Complete the pattern: CAT, BAT, HAT, ?",
        answer: "RAT"
      },
      {
        question: "What letter comes before P in the alphabet?",
        answer: "O"
      },
      {
        question: "Spell HELLO backwards:",
        answer: "OLLEH"
      },
      {
        question: "First letter of the word SECURITY:",
        answer: "S"
      },
      {
        question: "How many letters are in FORM?",
        answer: "4"
      },
      {
        question: "What's the 3rd letter of APPLE?",
        answer: "P"
      },
      {
        question: "Complete: SUN, SON, SIN, ?",
        answer: "SEN"
      }
    ];
    
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    return { question: pattern.question, answer: pattern.answer };
  }

  private static generateSequenceCaptcha(): { question: string; answer: string } {
    const sequences = [
      {
        question: "Next in sequence: 2, 4, 6, ?",
        answer: "8"
      },
      {
        question: "Next in sequence: A, C, E, ?",
        answer: "G"
      },
      {
        question: "Complete: MON, TUE, WED, ?",
        answer: "THU"
      },
      {
        question: "Next: JAN, FEB, MAR, ?",
        answer: "APR"
      },
      {
        question: "Pattern: 1, 1, 2, 3, 5, ?",
        answer: "8"
      },
      {
        question: "Sequence: Z, Y, X, ?",
        answer: "W"
      }
    ];
    
    const sequence = sequences[Math.floor(Math.random() * sequences.length)];
    return { question: sequence.question, answer: sequence.answer };
  }
  
  static verifyCaptcha(userAnswer: string, correctAnswer: string): boolean {
    const userNormalized = userAnswer.trim().toUpperCase();
    const correctNormalized = correctAnswer.trim().toUpperCase();
    return userNormalized === correctNormalized;
  }
}
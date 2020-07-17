export default class Validator {
    constructor() {
      this.initialValue = 0;
    }
  
    validateRange(m, n) {
      return (
        Number.isInteger(m) >= 1 &&
        Number.isInteger(m) <= 250 &&
        Number.isInteger(n) >= 1 &&
        Number.isInteger(n) <= 250
      );
    }
    
    isValidString(command) {
        let arrCommand = command.split('');
        let letter;
        const validation = {
            'I': () => arrCommands.filter((e) => Number.isInteger(parseInt(e))).length === 2
        }
      }
    
    validateCommands(letter, arrCommands) {
        const validation = {
            'I': () => arrCommands.filter((e) => Number.isInteger(parseInt(e))).length === 2
        }
        return letter in validation && validation[letter]();
    }
  
    isInteger(value) {
      return Number.isInteger(parseInt(value));
    }
  }
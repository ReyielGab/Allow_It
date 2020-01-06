 /**
 * Capitalize the first letter
 * 
 * @param {any} value 
 */
export const capitalizeFirstLetter = value => value.charAt(0).toUpperCase() + value.slice(1); 

 /**
 * Uppercase Format
 * 
 * @param {any} value 
 */
export const upper = value => value && value.toUpperCase();


 /**
 * Lowercase Format
 * 
 * @param {any} value 
 */
export const lower = value => value && value.toLowerCase();





export const normalizePhone = value => {
    if (!value) {
      return value
    }
  
    const onlyNums = value.replace(/[^\d]/g, '')
    if (onlyNums.length <= 3) {
      return onlyNums
    }
    if (onlyNums.length <= 7) {
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
    }
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(
      6,
      10
    )}`
  }

  
export const decimalOnly = value => {
    if (!value) {
      return value
    }
  
    const onlyNums = value.replace(/[^\d]/g, '')
    if (onlyNums.length <= 2) {
      return onlyNums
    }
    
    return `${onlyNums.slice(0, -2)}.${onlyNums.slice(-2)}`
 

    
  }

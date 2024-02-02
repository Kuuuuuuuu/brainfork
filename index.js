/**
 * @param {string} code
 * @param {string} input
 * @returns {string}
 */
const brainfork = (code, input) => {
   const uint = new Uint8Array(65_535); // max size of memory

   let pointer = 0;
   let out = '';
   let inputIndex = 0;

   const stack = [];

   for (let i = 0, len = code.length; i < len; i++) {
      const command = code[i];

      switch (command) {
         case '>': {
            pointer++;
            break;
         }
         case '<': {
            pointer--;
            break;
         }
         case '+': {
            uint[pointer]++;
            break;
         }
         case '-': {
            uint[pointer]--;
            break;
         }
         case '.': {
            out += String.fromCodePoint(uint[pointer]);
            break;
         }
         case ',': {
            uint[pointer] = input.codePointAt(inputIndex++) || 0;
            if (inputIndex === input.length) {
               inputIndex = 0; // aaaaa
            }
            break;
         }
         case '[': {
            stack.push(i);
            break;
         }
         case ']': {
            if (uint[pointer] === 0) {
               stack.pop();
            } else {
               i = stack.at(-1) - 1;
            }
            break;
         }
         default: {
            break;
         }
      }
   }

   return out;
};

module.exports = brainfork;

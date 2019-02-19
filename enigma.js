const { ALPHABET, ROTOR_PERMUTATIONS, REFLECTOR_PERMUTATION } = require('./constants');

let state = {
  rotorSetting: [0, 0, 0],
};

// ABCDEFGHIJKLMNOPQRSTUVWXYZ
// EKMFLGDQVZNTOWYHXUSPAIBRCJ
// AJDKSIRUXBLHWTMCQGZNPYFVOE
// BDFHJLCPRTXVZNYEIWGAKMUSQO

const enigma = input => [...input.toUpperCase()].map(letter => doPermutations(letter)).join('');

const doPermutations = letter => {
  const index = getAlphLetterIndex(letter);
  const output1 = getTransformation(index, ROTOR_PERMUTATIONS[0], 0);
  const output2 = getTransformation(output1, ROTOR_PERMUTATIONS[1], 0);
  const output3 = getTransformation(output2, ROTOR_PERMUTATIONS[2], 0);
  const output4 = getTransformation(output3, REFLECTOR_PERMUTATION, 0);
  const output5 = getTransformation(output4, ROTOR_PERMUTATIONS[2], 0, true);
  const output6 = getTransformation(output5, ROTOR_PERMUTATIONS[1], 0, true);
  const output7 = getTransformation(output6, ROTOR_PERMUTATIONS[0], 0, true);

  return getAlphLetter(output7);
};

const getTransformation = (index, permutationString, offset, inverse) => {
  const wire = getWire(permutationString, offset, inverse);

  // console.log('start index:', index);
  // console.log('wire trasformation: +', wire[index]);
  // console.log('index + wire:', index + wire[index]);
  // console.log('alph[index + wire]:', ALPHABET[index + wire[index]]);

  const trasformation = index + wire[index];
  console.log(trasformation);

  return trasformation;
};

const getWire = (permString, offset, inverse) => {
  const wire = [...(inverse ? ALPHABET : permString)].map((letter, index) => {
    const letterOffset = getStringLetterIndex(letter, inverse ? permString : ALPHABET) - index;
    // console.log(
    //   `${ALPHABET[index]}[${index}] -> ${letter}[${ALPHABET.indexOf(letter)}] = ${letterOffset}`,
    // );
    return letterOffset;
  });

  for (let i = 0; i < offset; i++) {
    wire.push(wire.shift());
  }

  return wire;
};

const getAlphLetterIndex = letter => ALPHABET.indexOf(letter);
const getStringLetterIndex = (letter, string) => string.indexOf(letter);
const getAlphLetter = code => ALPHABET[code];

// console.log(getWire('AJDKSIRUXBLHWTMCQGZNPYFVOE', 1));
console.log(enigma('Q'));
// applyPermutation(9, 'AJDKSIRUXBLHWTMCQGZNPYFVOE', 0);
// applyPermutation(1, 'AJDKSIRUXBLHWTMCQGZNPYFVOE', 0);
// applyPermutation(2, 'AJDKSIRUXBLHWTMCQGZNPYFVOE', 0);
// applyPermutation(23, 'AJDKSIRUXBLHWTMCQGZNPYFVOE', 1);
// applyPermutation(24, 'AJDKSIRUXBLHWTMCQGZNPYFVOE', 1);

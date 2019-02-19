/*
 * notes
 * im not incrementing state on non alph characters
 * (how to handle non alph characters?)
 *
 *
 * todo: plugboard
 * todo: ui?
 *
 */
const { ALPHABET, ROTOR_PERMUTATIONS, REFLECTOR_PERMUTATION } = require('./constants');

const state = {
  rotorSetting: [0, 0, 0],
};

// ABCDEFGHIJKLMNOPQRSTUVWXYZ
// EKMFLGDQVZNTOWYHXUSPAIBRCJ
// AJDKSIRUXBLHWTMCQGZNPYFVOE
// BDFHJLCPRTXVZNYEIWGAKMUSQO

const enigma = input => [...input.toUpperCase()].map(letter => doPermutations(letter)).join('');

const doPermutations = letter => {
  if (ALPHABET.indexOf(letter) < 0) {
    return letter;
  }

  let {
    rotorSetting: [offset1, offset2, offset3],
  } = state;
  const [rotor1, rotor2, rotor3] = ROTOR_PERMUTATIONS;

  const index = getAlphLetterIndex(letter);
  const output1 = getTransformation(index, rotor1, offset1);
  const output2 = getTransformation(output1, rotor2, offset2);
  const output3 = getTransformation(output2, rotor3, offset3);
  const output4 = getTransformation(output3, REFLECTOR_PERMUTATION, 0);
  const output5 = getTransformation(output4, rotor3, offset3, true);
  const output6 = getTransformation(output5, rotor2, offset2, true);
  const output7 = getTransformation(output6, rotor1, offset1, true);

  offset1 += 1;
  if (offset1 === 26) {
    offset1 = 0;
    offset2 += 1;
    if (offset2 === 26) {
      offset2 = 0;
      offset3 += 1;
      if (offset2 === 26) {
        offset3 = 0;
      }
    }
  }

  state.rotorSetting = [offset1, offset2, offset3];
  console.log(`changing state to ${[offset1, offset2, offset3]}`);
  return getAlphLetter(output7);
};

const getTransformation = (index, permutationString, offset, inverse) => {
  const wire = getWire(permutationString, offset, inverse);

  // console.log('start index:', index);
  // console.log('wire trasformation: +', wire[index]);
  // console.log('index + wire:', index + wire[index]);
  // console.log('alph[index + wire]:', ALPHABET[index + wire[index]]);

  const trasformation = index + wire[index];
  // console.log(trasformation);

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

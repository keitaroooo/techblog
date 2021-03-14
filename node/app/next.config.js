/* eslint-disable
   @typescript-eslint/no-var-requires
*/

const withPWA = require('next-pwa');

// module.exports = {
//   future: { webpack5: true },
// };

module.exports = withPWA({
  pwa: {
    dest: 'public',
  },
});

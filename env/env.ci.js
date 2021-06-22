const path = require('path');

/**
 * Runs on Kitten Tricks CI
 * https://github.com/akveo/kittenTricks/blob/master/.github/workflows/publish-pr.yml
 */
module.exports = {
  ENV: 'ci',
  UI_KITTEN_PACKAGES_PATH: path.resolve(__dirname, '../packages-ci/react-native-ui-kitten/src'),
  EVA_PACKAGES_PATH: path.resolve(__dirname, '../packages-ci/eva/packages'),
  API_BASE_URL: 'https://dev-api.editions-charisma.fr/',
  API_CLIENT_ID: '1_s3fsmmn8vzksosg4s0w048gg8gg0w0wkokg0goowoo0g8ggs8',
  API_CLIENT_SECRET: '5qels8fvm38ck4k0scsoosgs44gokgcgssc0go44cwcck044s8',
  GOOGLE_MAP_API_KEY: ''
};

const getTranslations = (locale) => {
  let translations;
  try {
    translations = require(`../../locales/${locale}/labels.json`);
  } catch (error) {
    console.error(
      'Most likely the detail content type does not query for language',
    );
    throw error;
  }

  return translations;
};

module.exports = getTranslations;

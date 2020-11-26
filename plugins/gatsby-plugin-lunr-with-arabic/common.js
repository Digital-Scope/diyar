const enhanceLunr = (lunr, lngs) => {
  if (lngs.length) {
    require('./lunr-languages/min/lunr.stemmer.support.min')(lunr)
    lngs.forEach(({name}) => {
      if (name !== 'en') {
        try {
          require(`./lunr-languages/min/lunr.${name}.min`)(lunr)
        } catch (e) {
          console.log(e)
        }
      }
    })
  }
}

module.exports = {
  enhanceLunr,
}

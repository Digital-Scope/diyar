module.exports.getRobotsPolicy = (env) => {
  const devPolicy = { userAgent: '*', allow: '/' };
  const prodPolicy = { userAgent: '*', allow: '/' };

  const currentPolicy = env === 'development' ? devPolicy : prodPolicy;

  return currentPolicy;
};

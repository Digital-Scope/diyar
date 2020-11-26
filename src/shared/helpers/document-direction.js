export const getDocumentDirection = () => (
  typeof document !== 'undefined' ?
    document.documentElement.getAttribute('dir') :
    null
);

export const isDocumentRtl = () => getDocumentDirection() === 'rtl';

export const isDocumentLtr = () => getDocumentDirection() === 'ltr';

export default {
  isDocumentRtl,
  isDocumentLtr,
  getDocumentDirection,
};

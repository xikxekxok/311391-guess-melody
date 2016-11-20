export const getElementFromTemplate = (template) => {
  var template = document.createElement('template');
  template.innerHTML = html;
  return template.content.firstChild;
}

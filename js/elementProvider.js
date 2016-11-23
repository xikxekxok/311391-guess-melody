const getElementFromTemplate = (templateHtml) => {
  let template = document.createElement('template');
  template.innerHTML = templateHtml;
  return template.content.firstChild;
};

export default getElementFromTemplate;

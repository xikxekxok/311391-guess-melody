const getElementFromTemplate = (templateHtml) => {
  let template = document.createElement('template');
  template.innerHTML = templateHtml;
  return (template.content ? template.content : template).firstChild;
};

export default getElementFromTemplate;

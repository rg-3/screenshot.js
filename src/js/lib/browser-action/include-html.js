import rstl from "../../vendor/rstl.js";

const getDocFragment = (node, html) => {
  const vars = {};
  const props = Object.keys(node.dataset);
  props.forEach((prop) => {
    if(prop.startsWith('variable')) {
      let varName = prop.replace(/^variable/, '');
      varName = [varName[0].toLowerCase(), varName.slice(1, varName.length)].join('');
      vars[varName] = node.dataset[prop];
    }
  });
  return document.createRange().createContextualFragment(rstl(html, vars));
};

const render = (nodes, attr = 'data-include-html') => {
  nodes = Array.from(nodes || document.querySelectorAll(`[${attr}]`));
  return Promise.all(nodes.map((node) => {
    const url = node.getAttribute(attr);
    return fetch(url).then(async (res) => {
      const html = await res.text();
      const docFragment = getDocFragment(node, html);
      const children = docFragment.querySelectorAll(`[${attr}]`);
      if(children.length > 0) {
        await render(children, attr);
        node.parentNode.replaceChild(docFragment, node);
        return node;
      } else {
        node.parentNode.replaceChild(docFragment, node);
        return node;
      }
    }).catch((err) => [err, nodes]);
  }));
}

export default function(nodes, attr = 'data-include-html') {
  return render(nodes, attr);
};

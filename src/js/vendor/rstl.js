const escapeTable = {
  '<' : '&lt;'  ,
  '>' : '&gt;'  ,
  '&' : '&amp;' ,
  '"' : '&quot;',
  "'" : '&#039;'
}

const escapeHTML = (string) => {
  return string.replace(new RegExp(/[<>&"']/, 'g'), (chr) => {
    return escapeTable[chr]
  })
}

/*
  Really Small Template Language (rstl.js) is a small function that implements
  a template language, it is similar to mustache.js but a lot smaller and with
  less features.

  Usage:
    const greeting = rstl('Hi, {{name}}.', {name: 'Emanuela'})
    document.getElementById('greeting').innerHTML = greeting

    const greeting = rstl('Hi, {{name}}.', {name:  '<b>Emanuela</b>'}, {escapeHTML: false})
    document.getElementById('greeting').innerHTML = greeting

    const greeting = rstl('Hello {{name}}', {name: function() {
      return 'Robert'
    }})
*/
export default function (template, props, options={}) {
  const escape = options.escapeHTML === undefined ? true : options.escapeHTML
  for (let prop in props) {
    if (props.hasOwnProperty(prop)) {
      let value = String(typeof(props[prop]) === 'function' ? props[prop]() : props[prop])
      let regexp = new RegExp(`{{${prop}}}`, 'g')
      template = template.replace(regexp, escape ? escapeHTML(value) : value)
    }
  }
  return template
}

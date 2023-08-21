const tpl = `
<a href={{hrefValue}} class={{stylesButtonProfile}}>
  <img src={{profileSVG}}>
</a>
<form class={{stylesForm}}>
  <img src={{searchSVG}}>
  <input placeholder="поиск" class={{stylesSearch}} type="search"/>
</form>
{{#each items}}
  {{{chat}}}
{{/each}}
{{{buttonCreateChat}}}
{{{modalWindowCreateChat}}}
`;

export default tpl;

const tpl = `
{{#each items}}
<button class={{classWrapperAction}} data-action={{action}}>
  <div class={{classWrapperImage}}>
    <img src={{image}}>
  </div>
  <span class={{className}}>{{name}}</span>
</button>
{{/each}}
`;

export default tpl;

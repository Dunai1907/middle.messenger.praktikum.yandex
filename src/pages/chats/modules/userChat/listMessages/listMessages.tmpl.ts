const tpl = `
{{#each items}}
<div class={{classDate}}>{{date}}</div>
<div class={{classUserMessage}}>
  <span class={{classContent}}>{{content}}</span>
  <img class={{classImage}} src={{delivered}}>
  <span class={{classTime}}>{{time}}</span>
</div>
{{/each}}
`;

export default tpl;

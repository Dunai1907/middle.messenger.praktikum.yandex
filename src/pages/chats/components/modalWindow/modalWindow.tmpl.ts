const tpl = `
<div class={{classContent}}>
  <span class={{classSpan}}>{{name}}</span>
  <form data-name={{dataName}}>
    <label class={{classLabel}}>
      {{labelName}}
      <input type={{inputType}} name={{inputName}} class={{classInput}}></input>
    </label>
    <hr class={{classLine}} />
    {{{buttonAction}}}
  </form>
</div>
`;

export default tpl;

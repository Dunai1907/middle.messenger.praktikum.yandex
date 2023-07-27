const tpl = `
<label class={{classLabel}}>
  {{labelName}}
  <input type={{type}} name={{inputName}} class={{classInput}} value={{value}} ></input>
</label>
<hr class="{{classLine}}" />
<div data-name="error" class={{classError}}></div>
`;

export default tpl;

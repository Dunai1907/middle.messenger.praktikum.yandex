const tpl = `
{{#if isUnSelectChat}}
  <div class={{stylesDivUnSelect}}>
    <div class={{stylesUnSelect}}>
      <span class={{stylesSpanUnSelect}}>Выберите чат чтобы отправить сообщение</span>
    <div/>
  <div/>
{{/if}}
{{#if isSelectChat}}
  <div>
    {{{userData}}}
    {{{blockActions}}}
    <hr class={{stylesLine}} />
    {{{listMessages}}}
    <hr class={{stylesLine}} />
    {{{blockUpload}}}
    {{{createMessage}}}
  </div>
{{/if}}
`;

export default tpl;

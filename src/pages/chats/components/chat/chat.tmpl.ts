const tpl = `
<div class={{stylesAvatar}}>
  <img src={{avatar}} width="45" height="45">
</div>
<div class={{stylesMain}}>
  <div class={{stylesWrap}}>
    <div class={{stylesName}}>
      <span class={{stylesSpanName}}>{{name}}</span>
    </div>
    {{#if isLastMessage}}
      <div class={{stylesDate}}>
        <span class={{stylesSpanDate}}>{{date}}</span>
      </div>
    {{/if}}
  </div>
  {{#if isLastMessage}}
    <div class={{stylesWrap}}>
      <div class={{stylesText}}>
        <span class={{stylesSpanText}}>{{text}}</span>
      </div>
      {{#if isUnreadCount}}
        <div class={{stylesNumber}}>
          <span class={{stylesSpanNumber}}>{{number}}</span></div>
        </div>
      {{/if}}
    </div>
  {{/if}}
</div>
`;

export default tpl;

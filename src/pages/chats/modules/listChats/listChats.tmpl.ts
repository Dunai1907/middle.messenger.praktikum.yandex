const tpl = `
<a href={{hrefValue}} class={{stylesButtonProfile}}>
  <img src={{profileSVG}}>
</a>
<form class={{stylesForm}}>
  <img src={{searchSVG}}>
  <input placeholder="поиск" class={{stylesSearch}} type="search"/>
</form>
{{#each items}}
  <div class={{stylesChat}}>
    <div class={{stylesAvatar}}>
      <img src={{avatar}} width="45" height="45">
    </div>
    <div class={{stylesMain}}>
      <div class={{stylesWrap}}>
        <div class={{stylesName}}>
          <span class={{stylesSpanName}}>{{name}}</span>
        </div>
        <div class={{stylesDate}}>
          <span class={{stylesSpanDate}}>{{date}}</span>
        </div>
      </div>
      <div class={{stylesWrap}}>
        <div class={{stylesText}}>
          <span class={{stylesSpanText}}>{{text}}</span>
        </div>
        <div class={{stylesNumber}}>
          <span class={{stylesSpanNumber}}>{{number}}</span></div>
      </div>
    </div>
  </div>
{{/each}}
`;

export default tpl;

function render(query: string, component: any) {
  const root = document.querySelector(`#${query}`);

  if (root) {
    root.appendChild(component.getContent());
  }

  component.dispatchComponentDidMount();

  return root;
}

export default render;

interface ViewComponentsAPI {
  section<K extends keyof HTMLElementTagNameMap>(tag: K, className: string): HTMLElementTagNameMap[K];
  disclosure(title: string, id?: string): HTMLDetailsElement;
  concealManaged(ids: readonly string[]): void;
}
interface Window { CompasView: ViewComponentsAPI }
(function(){
  function section<K extends keyof HTMLElementTagNameMap>(tag: K, className: string): HTMLElementTagNameMap[K] {
    const element=document.createElement(tag);element.className=className;return element;
  }
  function disclosure(title: string,id?: string): HTMLDetailsElement {
    const element=section('details','ux-disclosure');if(id)element.id=id;
    const summary=document.createElement('summary');summary.textContent=title;element.append(summary);return element;
  }
  // Legacy controllers still write these nodes. Retain their state contract, but expose one canonical view.
  function concealManaged(ids: readonly string[]): void {
    for(const id of ids){const element=document.getElementById(id);if(element){element.hidden=true;element.dataset.viewOwner='canonical-control-elsewhere'}}
  }
  window.CompasView={section,disclosure,concealManaged};
})();

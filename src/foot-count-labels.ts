interface FootCountLabelAPI {
  swapLabel(label: string, swapped: boolean): string;
  format(label: string): string;
}
interface Window { CompasFootLabels: FootCountLabelAPI }
(function(){
  function swapLabel(label: string, swapped: boolean): string {
    if (!swapped) return label;
    return label.replace(/^([1-8])(?=\s|$)/, (_, digit: string) => String((Number(digit)+3)%8+1));
  }
  let swapped=false;
  const api: FootCountLabelAPI={swapLabel,format:label=>swapLabel(label,swapped)};
  if(typeof module!=='undefined'){module.exports=api;return}
  window.CompasFootLabels=api;
  const view=document.querySelector('.unified-feet');
  if(!view)return;
  const control=document.createElement('div');control.className='foot-label-convention';
  control.innerHTML='<label><input id="swapFootCountLabels" type="checkbox"> Intercambiar números de los pies · 1–4 ↔ 5–8</label><p id="footCountLabelStatus" class="small" role="status"></p><details><summary>¿Por qué en clase pueden contar al revés?</summary><p>En Break on 2, una clase de shines suele practicar adelante en 2, incluso para lead. En pareja, lead suele ir atrás en 2 y follower adelante en 2. En On1 también puede cambiar la convención entre clase individual y rol de pareja. Son convenciones docentes, no una regla universal.</p><p>Este interruptor cambia únicamente los números sobre las huellas: 1↔5, 2↔6, 3↔7, 4↔8. No cambia pies, rol, trayectoria, música ni tabla. Es una ayuda visual para comparar conteos; no convierte físicamente el básico de pareja en un shine.</p></details>';
  view.querySelector('.unified-feet-heading')?.after(control);
  const check=document.getElementById('swapFootCountLabels');
  const status=document.getElementById('footCountLabelStatus');
  if(!(check instanceof HTMLInputElement)||!status)return;
  try{swapped=localStorage.getItem('compas-foot-label-swap')==='true'}catch{}
  function update(){
    if(!(check instanceof HTMLInputElement)||!status)return;
    check.checked=swapped;
    status.textContent=swapped?'Etiquetas intercambiadas solo en las huellas. La tabla y el sonido mantienen el conteo original.':'Las huellas muestran el mismo conteo que la tabla.';
    window.dispatchEvent(new Event('compas:foot-label-change'));
  }
  check.onchange=()=>{swapped=check.checked;try{localStorage.setItem('compas-foot-label-swap',String(swapped))}catch{}update()};
  update();
})();

(function(root){
  const categories={all:'Todos',basic:'Básico',strong:'Tiempos fuertes',conga:'Congas',sync:'Síncopas',suzy:'Suzy Q'};
  const figures=[
    {id:'right-turn',name:'Giro a la derecha',query:'right turn',level:'Inicial',family:'lineal'},
    {id:'left-turn',name:'Giro a la izquierda',query:'left turn',level:'Inicial',family:'lineal'},
    {id:'cross-body',name:'Cross Body Lead · cambio de lado',query:'cross body lead',level:'Básico',family:'lineal'},
    {id:'inside-turn',name:'Cross Body con giro interior',query:'cross body lead inside turn',level:'Básico progresivo',family:'lineal'},
    {id:'outside-turn',name:'Cross Body con giro exterior',query:'cross body lead outside turn',level:'Básico progresivo',family:'lineal'},
    {id:'open-break',name:'Open Break · apertura',query:'open break',level:'Básico',family:'lineal'},
    {id:'copa',name:'Copa',query:'copa in and out',level:'Intermedio',family:'lineal'},
    {id:'hammerlock',name:'Hammerlock · brazo detrás',query:'hammerlock',level:'Intermedio',family:'lineal'},
    {id:'reverse-cross-body',name:'Reverse Cross Body',query:'reverse cross body lead',level:'Intermedio',family:'lineal'},
    {id:'change-place',name:'Cambio de lugar · Change of Place',query:'change of place',level:'Básico progresivo',family:'lineal'},
    {id:'new-york-walk',name:'New York Walk',query:'New York walk',level:'Básico progresivo',family:'lineal'},
    {id:'hook-turn',name:'Giro de gancho · Hook Turn',query:'hook turn',level:'Intermedio',family:'lineal'},
    {id:'guapea',name:'Guapea',query:'guapea',level:'Inicial',family:'casino'},
    {id:'dile-que-no',name:'Dile que no',query:'dile que no',level:'Básico',family:'casino'},
    {id:'enchufla',name:'Enchufla',query:'enchufla',level:'Básico',family:'casino'},
    {id:'vacilala',name:'Vacílala',query:'vacilala',level:'Básico progresivo',family:'casino'},
    {id:'sombrero',name:'Sombrero',query:'sombrero',level:'Básico progresivo',family:'casino'},
    {id:'setenta',name:'Setenta',query:'setenta 70',level:'Intermedio',family:'casino'}
  ];
  const clips=[
    {id:'on1-demo',video:'t_clXFnHJEU',title:'Básico On1 · demostración',author:'Social Dance Online',start:0,end:44,timing:'on1',categories:['basic','strong'],hint:'Observa los cambios de dirección del básico. Capítulo «Basic Demo».'},
    {id:'on2-music',video:'z7YqGIuhWVg',title:'Básico On2 · con música',author:'NYC Salsa Classes',start:0,end:11,timing:'on2',categories:['basic'],hint:'Un ejemplo corto del básico antes de la explicación.'},
    {id:'on2-count',video:'z7YqGIuhWVg',title:'Básico On2 · conteo',author:'NYC Salsa Classes',start:50,end:66,timing:'on2',categories:['basic'],hint:'Escucha el conteo del profesor y observa la transferencia de peso.'},
    {id:'on2-follower',video:'z7YqGIuhWVg',title:'On2 · detalle de pies del seguidor',author:'NYC Salsa Classes',start:66,end:83,timing:'on2',categories:['basic'],hint:'Capítulo de acercamiento de los pies del seguidor.'},
    {id:'rivera-place',step:'basic-place',video:'rDsmAHwKn6I',title:'On2 · básico en el sitio',author:'Diego Rivera',start:27,end:42,timing:'on2',categories:['basic'],hint:'Compara el cambio de peso en el sitio con el básico adelante y atrás.'},
    {id:'rivera-basic',video:'rDsmAHwKn6I',title:'On2 · adelante y atrás',author:'Diego Rivera',start:42,end:65,timing:'on2',categories:['basic'],hint:'Capítulo «Basic Step Forward & Back».'},
    {id:'rivera-music',video:'rDsmAHwKn6I',title:'On2 · práctica con música',author:'Diego Rivera',start:65,end:88,timing:'on2',categories:['basic'],hint:'Observa el básico con la música original del profesor.'},
    {id:'rivera-suzy',video:'rDsmAHwKn6I',title:'Suzy Q · cruce de pies On2',author:'Diego Rivera',start:88,end:138,timing:'on2',categories:['suzy'],hint:'Capítulo «Suzy Q Cross-Over Step»: incluye enseñanza y ejecución. Suzy Q no implica por sí solo una síncopa.'}
  ];
  function valid(c){return typeof c.title==='string'&&c.title.trim().length>0&&/^[\w-]{11}$/.test(c.video)&&Number.isFinite(c.start)&&Number.isFinite(c.end)&&c.start>=0&&c.end>c.start&&c.end-c.start<=600&&['on1','on2'].includes(c.timing)&&Array.isArray(c.categories)&&c.categories.length>0&&c.categories.every(k=>k!=='all'&&k in categories)}
  function filter(list,category,timing,query=''){return list.filter(c=>(category==='all'||c.categories.includes(category))&&(timing==='all'||c.timing===timing)&&`${c.title} ${c.author}`.toLocaleLowerCase().includes(query.toLocaleLowerCase()))}
  function branch(c){return c.step|| (c.categories.includes('suzy')?'suzy':c.categories.includes('basic')?'basic':c.categories[0])}
  function alternatives(list,current){return current?list.filter(c=>branch(c)===branch(current)&&c.timing===current.timing&&c.video!==current.video):[]}
  function next(list,current,seen,random=Math.random){
    const candidates=alternatives(list,current);
    let pool=candidates.filter(c=>!seen.has(c.video));
    if(!pool.length){seen.clear();if(current)seen.add(current.video);pool=candidates}
    const authors=[...new Set(pool.map(c=>c.author))];
    const different=authors.filter(a=>a!==current?.author);
    const choices=different.length?different:authors;
    if(!choices.length)return null;
    const author=choices[Math.floor(random()*choices.length)];
    const videos=[...new Set(pool.filter(c=>c.author===author).map(c=>c.video))];
    const video=videos[Math.floor(random()*videos.length)];
    return pool.find(c=>c.video===video);
  }
  const api={categories,figures,clips,valid,filter,branch,alternatives,next};if(typeof module!=='undefined')module.exports=api;else root.CompasLessons=api;
})(globalThis);

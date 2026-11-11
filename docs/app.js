(function(){
const LESSONS=CONTENT.lessons;
const KEY='megruli.v1';
const $=s=>document.querySelector(s);
const V=$('#v'),NAV=$('#nav');
function today(){return new Date().toISOString().slice(0,10)}
function load(){try{return Object.assign({xp:0,done:{},wrong:[],streak:0,last:''},JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){return {xp:0,done:{},wrong:[],streak:0,last:''}}}
const S=load();
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
let hearts=5;
const ICON={heart:'<svg viewBox="0 0 24 24" fill="#e0483a"><path d="M12 21s-8-5.2-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.800-8 11-8 11z"/></svg>',
 bolt:'<svg viewBox="0 0 24 24" fill="#f2b705"><path d="M13 2 4 14h6l-1 8 9-12h-6z"/></svg>',
 flame:'<svg viewBox="0 0 24 24" fill="#ef7d2d"><path d="M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-10z"/></svg>'};
const TABS=[['learn','სწავლა','<svg viewBox="0 0 24 24"><path d="M4 5h7a2 2 0 0 1 2 2v12a2 2 0 0 0-2-2H4zM20 5h-7a2 2 0 0 0-2 2v12a2 2 0 0 1 2-2h7z"/></svg>'],
 ['practice','გამეორება','<svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.3-5.600M20 4v5h-5"/></svg>'],
 ['me','პროფილი','<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>']];
let tab='learn';
function nav(show){NAV.hidden=!show;NAV.innerHTML=TABS.map(t=>`<button class="tab ${t[0]===tab?'on':''}" data-t="${t[0]}">${t[2]}${t[1]}</button>`).join('');
  NAV.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{tab=b.dataset.t;main()})}
const topbar=()=>`<div class="top"><div class="logo">მეგრული</div><div class="pill" title="სერია">${ICON.flame}${S.streak}</div><div class="pill" title="XP">${ICON.bolt}${S.xp}</div></div>`;
function main(){nav(true);({learn:home,practice:practice,me:profile})[tab]()}

function home(){
  const nd=Object.keys(S.done).length;
  V.innerHTML=topbar()+`<div class="home"><div class="hero"><h1>ისწავლე მეგრული ბარათებით</h1><p>ჯერ მოკლე ბარათებზე გაიგებ, როგორ მუშაობს სიტყვა ან წესი. მერე ქვიზებით შეამოწმებ.</p></div>
  <div class="unit"><div class="unit-h"><h2>საფუძვლები</h2><span>${nd} / ${LESSONS.length} გაკვეთილი</span></div>
  ${LESSONS.map((l,i)=>{const lock=i>0&&!S.done[LESSONS[i-1].id]&&!S.done[l.id];
   return `<button class="lesson ${S.done[l.id]?'done':''}" ${lock?'disabled':''} data-id="${l.id}"><div class="ico">${S.done[l.id]?'✓':l.ico}</div>
   <div class="l-t"><b>${l.title}</b><small>${l.desc}</small><div class="flow"><span class="tag">${l.cards.length} ბარათი</span><span class="tag q">${l.quiz.length} კითხვა</span>${l.draft?'<span class="draft">გადასამოწმებელი</span>':''}</div></div></button>`}).join('')}
  </div></div>`;
  V.querySelectorAll('.lesson:not(:disabled)').forEach(b=>b.onclick=()=>start(LESSONS.find(l=>l.id===b.dataset.id)));
}
function practice(){
  const items=S.wrong.map(k=>{const [id,i]=k.split(':');const l=LESSONS.find(x=>x.id===id);return l&&l.quiz[+i]?{key:k,q:l.quiz[+i]}:null}).filter(Boolean);
  V.innerHTML=topbar()+`<div class="home"><div class="hero"><h1>გამეორება</h1><p>აქ გროვდება კითხვები, რომლებზეც შეგეშალა. სწორად უპასუხე და სიიდან გაქრება.</p></div>
  ${items.length?`<div class="sec"><h2>${items.length} კითხვა ელოდება</h2><button class="go" id="gp">დაიწყე გამეორება</button></div>`
   :'<div class="empty">ჯერ შეცდომები არ გაქვს. გაიარე გაკვეთილი და აქ დაგიგროვდება კითხვები გასამეორებლად.</div>'}</div>`;
  const g=$('#gp');if(g)g.onclick=()=>start({id:'_p',title:'გამეორება',cards:[],quiz:items.slice(0,8).map(x=>x.q),keys:items.slice(0,8).map(x=>x.key),practice:true});
}
let armed=false;
function profile(){
  const nd=Object.keys(S.done).length;armed=false;
  V.innerHTML=topbar()+`<div class="home"><div class="hero"><h1>პროფილი</h1></div>
  <div class="stats"><div class="stat"><b>${S.streak}</b><span>დღე ზედიზედ</span></div><div class="stat"><b>${S.xp}</b><span>XP</span></div><div class="stat"><b>${nd}</b><span>გაკვეთილი</span></div></div>
  <div class="sec"><h2>აპლიკაციის შესახებ</h2><p>მეგრული ენის სასწავლო აპლიკაცია. პროგრესი ინახება მხოლოდ შენს მოწყობილობაში. აპლიკაცია არ აგროვებს პირად მონაცემებს და არ საჭიროებს რეგისტრაციას.</p><p>ვერსია ${CONTENT.version}</p></div>
  <button class="ghost danger" id="rs">პროგრესის წაშლა</button></div>`;
  $('#rs').onclick=e=>{if(!armed){armed=true;e.target.textContent='დააჭირე კიდევ ერთხელ დასადასტურებლად';return}
    S.xp=0;S.done={};S.wrong=[];S.streak=0;S.last='';save();profile()};
}

let L,step,total,correct;
function start(l){L=l;step=0;correct=0;hearts=5;total=l.cards.length+l.quiz.length;render()}
function shell(inner,foot,phase){
  nav(false);
  V.innerHTML=`<div class="player"><div class="bar"><button class="x" id="quit" aria-label="დახურვა">✕</button>
   <div class="prog"><i style="width:${Math.round(step/total*100)}%"></i></div><div class="pill" id="hp">${ICON.heart}${hearts}</div></div>
   <div class="phase">${phase}</div><div class="stage">${inner}</div><div class="foot">${foot}</div></div>`;
  $('#quit').onclick=main;
}
function render(){if(step>=total)return finish();if(step<L.cards.length)card(L.cards[step]);else quiz(L.quiz[step-L.cards.length])}
function card(c){
  const n=L.cards.length;
  shell(`<div class="xcard"><div class="kicker">${c.k}</div><h3>${c.h}</h3>
    ${c.big?`<div><div class="big">${c.big}</div><div class="sub">${c.sub}</div></div>`:''}
    <p>${c.p}</p>
    ${c.rows?`<div class="rows">${c.rows.map(r=>`<div class="row"><span class="m">${r[0]}</span><span class="g">${r[1]}</span></div>`).join('')}</div>`:''}
    ${c.note?`<div class="note">${c.note}</div>`:''}
    <div class="dots">${L.cards.map((_,i)=>`<i class="${i===step?'on':''}"></i>`).join('')}</div></div>`,
    `<button class="go" id="next">${step===n-1?'ქვიზზე გადასვლა':'გავიგე, შემდეგი'}</button>`,`<b>ახსნა</b> · ${step+1} / ${n}`);
  $('#next').onclick=()=>{step++;render()};
}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function qkey(qi){return L.practice?L.keys[qi]:L.id+':'+qi}
function quiz(q){
  const qi=step-L.cards.length,qn=L.quiz.length;
  const phase=`<b>ქვიზი</b> · ${qi+1} / ${qn}`;
  let hit=false,miss=false;
  const done=ok=>{ // ok: first-try correct
    if(ok){correct++;S.xp+=10;if(L.practice||S.wrong.includes(qkey(qi)))S.wrong=S.wrong.filter(k=>k!==qkey(qi))}
    else{if(!S.wrong.includes(qkey(qi)))S.wrong.push(qkey(qi))}
    save();
  };
  const lose=()=>{hearts=Math.max(0,hearts-1);$('#hp').innerHTML=ICON.heart+hearts};
  const verdict=(ok,msg)=>{
    done(ok);if(!ok)lose();
    $('#fbox').innerHTML=`<div class="fb ${ok?'ok':'no'}"><b>${ok?'სწორია!':'ჯერ არა'}</b>${msg}</div>`;
    const c=$('#chk');c.disabled=false;c.textContent='გაგრძელება';
    $('.prog i').style.width=Math.round((step+1)/total*100)+'%';
    c.onclick=()=>{if(hearts===0)return fail();step++;render()};
  };
  if(q.t==='choose'){
    const opts0=q.o.map((o,i)=>({o,r:i===q.a})),opts=shuffle(opts0);
    shell(`<div class="xcard"><p class="q-t">${q.q}</p>${q.w?`<div class="q-w">${q.w}</div>`:''}
      <div class="opts">${opts.map((x,i)=>`<button class="opt" data-i="${i}">${x.o}</button>`).join('')}</div></div>`,
      `<div id="fbox"></div><button class="go" id="chk" disabled>შემოწმება</button>`,phase);
    let pick=null,checked=false;const bs=[...V.querySelectorAll('.opt')];
    bs.forEach(b=>b.onclick=()=>{if(checked)return;pick=+b.dataset.i;bs.forEach(x=>x.classList.toggle('sel',x===b));$('#chk').disabled=false});
    $('#chk').onclick=()=>{checked=true;bs.forEach((b,i)=>{b.disabled=true;b.classList.remove('sel');if(opts[i].r)b.classList.add('right');else if(i===pick)b.classList.add('wrong')});verdict(opts[pick].r,q.e||'')};
  }else{
    const left=q.p.map(p=>p[0]),right=shuffle(q.p.map(p=>p[1]));
    shell(`<div class="xcard"><p class="q-t">${q.q}</p><div class="pairs"><div class="opts" id="Lc">${left.map(x=>`<button class="opt" data-v="${x}">${x}</button>`).join('')}</div>
      <div class="opts" id="Rc">${right.map(x=>`<button class="opt" data-v="${x}">${x}</button>`).join('')}</div></div></div>`,
      `<div id="fbox"></div><button class="go" id="chk" disabled>გაგრძელება</button>`,phase);
    let a=null,m=0;
    V.querySelectorAll('#Lc .opt').forEach(b=>b.onclick=()=>{if(b.classList.contains('gone'))return;a=b;V.querySelectorAll('#Lc .opt').forEach(x=>x.classList.toggle('sel',x===b))});
    V.querySelectorAll('#Rc .opt').forEach(b=>b.onclick=()=>{
      if(!a||b.classList.contains('gone'))return;
      if(q.p.find(p=>p[0]===a.dataset.v)[1]===b.dataset.v){a.classList.add('gone');b.classList.add('gone');a=null;m++;
        if(m===q.p.length)verdict(!miss,miss?'ყველა წყვილი შეუხამე, მაგრამ შეცდომაც იყო.':'ყველა წყვილი სწორია.')}
      else{miss=true;b.classList.add('wrong');setTimeout(()=>b.classList.remove('wrong'),450);lose();if(hearts===0)fail()}
    });
  }
}
function fail(){
  nav(false);V.innerHTML=`<div class="end"><div class="ico" style="width:84px;height:84px;font-size:40px;background:var(--bad);box-shadow:0 5px 0 var(--bad)">!</div>
   <h3 style="font-family:var(--fd);font-size:24px;margin:0">სიცოცხლეები გაგითავდა</h3><p class="sub" style="margin:0">არაუშავს. გადაიკითხე ბარათები და სცადე თავიდან.</p>
   <button class="go" id="again">თავიდან</button><button class="ghost" id="bk">მთავარი</button></div>`;
  $('#again').onclick=()=>start(L);$('#bk').onclick=main;
}
function finish(){
  if(!L.practice)S.done[L.id]=true;
  const t=today();if(S.last!==t){const y=new Date(Date.now()-864e5).toISOString().slice(0,10);S.streak=S.last===y?S.streak+1:1;S.last=t}
  save();nav(false);const qn=L.quiz.length;
  V.innerHTML=`<div class="end"><div class="ico" style="width:84px;height:84px;font-size:40px;background:var(--sun);color:#3b2d00;box-shadow:0 5px 0 var(--sun-d)">✓</div>
   <h3 style="font-family:var(--fd);font-size:26px;margin:0">გაკვეთილი დასრულდა!</h3><p class="sub" style="margin:0">„${L.title}“</p>
   <div class="stats"><div class="stat"><b>${correct}/${qn}</b><span>სწორი პასუხი</span></div><div class="stat"><b>${S.xp}</b><span>სულ XP</span></div><div class="stat"><b>${S.streak}</b><span>დღე ზედიზედ</span></div></div>
   <button class="go sun" id="back">გაგრძელება</button></div>`;
  $('#back').onclick=main;
}
main();
})();

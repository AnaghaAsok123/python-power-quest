// ---- Standalone mode (GitHub Pages etc.) ----
// On claude.ai the platform provides `claude` (shared database, sign-in, downloads).
// Anywhere else this shim stores data in the browser (localStorage) instead.
// NOTE: browser storage is per device, and the passcode below is visible in the page source.
// For real multi-student storage and secure admin login, connect a backend (e.g. Firebase/Supabase).
const ADMIN_PASSCODE="cozmek123"; // <-- change this
if(typeof claude==="undefined"){
 const K="ppu_db_",rid=()=>"a"+Date.now().toString(36)+Math.random().toString(36).slice(2,7);
 const col=n=>({doc:id=>{id=id||rid();return{id,async get(){const v=localStorage.getItem(K+n+"/"+id);return{data:()=>v?JSON.parse(v):null}},async set(d){localStorage.setItem(K+n+"/"+id,JSON.stringify(d))}}},
  onSnapshot(cb){const rows=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k.startsWith(K+n+"/")){const v=localStorage.getItem(k);rows.push({data:()=>JSON.parse(v)})}}cb({docs:rows})}});
 const user={async id(){let u=localStorage.getItem("ppu_uid");if(!u){u=rid();localStorage.setItem("ppu_uid",u)}return u},canEdit:()=>prompt("Teacher passcode")===ADMIN_PASSCODE};
 const dl={async save({filename,data}){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([data],{type:"text/csv"}));a.download=filename;a.click()}};
 window.claude={use:async n=>n==="db"?{collection:col}:n==="user"?user:n==="downloads"?dl:null};
}
const LOGO="logo.png";
const $=s=>document.querySelector(s),app=$("#app");
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const hl=s=>esc(s).replace(/("[^"]*"|'[^']*')|(#.*)|\b(for|in|not|if|else|import|del|True|False)\b|\b(print|len|type|min|max|sum|list|array)\b|\b(\d+)\b/g,(m,a,b,c,d)=>`<i class="${a?"s":b?"c":c?"k":d?"f":"n"}">${m}</i>`);
const code=(c,o)=>`<div class="cb"><pre>${hl(c)}</pre>${o?`<div class="out"><b>OUTPUT</b><pre>${esc(o)}</pre></div>`:""}</div>`;
const viz=(v,h)=>`<div class="vz">${v.map((x,i)=>`<div class="bx${h&&i>=h[0]&&i<h[1]?" on":""}"><u>${i}</u><b>${esc(x)}</b><s>${i-v.length}</s></div>`).join("")}</div>`;
const N=["10","20","30","40","50"];
const D=[
{t:"Python Foundations",m:"Python Starter – You’ve unlocked the fundamentals! 🌱",
 L:[{h:"🔤 Data types",n:"A data type tells Python what kind of value we have: numbers, text, True/False… It decides what we can do with the value.",c:'age = 15\nname = "Asha"\nprint(type(age))',o:"<class 'int'>"},
 {h:"📦 What is a list?",n:"A list keeps many values under ONE name. Write it with square brackets [ ] and commas.",c:'scores = [10, 20, 30]\nprint(scores)',o:"[10, 20, 30]"},
 {h:"❓ Why lists?",n:"Without a list, 100 values need 100 variables. One list holds them all.",c:'a = 10\nb = 20\nc = 30      # too many names!\nnums = [10, 20, 30]  # easy'},
 {h:"⭐ 4 characteristics",n:"Ordered (fixed order) · Mutable (changeable) · Heterogeneous (mixed types) · Indexed (positions start at 0).",c:'mix = ["abc", 34, True]\nprint(type(mix))',o:"<class 'list'>"}],
 R:["Lists use square brackets [ ]","Ordered, mutable, heterogeneous, indexed","type() tells you the data type"],
 Q:[{q:"Which best describes a Python list?",o:["An ordered, changeable collection written with [ ]","An unordered collection with no duplicates","A fixed-size collection stored in contiguous memory","A collection of key–value pairs"],a:0,h:"Think: ordered + changeable + square brackets.",e:"A list is ordered and changeable, written with square brackets."},
 {q:"Which line creates a list?",o:["a = (1, 2, 3)","a = {1, 2, 3}","a = [1, 2, 3]","a = <1, 2, 3>"],a:2,h:"Which bracket style do lists use?",e:"Lists use square brackets [ ]. Round brackets make a tuple and curly brackets a set."},
 {q:"What is the output?",c:'fruits = ["apple", "banana", "cherry"]\nprint(type(fruits))',o:["<class 'list'>","<class 'tuple'>","<class 'str'>","<class 'array'>"],a:0,h:"type() reports what kind of object it is.",e:"fruits is a list, so type() shows <class 'list'>."},
 {q:"Which is NOT a characteristic of a list?",o:["Ordered","Mutable","Can only hold one data type","Indexed"],a:2,h:"Remember the word heterogeneous.",e:"Lists are heterogeneous: they can mix numbers, text and True/False."},
 {q:"You must store the marks of 100 students. Why is a list better than 100 separate variables?",o:["One name can hold all the values","Python cannot create 100 variables","Lists only hold numbers","Lists never need brackets"],a:0,h:"Think about how many names you would have to invent.",e:"A single list name keeps all values together."},
 {q:"What is wrong with this code?",c:"my_list = [1, 2, 3",o:["The closing ] is missing","Lists cannot hold numbers","It needs round brackets","Nothing is wrong"],a:0,h:"Count the opening and closing brackets.",e:"Every [ needs a matching ]."}]},
{t:"List Explorer – Accessing Data",m:"List Explorer – You’re navigating lists like a pro! 🔍",
 L:[{h:"📍 Positive indexing",n:"Positions start at 0 and go left → right.",v:N,c:'nums = [10, 20, 30, 40, 50]\nprint(nums[0])',o:"10"},
 {h:"🔁 Negative indexing",n:"Negative positions start at -1 on the right end and go right → left. (Small numbers under each box.)",v:N,c:'print(nums[-1])',o:"50"},
 {h:"✂️ Slicing start:end",n:"start is INCLUDED, end is EXCLUDED. The result is a new list. Highlighted: nums[0:2].",v:N,hl:[0,2],c:'print(nums[0:2])',o:"[10, 20]"},
 {h:"🧩 Leave a side empty",n:"No start = from the beginning. No end = to the last item.",v:N,hl:[3,5],c:'print(nums[3:])\nprint(nums[:1])',o:"[40, 50]\n[10]"}],
 R:["Index 0 is the FIRST item; -1 is the LAST","Slice [start:end] stops BEFORE end","Slicing returns a new list"],
 Q:[{q:"What is the output?",c:"nums = [10, 20, 30, 40, 50]\nprint(nums[1])",o:["10","20","30","40"],a:1,h:"Indexing starts at 0, not 1.",e:"Index 0 is 10, so index 1 is 20."},
 {q:"What is the output?",c:"nums = [10, 20, 30, 40, 50]\nprint(nums[-2])",o:["30","40","50","20"],a:1,h:"-1 is the last item. What comes just before it?",e:"-1 is 50 and -2 is 40."},
 {q:"In list1 = [\"abc\", 34, True, 40, \"male\"], what is the (positive) index of \"male\"?",o:["3","4","5","-5"],a:1,h:"Count from 0: abc=0, 34=1 …",e:"The 5th item has index 4."},
 {q:"What is the output?",c:"nums = [10, 20, 30, 40, 50]\nprint(nums[1:4])",o:["[20, 30, 40, 50]","[20, 30, 40]","[10, 20, 30, 40]","[30, 40]"],a:1,h:"Start is included, end is excluded.",e:"Indexes 1, 2, 3 are taken, so [20, 30, 40]."},
 {q:"What is the output?",c:"nums = [10, 20, 30, 40, 50]\nprint(nums[-3:])",o:["[10, 20, 30]","[30, 40, 50]","[40, 50]","[20, 30, 40]"],a:1,h:"Start at the 3rd item from the end and keep going to the end.",e:"-3 is 30; no end means go to the last item."},
 {q:"What is the output?",c:"nums = [10, 20, 30, 40, 50]\nprint(nums[1:-1])",o:["[20, 30, 40, 50]","[20, 30, 40]","[10, 20, 30, 40]","[30, 40]"],a:1,h:"The end -1 is excluded, so the last item is left out.",e:"Start at index 1 and stop before the last item: [20, 30, 40]."}]},
{t:"List Manipulation Lab",m:"List Manipulator – You can now control your data! ⚡",
 L:[{h:"✏️ Change a value",n:"Lists are MUTABLE: use the index to replace an item.",c:'pets = ["cat", "dog", "fish"]\npets[0] = "owl"\nprint(pets)',o:"['owl', 'dog', 'fish']"},
 {h:"👯 Duplicates allowed",n:"The same value can appear more than once.",c:'d = [1, 7, 7, 3]\nprint(d)',o:"[1, 7, 7, 3]"},
 {h:"🔄 for loop",n:"A for loop visits every item, one by one.",c:'for x in ["a", "b"]:\n    print(x)',o:"a\nb"},
 {h:"🔎 in / not in / len()",n:"in checks that an item exists, not in that it does not. len() counts items.",c:'t = ["tea", "milk"]\nprint("tea" in t)\nprint("jam" not in t)\nprint(len(t))',o:"True\nTrue\n2"}],
 R:["list[index] = value changes an item","in → exists, not in → missing","len() counts every item, duplicates too"],
 Q:[{q:"What is the output?",c:"x = [1, 2, 3]\nx[1] = 20\nprint(x)",o:["[1, 20, 3]","[20, 2, 3]","[1, 2, 20]","[1, 2, 3, 20]"],a:0,h:"Index 1 is the middle item.",e:"x[1] = 20 replaces the item at index 1."},
 {q:"Which property lets us change an item inside a list?",o:["Mutable","Ordered","Heterogeneous","Duplicate"],a:0,h:"It means “changeable”.",e:"Lists are mutable, so items can be changed."},
 {q:"What does this code print?",c:"for n in [1, 2, 3]:\n    print(n * 2)",o:["2, 4, 6 on separate lines","1, 2, 3 on separate lines","[2, 4, 6]","6"],a:0,h:"print() runs once for each item.",e:"The loop doubles each item and prints it on its own line."},
 {q:"What is the output?",c:'pets = ["cat", "dog"]\nprint("bird" not in pets)',o:["True","False","Error","bird"],a:0,h:"Is “bird” inside the list?",e:"bird is not in the list, so “not in” is True."},
 {q:"What is the output?",c:'print(len(["a", "b", "a", "c"]))',o:["3","4","2","5"],a:1,h:"Does len() ignore repeated items?",e:"len() counts every item, including duplicates."},
 {q:"A shop keeps stock = [\"pen\", \"book\"]. Which code checks whether \"ink\" is in stock?",o:['if "ink" in stock:','if stock in "ink":','stock.len("ink")','if "ink" == stock:'],a:0,h:"Use the keyword that tests membership.",e:"item in list tests membership."}]},
{t:"List Operations Challenge",m:"Operation Master – You’ve mastered list operations! 🏆",
 L:[{h:"➕ Adding",n:"append(x) adds at the end · insert(i, x) adds at position i · extend(list) adds many items.",c:'a = [1, 2]\na.append(3)\na.insert(0, 9)\na.extend([4, 5])\nprint(a)',o:"[9, 1, 2, 3, 4, 5]"},
 {h:"➖ Removing",n:"remove(x) deletes by value · pop(i) deletes by index (last if empty) · del a[i] deletes by index · clear() empties the list.",c:'b = ["x", "y", "z", "w"]\nb.remove("y")\nb.pop()\ndel b[0]\nprint(b)',o:"['z']"},
 {h:"📋 Copying",n:"copy() and list() both make a copy, so changing one does not change the other.",c:'a = [1, 2]\nb = a.copy()\nc = list(a)\nb.append(0)\nprint(a, b)',o:"[1, 2] [1, 2, 0]"},
 {h:"🔗 Joining",n:"Use + to join, or append() in a loop, or extend().",c:'p = ["a"] + ["b"]\nprint(p)',o:"['a', 'b']"}],
 R:["append → end · insert → position · extend → many","remove → value · pop/del → index","+ and extend() join lists"],
 Q:[{q:"What is the output?",c:'x = ["a"] + [1, 2]\nprint(x)',o:["['a', 1, 2]","['a', 3]","['a1', 2]","Error"],a:0,h:"The + operator joins two lists.",e:"+ joins the lists into one."},
 {q:"What is the output?",c:'f = ["a", "b", "c"]\nf.insert(1, "x")\nprint(f)',o:["['x', 'a', 'b', 'c']","['a', 'x', 'b', 'c']","['a', 'b', 'x', 'c']","['a', 'b', 'c', 'x']"],a:1,h:"insert(index, value): which index is first?",e:"x is inserted at index 1, pushing b and c right."},
 {q:"What is the output?",c:"a = [1, 2]\na.extend([3, 4])\nprint(a)",o:["[1, 2, 3, 4]","[1, 2, [3, 4]]","[3, 4]","[1, 2, 3]"],a:0,h:"extend adds each item of the other list.",e:"extend() adds the items one by one."},
 {q:"What is the output?",c:"n = [10, 20, 30, 40]\nn.pop(1)\nprint(n)",o:["[20, 30, 40]","[10, 30, 40]","[10, 20, 30]","[10, 20, 40]"],a:1,h:"pop(1) works with index 1, not the value 1.",e:"pop(1) removes the item at index 1 (20)."},
 {q:"What is the output?",c:"n = [5, 6, 7, 8]\nn.remove(7)\ndel n[0]\nprint(n)",o:["[6, 8]","[5, 6, 8]","[6, 7, 8]","[8]"],a:0,h:"remove uses the value; del uses the index. Do them in order.",e:"remove(7) → [5, 6, 8]; del n[0] → [6, 8]."},
 {q:"What is the output?",c:"a = [1, 2]\nb = a.copy()\nb.append(3)\nprint(a)",o:["[1, 2, 3]","[1, 2]","[3]","Error"],a:1,h:"Is b the same list as a, or a copy?",e:"copy() makes a separate list, so a is unchanged."}]},
{t:"Python Master Challenge – Arrays & Advanced Lists",m:"Python Champion – You’ve conquered Lists & Arrays! 🚀",
 L:[{h:"🧱 Array vs list",n:"An array holds a fixed-size collection of ONE data type in contiguous memory, so it is memory-efficient for numbers. A list can mix types.",c:'import array\narr = array.array("i", [1, 2, 3])\nprint(arr)',o:"array('i', [1, 2, 3])"},
 {h:"🔤 Type codes & NumPy",n:"'i' = signed integer. Array operations are like lists (access, append, insert, remove). For advanced maths and multi-dimensional data, use NumPy arrays.",c:'arr.append(4)\nprint(arr[0])',o:"1"},
 {h:"📊 Sort & aggregate",n:"sort() is ascending; sort(reverse=True) is descending. min(), max(), sum() give the smallest, biggest and total.",c:'n = [3, 8, 1]\nn.sort()\nprint(n, max(n), sum(n))',o:"[1, 3, 8] 8 12"},
 {h:"🪆 Nested lists",n:"A list inside a list. Use two indexes: first picks the inner list, second picks the item.",c:'g = [1, [5, 6, 7]]\nprint(g[1])\nprint(g[1][0])',o:"[5, 6, 7]\n5"}],
 R:["Array = same type; list = any types","array.array('i', [...]) needs import array","Nested access: list[a][b]"],
 Q:[{q:"Which statement about the array module is TRUE?",o:["It stores elements of the same type in contiguous memory","It can mix text and numbers freely","It needs no import","It is the same as a dictionary"],a:0,h:"Think homogeneous and contiguous.",e:"Arrays are fixed-type and memory-efficient."},
 {q:"What is the output?",c:'import array\narr = array.array("i", [1, 2, 3])\nprint(arr)',o:["array('i', [1, 2, 3])","[1, 2, 3]","(1, 2, 3)","Error"],a:0,h:"Printing an array shows its type code too.",e:"The array prints as array('i', [1, 2, 3])."},
 {q:"In array.array('i', ...), what does the type code 'i' mean?",o:["Signed integers","Text strings","Decimal numbers","Boolean values"],a:0,h:"i stands for integer.",e:"'i' means signed integer."},
 {q:"What is the output?",c:"n = [5, 2, 9, 1]\nn.sort(reverse=True)\nprint(n)",o:["[1, 2, 5, 9]","[9, 5, 2, 1]","[5, 2, 9, 1]","[1, 9, 2, 5]"],a:1,h:"reverse=True flips the default order.",e:"sort(reverse=True) sorts in descending order."},
 {q:"What is the output?",c:"n = [4, 8, 2]\nprint(max(n) - min(n), sum(n))",o:["6 14","8 2","6 12","14 6"],a:0,h:"max=8, min=2; add all three for sum.",e:"8 - 2 = 6 and 4 + 8 + 2 = 14."},
 {q:"What is the output?",c:"c = [1, 2, [10, 20, 30]]\nprint(c[2][1])",o:["2","10","20","[10, 20, 30]"],a:2,h:"c[2] is the inner list; then take its index 1.",e:"c[2] is [10, 20, 30]; its index 1 is 20."}]}];
const ACH=[[90,"Python Master 🚀"],[75,"Coding Champion 🏆"],[60,"List Manipulator ⚡"],[40,"List Explorer 🔍"],[0,"Python Beginner 🌱"]];
const ach=p=>ACH.find(a=>p>=a[0])[1];
const sh=a=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
function mkOrd(){let p,bad=(x,i)=>i>1&&x==p[i-1]&&x==p[i-2]||i>2&&((p[i-1]==(x+3)%4&&p[i-2]==(x+2)%4&&p[i-3]==(x+1)%4)||(p[i-1]==(x+1)%4&&p[i-2]==(x+2)%4&&p[i-3]==(x+3)%4));
 do{p=sh(Array.from({length:30},(_,i)=>i%4))}while(p.some(bad));let k=0;
 return D.map(L=>L.Q.map(q=>{const t=p[k++],r=sh([0,1,2,3].filter(i=>i!=q.a));let m=0;return [0,1,2,3].map(pos=>pos==t?q.a:r[m++])}))}
const ordOK=o=>{const c=[0,0,0,0];return o.length==5&&o.every((L,i)=>L.length==6&&L.every((r,j)=>{const q=D[i].Q[j];c[r.indexOf(q.a)]++;return r.length==4&&[...r].sort().join()=="0,1,2,3"&&new Set(q.o).size==4}))&&c.every(n=>n>=6&&n<=9)};
let PREV=null,UID=null,DB=null;try{PREV=JSON.parse(localStorage.getItem("ppu_prev"))}catch(e){}
const same=(a,b)=>!!b&&a.flat().filter((r,i)=>r.join()==b.flat()[i].join()).length>=8;
function newOrd(){let o;do{o=mkOrd()}while(!ordOK(o)||same(o,PREV));PREV=o;try{localStorage.setItem("ppu_prev",JSON.stringify(o))}catch(e){}return o}
function persist(){if(!S.name||!S.scr)return;S.u=Date.now();try{localStorage.setItem("ppu",JSON.stringify(S))}catch(e){}try{DB&&UID&&DB.collection("attempts").doc(UID).set(JSON.parse(JSON.stringify(S))).catch(()=>{})}catch(e){}}
function clearS(){try{localStorage.removeItem("ppu")}catch(e){}try{DB&&UID&&DB.collection("attempts").doc(UID).set({cleared:true,u:Date.now()}).catch(()=>{})}catch(e){}}
let S;const reset=()=>S={name:"",lv:0,qi:0,r:D.map(()=>({c:0,h:0})),a:null,hu:false,ord:newOrd()};reset();
const tc=()=>S.r.reduce((a,x)=>a+x.c,0),th=()=>S.r.reduce((a,x)=>a+x.h,0),sc=()=>Math.max(0,tc()-.5*th()),ls=r=>Math.max(0,r.c-.5*r.h);
const hdr=x=>`<div class="hd"><img src="${LOGO}" class="logo" alt="Cozmek logo"><span>Cozmek</span><small>${x||"Python Power-Up"}</small></div>`;
const lvbar=()=>`<div class="lv">${D.map((_,i)=>`<div class="${i<S.lv?"d":i==S.lv?"c":""}">${i<S.lv?"✔":i==S.lv?"▶":"🔒"} L${i+1}</div>`).join("")}</div>`;
const show=h=>{app.innerHTML=h;scrollTo(0,0);persist()};
function welcome(){show(`<div class="hero"><img src="${LOGO}" class="logo" alt="Cozmek logo"><div class="brand">Cozmek</div><h1>Python Power-Up</h1><div class="tag">Learn It. Build It. Master It! 🚀</div><p>Welcome, Code Explorer! Learn Python, power up your coding skills, and become a Python expert! 🚀</p></div>
<div class="card"><h2>📜 Scoring rules</h2><ul class="rules"><li>Correct answer: <b>+1 point</b></li><li>Incorrect answer: <b>0 points</b></li><li>Each hint used: <b>−0.5 points</b> (only one hint per question)</li><li>Total score can never fall below <b>0</b></li></ul></div>
<div class="card"><label for="nm"><b>Your name</b></label><input id="nm" type="text" maxlength="40" placeholder="Enter your name" autocomplete="name"><p><button class="btn" id="go" disabled>Start Your Quest 🎮</button></p></div>
<div class="ft"><a id="adm">Teacher dashboard</a></div>`);
 const i=$("#nm");i.oninput=()=>$("#go").disabled=!i.value.trim();$("#go").onclick=()=>{S.name=i.value.trim();learn()};$("#adm").onclick=admin}
function learn(){S.scr="learn";const L=D[S.lv];show(`${hdr("Level "+(S.lv+1)+" of 5")}${lvbar()}<h2>Quick Learn Before You Play 📚</h2><p class="mu"><b>Level ${S.lv+1}: ${L.t}</b> · A quick revision. No marks are deducted here.</p>
<div class="grid">${L.L.map(c=>`<div class="card"><b>${c.h}</b><p>${c.n}</p>${c.v?viz(c.v,c.hl):""}${code(c.c,c.o)}</div>`).join("")}</div>
<div class="card rem"><b>⭐ Remember This!</b><ul>${L.R.map(r=>`<li>${r}</li>`).join("")}</ul></div><p><button class="btn" id="st">Start Level Challenge 🚀</button></p>`);
 $("#st").onclick=()=>{S.qi=0;S.a=null;S.hu=false;quiz()}}
function quiz(){S.scr="quiz";const L=D[S.lv],q=L.Q[S.qi],n=S.lv*6+S.qi+(S.a!==null?1:0);
 show(`${hdr("Level "+(S.lv+1)+" · Question "+(S.qi+1)+"/6")}<div class="bar"><div style="width:${n/30*100}%"></div></div>
<div class="st"><span class="pill">🏁 Level ${S.lv+1}: ${L.t}</span><span class="pill">⭐ Score ${sc()}</span><span class="pill">💡 Hints used ${th()}</span></div>
<div class="card"><h2>${esc(q.q)}</h2>${q.c?code(q.c):""}
${S.ord[S.lv][S.qi].map((i,j)=>`<button class="opt${S.a!==null?(i==q.a?" ok":i==S.a?" no":""):""}" data-i="${i}" ${S.a!==null?"disabled":""}>${"ABCD"[j]}. ${esc(q.o[i])}</button>`).join("")}
${S.hu?`<div class="hint">💡 ${q.h}</div>`:S.a===null?`<p class="mu">Need a little help? Using a hint will deduct 0.5 points from your score.</p>`:""}
<button class="btn g" id="hn" ${S.hu||S.a!==null?"disabled":""}>Hint 💡</button>
${S.a!==null?(S.a==q.a?`<div class="fb ok"><b>${["Excellent! You’re getting better at Python! 🎉","Correct! Another coding skill unlocked! 🚀","Brilliant work, Code Explorer!"][n%3]}</b><br>${q.e}</div>`:`<div class="fb no"><b>${["Not quite! Let’s understand this concept.","Good attempt! Think about the concept once more.","Keep learning. Every mistake makes you a better coder!"][n%3]}</b><br>You chose “${esc(q.o[S.a])}”. The correct answer is “${esc(q.o[q.a])}”. ${q.e}</div>`):""}
</div><p style="text-align:right"><button class="btn" id="nx" ${S.a===null?"disabled":""}>${S.qi==5?"Finish Level 🏁":"Next →"}</button></p>`);
 document.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{if(S.a!==null)return;S.a=+b.dataset.i;if(S.a==q.a)S.r[S.lv].c++;quiz()});
 $("#hn").onclick=()=>{if(S.hu||S.a!==null)return;S.hu=true;S.r[S.lv].h++;quiz()};
 $("#nx").onclick=()=>{if(S.a===null)return;S.a=null;S.hu=false;if(S.qi==5)done();else{S.qi++;quiz()}}}
function party(){for(let i=0;i<28;i++){const e=document.createElement("div");e.className="cf";e.textContent=["🎉","✨","🚀","⭐","💜"][i%5];e.style.left=Math.random()*100+"vw";e.style.animationDelay=Math.random()*.8+"s";document.body.appendChild(e);setTimeout(()=>e.remove(),3600)}}
function done(){S.scr="done";const L=D[S.lv],r=S.r[S.lv],last=S.lv==4;
 show(`${hdr("Level "+(S.lv+1)+" complete")}<div class="card" style="text-align:center"><div class="big">🎉 Level ${S.lv+1} Complete!</div><h2>${L.t}</h2><p><b>${L.m}</b></p>
<div class="grid" style="text-align:left"><div class="card">✅ Correct: <b>${r.c}/6</b></div><div class="card">❌ Incorrect: <b>${6-r.c}</b></div><div class="card">💡 Hints used: <b>${r.h}</b></div><div class="card">➖ Hint penalty: <b>${r.h*.5}</b></div></div><p class="big">Level score: ${ls(r)} / 6</p>
<button class="btn" id="un">${last?"See Final Results 🏆":"Unlock Next Level 🔓"}</button></div>`);party();
 $("#un").onclick=()=>{if(last)final();else{S.lv++;learn()}}}
const chart=()=>`<svg viewBox="0 0 320 150" style="width:100%;max-width:420px">${S.r.map((r,i)=>{const h=ls(r)/6*100,x=15+i*61;return `<rect x="${x}" y="${120-h}" width="44" height="${h}" rx="6" fill="#4b00be" opacity="${.5+i*.12}"/><text x="${x+22}" y="${114-h}" text-anchor="middle" font-size="12" fill="currentColor">${ls(r)}</text><text x="${x+22}" y="138" text-anchor="middle" font-size="12" fill="currentColor">L${i+1}</text>`}).join("")}</svg>`;
async function final(){S.scr=null;clearS();const s=sc(),p=Math.round(s/30*1000)/10,A=ach(p),rec={name:S.name,ts:Date.now(),correct:tc(),wrong:30-tc(),hints:th(),penalty:th()*.5,score:s,pct:p,ach:A,lv:S.r.map(r=>({c:r.c,h:r.h,s:ls(r)}))};
 show(`${hdr("Final results")}<div class="card" style="text-align:center"><img src="${LOGO}" class="logo" style="height:70px" alt="Cozmek logo"><div class="brand" style="margin:4px 0">Cozmek</div><h2>Python Power-Up · Results</h2><p>Well done, <b>${esc(S.name)}</b>!</p><div class="big">${s} / 30 · ${p}%</div><h2>${A}</h2>
<div class="grid" style="text-align:left"><div class="card">Total questions: <b>30</b></div><div class="card">✅ Correct: <b>${rec.correct}</b></div><div class="card">❌ Incorrect: <b>${rec.wrong}</b></div><div class="card">💡 Hints: <b>${rec.hints}</b> (penalty −${rec.penalty})</div></div>
<b>Level-wise performance (score out of 6)</b><br>${chart()}<p class="mu" id="sv">Saving your result…</p><button class="btn" id="pa">Play Again 🔁</button></div>`);party();$("#pa").onclick=()=>{reset();welcome()};
 try{const db=await claude.use("db");if(!db)throw 0;const u=await claude.use("user");rec.uid=await u.id();await db.collection("results").doc(rec.uid).set(rec);$("#sv").textContent="✅ Result saved for your teacher."}catch(e){$("#sv").textContent="⚠️ Your result could not be saved (the teacher needs to share this page with edit-level access)."}}
async function admin(){show(`${hdr("Teacher dashboard")}<div class="card" id="ad">Checking access…</div><p><button class="btn g" id="bk">← Back</button></p>`);$("#bk").onclick=welcome;
 let u=null,db=null;try{u=await claude.use("user");db=await claude.use("db")}catch(e){}
 if(!u||!db||!u.canEdit()){$("#ad").innerHTML="🔒 Teacher access only. Open this page signed in as the owner or an editor to view results.";return}
 let rows=[],srt="ts";const draw=()=>{rows.sort((a,b)=>srt=="name"?a.name.localeCompare(b.name):b[srt]-a[srt]);
 $("#ad").innerHTML=`<div class="row"><b>${rows.length} attempt(s)</b><span><button class="btn g" data-s="score">Sort by score</button> <button class="btn g" data-s="ts">Newest</button> <button class="btn" id="csv">Export CSV</button></span></div><div class="sc"><table><tr><th>Name</th><th>Date</th><th>Qs</th><th>✔</th><th>✘</th><th>Hints</th><th>Penalty</th><th>Score</th><th>%</th>${[1,2,3,4,5].map(i=>`<th>L${i} score/hints</th>`).join("")}<th>Achievement</th><th>Status</th></tr>${rows.map(r=>`<tr><td>${esc(r.name)}</td><td>${new Date(r.ts).toLocaleString()}</td><td>30</td><td>${r.correct}</td><td>${r.wrong}</td><td>${r.hints}</td><td>${r.penalty}</td><td>${r.score}</td><td>${r.pct}</td>${r.lv.map(l=>`<td>${l.s} / ${l.h}</td>`).join("")}<td>${esc(r.ach)}</td><td>${r.pct>=60?"Pass":"Needs practice"}</td></tr>`).join("")}</table></div>`;
 document.querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{srt=b.dataset.s;draw()});
 $("#csv").onclick=async()=>{const q=v=>`"${String(v).replace(/"/g,'""')}"`,H=["Name","Completed","Questions","Correct","Incorrect","Hints","Penalty","Score","Percent",...[1,2,3,4,5].flatMap(i=>["L"+i+" score","L"+i+" hint deduction"]),"Achievement","Status"];
  const t=[H,...rows.map(r=>[r.name,new Date(r.ts).toLocaleString(),30,r.correct,r.wrong,r.hints,r.penalty,r.score,r.pct,...r.lv.flatMap(l=>[l.s,l.h*.5]),r.ach,r.pct>=60?"Pass":"Needs practice"])].map(a=>a.map(q).join(",")).join("\n");
  try{const d=await claude.use("downloads");await d.save({filename:"python-power-up-results.csv",data:t})}catch(e){}}};
 try{db.collection("results").onSnapshot(s=>{rows=s.docs.map(d=>d.data());draw()},()=>$("#ad").textContent="Could not load results.")}catch(e){$("#ad").textContent="Could not load results."}}
async function boot(){let s=null;try{s=JSON.parse(localStorage.getItem("ppu"))}catch(e){}
try{const u=await claude.use("user");UID=await u.id();DB=await claude.use("db");if(DB&&UID){const d=await DB.collection("attempts").doc(UID).get(),x=d&&(typeof d.data==="function"?d.data():d);if(x&&x.cleared&&(!s||x.u>=s.u))s=null;else if(x&&x.name&&x.scr&&(!s||!s.u||x.u>s.u))s=x}}catch(e){}
if(s&&s.name&&s.scr&&s.ord&&s.ord.length==5&&ordOK(s.ord)){S=s;PREV=s.ord;({learn,quiz,done}[S.scr]||welcome)()}else welcome()}
boot();

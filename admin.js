const cfg=window.MOSQUE_APPWRITE_CONFIG||{};
const MODULES=[
"হোমপেজ","মসজিদের পরিচিতি","মসজিদের ইতিহাস","নামাজের সময়সূচি","আজানের সময়সূচি","জুমার নামাজের সময়","ইমাম ও খতিব পরিচিতি","পরিচালনা কমিটি","নোটিশ বোর্ড","অনুষ্ঠানসূচি","ফটো গ্যালারি","ভিডিও গ্যালারি","জুমার খুতবা আর্কাইভ","ফাউন্ডেশন পরিচিতি","লক্ষ্য ও উদ্দেশ্য","দরিদ্র পরিবার সহায়তা","এতিম সহায়তা","শিক্ষাবৃত্তি ব্যবস্থাপনা","চিকিৎসা সহায়তা","দুর্যোগ ও ত্রাণ কার্যক্রম"
];
const $=id=>document.getElementById(id);
const commonFields=[
 ["summary","সংক্ষিপ্ত পরিচিতি","textarea"],["details","বিস্তারিত তথ্য","textarea"],["contact","যোগাযোগের তথ্য","text"]
];
const specialFields={
 4:[["date","কার্যকর হওয়ার তারিখ","text"],["location","মসজিদ/স্থান","text"],["fajr","ফজরের জামাত","text"],["sunrise","সূর্যোদয়","text"],["dhuhr","যোহরের জামাত","text"],["asr","আসরের জামাত","text"],["maghrib","মাগরিবের জামাত","text"],["isha","এশার জামাত","text"],["responsible","সময়সূচি যাচাইকারী","text"]],
 5:[["date","কার্যকর হওয়ার তারিখ","text"],["location","স্থান","text"],["fajr","ফজরের আজান","text"],["dhuhr","যোহরের আজান","text"],["asr","আসরের আজান","text"],["maghrib","মাগরিবের আজান","text"],["isha","এশার আজান","text"]],
 6:[["date","কার্যকর হওয়ার তারিখ","text"],["location","স্থান","text"],["jummaKhutbah","জুমার খুতবার সময়","text"],["jummaJamaat","জুমার জামাতের সময়","text"],["responsible","দায়িত্বশীল ব্যক্তি","text"]],
 7:[["personName","ইমাম/খতিবের নাম","text"],["designation","পদবি","text"],["phone","মোবাইল নম্বর","text"],["responsibility","দায়িত্ব ও পরিচিতি","textarea"],["media","ছবি/প্রোফাইল লিংক","text"]],
 8:[["personName","কমিটির সদস্যদের নাম ও তালিকা","textarea"],["designation","পদবি/দায়িত্ব","textarea"],["phone","যোগাযোগ নম্বর","text"],["date","কমিটির মেয়াদকাল","text"]],
 9:[["date","নোটিশের তারিখ","text"],["deadline","কার্যকর হওয়ার/শেষ তারিখ","text"],["responsible","নোটিশ প্রদানকারী","text"],["media","সংযুক্ত নথি/লিংক","textarea"]],
 10:[["eventTitle","অনুষ্ঠানের নাম","text"],["date","অনুষ্ঠানের তারিখ","text"],["time","অনুষ্ঠানের সময়","text"],["location","অনুষ্ঠানের স্থান","text"],["responsible","আয়োজক","text"],["media","অনুষ্ঠানের ছবি/লিংক","textarea"]],
 11:[["media","ছবির সরাসরি লিংক (প্রতি লাইনে একটি)","textarea"],["date","ছবির তারিখ/অনুষ্ঠান","text"]],
 12:[["media","ভিডিও লিংক (প্রতি লাইনে একটি)","textarea"],["date","ভিডিওর তারিখ/অনুষ্ঠান","text"]],
 13:[["date","খুতবার তারিখ","text"],["personName","খতিবের নাম","text"],["eventTitle","খুতবার বিষয়","text"],["media","খুতবা/ভিডিওর লিংক","textarea"]],
 16:[["eligibility","সহায়তা পাওয়ার যোগ্যতা","textarea"],["process","আবেদন পদ্ধতি","textarea"],["documents","প্রয়োজনীয় কাগজপত্র","textarea"],["deadline","আবেদনের শেষ তারিখ","text"],["assistanceType","কী ধরনের সহায়তা দেওয়া হয়","textarea",["responsible","যোগাযোগ/দায়িত্বশীল","text"]]],
 17:[["eligibility","এতিম সহায়তার যোগ্যতা","textarea"],["process","সহায়তা পাওয়ার প্রক্রিয়া","textarea"],["documents","প্রয়োজনীয় কাগজপত্র","textarea"],["deadline","আবেদনের সময়সীমা","text",["responsible","যোগাযোগ/দায়িত্বশীল","text"]]],
 18:[["eligibility","শিক্ষাবৃত্তির যোগ্যতা","textarea"],["process","আবেদনের নিয়ম","textarea"],["documents","প্রয়োজনীয় কাগজপত্র","textarea"],["deadline","আবেদনের শেষ তারিখ","text"],["assistanceType","বৃত্তির ধরন/পরিমাণ","textarea",["responsible","যোগাযোগ/দায়িত্বশীল","text"]]],
 19:[["eligibility","চিকিৎসা সহায়তার যোগ্যতা","textarea"],["process","আবেদন পদ্ধতি","textarea"],["documents","প্রয়োজনীয় কাগজপত্র","textarea"],["assistanceType","সহায়তার ধরন","textarea",["responsible","যোগাযোগ/দায়িত্বশীল","text"]]],
 nst cfg=window.MOSQUE_APPWRITE_CONFIG||{};
const MODULES=[
"হোমপেজ","মসজিদের পরিচিতি","মসজিদের ইতিহাস","নামাজের সময়সূচি","আজানের সময়সূচি","জুমার নামাজের সময়","ইমাম ও খতিব পরিচিতি","পরিচালনা কমিটি","নোটিশ বোর্ড","অনুষ্ঠানসূচি","ফটো গ্যালারি","ভিডিও গ্যালারি","জুমার খুতবা আর্কাইভ","ফাউন্ডেশন পরিচিতি","লক্ষ্য ও উদ্দেশ্য","দরিদ্র পরিবার সহায়তা","এতিম সহায়তা","শিক্ষাবৃত্তি ব্যবস্থাপনা","চিকিৎসা সহায়তা","দুর্যোগ ও ত্রাণ কার্যক্রম"
];
const $=id=>document.getElementById(id);
const commonFields=[
 ["summary","সংক্ষিপ্ত পরিচিতি","textarea"],["details","বিস্তারিত তথ্য","textarea"],["contact","যোগাযোগের তথ্য","text"]
];
const specialFields={
 4:[["date","কার্যকর হওয়ার তারিখ","text"],["location","মসজিদ/স্থান","text"],["fajr","ফজরের জামাত","text"],["sunrise","সূর্যোদয়","text"],["dhuhr","যোহরের জামাত","text"],["asr","আসরের জামাত","text"],["maghrib","মাগরিবের জামাত","text"],["isha","এশার জামাত","text"],["responsible","সময়সূচি যাচাইকারী","text"]],
 5:[["date","কার্যকর হওয়ার তারিখ","text"],["location","স্থান","text"],["fajr","ফজরের আজান","text"],["dhuhr","যোহরের আজান","text"],["asr","আসরের আজান","text"],["maghrib","মাগরিবের আজান","text"],["isha","এশার আজান","text"]],
 6:[["date","কার্যকর হওয়ার তারিখ","text"],["location","স্থান","text"],["jummaKhutbah","জুমার খুতবার সময়","text"],["jummaJamaat","জুমার জামাতের সময়","text"],["responsible","দায়িত্বশীল ব্যক্তি","text"]],
 7:[["personName","ইমাম/খতিবের নাম","text"],["designation","পদবি","text"],["phone","মোবাইল নম্বর","text"],["responsibility","দায়িত্ব ও পরিচিতি","textarea"],["media","ছবি/প্রোফাইল লিংক","text"]],
 8:[["personName","কমিটির সদস্যদের নাম ও তালিকা","textarea"],["designation","পদবি/দায়িত্ব","textarea"],["phone","যোগাযোগ নম্বর","text"],["date","কমিটির মেয়াদকাল","text"]],
 9:[["date","নোটিশের তারিখ","text"],["deadline","কার্যকর হওয়ার/শেষ তারিখ","text"],["responsible","নোটিশ প্রদানকারী","text"],["media","সংযুক্ত নথি/লিংক","textarea"]],
 10:[["eventTitle","অনুষ্ঠানের নাম","text"],["date","অনুষ্ঠানের তারিখ","text"],["time","অনুষ্ঠানের সময়","text"],["location","অনুষ্ঠানের স্থান","text"],["responsible","আয়োজক","text"],["media","অনুষ্ঠানের ছবি/লিংক","textarea"]],
 11:[["media","ছবির সরাসরি লিংক (প্রতি লাইনে একটি)","textarea"],["date","ছবির তারিখ/অনুষ্ঠান","text"]],
 12:[["media","ভিডিও লিংক (প্রতি লাইনে একটি)","textarea"],["date","ভিডিওর তারিখ/অনুষ্ঠান","text"]],
 13:[["date","খুতবার তারিখ","text"],["personName","খতিবের নাম","text"],["eventTitle","খুতবার বিষয়","text"],["media","খুতবা/ভিডিওর লিংক","textarea"]],
 16:[["eligibility","সহায়তা পাওয়ার যোগ্যতা","textarea"],["process","আবেদন পদ্ধতি","textarea"],["documents","প্রয়োজনীয় কাগজপত্র","textarea"],["deadline","আবেদনের শেষ তারিখ","text"],["assistanceType","কী ধরনের সহায়তা দেওয়া হয়","textarea",["responsible","যোগাযোগ/দায়িত্বশীল","text"]]],
 17:[["eligibility","এতিম সহায়তার যোগ্যতা","textarea"],["process","সহায়তা পাওয়ার প্রক্রিয়া","textarea"],["documents","প্রয়োজনীয় কাগজপত্র","textarea"],["deadline","আবেদনের সময়সীমা","text",["responsible","যোগাযোগ/দায়িত্বশীল","text"]]],
 18:[["eligibility","শিক্ষাবৃত্তির যোগ্যতা","textarea"],["process","আবেদনের নিয়ম","textarea"],["documents","প্রয়োজনীয় কাগজপত্র","textarea"],["deadline","আবেদনের শেষ তারিখ","text"],["assistanceType","বৃত্তির ধরন/পরিমাণ","textarea",["responsible","যোগাযোগ/দায়িত্বশীল","text"]]],
 19:[["eligibility","চিকিৎসা সহায়তার যোগ্যতা","textarea"],["process","আবেদন পদ্ধতি","textarea"],["documents","প্রয়োজনীয় কাগজপত্র","textarea"],["assistanceType","সহায়তার ধরন","textarea",["responsible","যোগাযোগ/দায়িত্বশীল","text"]]],
 20:[["eligibility","ত্রাণ পাওয়ার যোগ্যতা/অগ্রাধিকার","textarea"],["process","সহায়তা পাওয়ার প্রক্রিয়া","textarea"],["assistanceType","ত্রাণ/সহায়তার ধরন","textarea"],["deadline","আবেদনের সময়সীমা","text"]]
};
let currentFields=[];
let sdk,account,teams,tables,currentUser=null,rows=new Map(),loadedContent={};
function status(message,error=false){const el=$("status");el.textContent=message;el.classList.toggle("error",error);}
function rowId(n){return "module-"+String(n).padStart(2,"0");}
function parseContent(raw){
 if(!raw)return {};
 try{const x=JSON.parse(raw);if(x&&typeof x==="object"&&!Array.isArray(x))return x;}catch{}
 return {details:raw};
}
function renderFields(data={},n=1){
 const host=$("moduleFields");host.replaceChildren();
 currentFields=[...commonFields,...(specialFields[n]||[])];
 for(const [key,label,type] of currentFields){
  const wrap=document.createElement("div");wrap.className="field";
  const lab=document.createElement("label");lab.htmlFor="field-"+key;lab.textContent=label;
  const input=document.createElement(type==="textarea"?"textarea":"input");
  input.id="field-"+key;input.name=key;input.value=data[key]||"";
  if(type==="textarea"){input.rows=key==="media"?4:5;input.maxLength=key==="details"?10000:4000;}
  else input.maxLength=300;
  wrap.append(lab,input);host.append(wrap);
 }
}
function readFields(){
 const data={};
 for(const [key] of currentFields)data[key]=$("field-"+key).value.trim();
 return data;
}
function showEditor(show){
 $("loginPanel").classList.toggle("hidden",show);
 $("editorPanel").classList.toggle("hidden",!show);
}
function setCounters(){
 const published=[...rows.values()].filter(x=>x.published).length;
 $("publishedCount").textContent=published;
 $("draftCount").textContent=Math.max(0,20-published);
 $("savedCount").textContent=rows.size;
}
async function requireAdmin(){
 currentUser=await account.get();
 const result=await teams.listMemberships({teamId:cfg.adminTeamId});
 const membership=(result.memberships||[]).find(m=>m.userId===currentUser.$id&&m.confirm===true);
 if(!membership)throw new Error("এই অ্যাকাউন্টটি Mosque 20 Admins টিমের নিশ্চিত সদস্য নয়।");
 showEditor(true);
 $("welcome").textContent="স্বাগতম, "+(currentUser.name||currentUser.email);
 await loadAllRows();
 await loadSelected();
}
async function loadAllRows(){
 rows.clear();
 await Promise.all(MODULES.map(async(_,i)=>{
  const id=rowId(i+1);
  try{const row=await tables.getRow({databaseId:cfg.databaseId,tableId:cfg.tableId,rowId:id});rows.set(id,row);}catch(e){if(e.code!==404)console.warn("Module read",id,e);}
 }));
 setCounters();
}
async function loadSelected(){
 const n=Number($("moduleSelect").value||1),id=rowId(n);
 $("moduleNumber").textContent=MODULES[n-1];
 $("moduleStatus").textContent="তথ্য লোড হচ্ছে…";
 try{
  const row=await tables.getRow({databaseId:cfg.databaseId,tableId:cfg.tableId,rowId:id});
  rows.set(id,row);const content=parseContent(row.content);
  $("contentTitle").value=row.title||MODULES[n-1];
  renderFields(content,n);$("published").checked=!!row.published;
  $("moduleStatus").textContent=row.published?"প্রকাশিত":"খসড়া / এখনো প্রকাশিত নয়";
 }catch(e){
  if(e.code===404){
   rows.delete(id);$("contentTitle").value=MODULES[n-1];renderFields({},n);
   $("published").checked=false;$("moduleStatus").textContent="এখনো তথ্য সংরক্ষণ করা হয়নি।";
  }else throw e;
 }
 setCounters();
}
function friendlyError(e){
 const code=e?.code?(" ("+e.code+")"):"";
 if(e?.code===401)return "লগইন সেশন শেষ হয়েছে অথবা ইমেইল/পাসওয়ার্ড সঠিক নয়। আবার লগইন করুন।";
 if(e?.code===403)return "অনুমতি নেই। Appwrite Table-এ Mosque 20 Admins Team-এর Create/Read/Update permission পরীক্ষা করুন।";
 if(e?.code===404)return "Appwrite-এ প্রয়োজনীয় Table/Row পাওয়া যায়নি। Project, Database ও Table ID পরীক্ষা করুন।";
 return (e?.message||String(e))+code;
}
async function start(){
 if(!cfg.endpoint||!cfg.projectId||!cfg.databaseId||!cfg.tableId||!cfg.adminTeamId){status("Appwrite কনফিগারেশন অসম্পূর্ণ।",true);return;}
 status("নিরাপদ প্রশাসনিক সংযোগ প্রস্তুত হচ্ছে…");
 try{
  sdk=await import("https://cdn.jsdelivr.net/npm/appwrite@29.2.0/+esm");
  const {Client,Account,Teams,TablesDB}=sdk;
  if(!TablesDB)throw new Error("এই SDK-তে TablesDB পাওয়া যায়নি। SDK সংস্করণ পরীক্ষা করুন।");
  const client=new Client().setEndpoint(cfg.endpoint).setProject(cfg.projectId);
  account=new Account(client);teams=new Teams(client);tables=new TablesDB(client);
  $("moduleSelect").innerHTML=MODULES.map((m,i)=>'<option value="'+(i+1)+'">'+m+'</option>').join("");
  $("moduleSelect").addEventListener("change",()=>loadSelected().catch(e=>status("তথ্য লোড হয়নি: "+friendlyError(e),true)));
  $("loginForm").addEventListener("submit",async e=>{
   e.preventDefault();const btn=$("loginBtn");btn.disabled=true;status("লগইন যাচাই হচ্ছে…");
   try{await account.createEmailPasswordSession({email:$("email").value.trim(),password:$("password").value});await requireAdmin();status("প্রশাসনিক প্যানেল চালু হয়েছে।");}
   catch(err){status("লগইন ব্যর্থ: "+friendlyError(err),true);}
   finally{btn.disabled=false;}
  });
  $("contentForm").addEventListener("submit",async e=>{
   e.preventDefault();const n=Number($("moduleSelect").value),id=rowId(n);
   const title=$("contentTitle").value.trim();if(!title){status("শিরোনাম লিখুন।",true);return;}
   const data={moduleId:n,title,content:JSON.stringify(readFields()),published:$("published").checked};
   const btn=$("saveBtn");btn.disabled=true;status("তথ্য সংরক্ষণ হচ্ছে…");
   try{
    if(rows.has(id))await tables.updateRow({databaseId:cfg.databaseId,tableId:cfg.tableId,rowId:id,data});
    else await tables.createRow({databaseId:cfg.databaseId,tableId:cfg.tableId,rowId:id,data});
    await loadAllRows();await loadSelected();status("তথ্য সফলভাবে সংরক্ষিত হয়েছে।");
   }catch(err){status("সংরক্ষণ হয়নি: "+friendlyError(err),true);}
   finally{btn.disabled=false;}
  });
  $("refreshBtn").addEventListener("click",async()=>{try{await loadAllRows();await loadSelected();status("তথ্য হালনাগাদ হয়েছে।");}catch(e){status(friendlyError(e),true);}});
  $("logoutBtn").addEventListener("click",async()=>{
   try{await account.deleteSession({sessionId:"current"});}catch{}
   currentUser=null;showEditor(false);$("password").value="";status("লগআউট সম্পন্ন হয়েছে।");
  });
  try{await requireAdmin();status("প্রশাসনিক প্যানেল প্রস্তুত।");}
  catch(e){showEditor(false);if(e.code===401)status("প্রশাসকের ইমেইল ও পাসওয়ার্ড দিয়ে লগইন করুন।");else status("প্রশাসক যাচাই: "+friendlyError(e),true);}
 }catch(e){status("প্রশাসনিক ব্যবস্থা চালু হয়নি: "+friendlyError(e),true);}
}
start();

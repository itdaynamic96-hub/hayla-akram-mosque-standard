const cfg=window.MOSQUE_APPWRITE_CONFIG||{};
const modules=["হোমপেজ","মসজিদের পরিচিতি","মসজিদের ইতিহাস","নামাজের সময়সূচি","আজানের সময়সূচি","জুমার নামাজের সময়","ইমাম ও খতিব পরিচিতি","পরিচালনা কমিটি","নোটিশ বোর্ড","অনুষ্ঠানসূচি","ফটো গ্যালারি","ভিডিও গ্যালারি","জুমার খুতবা আর্কাইভ","ফাউন্ডেশন পরিচিতি","লক্ষ্য ও উদ্দেশ্য","দরিদ্র পরিবার সহায়তা","এতিম সহায়তা","শিক্ষাবৃত্তি ব্যবস্থাপনা","চিকিৎসা সহায়তা","দুর্যোগ ও ত্রাণ কার্যক্রম"];
const $=id=>document.getElementById(id);
function status(msg,error=false){const el=$("status");if(!el)return;el.textContent=msg;el.classList.toggle("error",error);}
function ready(){return !!(cfg.endpoint&&cfg.projectId&&cfg.databaseId&&cfg.tableId&&cfg.adminTeamId);}
function rowId(n){return "module-"+String(n).padStart(2,"0");}
async function start(){
 if(!ready()){status("Appwrite কনফিগারেশন অসম্পূর্ণ। appwrite-config.js ফাইলের Project ID, Database ID, Table ID ও Admin Team ID পরীক্ষা করুন।",true);return;}
 status("Appwrite লগইন ব্যবস্থা লোড হচ্ছে...");
 let sdk;
 try{sdk=await import("https://cdn.jsdelivr.net/npm/appwrite@17.0.0/+esm");}
 catch(e){status("Appwrite লাইব্রেরি লোড হয়নি। ইন্টারনেট বা CDN সংযোগ পরীক্ষা করুন। বিস্তারিত: "+(e.message||String(e)),true);return;}
 try{
  const {Client,Account,Teams,TablesDB}=sdk;
  const client=new Client().setEndpoint(cfg.endpoint).setProject(cfg.projectId);
  const account=new Account(client),teams=new Teams(client),tables=new TablesDB(client);
  let currentUser=null,rowsById=new Map();
  async function requireAdmin(){
   currentUser=await account.get();
   const memberships=await teams.listMemberships({teamId:cfg.adminTeamId});
   const isMember=(memberships.memberships||[]).some(m=>m.userId===currentUser.$id&&m.confirm===true);
   if(!isMember)throw new Error("এই অ্যাকাউন্টটি Mosque 20 Admins টিমের নিশ্চিত সদস্য নয়। Appwrite Console-এ Team membership পরীক্ষা করুন।");
   $("loginPanel").classList.add("hidden");$("editorPanel").classList.remove("hidden");
   $("welcome").textContent="স্বাগতম, "+(currentUser.name||currentUser.email);
   await loadSelected();
  }
  async function loadSelected(){
   const n=Number($("moduleSelect").value),id=rowId(n);
   try{
    const row=await tables.getRow({databaseId:cfg.databaseId,tableId:cfg.tableId,rowId:id});
    rowsById.set(id,row);$("contentTitle").value=row.title||modules[n-1];$("contentBody").value=row.content||"";$("published").checked=!!row.published;
    status("তথ্য পাওয়া গেছে। সম্পাদনা করে সংরক্ষণ করতে পারেন।");
   }catch(e){
    if(e.code===404){rowsById.delete(id);$("contentTitle").value=modules[n-1];$("contentBody").value="";$("published").checked=false;status("এই মডিউলের তথ্য এখনো সংরক্ষিত হয়নি। নতুন তথ্য লিখুন।");}
    else status("তথ্য লোড হয়নি: "+(e.message||String(e)),true);
   }
  }
  $("moduleSelect").innerHTML=modules.map((m,i)=>'<option value="'+(i+1)+'">'+String(i+1).padStart(2,"0")+". "+m+"</option>").join("");
  $("loginForm").addEventListener("submit",async e=>{
   e.preventDefault();const submit=$("loginForm").querySelector('button[type="submit"]');submit.disabled=true;status("লগইন যাচাই করা হচ্ছে...");
   try{await account.createEmailPasswordSession({email:$("email").value.trim(),password:$("password").value});await requireAdmin();}
   catch(err){status("লগইন ব্যর্থ: "+(err.message||String(err)),true);}
   finally{submit.disabled=false;}
  });
  $("moduleSelect").addEventListener("change",loadSelected);
  $("saveBtn").addEventListener("click",async()=>{
   const n=Number($("moduleSelect").value),id=rowId(n),data={moduleId:n,title:$("contentTitle").value.trim(),content:$("contentBody").value.trim(),published:$("published").checked};
   if(!data.title){status("শিরোনাম লিখুন।",true);return;}
   $("saveBtn").disabled=true;
   try{
    if(rowsById.has(id))await tables.updateRow({databaseId:cfg.databaseId,tableId:cfg.tableId,rowId:id,data});
    else await tables.createRow({databaseId:cfg.databaseId,tableId:cfg.tableId,rowId:id,data});
    await loadSelected();status("তথ্য সফলভাবে সংরক্ষণ হয়েছে।");
   }catch(err){status("সংরক্ষণ হয়নি: "+(err.message||String(err)),true);}
   finally{$("saveBtn").disabled=false;}
  });
  $("logoutBtn").addEventListener("click",async()=>{
   try{await account.deleteSession({sessionId:"current"});}catch{}
   currentUser=null;$("editorPanel").classList.add("hidden");$("loginPanel").classList.remove("hidden");status("লগআউট সম্পন্ন।");
  });
  status("প্রশাসকের লগইন সেশন যাচাই করা হচ্ছে...");
  try{await requireAdmin();}
  catch(e){$("editorPanel").classList.add("hidden");$("loginPanel").classList.remove("hidden");if(e.code===401)status("প্রশাসকের ইমেইল ও পাসওয়ার্ড দিয়ে লগইন করুন।");else status("অ্যাডমিন যাচাই ব্যর্থ: "+(e.message||String(e)),true);}
 }catch(e){status("প্রশাসনিক ব্যবস্থা চালু হয়নি: "+(e.message||String(e)),true);}
}
start();

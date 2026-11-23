import { Client, TablesDB } from "https://cdn.jsdelivr.net/npm/appwrite@17.0.0/+esm";
const items=[
["হোমপেজ","মসজিদ","মসজিদ ও ফাউন্ডেশনের মূল পরিচিতি ও গুরুত্বপূর্ণ তথ্য।"],
["মসজিদের পরিচিতি","মসজিদ","মসজিদের অবস্থান, উদ্দেশ্য, কার্যক্রম ও পরিচিতি।"],
["মসজিদের ইতিহাস","মসজিদ","মসজিদ প্রতিষ্ঠা, উন্নয়ন ও উল্লেখযোগ্য ইতিহাস।"],
["নামাজের সময়সূচি","মসজিদ","পাঁচ ওয়াক্ত নামাজের যাচাইকৃত জামাতের সময়সূচি।"],
["আজানের সময়সূচি","মসজিদ","স্থানীয় সময় অনুযায়ী আজানের সময়সূচি।"],
["জুমার নামাজের সময়","মসজিদ","জুমার খুতবা ও জামাতের সময় এবং প্রয়োজনীয় নির্দেশনা।"],
["ইমাম ও খতিব পরিচিতি","মসজিদ","ইমাম, খতিব ও দ্বীনি দায়িত্বশীলদের পরিচিতি।"],
["পরিচালনা কমিটি","মসজিদ","মসজিদ পরিচালনা কমিটির সদস্য ও দায়িত্ব।"],
["নোটিশ বোর্ড","মসজিদ","মসজিদের গুরুত্বপূর্ণ ঘোষণা ও বিজ্ঞপ্তি।"],
["অনুষ্ঠানসূচি","মসজিদ","ধর্মীয় অনুষ্ঠান, সভা ও আসন্ন আয়োজনের তালিকা।"],
["ফটো গ্যালারি","মসজিদ","মসজিদের কার্যক্রম ও অনুষ্ঠানের ছবি।"],
["ভিডিও গ্যালারি","মসজিদ","অনুষ্ঠান, আলোচনা ও কার্যক্রমের ভিডিও।"],
["জুমার খুতবা আর্কাইভ","মসজিদ","জুমার খুতবার বিষয়, তারিখ ও সংরক্ষিত রেকর্ড।"],
["ফাউন্ডেশন পরিচিতি","ফাউন্ডেশন","শায়লা আকরাম ফাউন্ডেশনের পরিচিতি ও কার্যক্রম।"],
["লক্ষ্য ও উদ্দেশ্য","ফাউন্ডেশন","ফাউন্ডেশনের লক্ষ্য, নীতি ও মানবকল্যাণমূলক উদ্দেশ্য।"],
["দরিদ্র পরিবার সহায়তা","ফাউন্ডেশন","অসহায় ও দরিদ্র পরিবারের জন্য সহায়তা কার্যক্রম।"],
["এতিম সহায়তা","ফাউন্ডেশন","এতিম শিশুদের শিক্ষা, সুরক্ষা ও কল্যাণে সহায়তা।"],
["শিক্ষাবৃত্তি ব্যবস্থাপনা","ফাউন্ডেশন","শিক্ষাবৃত্তির আবেদন, যাচাই ও সহায়তা কার্যক্রম।"],
["চিকিৎসা সহায়তা","ফাউন্ডেশন","অসচ্ছল রোগীদের চিকিৎসা সহায়তার তথ্য ও আবেদন।"],
["দুর্যোগ ও ত্রাণ কার্যক্রম","ফাউন্ডেশন","দুর্যোগকালীন জরুরি সহায়তা, ত্রাণ ও পুনর্বাসন।"]
];
const cfg=window.MOSQUE_APPWRITE_CONFIG||{};
const id=Math.max(1,Math.min(20,Number(new URLSearchParams(location.search).get("id"))||1));
const item=items[id-1],$=x=>document.getElementById(x);
document.title=item[0]+" | সাকছিপাড়া শায়লা আকরাম";
$("moduleGroup").textContent="মডিউল "+String(id).padStart(2,"0")+" • "+item[1];
$("moduleTitle").textContent=item[0];
$("moduleDescription").textContent=item[2];
$("moduleContent").replaceChildren();
const heading=document.createElement("h3");heading.textContent="এই বিভাগের তথ্য";
const body=document.createElement("p");body.textContent="প্রকাশিত তথ্য লোড হচ্ছে...";
$("moduleContent").append(heading,body);
$("year").textContent=new Date().getFullYear();
async function loadPublishedContent(){
 if(!cfg.projectId||cfg.projectId==="PASTE_NEW_PROJECT_ID"||!cfg.databaseId||cfg.databaseId==="PASTE_NEW_DATABASE_ID"){body.textContent="এই ওয়েবসাইটের নতুন Appwrite Project এখনো সংযুক্ত করা হয়নি।";return;}
 try{
  const client=new Client().setEndpoint(cfg.endpoint).setProject(cfg.projectId);
  const db=new TablesDB(client);
  const row=await db.getRow({databaseId:cfg.databaseId,tableId:cfg.tableId,rowId:"module-"+String(id).padStart(2,"0")});
  if(!row.published){body.textContent="এই বিভাগের তথ্য এখনো প্রকাশ করা হয়নি।";return;}
  $("moduleTitle").textContent=row.title||item[0];
  $("moduleDescription").textContent=item[2];
  body.textContent=row.content||"এই বিভাগের বিস্তারিত তথ্য শিগগিরই প্রকাশ করা হবে।";
 }catch(error){body.textContent=error.code===404?"এই বিভাগের তথ্য এখনো প্রকাশ করা হয়নি।":"তথ্য লোড করা যায়নি। পরে আবার চেষ্টা করুন।";}
}
loadPublishedContent();

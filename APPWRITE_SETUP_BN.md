# Appwrite সংযোগ — ২০ মডিউলের ওয়েবসাইট

এই নির্দেশিকাটি বর্তমান নতুন প্রজেক্টের জন্য। আগের ১৫ ও ৬০ মডিউলের কোনো প্রজেক্টে পরিবর্তন করবেন না।

## ইতিমধ্যে তৈরি ও কনফিগার করা হয়েছে

- Appwrite Project: `shayla-akram-mosque-20`
- Project ID: `6b0419d80025c3eb9434`
- Endpoint: `https://sgp.cloud.appwrite.io/v1`
- Database: `mosque20_db`
- Database ID: `6b041d590028b371b760`
- Table: `site_content`
- Columns: `title` (Text), `content` (Text), `published` (Boolean), `moduleId` (Integer)
- Admin Team: `Mosque 20 Admins`
- Team ID: `mosque20_admins`
- Admin account Team-এ Active সদস্য হিসেবে যুক্ত।
- `appwrite-config.js`-এ Project, Database, Table ও Team-এর public ID বসানো আছে।
- Table permission: Any = Read; Mosque 20 Admins Team = Create, Read, Update, Delete।
- Row Security বর্তমানে OFF রাখা হয়েছে, যাতে এই table-level permission-গুলো কার্যকর থাকে।

## এখন Appwrite Console-এ একবার যা করতে হবে

1. Appwrite Console-এ `shayla-akram-mosque-20` প্রজেক্ট খুলুন।
2. Settings → Platforms-এ যান।
3. Add platform → Web নির্বাচন করুন।
4. Name দিন: `Mosque 20 GitHub Pages`
5. Hostname/Domain দিন: `itdaynamic96-hub.github.io`
   - এখানে `https://` দেবেন না।
   - শেষে `/hayla-akram-mosque-standard/` path দেবেন না।
6. Save করুন। আগে থেকে থাকা `localhost` platform মুছবেন না।

## Admin login

- সাইট: https://itdaynamic96-hub.github.io/hayla-akram-mosque-standard/
- Admin: https://itdaynamic96-hub.github.io/hayla-akram-mosque-standard/admin.html
- Appwrite Auth-এ তৈরি প্রশাসক account-এর নিজের ইমেইল ও পাসওয়ার্ড দিয়ে লগইন করতে হবে।
- পাসওয়ার্ড কারও সঙ্গে শেয়ার করবেন না।
- Admin Team-এর সদস্য না হলে editor খুলবে না।

## ২০টি মডিউলে তথ্য সংরক্ষণ

প্রতিটি মডিউলের row ID হবে `module-01` থেকে `module-20`। Admin dashboard-এ বিভাগ নির্বাচন করলে সেই বিভাগের উপযোগী ফরম আসবে। যেমন:
- নামাজ/আজান: ফজর, সূর্যোদয়, যোহর, আসর, মাগরিব, এশা ও কার্যকর হওয়ার তারিখ।
- জুমা: খুতবা ও জামাতের সময়।
- ইমাম/কমিটি: নাম, পদবি, দায়িত্ব, যোগাযোগ।
- নোটিশ/অনুষ্ঠান: শিরোনাম, তারিখ, সময়, স্থান, আয়োজক।
- ফাউন্ডেশন সহায়তা: যোগ্যতা, আবেদন পদ্ধতি, কাগজপত্র, শেষ তারিখ ও সহায়তার ধরন।
- গ্যালারি/খুতবা: ছবি, ভিডিও বা রেকর্ডের লিংক।

তথ্য লিখে “তথ্য সংরক্ষণ করুন” চাপুন। প্রকাশ করতে “ওয়েবসাইটে প্রকাশ করুন” চেক করুন। প্রকাশ না করলে public page-এ লেখা দেখা যাবে না। হোমপেজেও প্রকাশিত পরিচিতি, নামাজের সময়, নোটিশ, অনুষ্ঠান ও ফাউন্ডেশনের সংক্ষিপ্ত তথ্য দেখানো হবে।

নামাজের সময়, মসজিদের ইতিহাস, যোগাযোগের ঠিকানা বা কমিটির নামের মতো তথ্য যাচাই না করে লিখবেন না।

## নিরাপত্তা

- Browser code বা GitHub-এ Appwrite API Key, secret বা password দেবেন না।
- Any permission-এ Create/Update/Delete দেবেন না।
- আগের ১৫/৬০ মডিউলের project/database ব্যবহার করবেন না।

## এই সংস্করণের সীমাবদ্ধতা

- সরাসরি ছবি ও ভিডিও আপলোড চালু করা হয়েছে। ছবি প্রতি ফাইল সর্বোচ্চ ৮ MB এবং ভিডিও প্রতি ফাইল সর্বোচ্চ ৫০ MB। ভিডিও URL-ও দেওয়া যাবে।
- দরিদ্র পরিবার, এতিম, শিক্ষাবৃত্তি ও চিকিৎসা সহায়তার আবেদন গ্রহণের জন্য আলাদা private table দরকার। ব্যক্তিগত তথ্য বর্তমান public-readable `site_content` table-এ রাখা নিরাপদ নয়; তাই আবেদন জমা/যাচাই workflow এখনো চালু করা হয়নি।
- Donation/payment gateway, হিসাবরক্ষণ ও আলাদা staff role workflow এখনো চালু নয়।
- বর্তমান admin dashboard কেবল প্রকাশযোগ্য website content সম্পাদনা করে।


## ছবি ও ভিডিও আপলোডের Storage Bucket সেটিং

নতুন ২০ মডিউলের জন্য আলাদা Storage bucket তৈরি করতে হবে। এটি আগের অন্য কোনো প্রজেক্টের bucket নয়।

1. Appwrite Console-এ `shayla-akram-mosque-20` প্রজেক্ট খুলুন।
2. বাম পাশের **Build → Storage** খুলুন।
3. **Create bucket** চাপুন।
4. Bucket ID হুবহু দিন: `mosque20_media`
5. Bucket name দিন: `Mosque 20 Public Media`
6. File Security চালু রাখুন (যদি অপশনটি থাকে)।
7. **Settings**-এ গিয়ে Maximum file size **50 MB** করুন। অনুমোদিত file extensions দিন: `jpg,jpeg,png,webp,gif,mp4,webm`।
8. Bucket permissions-এ `Mosque 20 Admins` Team-কে Create, Read, Update, Delete দিন। `Any`-কে Create/Update/Delete দেবেন না।
9. Bucket ইতিমধ্যে তৈরি করা হয়েছে। Security-তে File level security চালু এবং `Mosque 20 Admins` Team-কে Create, Read, Update, Delete দেওয়া হয়েছে। আপলোড করা প্রতিটি মিডিয়া ফাইলে Public Read permission দেওয়া হবে, যাতে ওয়েবসাইটের দর্শক দেখতে পারেন। সাধারণ দর্শকদের Bucket-level Create permission দেবেন না। ব্যক্তিগত আবেদনপত্র বা পরিচয়পত্র এখানে আপলোড করবেন না।

**নিরাপত্তা:** এই Storage bucket শুধু প্রকাশযোগ্য ওয়েবসাইটের ছবি/পোস্টারের জন্য। দরিদ্র পরিবার, এতিম, শিক্ষার্থী বা রোগীর ব্যক্তিগত নথির জন্য আলাদা private storage ও database permission লাগবে।

## নতুন আলাদা ফরম

প্রতিটি ২০টি মডিউলের জন্য নিজস্ব ফিল্ড-স্কিমা রয়েছে। URL ফিল্ড এবং ফাইল আপলোড ফিল্ড আলাদা। ছবি আপলোডে এক বা একাধিক ছবি বাছাই করা যায়; সর্বোচ্চ ৮ MB প্রতি ছবি। ভিডিও গ্যালারিতে MP4/WebM ফাইল সর্বোচ্চ ৫০ MB আপলোড করা যায়, অথবা YouTube/বাহ্যিক ভিডিও URL দেওয়া যায়। আপলোড করা মিডিয়া Appwrite Storage-এ থাকে এবং ফাইল ID মডিউলের কনটেন্টে সংরক্ষণ হয়।

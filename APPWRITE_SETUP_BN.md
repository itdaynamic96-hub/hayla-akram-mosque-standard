# আলাদা Appwrite সেটআপ — ২০ মডিউলের ওয়েবসাইট

**গুরুত্বপূর্ণ:** আগের ১৫ ও ৬০ মডিউলের Appwrite/Supabase প্রজেক্টে কিছু পরিবর্তন করবেন না। এই সাইটের জন্য নতুন Appwrite Project তৈরি করুন।

## ১. নতুন Project
1. https://cloud.appwrite.io/ খুলুন।
2. Create project চাপুন।
3. নাম দিন: `shayla-akram-mosque-20`
4. Region হিসেবে Singapore নির্বাচন করুন (এই সাইটের কনফিগে Singapore endpoint রাখা হয়েছে)।
5. Project তৈরি হলে Project ID কপি করে নিরাপদে রাখুন।

## ২. Web platform
1. নতুন Project-এর Overview/Platforms থেকে Add platform → Web app নির্বাচন করুন।
2. GitHub Pages চালু করার পর পাওয়া সাইটের domain যোগ করুন। লোকাল পরীক্ষার জন্য `localhost`-ও যোগ করুন।
3. Save করুন।

## ৩. Database এবং Table
1. Databases → Create database।
2. নাম ও ID: `mosque20_db`
3. Database-এর ভেতরে Create table।
4. নাম ও ID: `site_content`
5. Columns-এ নিচের চারটি column যোগ করুন:

| Column key | Type | সেটিং |
|---|---|---|
| title | String | Size 150, Required |
| content | String | Size 16000, Required নয় |
| published | Boolean | Default false |
| moduleId | Integer | Required নয় |

Appwrite system নিজে `$id`, `$createdAt`, `$updatedAt` ইত্যাদি পরিচালনা করে। এখানে আলাদা করে তৈরি করবেন না।

## ৪. নিরাপদ Permissions
1. Table-এর Settings → Permissions খুলুন।
2. Row Security চালু করুন।
3. Table permission-এ **Read: Any** দিন।
4. **Create, Update, Delete: শুধু Admin Team**-কে দিন। Any/Users-কে কখনো write permission দেবেন না।
5. Save করুন।

## ৫. Admin Team
1. Auth/Teams → Create team।
2. Team name: `Mosque20Admins`, Team ID: `mosque20_admins`
3. Teams-এর Memberships থেকে আপনার প্রশাসক Appwrite account-কে এই Team-এ যোগ করুন এবং invitation accept করুন।
4. Team ID কপি করুন।

## ৬. কনফিগারেশন
Repository-তে `appwrite-config.js` ফাইল খুলে নিচের তিনটি placeholder বদলান:
- `PASTE_NEW_PROJECT_ID`
- `PASTE_NEW_DATABASE_ID`
- `PASTE_NEW_ADMIN_TEAM_ID`

এগুলো public project identifiers; **API Key, secret বা password কখনো এই ফাইলে দেবেন না**।

## ৭. পরীক্ষা
- `admin.html` খুলে Team-এর সদস্য এমন account দিয়ে login করুন।
- ২০টি মডিউলের যেকোনো একটিতে যাচাইকৃত তথ্য লিখে Save করুন।
- Public module page-এ প্রকাশিত তথ্য দেখুন।

## বর্তমান সীমা
এই প্রথম সংস্করণের Admin panel ২০টি মডিউলের শিরোনাম, লেখা ও প্রকাশ/অপ্রকাশ নিয়ন্ত্রণ করে। ফটো/ভিডিও upload, আবেদন ফর্ম, আর্থিক হিসাব, donation/payment gateway এবং আলাদা staff permission এখনো যোগ করা হয়নি। এগুলো আলাদা পর্যায়ে তৈরি করতে হবে।

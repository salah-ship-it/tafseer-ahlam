import { writeFileSync } from 'fs';
const nodes = [];
let id = 1;

function addNode(slug, nameAr, level, parent) {
  nodes.push({
    slug,
    nameAr,
    level,
    parent: parent || null,
    metaTitleAr: ("تفسير حلم " + nameAr).slice(0, 55),
    metaDescriptionAr: "تعرف على تفسير حلم " + nameAr + " في المنام حسب ابن سيرين والنابلسي",
    descriptionAr: "تفسير حلم " + nameAr + " في المنام"
  });
}

// 1. HAYAWANAT
addNode("hayawanat", "الحيوانات", 1, null);
addNode("thadiyyat", "الثدييات", 2, "hayawanat");
// L3 leaves for thadiyyat:
["asad/الأسد","namir/النمر","feel/الفيل","dib/الذئب","dubb/الدب","qird/القرد","khanzeer/الخنزير","hisan/الحصان","baqara/البقرة","jamal/الجمل"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "thadiyyat"); });

addNode("zawaahif", "الزواحف", 2, "hayawanat");
["thuban/الثعبان","timsah/التمساح","sihliya/السحلية","sulhufaa/السلحفاة","hayyat-maa/حية الماء","wars/الورل","tinneen/التنين","afaa/الأفعى"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "zawaahif"); });

addNode("hasharaat-hayawanat", "الحشرات", 2, "hayawanat");
["naml/النمل","nahl/النحل","aqrab/العقرب","dhubab/الذباب","duda/الدودة","baaqua/البقة","jaraad/الجراد","namla-bayda/النملة البيضاء"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "hasharaat-hayawanat"); });

addNode("bahriyyat", "المخلوقات البحرية", 2, "hayawanat");
["samak/السمك","hoot/الحوت","qirsh/القرش","ukhtabut/الأخطبوط","sartaan/السرطان","dulfeen/الدلفين","uroosa-bahr/عروس البحر","kalbiyyat-bahr/كلب البحر"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "bahriyyat"); });

addNode("khuyul", "الخيول والحمير", 2, "hayawanat");
["hisan-abyad/الحصان الأبيض","hisan-aswad/الحصان الأسود","baghl/البغل","himar/الحمار","jamal-abyad/الجمل الأبيض","farras/الفرس","pony/المهر","hisan-mutawahhish/الحصان المتوحش"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "khuyul"); });

// 2. MAYAA
addNode("mayaa", "الماء والبحار", 1, null);
addNode("anhaar", "الأنهار", 2, "mayaa");
["nahr-nil/نهر النيل","nahr-furat/نهر الفرات","nahr-jari/نهر جارٍ","nahr-jaaf/نهر جاف","nahr-asfar/نهر أصفر","nahr-dam/نهر الدم","nahr-laban/نهر اللبن","nahr-asal/نهر العسل"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "anhaar"); });

addNode("bihar", "البحار والمحيطات", 2, "mayaa");
["bahr-haadi/البحر الهادئ","bahr-haayij/البحر الهائج","gharq/الغرق","sibaha/السباحة","jazira/الجزيرة","shaat-bahr/شاط البحر","qaa-bahr/قاع البحر","mawj/الأمواج"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "bihar"); });

addNode("amtaar", "المطر والثلج", 2, "mayaa");
["matar-ghaziir/مطر غزير","matar-khafif/مطر خفيف","thalj/الثلج","barad/البرد","saqif/الصقيع","zawaabi/الزوابع","raad/الرعد","barq/البرق"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "amtaar"); });

addNode("aabaar", "الآبار والينابيع", 2, "mayaa");
["biar-maa/بئر الماء","yanbu/الينبوع","ain-maa/عين الماء","shallaal/الشلال","hawd/الحوض","birkaa/البركة","sdd/السد","nafaq-maa/نفق الماء"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "aabaar"); });

// 3. ZAWAJ
addNode("zawaj", "الزواج والعلاقات", 1, null);
addNode("khituba", "الخطبة والزواج", 2, "zawaj");
["khutba/الخطبة","aqd-zawaj/عقد الزواج","mahr/المهر","walima/الوليمة","zawaj-thanee/الزواج الثاني","zawaj-mutaa/زواج المتعة","zawaj-gharib/الزواج من غريب","zawaj-mayyit/الزواج من ميت"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "khituba"); });

addNode("talaq", "الطلاق والفراق", 2, "zawaj");
["talaq-zawja/طلاق الزوجة","talaq-zawj/طلاق الزوج","khul/الخلع","hajr/الهجر","firaq/الفراق","ruju/الرجوع","zawaj-ba'd-talaq/الزواج بعد الطلاق","buka-firaq/البكاء من الفراق"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "talaq"); });

addNode("hubb", "الحب والعلاقات", 2, "zawaj");
["hubb-shakhsi/حب شخص","ghiira/الغيرة","khiyana/الخيانة","wasf-jamaal/وصف الجمال","qubla/القبلة","wisaal/الوصال","faraq-habib/فراق الحبيب","zawaj-sirri/الزواج السري"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "hubb"); });

// 4. MAAL
addNode("maal", "المال والثروة", 1, null);
addNode("dhahab-fidda", "الذهب والفضة", 2, "maal");
["dhahab/الذهب","fidda/الفضة","khatam-dhahab/خاتم الذهب","silsila-dhahab/سلسلة الذهب","aswar-dhahab/أسوارة الذهب","nuqud-dhahab/نقود الذهب","tabr/التبر","maadan-nafees/المعدن النفيس"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "dhahab-fidda"); });

addNode("nuqud", "النقود والأموال", 2, "maal");
["nuqud-waraqiyya/النقود الورقية","nuqud-ma'daniyya/النقود المعدنية","sarqa-maal/سرقة المال","ijad-maal/إيجاد المال","khisara-maal/خسارة المال","ita-maal/إعطاء المال","akhdh-maal/أخذ المال","maal-haram/المال الحرام"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "nuqud"); });

addNode("tijaara", "التجارة والأعمال", 2, "maal");
["bai-shira/البيع والشراء","suq-tijaari/السوق التجاري","ribh/الربح","khasaara/الخسارة","dayn/الدين","qard/القرض","miizaan/الميزان","uqud-tijariyya/العقود التجارية"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "tijaara"); });

addNode("faqr-ghina", "الفقر والغنى", 2, "maal");
["faqr/الفقر","ghina/الغنى","kanz/الكنز","irth/الإرث","zakaat/الزكاة","sadaqa/الصدقة","hirman/الحرمان","tawasul/التوسل"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "faqr-ghina"); });

// 5. AMAKEN
addNode("amaken", "الأماكن والبيئة", 1, null);
addNode("masajid-amaken", "المساجد والأضرحة", 2, "amaken");
["masjid-kabir/مسجد كبير","masjid-haram/المسجد الحرام","masjid-nabawi/المسجد النبوي","darih/الضريح","maqam/المقام","masjid-qadim/مسجد قديم","masjid-jadid/مسجد جديد","musalla/المصلى"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "masajid-amaken"); });

addNode("buyut-amaken", "البيوت والمنازل", 2, "amaken");
["bayt-kabir/بيت كبير","bayt-qadim/بيت قديم","bayt-jadid/بيت جديد","bayt-muhadam/بيت مهدوم","bayt-muzeyyan/بيت مزيّن","bayt-makhuf/بيت مخوف","intiqal-bayt/الانتقال للبيت","bayt-majhul/بيت مجهول"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "buyut-amaken"); });

addNode("qubuur-jananat", "القبور والجنات", 2, "amaken");
["qabr-jadid/قبر جديد","qabr-maftuuh/قبر مفتوح","janna/الجنة","jahannam-amaken/جهنم","rawda/الروضة","maqbara/المقبرة","turbat/التربة","ard-khadra/أرض خضراء"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "qubuur-jananat"); });

addNode("madaris-aswaq", "المدارس والأسواق", 2, "amaken");
["madrasa/المدرسة","jamiaa/الجامعة","suq-amaken/السوق","mustashfa/المستشفى","maktab/المكتب","sijin/السجن","mahkama/المحكمة","mataar/المطار"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "madaris-aswaq"); });

// 6. MAWT
addNode("mawt", "الموت والجنازة", 1, null);
addNode("mawt-shakhsi", "الموت الشخصي", 2, "mawt");
["mawt-nafsi/موت النفس","ihtidar/الاحتضار","ghusul-mayyit/غسل الميت","kafan/الكفن","janaza/الجنازة","dafn/الدفن","buka-mayyit/البكاء على الميت","taziyya/التعزية"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "mawt-shakhsi"); });

addNode("mawt-qareed", "موت الأقارب", 2, "mawt");
["mawt-abb/موت الأب","mawt-umm/موت الأم","mawt-ibn/موت الابن","mawt-bint/موت البنت","mawt-zawj/موت الزوج","mawt-zawja/موت الزوجة","mawt-akh/موت الأخ","mawt-sadiq/موت الصديق"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "mawt-qareed"); });

addNode("baths-qiyama", "البعث والقيامة", 2, "mawt");
["baths/البعث","qiyama/القيامة","sirat/الصراط","mizan-qiyama/الميزان","hisab/الحساب","naar-qiyama/النار","janna-qiyama/الجنة","shafaa/الشفاعة"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "baths-qiyama"); });

addNode("arwah-amwat", "الأرواح والأموات", 2, "mawt");
["ruya-mayyit/رؤية الميت","kalam-mayyit/كلام الميت","mayyit-farah/الميت فرحان","mayyit-hazeen/الميت حزين","mayyit-yatlubu/الميت يطلب","ihya-mayyit/إحياء الميت","arwah-tateer/أرواح تطير","ziyarat-qabr/زيارة القبر"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "arwah-amwat"); });

// 7. TABIIA
addNode("tabiia", "الظواهر الطبيعية", 1, null);
addNode("zalazil", "الزلازل والبراكين", 2, "tabiia");
["zalzal/الزلزال","burkaan/البركان","tsuunami/التسونامي","inhiyar/الانهيار","shaqq-ard/شق الأرض","hadm-zalzal/هدم الزلزال","zilzal-kabir/زلزال كبير","tabaqat-ard/طبقات الأرض"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "zalazil"); });

addNode("riyah-aaasif", "الرياح والعواصف", 2, "tabiia");
["rih-shadeed/ريح شديدة","aasifa/العاصفة","zawaaba/الزوبعة","aasar/الإعصار","rih-tayyiba/ريح طيبة","rih-barda/ريح باردة","rih-harra/ريح حارة","rih-ramliyya/ريح رملية"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "riyah-aaasif"); });

addNode("shams-qamar-tabiia", "الشمس والقمر", 2, "tabiia");
["shams-mushriqa/شمس مشرقة","shams-ghariqa/شمس غاربة","kusuf-shams/كسوف الشمس","qamar-badr/القمر البدر","hilal/الهلال","khusuf-qamar/خسوف القمر","shams-hamraa/شمس حمراء","qamar-kabir/قمر كبير"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "shams-qamar-tabiia"); });

addNode("naar-barq", "النار والبرق", 2, "tabiia");
["naar-kabira/نار كبيرة","barq-tabiia/البرق","raad-tabiia/الرعد","naar-bait/نار البيت","hariq-tabiia/الحريق","dakhaan-tabiia/الدخان","laheeb/اللهيب","jamr/الجمر"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "naar-barq"); });

// 8. JASAD
addNode("jasad", "جسم الإنسان", 1, null);
addNode("raas-wajh", "الرأس والوجه", 2, "jasad");
["raas/الرأس","wajh/الوجه","aynaan/العينان","unf/الأنف","fam/الفم","udhunaan/الأذنان","jibin/الجبين","khadd/الخد"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "raas-wajh"); });

addNode("asnaan-shaar", "الأسنان والشعر", 2, "jasad");
["asnaan/الأسنان","sinn-taalib/سن طالع","sinn-saakit/سن ساقط","shaar-raas/شعر الرأس","shaar-taweel/شعر طويل","shaar-qaseer/شعر قصير","shaar-abyad/شعر أبيض","lahya/اللحية"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "asnaan-shaar"); });

addNode("yadaan-arjul", "اليدان والأرجل", 2, "jasad");
["yad-yumna/اليد اليمنى","yad-yusra/اليد اليسرى","asaabi/الأصابع","rijl-yumna/الرجل اليمنى","rijl-yusra/الرجل اليسرى","qadam/القدم","zufur/الظفر","musaa/المعصم"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "yadaan-arjul"); });

addNode("aadhaa-dakhiliyya", "الأعضاء الداخلية", 2, "jasad");
["qalb/القلب","kabid/الكبد","ria/الرئة","mida/المعدة","dam-jasad/الدم","azm/العظم","laham-jasad/اللحم","jild/الجلد"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "aadhaa-dakhiliyya"); });

// 9. TAAAM
addNode("taaam", "الطعام والشراب", 1, null);
addNode("khubz-lahm", "الخبز واللحم", 2, "taaam");
["khubz/الخبز","khubz-abyad/خبز أبيض","khubz-aswad/خبز أسود","lahm-ghanam/لحم الغنم","lahm-baqar/لحم البقر","lahm-dajaaj/لحم الدجاج","lahm-nii/لحم نيء","lahm-mashwi/لحم مشوي"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "khubz-lahm"); });

addNode("fawakeh-khadrawat", "الفواكه والخضروات", 2, "taaam");
["tuffah/التفاح","anab/العنب","tamr/التمر","ruman/الرمان","mawz/الموز","zaytun-taaam/الزيتون","tiin/التين","batikh/البطيخ"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "fawakeh-khadrawat"); });

addNode("halawiyyat-mashroobat", "الحلويات والمشروبات", 2, "taaam");
["asal-taaam/العسل","sukkar/السكر","halwa/الحلوى","laban-taaam/اللبن","maa-shurb/الماء","qahwa/القهوة","shay/الشاي","asir/العصير"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "halawiyyat-mashroobat"); });

// 10. MALAABIS
addNode("malaabis", "الملابس والزينة", 1, null);
addNode("thiyab", "الثياب والملابس", 2, "malaabis");
["thawb-abyad/ثوب أبيض","thawb-aswad/ثوب أسود","thawb-akhdar/ثوب أخضر","thawb-ahmar/ثوب أحمر","thawb-mummazzaq/ثوب ممزق","thawb-jadid/ثوب جديد","thawb-qadim/ثوب قديم","libs-hariir/لباس حرير"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "thiyab"); });

addNode("huliyy", "الحلي والمجوهرات", 2, "malaabis");
["khatam-fidhha/خاتم فضة","aswar/الأسوار","qilaada/القلادة","haras/الحرص","taj-malaabis/التاج","hizaam/الحزام","khalkhal/الخلخال","dhahabiyya/الذهبية"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "huliyy"); });

addNode("ahtiya-hidhaa", "الأحذية والأغطية", 2, "malaabis");
["hidhaa/الحذاء","naaal/النعل","jurab/الجورب","imama/العمامة","taqiyya/الطاقية","hijab-malaabis/الحجاب","niqab/النقاب","qufaaz/القفازات"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "ahtiya-hidhaa"); });

addNode("ziina", "الزينة والتجميل", 2, "malaabis");
["attur/العطر","kuhl/الكحل","hinna/الحناء","miraa/المرآة","miswaak/المسواك","siwak/السواك","ziina-arus/زينة العروس","libs-arous/لباس العروس"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "ziina"); });

// 11. DEEN
addNode("deen", "الدين والعبادة", 1, null);
addNode("salat-sawm", "الصلاة والصوم", 2, "deen");
["salat-fajr/صلاة الفجر","salat-zuhr/صلاة الظهر","salat-asr/صلاة العصر","salat-maghrib/صلاة المغرب","salat-isha/صلاة العشاء","sawm-ramadan/صوم رمضان","salat-jumua/صلاة الجمعة","salat-jamaa/صلاة الجماعة"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "salat-sawm"); });

addNode("hajj-umra", "الحج والعمرة", 2, "deen");
["hajj/الحج","umra/العمرة","tawaf/الطواف","sai/السعي","ihram/الإحرام","wuquf-arafa/الوقوف بعرفة","ramy-jamarat/رمي الجمرات","ziyarat-madina/زيارة المدينة"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "hajj-umra"); });

addNode("quran-dhikr", "القرآن والذكر", 2, "deen");
["qiraat-quran/قراءة القرآن","hifz-quran/حفظ القرآن","azan/الأذان","iqama/الإقامة","dhikr-allah/ذكر الله","dua/الدعاء","tawba-deen/التوبة","istighfar/الاستغفار"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "quran-dhikr"); });

addNode("wudu-ghusl", "الوضوء والغسل", 2, "deen");
["wudu/الوضوء","ghusl/الغسل","tayammum/التيمم","janaba/الجنابة","tahara/الطهارة","masjid-deen/المسجد","miswak-deen/المسواك","zakat-deen/الزكاة"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "wudu-ghusl"); });

// 12. HARB
addNode("harb", "الحرب والقتال", 1, null);
addNode("qital-asliha", "القتال والأسلحة", 2, "harb");
["sayf/السيف","rumh/الرمح","bundiqiyya/البندقية","qunbula/القنبلة","khanjar/الخنجر","tirs/الترس","qaws-sihm/القوس والسهم","musaddas/المسدس"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "qital-asliha"); });

addNode("nasr-hazima", "النصر والهزيمة", 2, "harb");
["nasr-harb/النصر","hazima/الهزيمة","asr-harb/الأسر","jarh/الجرح","dam-harb/الدم","shahada/الشهادة","firaar/الفرار","sulh/الصلح"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "nasr-hazima"); });

addNode("jaysh-junood", "الجيش والجنود", 2, "harb");
["jaysh/الجيش","junood/الجنود","qaaid-harb/القائد","askar/العسكر","muaaaskar/المعسكر","markaba-harbiyya/المركبة الحربية","tayyara-harbiyya/الطائرة الحربية","baab-qala/باب القلعة"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "jaysh-junood"); });

addNode("khasaim-adaa", "الخصام والأعداء", 2, "harb");
["khisam/الخصام","aduw/العدو","shitam/الشتم","darb/الضرب","sarqa-harb/السرقة","tahdid/التهديد","mubaaraza/المبارزة","intiqqam/الانتقام"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "khasaim-adaa"); });

// 13. USRA
addNode("usra", "الأسرة والأقارب", 1, null);
addNode("walidaan", "الوالدان", 2, "usra");
["ruya-abb/رؤية الأب","ruya-umm/رؤية الأم","abb-mayyit/الأب الميت","umm-mayyit/الأم الميتة","abb-ghadhban/الأب غاضب","umm-baakiya/الأم باكية","abb-mariid/الأب مريض","umm-farha/الأم فرحة"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "walidaan"); });

addNode("awlad-ikhwa", "الأولاد والإخوة", 2, "usra");
["ruya-ibn/رؤية الابن","ruya-bint/رؤية البنت","ruya-akh/رؤية الأخ","ruya-ukht/رؤية الأخت","mawlud-jadid/مولود جديد","tifl-sagheer/طفل صغير","walad-yabki/ولد يبكي","bint-tazawwaj/بنت تتزوج"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "awlad-ikhwa"); });

addNode("ajdad-aqarib", "الأجداد والأقارب", 2, "usra");
["ruya-jadd/رؤية الجد","ruya-jadda/رؤية الجدة","ruya-amm/رؤية العم","ruya-khaal/رؤية الخال","ruya-zawj/رؤية الزوج","ruya-zawja/رؤية الزوجة","qarib-mayyit/قريب ميت","qarib-mariid/قريب مريض"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "ajdad-aqarib"); });

addNode("asdiqa-jeeran", "الأصدقاء والجيران", 2, "usra");
["sadiq-qadim/صديق قديم","sadiq-jadid/صديق جديد","jaar/الجار","zumala/الزملاء","mudir/المدير","ustadh/الأستاذ","aduw-usra/العدو","munafiq/المنافق"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "asdiqa-jeeran"); });

// 14. TUYUUR
addNode("tuyuur", "الطيور", 1, null);
addNode("tuyuur-kabira", "الطيور الكبيرة", 2, "tuyuur");
["nisr/النسر","uqaab/العقاب","tawus/الطاووس","hud-hud/الهدهد","ghuraab/الغراب","bumm/البوم","laqlaq/اللقلق","ibis/أبو قردان"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "tuyuur-kabira"); });

addNode("tuyuur-saghira", "الطيور الصغيرة", 2, "tuyuur");
["usfur/العصفور","hamam/الحمام","babagha/الببغاء","bulbul/البلبل","sununu/السنونو","zarzur/الزرزور","qunbura/القنبرة","dik/الديك"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "tuyuur-saghira"); });

addNode("dawajin", "الدواجن", 2, "tuyuur");
["dajaaj/الدجاج","batta/البطة","wizza/الوزة","habash/الحبش","hamam-bayt/حمام البيت","farkh/الفرخ","bayd-tuyuur/البيض","ish-tuyuur/عش الطيور"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "dawajin"); });

addNode("tuyuur-maa", "طيور الماء", 2, "tuyuur");
["battaa-bahr/بطة البحر","naurus/النورس","bajan/البجع","timsah-tuyuur/تمساح الطيور","ghattaas/الغطاس","samak-tuyuur/سمكة الطيور","qarnabeet/القرنبيط","tawoos-bahr/طاووس البحر"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "tuyuur-maa"); });

// 15. NABAAT
addNode("nabaat", "النباتات والأشجار", 1, null);
addNode("ashjaar-muthmira", "الأشجار المثمرة", 2, "nabaat");
["nakhla/النخلة","zaytun-shajara/شجرة الزيتون","tuffah-shajara/شجرة التفاح","tin-shajara/شجرة التين","ruman-shajara/شجرة الرمان","anab-shajara/شجرة العنب","laymun/الليمون","manga/المانجو"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "ashjaar-muthmira"); });

addNode("ashjar-ziina", "أشجار الزينة", 2, "nabaat");
["ward/الورد","yasmin/الياسمين","shajara-kabira/شجرة كبيرة","shajara-khudra/شجرة خضراء","shajara-yaabisa/شجرة يابسة","hashish/الحشيش","qamh/القمح","qasab/القصب"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "ashjar-ziina"); });

addNode("nubaat-tibbi", "النباتات الطبية", 2, "nabaat");
["habbat-sawda/الحبة السوداء","zaafaran/الزعفران","qirfa/القرفة","hil/الهيل","zanjabil/الزنجبيل","sidr/السدر","tiin-shawki/التين الشوكي","aloe/الصبار"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "nubaat-tibbi"); });

// 16. SAFAR
addNode("safar", "المركبات والسفر", 1, null);
addNode("sayyarat-qitaar", "السيارات والقطارات", 2, "safar");
["sayyara-jadida/سيارة جديدة","sayyara-qadima/سيارة قديمة","qitaar/القطار","haadith-sayyara/حادث سيارة","sayyara-saraa/سيارة تسرع","sayyara-tataal/سيارة تعطل","rakub-sayyara/ركوب السيارة","qiyada-sayyara/قيادة السيارة"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "sayyarat-qitaar"); });

addNode("tayyara-safina", "الطائرة والسفينة", 2, "safar");
["tayyara-safar/الطائرة","safina/السفينة","markab/المركب","ghawwasa/الغواصة","tayyara-tasqut/طائرة تسقط","safina-taghraq/سفينة تغرق","mataar-safar/المطار","miina/الميناء"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "tayyara-safina"); });

addNode("safar-musafir", "السفر والمسافر", 2, "safar");
["safar-baeed/سفر بعيد","safar-qarib/سفر قريب","awda-safar/العودة من السفر","mafqud/المفقود","ghurba/الغربة","hijra/الهجرة","safar-bahr-maa/السفر البحري","safar-jawwi/السفر الجوي"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "safar-musafir"); });

// 17. BUYUT
addNode("buyut", "الأبواب والبيوت", 1, null);
addNode("abwab-nawafidh", "الأبواب والنوافذ", 2, "buyut");
["bab-maftuuh/باب مفتوح","bab-mughlaq/باب مغلق","bab-jadid/باب جديد","bab-mukasar/باب مكسور","shubaak/الشباك","daraja-baab/درجة الباب","miftah/المفتاح","qifl/القفل"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "abwab-nawafidh"); });

addNode("ghuraf-sulalim", "الغرف والسلالم", 2, "buyut");
["ghurfa-nawm/غرفة النوم","ghurfa-juloos/غرفة الجلوس","matbakh-buyut/المطبخ","hammam/الحمام","sullam/السلم","sath/السطح","qabw/القبو","bab-sirri/باب سري"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "ghuraf-sulalim"); });

addNode("mabani-mashaari", "المباني والمشاريع", 2, "buyut");
["bina-bayt/بناء البيت","hadm-bayt/هدم البيت","bayt-kabir/بيت كبير","qasr/القصر","khayma/الخيمة","madshara/المزرعة","jidaar/الجدار","saqf/السقف"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "mabani-mashaari"); });

// 18. ALWAAN
addNode("alwaan", "الألوان", 1, null);
addNode("alwaan-faatiha", "الألوان الفاتحة", 2, "alwaan");
["abyad/الأبيض","asfar-faatih/الأصفر الفاتح","wardy/الوردي","bej/البيج","nuhaasi/النحاسي","dhahabi-lawn/اللون الذهبي","fidhi-lawn/اللون الفضي","azraq-faatih/الأزرق الفاتح"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "alwaan-faatiha"); });

addNode("alwaan-ghamiqa", "الألوان الغامقة", 2, "alwaan");
["aswad-lawn/الأسود","ahmar-ghamiq/الأحمر الغامق","azraq-ghamiq/الأزرق الغامق","banafsaji/البنفسجي","buni/البني","ramadi/الرمادي","zaytooni/الزيتوني","khamri/الخمري"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "alwaan-ghamiqa"); });

addNode("alwaan-hayawiyya", "الألوان الحيوية", 2, "alwaan");
["akhdar-lawn/الأخضر","ahmar-faatih/الأحمر الفاتح","burtuqali/البرتقالي","asfar-ghamiq/الأصفر الغامق","tirkwaz/الفيروزي","lajwardi/اللازوردي","qaramizi/القرمزي","nili/النيلي"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "alwaan-hayawiyya"); });

// 19. MIHNA
addNode("mihna", "المهن والأعمال", 1, null);
addNode("mihna-tibbiyya", "المهن الطبية", 2, "mihna");
["tabib/الطبيب","mumarrid/الممرض","saydalani/الصيدلاني","jarrah/الجراح","muallij/المعالج","tabiib-asnan/طبيب الأسنان","muhtad-nafsani/المعالج النفساني","qabila/القابلة"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "mihna-tibbiyya"); });

addNode("mihna-diniyya", "المهن الدينية", 2, "mihna");
["imam/الإمام","khatib/الخطيب","muadhdhin/المؤذن","alim/العالم","mufti/المفتي","qadi-mihna/القاضي","ustadh-deen/أستاذ الدين","hafiz/الحافظ"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "mihna-diniyya"); });

addNode("mihna-malakiyya", "المهن الملكية والرسمية", 2, "mihna");
["malik/الملك","amir/الأمير","wazir/الوزير","askari-mihna/العسكري","shurtiy/الشرطي","haaris/الحارس","khaadim/الخادم","wakil/الوكيل"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "mihna-malakiyya"); });

// 20. SIHR
addNode("sihr", "السحر والجن", 1, null);
addNode("jinn-malaika", "الجن والملائكة", 2, "sihr");
["jinn-sihr/الجن","shaitan/الشيطان","malaika/الملائكة","iblis/إبليس","jinn-muslim/جن مسلم","jinn-kafir/جن كافر","ruya-malaika/رؤية الملائكة","jibril/جبريل"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "jinn-malaika"); });

addNode("sihr-ayn", "السحر والعين", 2, "sihr");
["sihr-sihr/السحر","ain-hasad/العين والحسد","ruqya/الرقية","talismaan/الطلسم","kabus/الكابوس","jathoom/الجاثوم","khawf-layl/خوف الليل","waswas/الوسواس"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "sihr-ayn"); });

addNode("anbiya-awliya", "الأنبياء والأولياء", 2, "sihr");
["nabi-muhammad/النبي محمد","nabi-isa/النبي عيسى","nabi-musa/النبي موسى","nabi-ibrahim/النبي إبراهيم","nabi-yusuf/النبي يوسف","wali-salih/الولي الصالح","sahabi/الصحابي","shahid/الشهيد"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "anbiya-awliya"); });

addNode("ruya-samaa", "رؤى السماء والنجوم", 2, "sihr");
["nujum/النجوم","kawkab/الكوكب","samaa-maftuuha/السماء المفتوحة","nuzul-samaa/النزول من السماء","suuud-samaa/الصعود للسماء","samaa-hamraa/سماء حمراء","malakoot/الملكوت","arsh/العرش"].forEach(x => { const[s,n]=x.split("/"); addNode("tafseer-hulum-"+s, n, 3, "ruya-samaa"); });

// END - write file
writeFileSync('data/taxonomy.json', JSON.stringify(nodes, null, 2));
console.log('Stats:', {
  L1: nodes.filter(n=>n.level===1).length,
  L2: nodes.filter(n=>n.level===2).length,
  L3: nodes.filter(n=>n.level===3).length,
  total: nodes.length
});

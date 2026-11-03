// All guide content. Each guide: id, cat, title, tags (extra search words), body (HTML).
// Sources: Red Cross / IFRC first aid guidance, European Resuscitation Council guidelines,
// WHO and CDC drinking-water guidance, US Army FM 21-76 / FM 3-05.70 survival manuals (public domain).
// This is reference material, not a substitute for a first aid course.

const CATEGORIES = [
  { id: "aid", title: "First aid", blurb: "Bleeding, CPR, choking, burns, breaks" },
  { id: "water", title: "Water", blurb: "Find, filter and make it safe" },
  { id: "knots", title: "Knots", blurb: "Ten knots that cover almost everything" },
  { id: "survive", title: "Survival & signals", blurb: "Priorities, shelter, navigation, rescue" },
  { id: "field", title: "Field manual", blurb: "Bushcraft from the US Army survival manual + the full PDF" },
];

const GUIDES = [
  // ---------------- FIRST AID ----------------
  {
    id: "primary", cat: "aid", title: "First on scene (DRSABCD)", tags: "unconscious collapsed check assess primary survey",
    body: `
<p class="lead">Work through this in order every time.</p>
<ol class="steps">
<li><b>Danger</b>: check it's safe for you first (traffic, fire, electricity, water, falling rock). Don't become a second casualty.</li>
<li><b>Response</b>: shout "Can you hear me? Open your eyes!" and tap their shoulders.</li>
<li><b>Send for help</b>: call <b>112</b> (or 999/911). Put the phone on speaker. If someone's with you, send them for an AED (defibrillator).</li>
<li><b>Airway</b>: if unresponsive, put them on their back, then tilt the head back with a hand on the forehead and lift the chin with two fingertips.</li>
<li><b>Breathing</b>: look, listen and feel for <b>no more than 10 seconds</b>. Occasional gasps are <b>not</b> normal breathing.</li>
<li><b>CPR</b>: if not breathing normally, start chest compressions now. See <a href="#g/cpr">CPR</a>.</li>
<li><b>Defibrillator</b>: switch on the AED as soon as it arrives and follow its voice prompts.</li>
</ol>
<div class="note">Breathing normally but unresponsive? Look for severe bleeding, then put them in the <a href="#g/recovery">recovery position</a> and keep checking their breathing.</div>`
  },
  {
    id: "cpr", cat: "aid", title: "CPR (not breathing)", tags: "cardiac arrest heart stopped compressions resuscitation rescue breaths aed defibrillator",
    body: `
<a class="btn big red" href="#cpr-metronome">Start CPR metronome</a>
<h3>Adult</h3>
<ol class="steps">
<li>Call 112 on speaker. Get an AED if one is nearby.</li>
<li>Kneel beside them. Put the heel of one hand on the <b>centre of the chest</b> (lower half of the breastbone) and your other hand on top.</li>
<li>Keep your arms straight with your shoulders over your hands. Push down <b>5–6 cm</b> at <b>100–120 per minute</b> and let the chest come fully back up each time.</li>
<li>If you're trained and willing: after 30 compressions, give <b>2 rescue breaths</b> (head tilt, chin lift, pinch the nose, seal your mouth over theirs, 1 second each, watch the chest rise). Then go back to 30 compressions.</li>
<li>Not trained or don't want to give breaths? Do <b>continuous compressions</b>. That still saves lives.</li>
<li>Don't stop until help takes over, an AED tells you to stop, they start breathing normally, or you're exhausted. Swap rescuers every 2 minutes if you can.</li>
</ol>
<h3>Child (1 year to puberty)</h3>
<ul>
<li>Open the airway and give <b>5 rescue breaths</b> first, then 30 compressions to 2 breaths.</li>
<li>Push one-third of the chest depth (about 5 cm) using one or two hands.</li>
</ul>
<h3>Baby (under 1)</h3>
<ul>
<li>Keep the head neutral (don't over-tilt it). Give 5 breaths covering the mouth <i>and</i> nose.</li>
<li>Do compressions with 2 fingers on the lower half of the breastbone, about 4 cm deep, 30:2.</li>
</ul>
<div class="note">Drowning: give 5 rescue breaths before starting compressions.</div>`
  },
  {
    id: "choking", cat: "aid", title: "Choking", tags: "airway obstruction heimlich back blows abdominal thrusts food stuck",
    body: `
<p class="lead">If they can cough, speak or breathe, encourage them to <b>keep coughing</b>. Don't hit their back yet.</p>
<h3>Adult or child over 1: can't cough, speak or breathe</h3>
<ol class="steps">
<li><b>5 back blows</b>: lean them forward and hit firmly between the shoulder blades with the heel of your hand. Check their mouth after each blow.</li>
<li><b>5 abdominal thrusts</b>: stand behind them, put a fist between the belly button and the bottom of the breastbone, grab it with your other hand, and pull sharply <b>in and up</b>.</li>
<li>Keep alternating 5 back blows and 5 thrusts. Call 112 if it hasn't cleared after the first cycle.</li>
<li>If they go unresponsive, lower them to the ground, call 112, and <b>start CPR</b>.</li>
</ol>
<h3>Baby under 1</h3>
<ol class="steps">
<li>Lay the baby face-down along your forearm with the head lower than the body, supporting the jaw. Give <b>5 back blows</b>.</li>
<li>Turn the baby face-up and give <b>5 chest thrusts</b> with 2 fingers on the lower breastbone. <b>No abdominal thrusts.</b></li>
<li>Repeat. Call 112 if it hasn't cleared.</li>
</ol>
<div class="warn">Anyone who has had abdominal thrusts must be checked by a doctor afterwards.</div>
<p>On your own? Thrust your fist into your upper belly, or push your belly hard against a chair back.</p>`
  },
  {
    id: "bleeding", cat: "aid", title: "Severe bleeding", tags: "blood wound cut haemorrhage hemorrhage tourniquet pressure amputation",
    body: `
<ol class="steps">
<li>Protect yourself if you can: gloves or a plastic bag over your hand.</li>
<li><b>Press hard</b> directly on the wound with a dressing or any clean cloth. If there's nothing, use your hand.</li>
<li>Keep pressing <b>firmly for at least 10 minutes</b>. Don't lift it to check.</li>
<li>If blood soaks through, put more pads <b>on top</b> and press harder. Don't remove the first pad.</li>
<li>Bandage firmly over the pad, then check the fingers or toes beyond it are still warm and pink.</li>
<li>Lay them down and treat for <a href="#g/shock">shock</a>. Call 112.</li>
</ol>
<h3>Tourniquet (limb bleeding that is life-threatening and won't stop with pressure)</h3>
<ul>
<li>Place it <b>5–7 cm above the wound</b>, not on a joint. Go higher if you're unsure where it's coming from.</li>
<li>Tighten until the <b>bleeding stops</b>. It will hurt; that's expected.</li>
<li>Note the <b>time</b> it went on (write it on their skin). Never loosen or remove it yourself.</li>
<li>Improvised: a 5 cm-wide band of cloth, tied around the limb, with a stick through the knot twisted until the bleeding stops, then the stick tied in place. Never use thin cord or wire.</li>
</ul>
<div class="note">Object stuck in the wound? <b>Leave it in.</b> Press around it and pad either side.</div>
<div class="note">Severed part: wrap it in damp cloth, put it in a plastic bag, and keep that bag on ice. Never put the part directly on ice.</div>`
  },
  {
    id: "shock", cat: "aid", title: "Shock", tags: "pale clammy faint blood loss",
    body: `
<p class="lead">Shock means not enough blood is reaching the organs, usually from blood loss, burns or severe illness. <b>Signs:</b> pale, cold, clammy skin; fast, weak pulse; fast breathing; anxiety, confusion, thirst.</p>
<ol class="steps">
<li>Treat the cause (e.g. stop the bleeding). Call 112.</li>
<li>Lay them down. If there's no leg, hip or spine injury, raise and support their legs.</li>
<li>Loosen tight clothing. Keep them warm with a layer underneath as well as on top.</li>
<li>Give <b>nothing to eat or drink</b> (wet their lips if they're thirsty).</li>
<li>Reassure them, check their breathing often, and be ready for CPR.</li>
</ol>`
  },
  {
    id: "recovery", cat: "aid", title: "Recovery position", tags: "unconscious breathing side vomit",
    body: `
<p class="lead">Use for someone <b>unresponsive but breathing normally</b>, so their airway stays clear.</p>
<ol class="steps">
<li>Kneel beside them. Put the arm nearest you at a right angle to their body, palm up.</li>
<li>Bring their far arm across the chest and hold the back of that hand against their near cheek.</li>
<li>With your other hand, pull their far knee up so the foot is flat on the ground.</li>
<li>Pull on that knee to roll them towards you onto their side.</li>
<li>Bend the top leg so the hip and knee are at right angles. Tilt the head back so the airway stays open.</li>
<li>Check their breathing regularly. If it stops, roll them onto their back and start CPR.</li>
</ol>
<div class="note">Suspected spine injury and breathing fine? Leave them as they are and keep the head still. Only roll them if the airway is at risk (vomit), and then keep the head in line with the body.</div>`
  },
  {
    id: "heart", cat: "aid", title: "Heart attack", tags: "chest pain angina aspirin cardiac",
    body: `
<p class="lead"><b>Signs:</b> crushing chest pain or pressure that can spread to the arm, jaw, neck, back or stomach; breathlessness; sweating; nausea; grey skin. Women and older people may have only breathlessness or vague discomfort.</p>
<ol class="steps">
<li>Call 112 right away.</li>
<li>Sit them down half-sitting with knees bent and back supported, and keep them calm.</li>
<li>If they're an adult and not allergic, give <b>one 300 mg aspirin to chew slowly</b>.</li>
<li>If they have their own angina spray or tablets, help them take them.</li>
<li>Watch their breathing. If they collapse and stop breathing normally, <a href="#g/cpr">start CPR</a> and get an AED.</li>
</ol>`
  },
  {
    id: "stroke", cat: "aid", title: "Stroke (FAST)", tags: "face arm speech brain",
    body: `
<ul class="big-list">
<li><b>F</b>ace: has one side of the face dropped? Ask them to smile.</li>
<li><b>A</b>rms: can they lift both arms and keep them up?</li>
<li><b>S</b>peech: is it slurred, or can't they understand you?</li>
<li><b>T</b>ime: call 112 immediately if you see <b>any</b> one of these.</li>
</ul>
<p>Note the <b>time the symptoms started</b> and tell the paramedics, because it affects treatment. Give nothing to eat or drink. If they become unresponsive but are breathing, put them in the recovery position.</p>`
  },
  {
    id: "anaphylaxis", cat: "aid", title: "Severe allergic reaction", tags: "anaphylaxis epipen adrenaline epinephrine auto-injector swelling nuts bee",
    body: `
<p class="lead"><b>Signs:</b> swelling of the tongue or throat, difficulty breathing or wheeze, hoarse voice, faintness, pale or floppy, often with a rash or hives. It can come on within minutes.</p>
<ol class="steps">
<li>Use their <b>adrenaline auto-injector</b> immediately: press it into the <b>outer thigh</b> (through clothes is fine) and hold it as the device instructs.</li>
<li>Call 112 and say "anaphylaxis".</li>
<li>Lie them down with legs raised. If breathing is hard, let them sit up instead. <b>Don't let them stand or walk</b>, even if they feel better.</li>
<li>No improvement after <b>5 minutes</b>? Give a second auto-injector if there is one.</li>
<li>If they stop breathing normally, <a href="#g/cpr">start CPR</a>.</li>
</ol>`
  },
  {
    id: "burns", cat: "aid", title: "Burns & scalds", tags: "fire hot water chemical sunburn blister",
    body: `
<ol class="steps">
<li>Stop the burning: get them away from the heat. Clothes on fire: <b>stop, drop and roll</b>, or smother the flames with a coat.</li>
<li><b>Cool with cool running water for 20 minutes.</b> This works up to 3 hours after the burn. No ice, butter or creams.</li>
<li>While cooling, take off rings, watches and clothing near the burn, unless they're stuck to it.</li>
<li>Cover loosely with cling film laid in strips (don't wrap it round a limb) or a clean plastic bag. Don't burst blisters.</li>
<li>Keep the rest of them warm, because large burns cause hypothermia.</li>
</ol>
<div class="warn">Get medical help if the burn is bigger than their hand, on the face, hands, feet, joints or genitals, deep (white, brown or charred, or painless), caused by a chemical or electricity, or if it's a child or elderly person. Any burn around the mouth or nose, or after breathing smoke: call 112.</div>
<p><b>Chemical burns:</b> brush off any dry powder first, then rinse with plenty of water for at least 20 minutes.</p>`
  },
  {
    id: "fracture", cat: "aid", title: "Broken bones & sprains", tags: "fracture splint sling sprain ankle wrist dislocation",
    body: `
<p class="lead"><b>Signs:</b> pain, swelling, a deformed or shortened limb, not wanting to move it, a grating feeling.</p>
<ol class="steps">
<li>Keep the injury <b>still in the position you found it</b>. Don't try to straighten it.</li>
<li>Support it with your hands, padding (rolled clothes) or a sling.</li>
<li>If you have to move them, <b>splint</b> it: pad, then tie the limb to something rigid (a stick, rolled magazine or trekking pole), or tie a leg to the good leg. Immobilise the joints above and below the break.</li>
<li>Check fingers and toes beyond it: if they're cold, pale or numb, loosen the ties.</li>
<li><b>Open fracture</b> (bone through the skin): cover with a clean dressing and press <i>around</i> the bone, never on it.</li>
<li>Treat for shock and get help.</li>
</ol>
<h3>Sprain or strain</h3>
<p><b>Rest</b>, <b>Ice</b> (wrapped in cloth, 20 minutes at a time), <b>Compression</b> (a firm but not tight bandage), <b>Elevation</b>. If they can't bear weight at all, treat it as a fracture.</p>`
  },
  {
    id: "head", cat: "aid", title: "Head & spine injury", tags: "concussion neck back fall knocked out",
    body: `
<h3>Head injury</h3>
<p>Sit them down, hold a cold compress to the area, and watch them closely for 24 hours.</p>
<div class="warn"><b>Call 112</b> if there was any loss of consciousness, repeated vomiting, a worsening headache, increasing drowsiness or confusion, unequal pupils, clear fluid or blood from the nose or ears, a seizure, weakness, or slurred speech.</div>
<h3>Suspected spine injury</h3>
<p>Suspect it after a fall from height, a diving or traffic accident, or neck or back pain with tingling or weakness.</p>
<ol class="steps">
<li>Tell them not to move. Kneel at their head and hold it still, in line with the body.</li>
<li>Don't move them unless they're in danger or you need to clear their airway.</li>
<li>Call 112 and keep them warm.</li>
</ol>`
  },
  {
    id: "hypothermia", cat: "aid", title: "Hypothermia & frostbite", tags: "cold wet shivering freezing exposure",
    body: `
<p class="lead"><b>Signs:</b> shivering, pale cold skin, clumsiness, confusion, slurred speech, apathy. In <b>severe</b> cases they stop shivering and become drowsy.</p>
<ol class="steps">
<li>Get them out of the wind and wet. Insulate them from the ground.</li>
<li>Replace wet clothes with dry ones. Cover the head, and wrap them in a sleeping bag, blankets or a survival bag.</li>
<li>Share body heat inside a sleeping bag if that's all you have.</li>
<li>If they're <b>fully alert and can swallow</b>, give warm sweet drinks and high-energy food. <b>No alcohol.</b></li>
<li>Handle them <b>gently</b>. Don't rub their limbs or put them in a hot bath.</li>
<li>Severe (no shivering, confused, drowsy): call 112. Check breathing for up to a minute before starting CPR.</li>
</ol>
<h3>Frostbite</h3>
<p>Skin goes white or grey, hard and numb. Warm it against the body (e.g. in an armpit) or in warm water at about 40 °C. Don't rub it, and <b>don't thaw it if it might refreeze</b>. Don't burst blisters.</p>`
  },
  {
    id: "heat", cat: "aid", title: "Heat exhaustion & heatstroke", tags: "hot sun overheating temperature dehydration",
    body: `
<h3>Heat exhaustion</h3>
<p><b>Signs:</b> headache, dizziness, nausea, heavy sweating, cramps, weakness. Move them somewhere cool, lie them down with legs raised, and give water or a rehydration drink (see <a href="#g/ors">rehydration</a>). They should improve within 30 minutes.</p>
<h3>Heatstroke: life-threatening</h3>
<p><b>Signs:</b> hot skin (may be dry), temperature above 40 °C, <b>confusion</b>, odd behaviour, collapse, seizure.</p>
<ol class="steps">
<li>Call 112.</li>
<li><b>Cool them fast.</b> Immersion in cold water is best. Otherwise soak them with water and fan hard, with cold packs on the neck, armpits and groin.</li>
<li>Keep cooling until they're alert or help arrives. If they become unresponsive but are breathing, put them in the recovery position.</li>
</ol>`
  },
  {
    id: "ors", cat: "aid", title: "Dehydration & rehydration drink", tags: "ors oral rehydration salts diarrhoea diarrhea vomiting sugar salt",
    body: `
<p class="lead"><b>Signs:</b> thirst, dark urine or little urine, headache, dizziness, dry mouth.</p>
<div class="card-in">
<h3>Home rehydration drink (WHO recipe)</h3>
<ul>
<li><b>1 litre</b> of safe water</li>
<li><b>6 level teaspoons</b> of sugar</li>
<li><b>½ level teaspoon</b> of salt</li>
</ul>
<p>Stir until dissolved and sip often. It should taste <b>no saltier than tears</b>.</p>
</div>
<p>After diarrhoea, an adult needs roughly 1 cup (250 ml) after each loose stool, on top of normal drinking.</p>
<div class="warn">Get help for blood in the stool, no urine for 8 hours or more, drowsiness, or a baby or young child who is getting worse.</div>`
  },
  {
    id: "seizure", cat: "aid", title: "Seizure", tags: "fit epilepsy convulsion",
    body: `
<ol class="steps">
<li>Move away anything they could hit, and cushion their head.</li>
<li><b>Don't hold them down</b>, and <b>never put anything in their mouth</b>.</li>
<li><b>Time it.</b></li>
<li>When the jerking stops, check their breathing and put them in the recovery position. Stay with them while they recover.</li>
</ol>
<div class="warn">Call 112 if it lasts more than 5 minutes, it's their first seizure, another one follows, they're injured or in water, or they don't breathe normally afterwards.</div>`
  },
  {
    id: "asthma", cat: "aid", title: "Asthma attack", tags: "breathing wheeze inhaler",
    body: `
<ol class="steps">
<li>Sit them <b>upright</b> and leaning slightly forward. Keep them calm and loosen tight clothing.</li>
<li>Give their <b>reliever inhaler</b> (usually blue): <b>1 puff every 30–60 seconds, up to 10 puffs</b>, with a spacer if they have one.</li>
<li>If they're no better, or you're worried at any point, call 112.</li>
<li>If help hasn't arrived within 10 minutes, repeat the 10 puffs.</li>
</ol>
<div class="warn">Call 112 straight away if they can't speak, are getting tired, or their lips are turning blue.</div>`
  },
  {
    id: "hypo", cat: "aid", title: "Low blood sugar (diabetes)", tags: "hypo hypoglycaemia diabetic insulin sugar",
    body: `
<p class="lead"><b>Signs:</b> shaky, sweaty, pale, hungry, confused or irritable, odd behaviour that can look like drunkenness.</p>
<ol class="steps">
<li>If they're conscious and can swallow, give <b>fast sugar</b>: glucose tablets, about 150 ml of non-diet fizzy drink or fruit juice, or sweets. Aim for 15–20 g of sugar.</li>
<li>Wait 10–15 minutes. Give more sugar if they're not better.</li>
<li>Once they've improved, give a starchy snack (bread, biscuits).</li>
<li>If they're drowsy or can't swallow safely, give nothing by mouth. Put them in the recovery position and call 112.</li>
</ol>`
  },
  {
    id: "bites", cat: "aid", title: "Bites & stings", tags: "snake bee wasp tick dog animal venom spider jellyfish",
    body: `
<h3>Snake bite</h3>
<ol class="steps">
<li>Keep them <b>still and calm</b>, because movement spreads venom. Call 112.</li>
<li>Take off rings and watches, and keep the bitten limb still and at about heart level.</li>
<li><b>Don't</b> cut the bite, suck it, apply ice, or use a tourniquet.</li>
<li>Remember what the snake looked like (photo it only if it's safe). Don't try to catch it.</li>
</ol>
<p class="small">In Australia, a firm pressure bandage over the whole limb plus a splint is recommended. Elsewhere, follow local advice.</p>
<h3>Bee or wasp sting</h3>
<p>Scrape a bee sting out sideways with a fingernail or card. Apply a cold compress. Watch for a <a href="#g/anaphylaxis">severe allergic reaction</a>.</p>
<h3>Tick</h3>
<p>Use fine tweezers or a tick tool. Grip it <b>close to the skin</b> and pull straight out with steady pressure, without twisting or squeezing. Clean the area. Note the date, and get medical advice if a rash spreading outwards or flu-like symptoms appear in the following weeks.</p>
<h3>Animal bite</h3>
<p>Wash with soap and running water for 5 minutes, control any bleeding, and cover. Get medical advice: bites often get infected, and you may need a tetanus or rabies jab.</p>
<h3>Jellyfish</h3>
<p>Rinse with <b>seawater</b> (not fresh water) and pick off tentacles with gloves or tweezers. Then soak in hot water (as hot as is comfortable) for 20 minutes.</p>`
  },
  {
    id: "wounds", cat: "aid", title: "Cuts, wounds & infection", tags: "graze clean dressing infection tetanus",
    body: `
<ol class="steps">
<li>Stop the bleeding with pressure.</li>
<li>Rinse the wound under <b>clean running water</b> (drinkable quality) until there's no visible dirt.</li>
<li>Cover it with a clean dressing. Close the edges with adhesive strips only if the wound is clean.</li>
<li>Change the dressing daily and keep it clean and dry.</li>
</ol>
<div class="warn"><b>Infection signs:</b> spreading redness, heat, swelling, pus, a red streak running up the limb, or fever. Get medical help, because a spreading infection needs antibiotics.</div>`
  },
  {
    id: "nosebleed", cat: "aid", title: "Nosebleed", tags: "nose blood",
    body: `
<ol class="steps">
<li>Sit them down, leaning <b>forward</b> (not back).</li>
<li>Pinch the <b>soft part</b> of the nose for <b>10–15 minutes</b> without letting go. Breathe through the mouth.</li>
<li>Bleeding after 30 minutes, or after a head injury? Get medical help.</li>
</ol>`
  },
  {
    id: "eye", cat: "aid", title: "Eye injury", tags: "chemical eye something in eye",
    body: `
<p><b>Chemical in the eye:</b> rinse with clean water for at least <b>20 minutes</b>, injured eye downwards so the water doesn't run into the other eye. Get medical help.</p>
<p><b>Grit:</b> blink and rinse with clean water. Don't rub.</p>
<p><b>Something stuck in the eye:</b> don't remove it. Cover both eyes (this stops them moving) and get help.</p>`
  },
  {
    id: "poison", cat: "aid", title: "Poisoning", tags: "swallowed overdose toxic mushroom berry fumes carbon monoxide",
    body: `
<ol class="steps">
<li>Find out <b>what</b>, <b>how much</b>, and <b>when</b>. Keep the packaging.</li>
<li>Call 112 or the poison line.</li>
<li><b>Don't make them vomit.</b></li>
<li>Corrosive substance on the lips: give small sips of water or milk.</li>
<li>Fumes or carbon monoxide: get them into fresh air if it's safe for you to go in.</li>
<li>If they're unresponsive but breathing, put them in the recovery position. If they're not breathing, start CPR. Use a face shield if the poison is around their mouth.</li>
</ol>`
  },
  {
    id: "drowning", cat: "aid", title: "Drowning & water rescue", tags: "water rescue swimming river sea",
    body: `
<p class="lead"><b>Reach, throw, don't go.</b> Most would-be rescuers who go in become casualties themselves.</p>
<ol class="steps">
<li><b>Reach</b> them with a stick, branch or clothing while lying flat on the bank.</li>
<li><b>Throw</b> anything that floats (a ball, cool box, empty bottle or bag), or a rope.</li>
<li>Call 112.</li>
<li>Once they're out: if they're not breathing normally, give <b>5 rescue breaths, then CPR</b>.</li>
<li>Even if they seem fine, they need medical checks. Keep them warm.</li>
</ol>
<div class="note">If <b>you</b> fall into cold water: <b>Float</b> on your back for 60–90 seconds until the cold shock passes and you get your breathing under control. Then call for help or swim to safety.</div>`
  },
  {
    id: "electric", cat: "aid", title: "Electric shock", tags: "electricity electrocution power line lightning",
    body: `
<ol class="steps">
<li><b>Don't touch them</b> until the power is off. Switch it off at the mains, or move the source away with something dry and non-conducting such as wood.</li>
<li>High-voltage lines: stay at least <b>18 m</b> away and call 112.</li>
<li>Once it's safe: check their breathing and start CPR if needed. Cool any burns.</li>
</ol>
<p><b>Lightning:</b> casualties are safe to touch. Start CPR straight away if needed. In a storm, get off high ground and away from tall isolated trees. Crouch low on an insulating mat with your feet together.</p>`
  },

  // ---------------- WATER ----------------
  {
    id: "water-basics", cat: "water", title: "How much & what not to drink", tags: "water needs per day seawater urine alcohol",
    body: `
<ul>
<li>You need about <b>2–4 litres a day</b>, and much more in heat or with hard effort. A person can survive about <b>3 days</b> without water.</li>
<li>Ration <b>sweat, not water</b>: rest in shade, move at night, keep your clothes on. Don't hold back on drinking water you have.</li>
<li><b>Never drink</b> seawater, urine, alcohol or blood. They all dehydrate you faster.</li>
<li>Eating dry food uses water, so if water is short, eat less.</li>
<li>Melt snow before you eat it: eating it raw drops your core temperature.</li>
</ul>`
  },
  {
    id: "water-find", cat: "water", title: "Finding water", tags: "source river stream rain dew solar still",
    body: `
<ul>
<li><b>Rain</b> is the safest source. Catch it with a tarp, bin bags or jackets funnelled into a container.</li>
<li>Flowing water (springs, streams) is better than still water. Collect <b>upstream</b> of farms, villages and animal tracks.</li>
<li>Follow valleys downhill, green vegetation, insects, birds flying low and straight at dawn or dusk, and animal trails that converge.</li>
<li>Dig on the <b>outside bend</b> of a dry riverbed, at the lowest point. Water may seep into the hole.</li>
<li>Collect <b>dew</b> at dawn by wiping grass with a cloth and wringing it out.</li>
<li>A plastic bag tied over a leafy branch in sun collects water from the plant. Avoid poisonous plants.</li>
</ul>
<div class="warn">Avoid water with dead animals nearby, no plants growing around it, oily scum, foam, or a strong smell. It may be toxic, and boiling won't fix chemical pollution.</div>`
  },
  {
    id: "water-boil", cat: "water", title: "Boiling (most reliable)", tags: "boil purify disinfect",
    body: `
<p class="lead">Boiling kills bacteria, viruses and parasites. It is the <b>most reliable</b> method.</p>
<ol class="steps">
<li>If the water is cloudy, let it settle and strain it through cloth first (see <a href="#g/water-filter">filtering</a>).</li>
<li>Bring it to a <b>rolling boil for 1 minute</b>.</li>
<li>Above <b>2,000 m</b> altitude: boil for <b>3 minutes</b>.</li>
<li>Cool it covered. Pouring it between two clean containers improves the flat taste.</li>
</ol>
<p class="small">No pot? You can boil water in a plastic bottle or a paper or birch-bark container held just above the coals, not in the flames, as long as it's full of water. Or drop fire-heated stones (not from a riverbed, since they can explode) into a container of water.</p>
<div class="warn">Boiling doesn't remove chemicals, fuel or heavy metals.</div>`
  },
  {
    id: "water-chem", cat: "water", title: "Bleach, iodine & tablets", tags: "chlorine bleach iodine tablets chemical disinfect",
    body: `
<h3>Household bleach (unscented, 5–9% sodium hypochlorite)</h3>
<table>
<tr><th>Water</th><th>Clear</th><th>Cloudy / very cold</th></tr>
<tr><td>1 litre</td><td>2 drops</td><td>4 drops</td></tr>
<tr><td>5 litres</td><td>10 drops (≈½ ml)</td><td>20 drops (≈1 ml)</td></tr>
<tr><td>20 litres</td><td>½ teaspoon (2.5 ml)</td><td>1 teaspoon (5 ml)</td></tr>
</table>
<ol class="steps">
<li>Mix and wait <b>30 minutes</b>.</li>
<li>It should smell <b>slightly of chlorine</b>. If it doesn't, add the same dose again and wait another 15 minutes.</li>
</ol>
<p class="small">Never use scented, "splash-less", colour-safe or thickened bleach, or bleach with added cleaners.</p>
<h3>Iodine (2% tincture)</h3>
<p>5 drops per litre (10 if cloudy or cold). Wait 30 minutes. Not for pregnant women, people with thyroid problems, or long-term use.</p>
<h3>Purification tablets</h3>
<p>Follow the packet. Most take 30 minutes, and chlorine dioxide tablets take up to 4 hours to kill parasites. Keep some in your kit.</p>
<div class="note">Chlorine and iodine <b>don't reliably kill <i>Cryptosporidium</i></b>, a parasite. If you can, boil, or filter (1 micron or finer) then disinfect.</div>`
  },
  {
    id: "water-filter", cat: "water", title: "Filtering & improvised filter", tags: "filter sand charcoal cloth sediment settle muddy",
    body: `
<p class="lead">Filtering <b>clears</b> water but an improvised filter doesn't make it <b>safe</b>. Always boil or disinfect afterwards.</p>
<h3>Quick pre-filter</h3>
<p>Let the water stand so dirt settles, then pour it off the top through a folded cotton cloth, bandana or sock.</p>
<h3>Layered filter (bottle or sock)</h3>
<ol class="steps">
<li>Cut the bottom off a plastic bottle, keep the cap on, and make small holes in the cap. Turn it upside down.</li>
<li>Layer from the bottom up: cloth, then <b>crushed charcoal</b> from your fire (not ash), then fine sand, then coarse sand, then gravel.</li>
<li>Pour water through slowly. Throw away the first lot that comes out.</li>
<li><b>Then boil or disinfect.</b></li>
</ol>
<h3>Commercial filters</h3>
<p>Pump and squeeze filters (0.1–0.2 micron) remove bacteria and parasites but <b>not viruses</b>. Where there are people or livestock upstream, add chlorine or boil as well.</p>`
  },
  {
    id: "water-sodis", cat: "water", title: "Sun disinfection (SODIS)", tags: "sun uv bottle solar",
    body: `
<p class="lead">UV light from the sun can disinfect clear water when you have no fuel or chemicals.</p>
<ol class="steps">
<li>Use <b>clear PET plastic bottles</b> (2 litres or smaller) with labels removed. Glass blocks UV.</li>
<li>Water must be <b>clear</b> (you should be able to read print through the bottle). Filter it first if needed.</li>
<li>Fill it three-quarters, shake for 20 seconds to add oxygen, then fill to the top.</li>
<li>Lay it on its side on a reflective or dark surface (tin, a roof) in <b>full sun for 6 hours</b>.</li>
<li>Cloudy sky: leave it <b>2 days</b>. Heavy rain or overcast: this method isn't reliable.</li>
</ol>`
  },

  // ---------------- KNOTS ----------------
  {
    id: "knot-bowline", cat: "knots", title: "Bowline: fixed loop", tags: "loop rescue mooring",
    body: `
<p class="lead">A loop that <b>won't slip or tighten</b> under load, and is easy to untie afterwards. Use it to put a loop round a person, tree or post, or for mooring.</p>
<ol class="steps">
<li>Make a small loop in the rope, with the working end lying <b>on top</b> of the standing part. ("The rabbit hole.")</li>
<li>Pass the end <b>up through</b> the small loop from underneath. ("The rabbit comes out of the hole.")</li>
<li>Take it <b>around behind</b> the standing part. ("Round the tree.")</li>
<li>Pass it <b>back down</b> through the small loop. ("Back down the hole.")</li>
<li>Hold the end and the side of the big loop together and pull the standing part to tighten.</li>
</ol>
<div class="note">Leave a tail at least 10 times the rope's thickness. It can shake loose when it isn't loaded, so add a half hitch with the tail for safety.</div>`
  },
  {
    id: "knot-eight", cat: "knots", title: "Figure-eight & figure-eight loop", tags: "stopper climbing loop follow through",
    body: `
<h3>Figure-eight stopper</h3>
<p>Stops a rope pulling through a hole or pulley.</p>
<ol class="steps">
<li>Make a loop by crossing the end <b>over</b> the standing part.</li>
<li>Take the end <b>around behind</b> the standing part.</li>
<li>Pass it <b>down through</b> the loop from the front. It looks like an 8. Pull tight.</li>
</ol>
<h3>Figure-eight loop (on a bight)</h3>
<p>A very strong, secure fixed loop. Easy to check by eye.</p>
<ol class="steps">
<li>Double the rope to form a bight (a U shape).</li>
<li>Tie a figure-eight with the doubled rope. The bight becomes your loop.</li>
</ol>
<h3>Figure-eight follow-through</h3>
<p>Tie a loose figure-eight in a single strand, pass the end around the anchor (or a harness), then <b>retrace</b> the eight exactly, running parallel to the first strand. Dress it so the strands lie neat and don't cross.</p>`
  },
  {
    id: "knot-clove", cat: "knots", title: "Clove hitch", tags: "post pole tie off hitch lashing",
    body: `
<p class="lead">A fast, adjustable hitch for tying a line to a pole or post, and the start of most lashings.</p>
<ol class="steps">
<li>Wrap the end around the post.</li>
<li>Cross it <b>over</b> its own standing part and wrap around the post again.</li>
<li>Tuck the end <b>under that second wrap</b>, alongside the first. Both ends now leave in opposite directions from under the X.</li>
<li>Pull both ends tight.</li>
</ol>
<div class="note">It can work loose if the post turns or the load shifts. Add two half hitches for anything that matters.</div>`
  },
  {
    id: "knot-halfhitch", cat: "knots", title: "Round turn & two half hitches", tags: "tie rope tree ring anchor secure",
    body: `
<p class="lead">The go-to knot for tying a rope securely to a tree, ring, rail or bag. It holds well and can be untied even under load.</p>
<ol class="steps">
<li>Wrap the end <b>twice</b> around the anchor (the round turn). This takes the strain.</li>
<li>Take the end over the standing part and through the gap you've made: one half hitch.</li>
<li>Repeat <b>in the same direction</b>: the second half hitch.</li>
<li>Slide the hitches up snug against the anchor.</li>
</ol>`
  },
  {
    id: "knot-taut", cat: "knots", title: "Taut-line hitch", tags: "tent guy line adjustable tarp tension",
    body: `
<p class="lead">An adjustable loop that grips. Ideal for tent and tarp guy lines: slide it to tighten and it holds.</p>
<ol class="steps">
<li>Pass the end around the peg or anchor and bring it back alongside the standing part.</li>
<li>Wrap it <b>twice</b> around the standing part, working <b>back towards the anchor</b> (inside the loop).</li>
<li>Take it across and wrap it <b>once more</b> around the standing part <b>outside</b> those two turns (further from the anchor).</li>
<li>Tuck the end under that last wrap and pull it snug.</li>
<li>Slide the knot up the line to tension it.</li>
</ol>`
  },
  {
    id: "knot-reef", cat: "knots", title: "Reef (square) knot", tags: "bandage sling join tie off",
    body: `
<p class="lead">Lies flat. Use it for <b>bandages, slings</b> and tying bundles.</p>
<ol class="steps">
<li><b>Right over left</b> and tuck under.</li>
<li><b>Left over right</b> and tuck under.</li>
<li>Check it: each loop should come out on the same side as its own end. If it doesn't, you've tied a "granny" knot, which slips.</li>
</ol>
<div class="warn">Don't use a reef knot to join two ropes that will carry a load. It can roll apart. Use a sheet bend instead.</div>`
  },
  {
    id: "knot-sheet", cat: "knots", title: "Sheet bend: join two ropes", tags: "join connect two ropes different thickness bend",
    body: `
<p class="lead">The best simple way to <b>join two ropes</b>, even ones of different thickness.</p>
<ol class="steps">
<li>Bend the <b>thicker</b> rope into a U (a bight).</li>
<li>Pass the thinner rope's end <b>up through</b> the U from underneath.</li>
<li>Take it <b>around behind both legs</b> of the U.</li>
<li>Tuck it <b>under itself</b> (not under the U), across the front of the bight.</li>
<li>Pull tight. Both short ends should be on the <b>same side</b>.</li>
</ol>
<div class="note">For slippery or very different-sized ropes, make it a <b>double sheet bend</b> by taking the end around the U twice before the final tuck.</div>`
  },
  {
    id: "knot-trucker", cat: "knots", title: "Trucker's hitch", tags: "tension tighten load tie down ridgeline tarp pulley",
    body: `
<p class="lead">Lets you pull a line <b>very tight</b> with a 3:1 pulley effect. Use it for ridgelines, lashing loads, or a casualty stretcher.</p>
<ol class="steps">
<li>Tie one end to a fixed anchor.</li>
<li>Partway along the standing part, make a fixed loop: twist in a small loop, push a bight of the rope through it, and pull it tight (a slipped overhand loop).</li>
<li>Pass the free end around the second anchor and <b>back up through your loop</b>.</li>
<li>Pull down on the free end to tension the line.</li>
<li>Hold it tight and secure it with <b>two half hitches</b> just below the loop.</li>
</ol>`
  },
  {
    id: "knot-prusik", cat: "knots", title: "Prusik hitch", tags: "friction grip climb ascend rope cord",
    body: `
<p class="lead">A loop of <b>thinner cord</b> wrapped round a thicker rope that <b>grips when pulled</b> and slides when it isn't. Use it to climb a rope, as a sliding attachment point, or as a backup.</p>
<ol class="steps">
<li>Tie a loop of thinner cord (about two-thirds the rope's diameter) using a double fisherman's or a figure-eight bend.</li>
<li>Lay the loop behind the main rope and pass the far end through the near end, wrapping around the rope.</li>
<li>Repeat so there are <b>3 wraps</b> going through the inside of the loop each time.</li>
<li>Dress the wraps neatly side by side and pull the loop out from the middle.</li>
<li>Load it to test the grip. To slide it, push the wraps along, not the loop.</li>
</ol>`
  },
  {
    id: "knot-timber", cat: "knots", title: "Timber hitch", tags: "log drag pull wood bundle",
    body: `
<p class="lead">Use it to <b>drag a log</b> or bundle of poles, or to start a lashing. It grips tighter as you pull and falls apart easily afterwards.</p>
<ol class="steps">
<li>Pass the end around the log.</li>
<li>Wrap it once around its own standing part.</li>
<li>Twist the end around <b>itself</b> (the part going around the log) <b>3 or more times</b>.</li>
<li>Pull the standing part so the wraps bite. For dragging, add a half hitch near the front end of the log.</li>
</ol>`
  },

  // ---------------- SURVIVAL ----------------
  {
    id: "priorities", cat: "survive", title: "Priorities: STOP & the rule of 3s", tags: "lost stranded what to do first plan",
    body: `
<h3>STOP</h3>
<ul class="big-list">
<li><b>S</b>top: sit down, breathe, and don't wander further.</li>
<li><b>T</b>hink: who knows where you are? What do you have?</li>
<li><b>O</b>bserve: weather, terrain, daylight left, injuries, resources.</li>
<li><b>P</b>lan: decide, then act.</li>
</ul>
<h3>Rule of 3s (rough survival limits)</h3>
<table>
<tr><td>3 minutes</td><td>without air (or with severe bleeding)</td></tr>
<tr><td>3 hours</td><td>without shelter in harsh weather</td></tr>
<tr><td>3 days</td><td>without water</td></tr>
<tr><td>3 weeks</td><td>without food</td></tr>
</table>
<p>So the order is: <b>first aid → shelter and warmth → signal for rescue → water → food</b>.</p>
<div class="note"><b>If someone knows your route, stay put.</b> Searchers find people who stay in one place much faster. Before any trip, tell someone your route and when you'll be back.</div>`
  },
  {
    id: "signals", cat: "survive", title: "Rescue signals", tags: "sos signal mirror whistle fire smoke helicopter ground to air",
    body: `
<p class="lead">Anything in <b>threes</b> means distress: 3 whistle blasts, 3 fires in a triangle, 3 flashes.</p>
<a class="btn" href="#tools">Open SOS torch / whistle</a>
<h3>Whistle</h3>
<p>Blow <b>6 blasts</b> (the mountain distress signal) or 3, wait a minute, then repeat. A whistle carries much further than your voice and uses far less energy.</p>
<h3>Ground-to-air signals</h3>
<p>Make them at least 3 m (10 ft) tall in an open area, with good contrast: rocks on snow, cleared ground, branches on grass.</p>
<table>
<tr><th>Symbol</th><th>Meaning</th></tr>
<tr><td class="sym">V</td><td>Need assistance</td></tr>
<tr><td class="sym">X</td><td>Need medical help</td></tr>
<tr><td class="sym">N</td><td>No</td></tr>
<tr><td class="sym">Y</td><td>Yes</td></tr>
<tr><td class="sym">→</td><td>Travelling this way</td></tr>
<tr><td class="sym">SOS</td><td>Help</td></tr>
</table>
<h3>To a helicopter</h3>
<p><b>Both arms raised in a Y</b> = "Yes, need help". One arm up and one down (an N) = "No, don't need help".</p>
<h3>Signal mirror (or phone screen, CD, foil)</h3>
<ol class="steps">
<li>Hold out your other hand in a V and line it up on the target.</li>
<li>Catch the sun with the mirror so the spot of light hits your V, then sweep it slowly across the target.</li>
</ol>
<h3>Fire & smoke</h3>
<p>Use dark smoke (rubber, oil) against snow or sky, and white smoke (green leaves, damp moss on the fire) against forest. At night, use a bright flame.</p>`
  },
  {
    id: "phone", cat: "survive", title: "Make your phone last & get through", tags: "battery signal sms text 112 emergency call coverage satellite",
    body: `
<ul>
<li><b>112</b> works across Europe and on most GSM phones worldwide. It can use any network that has coverage, not only yours.</li>
<li>Weak signal? <b>Send a text</b>. It often gets through when a call can't. In many countries you can text 112 or 999, sometimes only after registering for the service.</li>
<li>Newer iPhones and Pixels can send <b>emergency SOS by satellite</b> with no signal. You need a clear view of the sky.</li>
<li>Save battery: switch on <b>airplane mode</b> and low-power mode, turn screen brightness down, and close apps. Switch it on every hour or so to check for signal.</li>
<li>Climb higher, to a ridge, for signal. Valleys and forests block it.</li>
<li>Keep the phone <b>warm</b> (inside your jacket), because cold drains the battery.</li>
<li>Share your coordinates by text from the <a href="#tools">Tools tab</a>. GPS works without signal.</li>
</ul>`
  },
  {
    id: "shelter", cat: "survive", title: "Shelter & staying warm", tags: "cold shelter tarp lean-to debris hut bivvy hypothermia",
    body: `
<ul>
<li><b>Get off the ground.</b> You lose most heat into cold earth. Lie on a deep layer of branches, leaves, a pack, or rope coiled underneath you.</li>
<li><b>Get out of the wind and wet.</b> Use the lee side of rocks, fallen trees or dense evergreens. Avoid valley floors (cold air pools there), dry riverbeds (flash floods), and spots under dead branches.</li>
<li><b>Small is warm.</b> Make the shelter only just big enough to lie in.</li>
<li><b>Lean-to:</b> tie a ridge pole between two trees, lean branches against it on the windward side, and pile leaves and evergreen boughs thickly on top.</li>
<li><b>Debris hut:</b> prop a ridge pole on a stump at one end, add ribs of sticks along both sides, then pile on <b>an arm's length</b> of leaves. Fill the inside with dry leaves too.</li>
<li><b>Tarp:</b> run a ridgeline between trees with a trucker's hitch, then drape the tarp over it and peg the sides down low.</li>
<li>Keep clothing <b>dry</b>: take layers off before you sweat. Wear a hat. Huddle together.</li>
</ul>`
  },
  {
    id: "fire", cat: "survive", title: "Making fire", tags: "fire tinder kindling ferro rod lighter matches",
    body: `
<ol class="steps">
<li>Find a sheltered spot. Clear the ground and build on a base of rocks or green logs if it's wet or snowy.</li>
<li>Gather everything <b>before</b> lighting:
  <ul>
  <li><b>Tinder</b> (catches a spark): dry grass, birch bark, cotton wool with petroleum jelly, pine resin, dry pine needles, fluff from inside dead plant stems.</li>
  <li><b>Kindling</b>: dead twigs from matchstick to pencil thickness. Snap them: if they crack, they're dry. Take them from standing dead wood, not the ground.</li>
  <li><b>Fuel</b>: wrist-thick, then larger dead wood.</li>
  </ul></li>
<li>Light the tinder, then add the thinnest kindling in a small teepee over it. Blow <b>gently</b> at the base.</li>
<li>Build up gradually. Too much wood too soon smothers the fire.</li>
</ol>
<p class="small">Wet weather: split dead wood to get at the dry inside. Make feather sticks by shaving thin curls down a stick without cutting them off.</p>
<div class="warn">Never light a fire inside a closed shelter or tent: carbon monoxide kills. Put fires out completely by drowning, stirring, and drowning again.</div>`
  },
  {
    id: "navigate", cat: "survive", title: "Finding direction without a compass", tags: "north south navigation sun shadow stick watch stars polaris southern cross",
    body: `
<h3>Shadow stick (any time with sun)</h3>
<ol class="steps">
<li>Push a stick upright into flat ground. Mark the tip of its shadow with a stone.</li>
<li>Wait 15–20 minutes and mark the new tip.</li>
<li>A line from the first mark to the second runs roughly <b>West → East</b>.</li>
</ol>
<h3>Analogue watch (northern hemisphere)</h3>
<p>Point the <b>hour hand at the sun</b>. Halfway between the hour hand and 12 is roughly <b>south</b>. (Use 1 instead of 12 during summer time.) In the southern hemisphere, point 12 at the sun; halfway between 12 and the hour hand is roughly north.</p>
<h3>Stars</h3>
<ul>
<li><b>North:</b> the two end stars of the Plough (Big Dipper) point to <b>Polaris</b>, the North Star.</li>
<li><b>South (southern hemisphere):</b> extend the long axis of the <b>Southern Cross</b> about 4.5 times its length and drop straight down to the horizon.</li>
</ul>
<p>The sun rises roughly in the east and sets roughly in the west.</p>
<div class="note">Lost? Following water <b>downstream</b> usually leads to roads and people, but beware of cliffs and waterfalls.</div>`
  },
  {
    id: "food", cat: "survive", title: "Food in the wild", tags: "eat foraging plants berries edible",
    body: `
<p class="lead">Food matters least: you can last <b>weeks</b>. Don't risk poisoning yourself.</p>
<ul>
<li><b>Never eat wild mushrooms</b> unless you're an expert. Some kill, and the symptoms show only after a day.</li>
<li>Avoid white or yellow berries, plants with milky sap, umbrella-shaped flower heads (a family that includes hemlock), and anything that smells of almonds.</li>
<li>Safer options: fish, insects (cooked, and avoid brightly coloured ones), and plants you know well, such as nettles (boiled), blackberries, dandelion and clover.</li>
<li>Cook everything you can. Don't eat if you have no water.</li>
</ul>`
  },
  {
    id: "morse", cat: "survive", title: "Morse code", tags: "sos morse dots dashes flash",
    body: `<p class="lead">SOS = <b class="mono">··· ––– ···</b>. A dash is 3 times as long as a dot. Leave a 3-dot gap between letters and a 7-dot gap between words.</p>
<a class="btn" href="#tools">Flash a message from Tools</a>
<div id="morse-table" class="morse-grid"></div>`
  },
  // ---------------- FIELD MANUAL (adapted from US Army FM 21-76 / FM 3-05.70, public domain) ----------------
  {
    id: "fm-mindset", cat: "field", title: "Survival mindset: S.U.R.V.I.V.A.L.", tags: "psychology fear panic stress morale will to live",
    body: `
<p class="lead">The manual's first lesson is that attitude decides survival more than kit does. Each letter is one rule.</p>
<ul class="big-list">
<li><b>S</b>ize up the situation: your surroundings, your physical condition, and your equipment.</li>
<li><b>U</b>se all your senses. Undue haste makes waste: rushing causes injuries and lost kit.</li>
<li><b>R</b>emember where you are: keep track of your position and landmarks at all times.</li>
<li><b>V</b>anquish fear and panic: name the fear, then make a plan. Having a task calms you down.</li>
<li><b>I</b>mprovise: everything can be used for something else (bin bag → shelter, poncho or water catcher).</li>
<li><b>V</b>alue living: decide you <i>will</i> get out. Stubbornness keeps people alive.</li>
<li><b>A</b>ct like the natives: watch how local people and animals find water, food and shelter.</li>
<li><b>L</b>ive by your wits, but for now, learn basic skills: practise <i>before</i> you need them.</li>
</ul>
<div class="note">Expect fear, anger, loneliness, depression and fatigue. They're normal. Keep a routine: shelter jobs, fire, water, rest. Talk to others in your group, or to yourself.</div>`
  },
  {
    id: "fm-kit", cat: "field", title: "What to carry: survival kit", tags: "kit pack gear tin checklist equipment",
    body: `
<p class="lead">Build a small kit you <b>always</b> carry (a tin or pouch), plus a bigger one in the car or pack. Every item should have a job.</p>
<table>
<tr><th>Need</th><th>Items</th></tr>
<tr><td>Fire</td><td>Lighter, waterproof matches, ferro rod, cotton wool with petroleum jelly, candle</td></tr>
<tr><td>Water</td><td>Purification tablets, a strong plastic bag or collapsible bottle, a metal cup to boil in</td></tr>
<tr><td>Shelter</td><td>Foil survival bag or blanket, a large bin bag or poncho, 10–15 m of cord</td></tr>
<tr><td>Signal</td><td>Whistle, signal mirror, head torch with spare batteries, power bank</td></tr>
<tr><td>Navigation</td><td>Button compass, map of the area</td></tr>
<tr><td>First aid</td><td>Plasters, dressings, tape, painkillers, your own medicines, blister kit, tourniquet if trained</td></tr>
<tr><td>Food</td><td>High-energy bars, a small fishing kit (hooks, line), brass snare wire</td></tr>
<tr><td>Tools</td><td>Knife or multitool, needle and thread, safety pins, duct tape wrapped round a pencil or bottle</td></tr>
</table>
<p class="small">Check it twice a year: batteries, expiry dates, lighter fuel.</p>`
  },
  {
    id: "fm-water-plants", cat: "field", title: "Water from plants & a solar still", tags: "vine bamboo coconut banana solar still transpiration bag desert",
    body: `
<h3>Solar still</h3>
<ol class="steps">
<li>Dig a bowl-shaped hole about <b>90 cm across and 60 cm deep</b> in a spot that gets sun most of the day. Damp ground (e.g. a dry riverbed) works best.</li>
<li>Dig a small sump in the centre and put a container in it.</li>
<li>Optional: put green leaves, or urine or salt water in a separate container, around the cup (not in it). The sun turns it into clean vapour.</li>
<li>Cover the hole with clear plastic sheeting and seal the edges with soil.</li>
<li>Put a small stone in the centre so the plastic forms a cone about 40 cm deep, with its lowest point directly over the cup.</li>
<li>Water condenses under the plastic and drips into the cup. Expect only about <b>0.5–1 litre in 24 hours</b>. Digging in heat costs sweat, so only build one if you'll stay put.</li>
</ol>
<h3>Transpiration bag</h3>
<p>Tie a clear plastic bag over a leafy branch in full sun, with a small stone in the lowest corner. Water collects within a few hours. Move it to a fresh branch each day. <b>Don't use poisonous plants.</b></p>
<h3>Plants that hold water</h3>
<ul>
<li><b>Water vines</b> (tropics): cut a notch high up, then cut the vine off near the ground and let it drain into your mouth or a container. Don't drink it if it's milky, sticky or bitter.</li>
<li><b>Green bamboo</b>: bend a stalk over, tie it down, cut off the tip, and leave a container underneath overnight. Old cracked bamboo can hold water inside: shake it and listen.</li>
<li><b>Green coconuts</b>: the milk is safe and refreshing. Milk from ripe brown coconuts is a laxative, so drink only a little.</li>
<li><b>Banana or plantain</b>: cut the trunk down to a 30 cm stump and scoop out a bowl. The roots refill it with water. Throw away the first 3 fillings because they're bitter.</li>
</ul>`
  },
  {
    id: "fm-fire-nomatch", cat: "field", title: "Fire without matches", tags: "bow drill ferro rod flint steel lens battery steel wool char cloth friction",
    body: `
<p class="lead">Prepare a bundle of very fine, dry tinder before you try any of these. A spark or ember dies within seconds.</p>
<h3>Ferro rod / flint & steel</h3>
<p>Hold the rod in the tinder and scrape the striker <b>hard and fast</b> down the rod (or pull the rod back against a still striker) so sparks land in the tinder. Cotton wool, char cloth, birch bark shavings and dry grass fluff all catch well.</p>
<h3>Battery & steel wool</h3>
<p>Touch both terminals of a 9 V battery to fine steel wool (or bridge two AA batteries with a strand). It glows straight away. Push it into tinder and blow gently.</p>
<h3>Lens</h3>
<p>Use a magnifying glass, glasses (long-sighted lenses), a clear bag or bottle full of water, or the bottom of a clean drinks can polished to a mirror. Focus the sun to the <b>smallest, brightest dot</b> on dark tinder and hold it steady.</p>
<h3>Bow drill (last resort, practise first)</h3>
<ol class="steps">
<li><b>Fireboard</b>: a flat piece of dry, soft dead wood (willow, lime, sycamore, hazel). <b>Spindle</b>: a straight dry stick about thumb-thick and 20–25 cm long.</li>
<li><b>Bow</b>: a slightly curved stick about arm-length with cord tied loosely so the spindle can twist into it. <b>Socket</b>: a stone or hardwood piece to press on the top of the spindle.</li>
<li>Drill a shallow pit near the edge of the board, then cut a V-notch from the edge into the pit.</li>
<li>Saw the bow with long, steady strokes, pressing down on the socket. Fine brown-black dust builds up in the notch until it smokes on its own.</li>
<li>Tip that ember into your tinder bundle and blow gently until it flames.</li>
</ol>
<h3>Char cloth (make it in advance)</h3>
<p>Put cotton scraps in a tin with a small hole in the lid and set it in a fire until smoke stops coming out. Let it cool closed. The black cloth catches the smallest spark.</p>
<h3>Fire in wind or when you need to hide it</h3>
<p><b>Dakota fire hole:</b> dig a hole about 30 cm deep for the fire, and a second hole slanting into its base from the upwind side as an air tunnel. It burns hot and low, uses little wood, and shows little flame. Build a <b>reflector wall</b> of logs or rocks behind an open fire to throw heat towards you.</p>`
  },
  {
    id: "fm-shelter-extreme", cat: "field", title: "Snow & desert shelters", tags: "snow cave tree pit quinzee trench desert shade heat",
    body: `
<h3>Snow</h3>
<ul>
<li><b>Tree-pit shelter:</b> find an evergreen with low branches. Dig out the snow around the trunk down to the ground, line the floor with boughs, and cover the gaps above with more branches.</li>
<li><b>Snow trench:</b> dig a trench body-length and about 1 m deep, roof it with branches, a tarp or blocks of snow, and insulate the floor.</li>
<li><b>Snow cave:</b> dig into a deep drift. Make the sleeping platform <b>higher than the entrance</b> so warm air stays in, and smooth the roof so drips run down the walls.</li>
</ul>
<div class="warn">Always poke a <b>ventilation hole</b> through the roof and keep a digging tool inside. Snow shelters can fill with carbon monoxide from stoves or candles. Never sleep directly on snow: insulate underneath.</div>
<h3>Desert</h3>
<ul>
<li>Don't build in the heat of the day. Rest in any shade and work in the cool of evening or early morning.</li>
<li>Dig a trench 45–60 cm deep, running east to west.</li>
<li>Cover it with a tarp or poncho, then add a <b>second layer 30–45 cm above</b> the first. The air gap between them can make it 11–22 °C cooler underneath.</li>
<li>A shelter in the open, against the sky or with bright material on top, also signals rescuers.</li>
</ul>`
  },
  {
    id: "fm-cold", cat: "field", title: "Cold weather: C.O.L.D. & cold injuries", tags: "cold weather winter snow blindness trench foot immersion foot layers",
    body: `
<p class="lead">Keep your clothing working with <b>C.O.L.D.</b>:</p>
<ul class="big-list">
<li><b>C</b>lean: dirt and grease destroy insulation.</li>
<li><b>O</b>verheating: avoid it. Take layers off <i>before</i> you sweat, because sweat freezes you later.</li>
<li><b>L</b>oose and layered: tight clothes cut off circulation. Layers trap warm air.</li>
<li><b>D</b>ry: wet clothes lose most of their warmth. Dry them by the fire or on your body inside your sleeping bag.</li>
</ul>
<h3>Trench (immersion) foot</h3>
<p>Caused by feet that stay cold and wet for many hours. They go numb, pale or blotchy, then swollen and painful. Prevent it: <b>change into dry socks daily</b>, dry and massage your feet, and loosen your laces. Treat by drying them carefully, warming gently and raising them. Don't rub or burst blisters.</p>
<h3>Snow blindness</h3>
<p>The eyes feel gritty and painful, water, and become sensitive to light. Prevent it with sunglasses, or <b>improvised slit goggles</b> (bark, cardboard or cloth with thin eye slits, with soot under the eyes). Treat by covering the eyes and resting in darkness with cool, damp cloths. It usually heals in 1–3 days.</p>
<p>See also <a href="#g/hypothermia">Hypothermia &amp; frostbite</a>.</p>`
  },
  {
    id: "fm-desert", cat: "field", title: "Hot climates & desert", tags: "desert heat sun dehydration travel night mirage sandstorm",
    body: `
<ul>
<li><b>Travel at night or in the cool early morning</b>, and rest in shade through the hottest hours.</li>
<li><b>Keep covered:</b> long sleeves, a hat, and cloth over the neck. Bare skin loses more water and burns.</li>
<li>Drink the water you have when you're thirsty. Rationing water causes collapse sooner. <b>Conserve sweat</b> instead: move slowly, don't talk much, don't smoke or drink alcohol.</li>
<li>Rest a few centimetres off hot ground. The ground can be much hotter than the air.</li>
<li><b>Sandstorm:</b> stay put, mark your direction of travel with a line of stones, lie with your back to the wind, and cover your face.</li>
<li><b>Mirages</b> and heat haze make distances deceptive. Landmarks are usually further away than they look.</li>
<li>Flash floods: never camp in a dry riverbed or gully.</li>
</ul>
<p>See also <a href="#g/heat">Heat exhaustion &amp; heatstroke</a> and <a href="#g/fm-water-plants">Solar still</a>.</p>`
  },
  {
    id: "fm-river", cat: "field", title: "Crossing rivers safely", tags: "river crossing stream ford wading swept away",
    body: `
<div class="warn">If there's another way (a bridge, waiting for the water to drop, going upstream), take it. Rivers are among the biggest killers in the outdoors.</div>
<h3>Choose the crossing</h3>
<ul>
<li>Pick a <b>wide, shallow, slow</b> stretch with a gentle exit on the far bank. Look downstream for rapids, falls or log jams you could be swept into.</li>
<li>Water above the knee can knock you over if it's fast-flowing.</li>
</ul>
<h3>Crossing</h3>
<ol class="steps">
<li><b>Undo your pack's hip belt and chest strap</b> so you can throw it off.</li>
<li>Keep your boots on for grip. Take socks off to keep them dry if you can.</li>
<li>Use a strong pole on the <b>upstream</b> side as a third leg. Face upstream and shuffle sideways, moving one point at a time.</li>
<li>Cross at an angle, heading slightly downstream with the current.</li>
<li>Groups: link arms in a line parallel to the current, with the strongest person upstream.</li>
<li><b>Never tie yourself to a rope</b> in moving water: it can drag you under.</li>
</ol>
<h3>If you're swept away</h3>
<p>Ditch the pack. Float on your back, <b>feet first and downstream</b>, at the surface to fend off rocks. Don't stand up in fast water, because your foot can get trapped. Swim at an angle towards the bank when the current slows.</p>`
  },
  {
    id: "fm-edibility", cat: "field", title: "Universal edibility test (plants)", tags: "plants eat edible test poisonous foraging",
    body: `
<div class="warn">This is a <b>last resort</b>. It takes more than 24 hours per plant part, and some plants can kill even in small amounts. <b>It doesn't work for mushrooms: never eat wild mushrooms.</b> Don't bother testing a plant unless there's plenty of it.</div>
<p><b>Avoid entirely:</b> plants with milky or discoloured sap; beans, bulbs or seeds inside pods; a bitter or soapy taste; spines, fine hairs or thorns; a smell of almonds; leaves that look like dill, carrot, parsnip or parsley (the hemlock family); grain heads with pink, purple or black spurs; leaves in groups of three.</p>
<ol class="steps">
<li>Test <b>one part</b> of <b>one plant</b> at a time (leaf, stem, root, bud or flower).</li>
<li>Smell it. A strong or acid smell means reject it.</li>
<li>Eat nothing for 8 hours before the test. Drink only purified water during it.</li>
<li><b>Skin test:</b> rub it on the inside of your elbow or wrist and wait 15 minutes. Any itching, burning or rash means reject it.</li>
<li>Prepare it the way you'd eat it (raw or boiled).</li>
<li>Touch a piece to your <b>lip</b> and wait 3 minutes.</li>
<li>Put it on your <b>tongue</b> and hold it there for 15 minutes.</li>
<li><b>Chew</b> a pinch and hold it in your mouth for 15 minutes. Don't swallow.</li>
<li>If there's no burning, itching, numbness or stinging, <b>swallow</b> it.</li>
<li><b>Wait 8 hours.</b> If you feel ill, stop and drink plenty of water.</li>
<li>If you're fine, eat about <b>¼ cup</b> prepared the same way and wait another 8 hours.</li>
<li>Still fine: that part, prepared that way, is safe. Other parts of the same plant need their own test.</li>
</ol>`
  },
  {
    id: "fm-animal-food", cat: "field", title: "Insects, fish & simple snares", tags: "insects grubs fishing hooks snare trap rabbit protein hunting",
    body: `
<p class="lead">Animal foods give the most energy for the least risk. The easiest are insects, then fish, then small animals.</p>
<h3>Insects</h3>
<ul>
<li>Good: grubs and larvae (under bark and in rotten logs), ants, termites, grasshoppers, crickets, earthworms (soak them in clean water first).</li>
<li>Avoid: hairy or brightly coloured insects, ones that bite or sting, and anything that smells bad. Also avoid flies, mosquitoes and ticks, which carry disease.</li>
<li>Remove legs and wings, and <b>cook them</b> (roast or boil) to kill parasites.</li>
</ul>
<h3>Fish</h3>
<ul>
<li>Fish at <b>dawn and dusk</b>, in shady pools, under overhanging banks and below rapids.</li>
<li>Improvised hooks: a bent safety pin, a thorn, or a wooden <b>gorge</b> (a sliver of wood sharpened at both ends and tied in the middle, hidden lengthways in bait so it turns across the throat).</li>
<li>Bait with worms, insects or fish guts. Set several lines and check them often.</li>
<li>In warm weather, cook and eat fish the same day. Avoid any with sunken eyes, slimy gills or a bad smell.</li>
</ul>
<h3>Simple loop snare</h3>
<ol class="steps">
<li>Find an active small-animal trail: droppings, tracks, or a gap through a hedge or fence.</li>
<li>Make a noose of wire or strong cord about the size of a fist, with a running loop that slides freely.</li>
<li>Hang it across the trail, the bottom of the loop about <b>4 fingers above the ground</b> for rabbits, held open by twigs.</li>
<li>Anchor the other end firmly to a stake or root.</li>
<li>Set several, handle them as little as possible, and <b>check them at least daily</b>.</li>
</ol>
<p class="small">Snaring is restricted or illegal in many countries outside a genuine survival situation.</p>`
  },
  {
    id: "fm-food-prep", cat: "field", title: "Cooking & keeping food", tags: "cook boil roast preserve dry smoke meat",
    body: `
<ul>
<li><b>Boiling</b> is the best method: it kills parasites, and you can drink the broth, which keeps the nutrients.</li>
<li>Cook all meat, fish and insects thoroughly, until there's no pink left.</li>
<li>Gut animals promptly. Bury the guts away from camp, or use them as bait.</li>
<li><b>Drying:</b> cut meat into thin strips (about 6 mm) and hang them in sun and wind, or near a fire, until brittle.</li>
<li><b>Smoking:</b> hang thin strips in a tent of cloth or branches over a low, smoky fire of green hardwood for a day or two. Avoid resinous pine.</li>
<li>Rabbits are so lean that eating only rabbit causes "rabbit starvation". Add fat or plant food.</li>
<li>Keep food away from your shelter, and hang it up overnight away from animals.</li>
</ul>`
  },
  {
    id: "fm-hygiene", cat: "field", title: "Staying healthy in the field", tags: "hygiene feet blisters teeth toilet latrine sanitation health",
    body: `
<p class="lead">Illness kills more stranded people than injuries do. Small things prevent it.</p>
<ul>
<li><b>Hands:</b> wash or sanitise them after the toilet and before food. Use ash and water if you have no soap.</li>
<li><b>Toilet:</b> go at least <b>60 m from water</b> and downhill of camp, in a hole about 15–20 cm deep, then cover it.</li>
<li><b>Feet:</b> keep them dry, change socks often, and dry wet socks against your body. Air your feet at every stop.</li>
<li><b>Blisters:</b> leave small ones intact and pad around them. For large ones, clean the area, drain from the edge with a sterilised needle, keep the skin on as a roof, and cover.</li>
<li><b>Teeth:</b> chew the end of a green twig into a brush, or use a clean cloth.</li>
<li><b>Sleep and rest:</b> tiredness causes accidents. Rest 10 minutes in every hour when travelling.</li>
<li>Keep wounds clean and covered, and check them daily for <a href="#g/wounds">infection</a>.</li>
</ul>`
  },
  {
    id: "fm-cordage", cat: "field", title: "Making cord from plants", tags: "rope cordage string fibre bark nettle twine",
    body: `
<p class="lead">Fibre from plants, twisted the right way, makes strong cord for shelters, snares and lashings.</p>
<h3>Good fibres</h3>
<ul>
<li><b>Nettle</b> stems: crush them, split them, peel out the outer fibres and let them dry slightly.</li>
<li><b>Inner bark</b> of lime (linden), willow or sweet chestnut. Strip it from dead or fallen branches.</li>
<li>Long grasses, rushes, and the inner fibre of palm, yucca or agave leaves.</li>
</ul>
<h3>Reverse-wrap twist</h3>
<ol class="steps">
<li>Take a bundle of fibres and fold it so one side is longer than the other.</li>
<li>Pinch the fold. Twist the strand furthest from you <b>away</b> from you (clockwise) until it's tight.</li>
<li>Bring that twisted strand <b>towards</b> you over the other strand (anticlockwise).</li>
<li>Repeat: twist the new far strand, then wrap it over. The two opposite twists lock together.</li>
<li>Stagger the joins. When a strand gets thin, lay new fibres in and keep twisting.</li>
</ol>
<p class="small">Double up finished cord the same way for something stronger.</p>`
  },
  {
    id: "fm-weather", cat: "field", title: "Reading the weather", tags: "weather forecast clouds storm rain wind signs",
    body: `
<ul>
<li><b>Towering cumulus clouds</b> (tall, cauliflower-shaped) building in the afternoon mean thunderstorms are likely. Get off ridges and summits.</li>
<li>A <b>halo around the sun or moon</b>, and high wispy clouds thickening into a grey sheet, mean rain is probably within a day.</li>
<li>Campfire <b>smoke that hangs low</b> or drifts down suggests falling pressure and bad weather coming. Smoke rising straight up suggests settled weather.</li>
<li>A <b>red sky in the evening</b> usually means fair weather. A red sky in the morning can mean rain later.</li>
<li>A wind that suddenly changes direction or strengthens often comes with a weather front.</li>
<li><b>Lightning:</b> count the seconds from flash to thunder and divide by 3 for the distance in km. Under 30 seconds (10 km): take shelter now.</li>
</ul>`
  },
];

const MORSE = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..", J: ".---",
  K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.", S: "...", T: "-",
  U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
  "6": "-....", "7": "--...", "8": "---..", "9": "----.",
};

const NUMBERS = [
  ["Europe (all EU), most of the world on mobile", "112"],
  ["Ireland / UK", "112 or 999"],
  ["USA / Canada / Mexico", "911"],
  ["Australia", "000 (112 on mobile)"],
  ["New Zealand", "111"],
  ["India", "112"],
  ["Mountain rescue (Ireland/UK)", "112/999, ask for Police → Mountain Rescue"],
  ["Coast guard (Ireland/UK)", "112/999, ask for Coast Guard"],
];

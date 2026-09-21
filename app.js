const E = {
  emf: "E.M.F. 5",
  uv: "Ultraviolets",
  orbs: "Orbes",
  writing: "Écriture",
  temp: "Température",
  dots: "D.O.T.S.",
  spirit: "Spirit Box"
};

const evidenceColors = {
  [E.emf]: "#ff4f62",
  [E.uv]: "#d85cff",
  [E.orbs]: "#c8d72f",
  [E.writing]: "#5fa8ff",
  [E.temp]: "#18d7df",
  [E.dots]: "#36e47a",
  [E.spirit]: "#f3bd2d"
};

const entities = [
  {
    name: "Aswang", gender: "♂♀", evidence: [E.temp, E.writing, E.dots], sanity: "50%", speed: "1,53 m/s",
    behaviors: [
      "Disparaît s’il essaye d’entrer dans une cachette officielle.",
      "À la chasse suivante, il retourne directement vers le joueur repéré lors de la chasse précédente : il faut bouger avant son arrivée.",
      "Atteint sa vitesse maximale de poursuite en 8 secondes au lieu de 13."
    ],
    tests: ["Chronométrer son accélération.", "Tester sa disparition à l’entrée d’une cachette officielle — danger."]
  },
  {
    name: "Banshee", gender: "♀", evidence: [E.uv, E.orbs, E.dots], sanity: "50% pour la cible · 87% si la cible est dehors", speed: "1,7 m/s",
    behaviors: [
      "Fait des allers-retours entre sa cible et sa pièce.",
      "C’est toujours une femme.",
      "Elle possède 20 cris uniques au micro.",
      "50% de chance de produire une apparition chantante.",
      "Ordre des cibles : hasard, hôte, puis ordre du lobby."
    ],
    tests: ["Suivre ses déplacements avec des capteurs et du sel.", "Confirmer son cri au micro."]
  },
  {
    name: "Dayan", gender: "♀", evidence: [E.emf, E.orbs, E.spirit], sanity: "50% · 65% si un joueur marche près d’elle · 45% s’il reste immobile", speed: "1,7 m/s à +10 m · 1,2 m/s immobile à -10 m · 2,25 m/s en mouvement à -10 m",
    behaviors: ["C’est toujours une femme.", "Ralentit si un joueur reste immobile à moins de 10 m et accélère s’il se déplace dans cette zone."],
    tests: ["Bouger pendant une poursuite à moins de 10 m et comparer sa vitesse."]
  },
  {
    name: "Deildegast", gender: "♂♀", evidence: [E.emf, E.writing, E.dots], sanity: "50%", speed: "3,0 m/s · jusqu’à 0,4 m/s après 26 objets déplacés (-0,1 m/s par objet)",
    behaviors: ["La vitesse de la prochaine chasse dépend du nombre d’objets déplacés avant celle-ci.", "Le compteur est réinitialisé après chaque chasse ou tentative de chasse.", "N’accélère pas en cas de poursuite."],
    tests: ["Comparer sa vitesse avec et sans objets déplacés."]
  },
  {
    name: "Démon", gender: "♂♀", evidence: [E.uv, E.writing, E.temp], sanity: "70% généralement · 100% avec son pouvoir", speed: "1,7 m/s",
    behaviors: ["Peut chasser à n’importe quel niveau de santé mentale.", "Cooldown de chasse réduit de 25 à 20 secondes.", "Après un encens hors chasse, cooldown de 60 secondes au lieu de 90.", "Portée des crucifix augmentée de 50%."],
    tests: ["Vérifier les différents cooldowns."]
  },
  {
    name: "Deogen", gender: "♂♀", evidence: [E.dots, E.writing, E.spirit], requiredEvidence: E.spirit, sanity: "40%", speed: "3,0 m/s · 0,4 m/s près d’un joueur",
    behaviors: ["Sait toujours où sont les joueurs : ne pas se cacher.", "33% de chance de produire un son de respiration unique dans la Spirit Box.", "Est plus souvent visible pendant les chasses.", "Preuve obligatoire : Spirit Box dès qu’au moins une preuve est active."],
    tests: ["Faire une poursuite et vérifier sa vitesse à proximité."]
  },
  {
    name: "Gallu", gender: "♂♀", evidence: [E.emf, E.uv, E.spirit], sanity: "50% normal · 60% enragé · 40% affaibli", speed: "1,7 m/s normal · 1,96 m/s enragé · 1,36 m/s affaibli",
    behaviors: ["Trois états : normal, enragé, puis affaibli. Un crucifix, du sel ou un encens le fait passer à l’état suivant.", "Après une chasse terminée à l’état enragé, il repasse en affaibli.", "L’efficacité des objets de défense varie selon l’état de l’entité :", "À l’état normal, il ne peut perturber qu’un tas de sel avant de chasser."],
    defenses: [
      { state: "Affaibli", incense: "6 s", crucifix: "+1 m", salt: "Ralenti 3 s" },
      { state: "Normal", incense: "5 s", crucifix: "Portée normale", salt: "Ralenti 2 s" },
      { state: "Enragé", incense: "4 s", crucifix: "−2 m", salt: "N’interagit plus" }
    ],
    tests: ["Placer trois tas de sel sur son chemin, espacés de plus de 3 secondes, et vérifier si l’un reste intact."]
  },
  {
    name: "Goryo", gender: "♂♀", evidence: [E.emf, E.uv, E.dots], requiredEvidence: E.dots, sanity: "50%", speed: "1,7 m/s",
    behaviors: ["Ne change jamais de pièce, sauf avec la patte de singe.", "Ne s’éloigne jamais à plus de 3 m de sa pièce favorite, hors apparitions.", "Les D.O.T.S. sont visibles uniquement à la caméra et n’apparaissent pas si un joueur est dans la pièce.", "Preuve obligatoire : D.O.T.S. dès qu’au moins une preuve est active."],
    tests: ["Utiliser capteurs et sel pour vérifier qu’il ne s’éloigne pas de sa pièce."]
  },
  {
    name: "Hantu", gender: "♂♀", evidence: [E.uv, E.orbs, E.temp], requiredEvidence: E.temp, sanity: "50%", speed: "1,4 m/s dans une pièce chaude · jusqu’à 2,7 m/s dans le froid",
    behaviors: ["Produit un souffle glacial toutes les 3 secondes si le disjoncteur est éteint.", "Deux fois plus de chances de couper le disjoncteur et ne peut pas l’allumer.", "N’accélère pas pendant une poursuite.", "Preuve obligatoire : température dès qu’au moins une preuve est active.", "La neige le rend plus rapide car l’environnement est plus froid."],
    tests: ["Faire une boucle dans une pièce chaude pendant une chasse.", "Observer son souffle."]
  },
  {
    name: "Djinn", gender: "♂♀", evidence: [E.emf, E.uv, E.temp], sanity: "50%", speed: "1,7 m/s · 2,5 m/s si le disjoncteur est allumé et la cible à plus de 3 m",
    behaviors: ["Ne peut pas éteindre le disjoncteur, sauf par surtension : si un interrupteur précédemment allumé est coupé en même temps, il s’agit d’une surcharge.", "Peut drainer instantanément 25% de santé si le disjoncteur est allumé et qu’un joueur se trouve à moins de 3 m.", "Ce pouvoir n’a pas de cooldown ; un double pouvoir en début de partie peut permettre une chasse immédiate."],
    tests: ["Vérifier l’accélération instantanée avec le disjoncteur allumé.", "Observer une perte instantanée de 25% près de l’entité."]
  },
  {
    name: "Kormos", gender: "♂♀", evidence: [E.orbs, E.spirit, E.uv], sanity: "50% · 70% si un joueur sprinte près de lui", speed: "1,7 m/s · 2,21 m/s dès qu’un joueur est détecté",
    behaviors: ["Aveugle : détecte les joueurs par leurs déplacements, leurs voix et les équipements actifs.", "Passe directement à 2,21 m/s sans accélération progressive.", "Aime casser les ampoules.", "Ne peut pas réaliser les apparitions mobiles en forme de brume ou en poursuite."],
    tests: ["Se faire repérer par un déplacement et observer l’accélération directe."]
  },
  {
    name: "Cauchemar", gender: "♂♀", evidence: [E.spirit, E.orbs, E.writing], sanity: "60% si sa pièce est éteinte · 40% si elle est allumée", speed: "1,7 m/s",
    behaviors: ["Ne peut pas allumer de lumière.", "Peut éteindre instantanément une lumière qu’un joueur vient d’allumer, avec 10 secondes de cooldown ; ce pouvoir ne fonctionne pas si l’ampoule est cassée.", "Aime casser les ampoules et privilégie les pièces sombres pour se déplacer."],
    tests: ["Comparer le seuil de chasse avec la lumière allumée et éteinte.", "Observer ses choix de pièces sombres."]
  },
  {
    name: "Moroï", gender: "♂♀", evidence: [E.spirit, E.writing, E.temp], requiredEvidence: E.spirit, sanity: "50%", speed: "1,5 à 2,25 m/s selon le niveau de santé mentale",
    behaviors: ["Maudit les joueurs via la Spirit Box, le micro parabolique et l’enregistreur.", "Un joueur maudit perd sa santé deux fois plus vite, même dans la lumière. Une pilule lève la malédiction.", "L’encens l’étourdit 7 secondes au lieu de 5.", "Preuve obligatoire : Spirit Box dès qu’au moins une preuve est active."],
    tests: ["Chronométrer la désorientation.", "Comparer le niveau de santé mentale à sa vitesse."]
  },
  {
    name: "Myling", gender: "♂♀", evidence: [E.emf, E.uv, E.writing], sanity: "50%", speed: "1,7 m/s",
    behaviors: ["Pendant une chasse, voix et pas sont audibles à 12 m au lieu de 20 m.", "Parle plus souvent au micro et à l’enregistreur.", "Fait dysfonctionner les équipements à moins de 10 m.", "Peut reparler au micro après 1 min 05 au lieu de 1 min 20."],
    tests: ["Placer un appareil 2 m devant soi loin de sa pièce et écouter s’il bug quand l’entité devient audible.", "Tester les délais du micro."]
  },
  {
    name: "Obake", gender: "♂♀", evidence: [E.emf, E.uv, E.orbs], requiredEvidence: E.uv, sanity: "50%", speed: "1,7 m/s",
    behaviors: ["25% de chance de laisser une empreinte spéciale : six doigts aux portes et fenêtres, deux aux interrupteurs, cinq aux barreaux et claviers.", "Change brièvement d’apparence pendant une chasse, visible à la caméra mais pas par les morts.", "Les empreintes disparaissent deux fois plus vite.", "25% de chance de ne laisser aucune trace."],
    tests: ["Chercher les empreintes spéciales.", "Repérer les changements d’apparence."]
  },
  {
    name: "Obambo", gender: "♂♀", evidence: [E.writing, E.uv, E.dots], sanity: "65% agressif · 10% calme", speed: "1,45 m/s calme · 1,96 m/s agressif",
    behaviors: ["Deux états : calme et agressif. Il commence calme, devient agressif après 1 minute, puis alterne toutes les 2 minutes, même en chasse.", "À l’état agressif, la chasse est raccourcie de 20%, quelle que soit la taille de la carte ou le type de chasse."],
    tests: ["Comparer sa vitesse entre plusieurs chasses.", "Chronométrer la durée de la chasse."]
  },
  {
    name: "Oni", gender: "♂♀", evidence: [E.emf, E.temp, E.dots], sanity: "50%", speed: "1,7 m/s",
    behaviors: ["Plus actif quand plusieurs joueurs sont proches.", "Privilégie fortement les apparitions physiques.", "Draine 20% de santé pendant les apparitions au lieu de 10%.", "Ne peut pas produire d’apparition sous forme de brume.", "Est plus souvent visible pendant les chasses."],
    tests: ["Observer sa visibilité pendant une chasse.", "Provoquer des interactions pour obtenir des apparitions physiques."]
  },
  {
    name: "Onryo", gender: "♂♀", evidence: [E.spirit, E.orbs, E.temp], sanity: "60% · 40% près de bougies · 100% avec son pouvoir", speed: "1,7 m/s",
    behaviors: ["Après chaque troisième flamme soufflée, il tente de chasser quelle que soit la santé mentale, avec un délai pouvant atteindre environ 6 secondes.", "Les flammes agissent comme des crucifix avec une portée de 4 m.", "Éteint toujours une flamme à portée avant de consumer le crucifix."],
    tests: ["Forcer son pouvoir avec un crucifix pour bloquer la chasse."]
  },
  {
    name: "Fantôme", gender: "♂♀", evidence: [E.spirit, E.uv, E.dots], sanity: "50%", speed: "1,7 m/s",
    behaviors: ["S’il est visible à moins de 10 m, il draine 0,5% de santé mentale par seconde.", "Disparaît immédiatement s’il est photographié ou filmé, y compris en D.O.T.S., mais pas pendant une chasse.", "Fait des allers-retours entre sa pièce et un joueur au hasard, même si celui-ci est dehors — il s’arrête alors à la porte — et laisse un E.M.F. 2 à l’arrivée.", "Rien n’apparaît sur une photo validée « Fantôme ».", "Peut rester invisible entre 1 et 2 secondes pendant une chasse."],
    tests: ["Suivre ses déplacements avec détecteur, sel et E.M.F. 2.", "Le photographier avec l’aide d’un objet maudit si nécessaire."]
  },
  {
    name: "Poltergeist", gender: "♂♀", evidence: [E.spirit, E.uv, E.writing], sanity: "50%", speed: "1,7 m/s",
    behaviors: ["Lance les objets deux fois plus fort et retire 2% de santé mentale par objet lancé aux joueurs présents.", "Pendant une chasse, lance deux objets par seconde.", "Peut déclencher une « polterbombe » en projetant ou faisant léviter plusieurs objets proches.", "Un saut de 0 à 10 sur le graphique du camion peut l’indiquer si personne n’est à l’intérieur et qu’il n’y a ni chasse ni événement."],
    tests: ["Former une ligne d’objets et vérifier le rythme de deux lancers par seconde.", "Préparer un tas d’objets pour provoquer une polterbombe."]
  },
  {
    name: "Raiju", gender: "♂♀", evidence: [E.emf, E.orbs, E.dots], sanity: "50% · 65% près d’un équipement allumé", speed: "1,7 m/s · 2,5 m/s près d’un équipement allumé",
    behaviors: ["Fait dysfonctionner appareils et lumières au même étage à 15 m au lieu de 10 m.", "Ses battements sont audibles à 15 m quand il est visible, contre 10 m normalement.", "Portée des équipements : 6 m petite carte, 8 m moyenne, 10 m grande ; l’équipement de tête compte.", "Sous l’effet d’un équipement, il n’accélère pas progressivement ; sinon il peut atteindre 2,8 m/s."],
    tests: ["Comparer sa vitesse avec et sans appareil allumé.", "Attention : il saura où vous êtes."]
  },
  {
    name: "Revenant", gender: "♂♀", evidence: [E.orbs, E.writing, E.temp], sanity: "50%", speed: "1,0 m/s · 3,0 m/s s’il repère un joueur",
    behaviors: ["Accélère lorsqu’il repère un joueur et décélère rapidement lorsqu’il perd sa trace."],
    tests: ["Comparer sa vitesse en se faisant repérer puis en rompant le contact."]
  },
  {
    name: "Ombre", gender: "♂♀", evidence: [E.emf, E.writing, E.temp], sanity: "35%", speed: "1,7 m/s",
    behaviors: ["Totalement inactive si quelqu’un se trouve dans sa pièce.", "Préfère les apparitions immatérielles.", "Les apparitions par objet maudit prennent la forme d’une ombre.", "Ne peut pas lancer d’objet sur un joueur ni faire d’apparition chantante."],
    tests: ["Comparer le graphique d’activité avec et sans joueur dans la pièce.", "Provoquer de l’activité près d’elle et dans sa pièce."]
  },
  {
    name: "Esprit", gender: "♂♀", evidence: [E.emf, E.spirit, E.writing], sanity: "50%", speed: "1,7 m/s",
    behaviors: ["Un encens utilisé dans sa pièce l’empêche de chasser pendant 3 minutes au lieu des 1 minute 30 habituelles."],
    tests: ["Mesurer le temps entre l’encens et la prochaine chasse : environ 3 minutes indique un Esprit."]
  },
  {
    name: "Thayé", gender: "♂♀", evidence: [E.orbs, E.writing, E.dots], sanity: "75% jeune · 15% vieux", speed: "2,75 m/s jeune · 1,0 m/s vieux",
    behaviors: ["Vieillit lorsque les joueurs restent dans sa pièce avec lui, devenant moins actif et plus lent toutes les 1 à 2 minutes.", "N’accélère pas pendant une poursuite.", "Seule entité pouvant annoncer plus de 90 ans."],
    tests: ["Demander deux fois son âge à la Ouija à des moments espacés.", "Comparer plusieurs chasses avant et après être resté dans sa pièce."]
  },
  {
    name: "Mimic", gender: "♂♀", evidence: [E.spirit, E.uv, E.temp, E.orbs], bonusEvidence: E.orbs, sanity: "10 à 100% selon l’entité imitée", speed: "0,4 à 3,0 m/s selon l’entité imitée",
    behaviors: ["Copie les pouvoirs, capacités et comportements d’une entité aléatoire toutes les 30 à 120 secondes, sans imiter ses preuves.", "Présente toujours des orbes fantomatiques en plus de ses preuves, même en mode zéro preuve.", "Ne change pas d’entité pendant une chasse ni d’apparence lorsqu’il change d’entité imitée.", "Seule entité pouvant laisser une empreinte cassée en son milieu sur la porte d’entrée.", "Seul l’hôte voit les changements de clignotement imités."],
    tests: ["Comparer le comportement de plusieurs chasses.", "Toujours chercher l’orbe supplémentaire."]
  },
  {
    name: "Jumeaux", gender: "♂♀", evidence: [E.emf, E.spirit, E.temp], sanity: "50%", speed: "1,5 m/s pour le lent · 1,9 m/s pour le rapide",
    behaviors: ["Le jumeau lent se déplace normalement et interagit dans un rayon de 4,25 m.", "Le rapide interagit à 8,48 m sur les petites et moyennes cartes, ou 16,97 m sur les grandes, au même étage.", "Le lent chasse depuis sa position ; le rapide depuis son dernier lieu d’interaction.", "Une double interaction peut apparaître comme une courbe cassée au milieu sur le graphique.", "50% de chance que le jumeau rapide chasse."],
    tests: ["Comparer la vitesse de plusieurs chasses.", "Chercher une double interaction sur la carte et le graphique."]
  },
  {
    name: "Spectre", gender: "♂♀", evidence: [E.emf, E.spirit, E.dots], sanity: "50%", speed: "1,7 m/s",
    behaviors: ["Ne peut pas interagir avec le sel.", "Se téléporte sur un joueur, laisse un E.M.F. 2 ou 5 à l’arrivée, puis retourne normalement dans sa pièce."],
    tests: ["Attendre sa téléportation loin de sa pièce, avec capteurs de mouvement et sel : il déclenche les capteurs sans toucher le sel."]
  },
  {
    name: "Yokai", gender: "♂♀", evidence: [E.spirit, E.orbs, E.dots], sanity: "50% · 80% si l’on parle près de lui", speed: "1,7 m/s",
    behaviors: ["Plus actif et capable de chasser plus tôt si l’on parle près de lui.", "Presque sourd : il entend et détecte les équipements seulement à moins de 2,5 m."],
    tests: ["Essayer de l’attirer vers un équipement allumé placé à plus de 2,5 m."]
  },
  {
    name: "Yurei", gender: "♂♀", evidence: [E.orbs, E.temp, E.dots], sanity: "50%", speed: "1,7 m/s",
    behaviors: ["Ne peut déplacer une porte qu’entièrement ouverte ou fermée.", "Son pouvoir ferme complètement une porte proche et retire 15% de santé mentale aux joueurs à proximité.", "Seule entité pouvant interagir avec la porte d’entrée hors chasse."],
    tests: ["Observer les portes et la santé mentale lorsqu’elles claquent."]
  }
];

const speedTiersByEntity = {
  Aswang: ["slow"],
  Banshee: ["normal"],
  Dayan: ["slow", "normal", "fast"],
  Deildegast: ["slow", "normal", "fast"],
  Démon: ["normal"],
  Deogen: ["slow", "fast"],
  Gallu: ["slow", "normal", "fast"],
  Goryo: ["normal"],
  Hantu: ["slow", "normal", "fast"],
  Djinn: ["normal", "fast"],
  Kormos: ["normal", "fast"],
  Cauchemar: ["normal"],
  Moroï: ["slow", "normal", "fast"],
  Myling: ["normal"],
  Obake: ["normal"],
  Obambo: ["slow", "fast"],
  Oni: ["normal"],
  Onryo: ["normal"],
  Fantôme: ["normal"],
  Poltergeist: ["normal"],
  Raiju: ["normal", "fast"],
  Revenant: ["slow", "fast"],
  Ombre: ["normal"],
  Esprit: ["normal"],
  Thayé: ["slow", "normal", "fast"],
  Mimic: ["slow", "normal", "fast"],
  Jumeaux: ["slow", "fast"],
  Spectre: ["normal"],
  Yokai: ["normal"],
  Yurei: ["normal"]
};

const maxHuntSanityByEntity = {
  Aswang: 50,
  Banshee: 87,
  Dayan: 65,
  Deildegast: 50,
  Démon: 100,
  Deogen: 40,
  Gallu: 60,
  Goryo: 50,
  Hantu: 50,
  Djinn: 50,
  Kormos: 70,
  Cauchemar: 60,
  Moroï: 50,
  Myling: 50,
  Obake: 50,
  Obambo: 65,
  Oni: 50,
  Onryo: 100,
  Fantôme: 50,
  Poltergeist: 50,
  Raiju: 65,
  Revenant: 50,
  Ombre: 35,
  Esprit: 50,
  Thayé: 75,
  Mimic: 100,
  Jumeaux: 50,
  Spectre: 50,
  Yokai: 80,
  Yurei: 50
};

entities.forEach((entity) => {
  entity.speedTiers = speedTiersByEntity[entity.name];
  entity.maxHuntSanity = maxHuntSanityByEntity[entity.name];
});

const investigationStorageKey = "phasmo-current-investigation-v1";

function readStoredInvestigation() {
  try {
    return JSON.parse(localStorage.getItem(investigationStorageKey) || "null") || {};
  } catch (_) {
    return {};
  }
}

const storedInvestigation = readStoredInvestigation();
const evidenceStates = Object.fromEntries(Object.values(E).map((value) => [
  value,
  [-1, 0, 1].includes(storedInvestigation.evidenceStates?.[value])
    ? storedInvestigation.evidenceStates[value]
    : 0
]));
let selectedEvidenceCount = [0, 1, 2, 3].includes(storedInvestigation.selectedEvidenceCount)
  ? storedInvestigation.selectedEvidenceCount
  : 3;
const selectedSpeedTiers = new Set((storedInvestigation.selectedSpeedTiers || []).filter((tier) => ["slow", "normal", "fast"].includes(tier)));
const selectedGenders = new Set((storedInvestigation.selectedGenders || []).filter((gender) => ["♂", "♀"].includes(gender)).slice(0, 1));
const pinned = new Set(JSON.parse(localStorage.getItem("phasmo-pinned") || "[]"));
const dismissed = new Set(JSON.parse(localStorage.getItem("phasmo-dismissed") || "[]"));

const grid = document.querySelector("#entityGrid");
const filters = document.querySelector("#evidenceFilters");
const evidenceModeOptions = document.querySelector("#evidenceModeOptions");
const evidenceModeNote = document.querySelector("#evidenceModeNote");
const evidenceFilterHelp = document.querySelector("#evidenceFilterHelp");
const speedFilters = document.querySelector("#speedFilters");
const genderFilters = document.querySelector("#genderFilters");
const sanityFilter = document.querySelector("#sanityFilter");
const sanityValue = document.querySelector("#sanityValue");
const tempoButton = document.querySelector("#tempoButton");
const tempoReset = document.querySelector("#tempoReset");
const tempoSpeed = document.querySelector("#tempoSpeed");
const tempoDetails = document.querySelector("#tempoDetails");
const searchInput = document.querySelector("#searchInput");
const resultCount = document.querySelector("#resultCount");
const entitiesTitle = document.querySelector("#entitiesTitle");
const entitiesHeadingHint = document.querySelector("#entitiesHeadingHint");
const emptyState = document.querySelector("#emptyState");
const template = document.querySelector("#cardTemplate");
const brandNav = document.querySelector(".brand-nav");
const menuButton = document.querySelector("#menuButton");
const siteMenu = document.querySelector("#siteMenu");
const brandTitle = document.querySelector("#brandTitle");
const resultCounterWrap = document.querySelector("#resultCounterWrap");
const globalSearch = document.querySelector("#globalSearch");
const globalSearchInput = document.querySelector("#globalSearchInput");
const globalSearchResults = document.querySelector("#globalSearchResults");
const viewPanels = [...document.querySelectorAll("[data-view-panel]")];
const viewButtons = [...siteMenu.querySelectorAll("[data-view]")];
const mapSizeOptions = document.querySelector(".map-size-options");
const huntTimerNote = document.querySelector("#huntTimerNote");
const equipmentCatalog = document.querySelector("#equipmentCatalog");
const equipmentCount = document.querySelector("#equipmentCount");
const cursedCatalog = document.querySelector("#cursedCatalog");
const cursedCount = document.querySelector("#cursedCount");
const mapsCatalog = document.querySelector("#mapsCatalog");
const mapCount = document.querySelector("#mapCount");
const mapDialog = document.querySelector("#mapDialog");
const mapDialogTitle = document.querySelector("#mapDialogTitle");
const mapDialogSize = document.querySelector("#mapDialogSize");
const mapDialogImage = document.querySelector("#mapDialogImage");
const investigationNotesPanel = document.querySelector("#investigationNotesPanel");
const investigationNotes = document.querySelector("#investigationNotes");

const huntDurations = { S: 30, M: 50, L: 60 };
let selectedMapSize = ["S", "M", "L"].includes(storedInvestigation.selectedMapSize)
  ? storedInvestigation.selectedMapSize
  : "S";

const timerDefinitions = {
  hunt: {
    duration: huntDurations.S,
    alerts: [{ elapsedFraction: .8, text: "Fin de chasse Obambo agressif" }],
    completionText: "Fin de chasse"
  },
  huntCooldown: {
    duration: 25,
    alerts: [{ elapsed: 20, text: "Fin cooldown Démon" }],
    completionText: "ATTENTION il peut chasser"
  },
  incense: {
    duration: 180,
    alerts: [
      { elapsed: 60, text: "Fin durée Démon" },
      { elapsed: 90, text: "Fin durée normale" }
    ],
    completionText: "Fin Durée Esprit"
  },
  microphone: {
    duration: 80,
    alerts: [{ elapsed: 65, text: "Fin cooldown Myling" }],
    completionText: "Fin cooldown normal"
  }
};

const timerStates = Object.fromEntries(Object.entries(timerDefinitions).map(([key, definition]) => [key, {
  duration: definition.duration,
  remainingMs: definition.duration * 1000,
  running: false,
  endAt: null,
  alerted: new Set(),
  intervalId: null
}]));

const equipmentCategories = [
  { id: "evidence", label: "Objets de preuve", description: "Identifier les sept preuves possibles", itemLabel: "Preuve" },
  { id: "support", label: "Médias, suivi & éclairage", description: "Observer, enregistrer et suivre l’activité", itemLabel: "Support" },
  { id: "survival", label: "Protection & survie", description: "Sécuriser l’enquête et gérer la santé mentale", itemLabel: "Protection" }
];

const equipmentImageSlugs = {
  "Caméra vidéo": "video-camera",
  "Lampe UV": "uv",
  "Lecteur E.M.F.": "emf",
  "Livre d’écriture fantomatique": "writing-book",
  "Projecteur D.O.T.S.": "dots",
  "Spirit Box": "spirit-box",
  "Thermomètre": "thermometer",
  "Appareil photo": "photo-camera",
  "Capteur de mouvement": "motion-sensor",
  "Capteur sonore": "sound-sensor",
  "Enregistreur de son": "sound-recorder",
  "Équipement de tête": "head-gear",
  "Lampe de poche": "flashlight",
  "Microphone parabolique": "parabolic",
  "Trépied": "tripod",
  "Allumeur": "igniter",
  "Crucifix": "crucifix",
  "Encens": "incense",
  "Lumière à feu": "firelight",
  "Pilule de santé mentale": "sanity-medication",
  "Sel": "salt"
};

const equipmentLevels = {
  "Caméra vidéo": [0, 27, 49],
  "Lampe UV": [0, 18, 46],
  "Lecteur E.M.F.": [0, 18, 46],
  "Livre d’écriture fantomatique": [0, 23, 55],
  "Projecteur D.O.T.S.": [0, 27, 49],
  "Spirit Box": [0, 23, 46],
  "Thermomètre": [0, 27, 65],
  "Appareil photo": [2, 23, 55],
  "Capteur de mouvement": [3, 42, 70],
  "Capteur sonore": [10, 32, 52],
  "Enregistreur de son": [4, 39, 60],
  "Équipement de tête": [13, 42, 80],
  "Lampe de poche": [0, 18, 34],
  "Microphone parabolique": [5, 32, 70],
  "Trépied": [9, 34, 60],
  "Allumeur": [12, 37, 52],
  "Crucifix": [7, 34, 80],
  "Encens": [14, 37, 80],
  "Lumière à feu": [12, 37, 75],
  "Pilule de santé mentale": [14, 39, 75],
  "Sel": [8, 39, 65]
};

const equipment = [
  {
    category: "evidence", name: "Caméra vidéo", starter: true,
    summary: "Détecte les orbes fantomatiques, enregistre des vidéos et transmet son image au camion.",
    tip: "Garde-la en main avec la vision nocturne pour te déplacer dans le noir et repérer rapidement les orbes.",
    tiers: [
      ["Image faible", "Résistance paranormale faible"],
      ["Image moyenne", "Résistance paranormale moyenne"],
      ["Image élevée", "Résistance paranormale élevée"]
    ]
  },
  {
    category: "evidence", name: "Lampe UV", starter: true,
    summary: "Révèle les empreintes digitales et les traces de pas associées à la preuve Ultraviolet.",
    tip: "L’Obake peut ne laisser aucune empreinte. Recharge les traces au faisceau UV avant qu’elles ne disparaissent.",
    tiers: [
      ["Charge UV : 5 s", "Projecteur étroit"],
      ["Charge UV : 10 s", "Lumière de zone"],
      ["Charge UV : 1,5 s", "Projecteur large"]
    ]
  },
  {
    category: "evidence", name: "Lecteur E.M.F.", starter: true,
    summary: "Mesure les champs électromagnétiques produits par les interactions et peut confirmer la preuve E.M.F. 5.",
    tip: "Le graphique du camion peut suggérer un E.M.F. 5, mais seul un lecteur atteignant réellement le niveau 5 confirme la preuve.",
    tiers: [
      ["Précision faible", "Portée : 1,7 m"],
      ["Précision moyenne", "Portée : 2 m", "Indicateur audio"],
      ["Précision élevée", "Portée : 3,5 m", "Direction et distance"]
    ]
  },
  {
    category: "evidence", name: "Livre d’écriture fantomatique", starter: true,
    summary: "Permet à certaines entités d’écrire ou de dessiner pour révéler la preuve Écriture fantomatique.",
    tip: "Pose le livre au lieu de le jeter. Si l’entité le projette sans écrire, tu peux exclure cette preuve.",
    tiers: [
      ["Interaction faible", "Portée : 3 m"],
      ["Interaction moyenne", "Portée : 4 m"],
      ["Interaction élevée", "Portée : 5 m"]
    ]
  },
  {
    category: "evidence", name: "Projecteur D.O.T.S.", starter: true,
    summary: "Projette une zone lumineuse dans laquelle la silhouette de l’entité peut révéler la preuve D.O.T.S.",
    tip: "Couvre les passages les plus fréquentés. Pour un Goryo, observe les D.O.T.S. à la caméra en quittant la pièce.",
    tiers: [
      ["Portée : 5 m", "Projecteur étroit"],
      ["Portée : 2,5 m", "Lumière de zone"],
      ["Portée : 7 m", "Projecteur large", "Balayage automatique"]
    ]
  },
  {
    category: "evidence", name: "Spirit Box", starter: true,
    summary: "Balaye les fréquences radio afin d’obtenir une réponse directe de l’entité et confirmer la preuve Spirit Box.",
    tip: "Repère d’abord l’entité avec le sel, les capteurs ou les D.O.T.S., puis interroge-la dans une pièce plongée dans le noir.",
    tiers: [
      ["Audio faible", "Réponse faible", "Portée : 3 m"],
      ["Audio moyen", "Réponse moyenne", "Portée : 4 m"],
      ["Audio élevé", "Réponse élevée", "Portée : 5 m"]
    ]
  },
  {
    category: "evidence", name: "Thermomètre", starter: true,
    summary: "Mesure la température, aide à trouver la pièce de l’entité et confirme les températures glaciales sous 0 °C.",
    tip: "La pièce de l’entité est généralement la plus froide. Laisse le bâtiment refroidir avant de conclure.",
    tiers: [
      ["Précision faible", "Échantillonnage lent"],
      ["Précision moyenne", "Échantillonnage moyen"],
      ["Précision élevée", "Échantillonnage rapide"]
    ]
  },
  {
    category: "support", name: "Appareil photo",
    summary: "Capture des preuves photo et les éléments utiles au rapport d’enquête.",
    tip: "Le viseur signale les sujets intéressants jusqu’à 3,5 m, ou 8 m pour l’entité. Le tier 1, sans écran, utilise un voyant vert.",
    tiers: [
      ["Sans écran", "3 s entre les photos"],
      ["Écran numérique", "Résistance moyenne", "2 s entre les photos"],
      ["Résistance élevée", "1 s entre les photos"]
    ]
  },
  {
    category: "support", name: "Capteur de mouvement",
    summary: "Détecte le passage des joueurs et de l’entité, puis transmet l’activité au camion.",
    tip: "Place-le au-dessus d’un tas de sel pour suivre un passage précis et tester les entités qui interagissent différemment avec le sel.",
    tiers: [
      ["Faisceau unique", "Signal lumineux"],
      ["Un ou deux faisceaux", "Signal lumineux et sonore"],
      ["Balayage circulaire", "Portée : 1,5 m", "Signal lumineux et sonore"]
    ]
  },
  {
    category: "support", name: "Capteur sonore",
    summary: "Écoute une large zone et retransmet les sons ainsi que leur intensité au camion.",
    tip: "Très utile sur les grandes cartes pour localiser une zone active ou écouter une chasse à distance.",
    tiers: [
      ["Portées : 5 ou 10 m", "Zone circulaire"],
      ["Portées : 5, 10 ou 15 m", "Zone circulaire"],
      ["Portées : 5, 10 ou 15 m", "Cercle, cône ou sablier"]
    ]
  },
  {
    category: "support", name: "Enregistreur de son",
    summary: "Enregistre les phénomènes paranormaux audibles afin de les ajouter aux médias de l’enquête.",
    tip: "Une partie ne valide que trois sons uniques : vérifie le journal pour éviter les doublons et privilégie les sons assez longs.",
    tiers: [
      ["Portée : 3 m", "Enregistrement simple"],
      ["Portée : 5 m", "Écran avec indicateur sonore"],
      ["Portée : 5 m", "Direction et distance du son"]
    ]
  },
  {
    category: "support", name: "Équipement de tête",
    summary: "Libère les mains en fournissant une caméra, une lampe ou une vision nocturne selon le tier.",
    tip: "Éteins les versions électroniques pendant une chasse : l’entité peut détecter l’équipement actif.",
    tiers: [
      ["Caméra frontale", "Image visible depuis le camion", "Qualité d’image moyenne", "Perturbations faibles"],
      ["Lampe frontale", "Large faisceau", "Intensité moyenne"],
      ["Vision nocturne", "Ne révèle pas les orbes", "Perturbations élevées près de l’entité"]
    ]
  },
  {
    category: "support", name: "Lampe de poche", starter: true,
    summary: "Éclaire la zone située devant le joueur et facilite les déplacements dans l’obscurité.",
    tip: "Elle commence à dysfonctionner quand l’entité est proche pendant une chasse : environ 10 m, ou 15 m pour un Raiju alimenté.",
    tiers: [
      ["Intensité faible", "Projecteur étroit"],
      ["Intensité moyenne", "Projecteur étroit"],
      ["Intensité élevée", "Projecteur large"]
    ]
  },
  {
    category: "support", name: "Microphone parabolique",
    summary: "Amplifie les sons lointains dans un cône de 110° afin de localiser l’entité sur une grande zone.",
    tip: "Balaye lentement la carte. Un cri spectral particulier entendu avec cet outil peut identifier une Banshee.",
    tiers: [
      ["Portée : 20 m", "Angle : 110°", "Même étage uniquement"],
      ["Portée : 30 m", "Angle : 110°", "Affichage de l’intensité", "Même étage uniquement"],
      ["Portée : 30 m", "Angle : 110°", "Direction, distance et volume", "Détecte un étage au-dessus ou en dessous"]
    ]
  },
  {
    category: "support", name: "Trépied",
    summary: "Stabilise une caméra vidéo et permet de surveiller une zone depuis le camion.",
    tip: "Place-le face aux D.O.T.S., au livre ou à une zone d’interaction pour observer plusieurs preuves sur le même écran.",
    tiers: [
      ["Support fixe", "Peut être renversé"],
      ["Rotation motorisée depuis le camion", "Stabilité améliorée"],
      ["Rotation motorisée depuis le camion", "Résistance élevée aux projections"]
    ]
  },
  {
    category: "survival", name: "Allumeur",
    summary: "Allume l’encens, les lumières à feu, les cercles d’invocation et les autres sources de feu.",
    tip: "Il n’occupe pas de main dédiée lorsqu’il est utilisé pour allumer un autre objet tenu.",
    tiers: [
      ["10 utilisations", "Flamme : 10 s"],
      ["Carburant : 5 min", "Réutilisable"],
      ["Carburant : 10 min", "Réutilisable", "Résiste à la pluie"]
    ]
  },
  {
    category: "survival", name: "Crucifix",
    summary: "Empêche une chasse de commencer lorsque l’entité tente de la déclencher dans sa zone d’action.",
    tip: "La portée est augmentée de 50 % contre un Démon. Répartis les crucifix pour couvrir les zones où l’entité se déplace.",
    tiers: [
      ["Portée : 3 m", "1 utilisation"],
      ["Portée : 4 m", "2 utilisations"],
      ["Portée : 5 m", "2 utilisations", "Peut bloquer une chasse maudite"]
    ]
  },
  {
    category: "survival", name: "Encens",
    summary: "Bloque temporairement les chasses hors chasse et désoriente l’entité lorsqu’elle poursuit un joueur.",
    tip: "Hors chasse, le blocage dure 1 min 30 normalement, 1 min pour un Démon et 3 min pour un Esprit.",
    tiers: [
      ["Combustion : 5 s", "Portée : 3 m", "Désorientation : 5 s"],
      ["Combustion : 6 s", "Portée : 4 m", "Désorientation : 5 s", "Ralentit l’entité à 50 %"],
      ["Combustion : 7 s", "Portée : 5 m", "Désorientation : 5 s", "Immobilise l’entité"]
    ]
  },
  {
    category: "survival", name: "Lumière à feu",
    summary: "Éclaire une petite zone et réduit la perte de santé mentale tant qu’elle brûle à proximité.",
    tip: "Une flamme peut agir comme protection face à un Onryo, qui cherchera à l’éteindre avant de consumer un crucifix.",
    tiers: [
      ["Durée : 3 min", "Réduction de perte de santé mentale : 33 %", "Portée : 2 m"],
      ["Durée : 5 min", "Réduction de perte de santé mentale : 50 %", "Portée : 2 m"],
      ["Durée illimitée", "Réduction de perte de santé mentale : 66 %", "Portée : 2 m", "Résiste à la pluie"]
    ]
  },
  {
    category: "survival", name: "Pilule de santé mentale",
    summary: "Restaure une part de santé mentale définie par la difficulté et peut lever la malédiction du Moroï.",
    tip: "Surveille la moyenne du groupe : c’est elle qui détermine le seuil de chasse de la plupart des entités.",
    tiers: [
      ["Restauration : 20 s"],
      ["Restauration : 10 s"],
      ["Restauration : 10 s", "Sprint sans épuisement : 10 s"]
    ]
  },
  {
    category: "survival", name: "Sel",
    summary: "Marque les passages de l’entité et permet de révéler des traces de pas avec une source UV.",
    tip: "Un Spectre ne marche jamais dans le sel. Les traces de pas UV peuvent aussi aider à distinguer un Obake.",
    tiers: [
      ["2 tas circulaires"],
      ["3 lignes de sel", "Zone plus large"],
      ["3 lignes de sel noir", "Force un demi-tour hors chasse", "Ralentit de 50 % pendant 2 s en chasse", "Ralentissement : 3 s contre un Gallu affaibli"]
    ]
  }
];

const cursedPossessions = [
  {
    name: "Miroir hanté",
    summary: "Montre en direct la pièce favorite de l’entité à travers une vue panoramique déformée.",
    tip: "Observe quelques secondes, mémorise les éléments distinctifs de la pièce puis baisse immédiatement le miroir pour limiter la perte de santé mentale.",
    panels: [
      { title: "Utilisation", facts: ["Prends le miroir puis utilise-le à l’intérieur du lieu d’enquête.", "La vision révèle la pièce favorite actuelle, pas nécessairement la position exacte de l’entité."] },
      { title: "Effets & coûts", facts: ["Coût minimal : 20 % de santé mentale par utilisation.", "Au-delà de quelques secondes : perte d’environ 7,5 % par seconde.", "Objet utilisable plusieurs fois tant qu’il reste intact."] },
      { title: "Risques", facts: ["À 20 % de santé mentale ou moins, son activation le brise immédiatement.", "Atteindre 0 % pendant la vision brise le miroir et déclenche une chasse maudite depuis la position de l’entité."] }
    ]
  },
  {
    name: "Boîte à musique",
    summary: "Force l’entité à chanter afin de révéler sa position et peut provoquer une apparition contrôlée.",
    tip: "Active-la depuis une zone sûre et pose-la doucement : la jeter pendant qu’elle joue déclenche immédiatement une chasse maudite.",
    panels: [
      { title: "Utilisation", facts: ["Une seule utilisation par contrat.", "L’entité chante si elle se trouve à moins de 20 m.", "À environ 5 m, elle se manifeste et marche vers la boîte."] },
      { title: "Effets & coûts", facts: ["Mélodie d’environ 30 secondes.", "Les joueurs à moins de 2,5 m perdent environ 2,5 % de santé mentale par seconde.", "Permet de localiser l’entité et de préparer une photo ou une vidéo."] },
      { title: "Risques", facts: ["Une chasse maudite commence si l’entité atteint la boîte ou si la manifestation dure trop longtemps.", "La jeter, ou atteindre 0 % de santé mentale à proximité pendant la musique, interrompt la mélodie et déclenche la chasse."] }
    ]
  },
  {
    name: "Planche Ouija",
    summary: "Permet de poser des questions à l’entité en échange d’une quantité variable de santé mentale.",
    tip: "Dis toujours « Au revoir » avant de t’éloigner. La planchette doit quitter la planche pour confirmer que la session est terminée.",
    panels: [
      { title: "Questions utiles", facts: ["Pièce favorite ou emplacement de l’os : 50 %.", "Présence, proximité, nombre de personnes ou réponse seul/tous : 20 %.", "Âge, mort, humeur, santé mentale, « Marco » ou « Toc toc » : 5 %."] },
      { title: "Indices obtenus", facts: ["La planchette épelle la réponse sur la planche.", "Chaque réponse produit un E.M.F. 2 ou 3, avec une possibilité d’E.M.F. 5 si cette preuve est disponible.", "L’âge donné évolue lorsqu’un Thayé vieillit."] },
      { title: "Risques", facts: ["Une question trop coûteuse ou une santé mentale insuffisante brise la planche et déclenche une chasse maudite.", "Quitter une planche active sans dire « Au revoir » la brise.", "« Cache-cache » lance un compte à rebours de 5 secondes avant une chasse maudite."] }
    ]
  },
  {
    name: "Poupée vaudou torturée",
    summary: "Enfonce aléatoirement ses épingles pour forcer l’entité à effectuer une interaction.",
    tip: "Place un lecteur E.M.F. et un livre dans la zone active avant de l’utiliser : les interactions forcées peuvent aider à obtenir ces preuves.",
    panels: [
      { title: "Utilisation", facts: ["La poupée contient 10 épingles utilisables dans un ordre aléatoire.", "Chaque épingle normale force une interaction près de la position actuelle de l’entité."] },
      { title: "Effets & coûts", facts: ["Épingle normale : 5 % de santé mentale.", "Épingle du cœur : 10 % et chasse maudite immédiate.", "Une interaction forcée peut produire un E.M.F. 5 ou une écriture si l’entité possède la preuve correspondante."] },
      { title: "Risques", facts: ["L’épingle du cœur peut sortir à n’importe quel moment.", "Si la santé mentale est insuffisante, toutes les épingles restantes s’enfoncent et une chasse maudite commence."] }
    ]
  },
  {
    name: "Cercle d’invocation",
    summary: "Téléporte l’entité au centre du cercle pour une courte manifestation, puis déclenche une chasse maudite.",
    tip: "Prépare l’appareil photo, une cachette et ton trajet de fuite avant d’allumer la cinquième bougie.",
    panels: [
      { title: "Utilisation", facts: ["Allume les 5 bougies avec un allumeur ou une lumière à feu.", "Le cercle ne peut pas être déplacé et ne fonctionne qu’une seule fois.", "L’entité apparaît au centre pendant environ 5 secondes si les conditions sont réunies."] },
      { title: "Effets & coûts", facts: ["Chaque bougie retire 16 % de santé mentale aux joueurs proches, soit 80 % au total.", "La manifestation donne une excellente occasion de prendre une photo ou une vidéo de l’entité.", "Elle produit un E.M.F. 4 et peut activer le sel ou un capteur présent dans le cercle."] },
      { title: "Risques", facts: ["Après la manifestation, une chasse maudite part du cercle.", "Sans assez de santé mentale, les bougies peuvent s’éteindre ou la chasse commencer sans délai de préparation.", "Pendant une chasse déjà active, l’entité est téléportée au cercle sans période de sécurité."] }
    ]
  },
  {
    name: "Cartes de tarot",
    summary: "Un paquet de 10 cartes aux effets bénéfiques, dangereux ou mortels tirés au hasard.",
    tip: "Ne tire jamais de carte sans connaître une cachette. Pendant une chasse, toutes les cartes deviennent « Le Fou » et sont gaspillées.",
    panels: [
      { title: "Effets fréquents", facts: ["La Tour — 20 % : interaction et activité doublée pendant 20 s.", "Roue de la Fortune — 20 % : gagne ou perd 25 % de santé mentale.", "Le Fou — 17 % : imite une carte puis ne produit aucun effet.", "Le Diable — 10 % : provoque une apparition près d’un joueur."] },
      { title: "Effets dangereux", facts: ["La Mort — 10 % : déclenche une chasse maudite.", "L’Ermite — 10 % : renvoie l’entité dans sa pièce et l’y enferme 1 minute.", "Le Soleil — 5 % : fixe ta santé mentale à 100 %.", "La Lune — 5 % : fixe ta santé mentale à 0 %."] },
      { title: "Effets très rares", facts: ["La Grande Prêtresse — 2 % : ressuscite un joueur mort, ou protège le prochain joueur qui meurt.", "Le Pendu — 1 % : tue immédiatement celui qui a tiré la carte.", "Le paquet disparaît après le dixième tirage : photographie-le avant de l’épuiser."] }
    ]
  },
  {
    name: "Patte de singe",
    summary: "Exauce plusieurs souhaits puissants, chacun accompagné d’une contrepartie dangereuse.",
    tip: "Dépose la patte si tu ne veux pas déclencher un souhait par erreur. L’interface texte évite les mauvaises interprétations vocales.",
    panels: [
      { title: "Nombre de souhaits", facts: ["Multiplicateur de 0 à 1,99 : 5 souhaits.", "Multiplicateur de 2 à 2,99 : 4 souhaits.", "Multiplicateur de 3 ou plus : 3 souhaits.", "Un même souhait ne peut pas être répété."] },
      { title: "Souhaits d’enquête", facts: ["Voir l’entité : apparition 5 s, puis chasse maudite et vision obscurcie pendant la chasse.", "Activité : activité doublée 2 min, mais sorties verrouillées et tableau électrique détruit.", "Connaissance : élimine une mauvaise preuve, mais brouille les sens et lance une chasse près du joueur.", "Santé mentale : tous les joueurs passent à 50 %, avec perte passive accrue et nouvelle pièce favorite."] },
      { title: "Souhaits de survie", facts: ["Piéger l’entité : la bloque 1 min dans sa pièce, puis déclenche une chasse maudite.", "Être en sécurité : ouvre une cachette, mais brise les lumières et rend le joueur détectable à toute distance.", "Partir : déverrouille les sorties, même en chasse, mais ralentit et aveugle brièvement.", "Ressusciter : ramène un joueur mort avec 50 % de risque de tuer celui qui formule le souhait.", "Météo : change le temps, aveugle brièvement et coûte 25 % de santé mentale. « N’importe quoi » choisit un souhait au hasard."] }
    ]
  }
];

const cursedImageSlugs = {
  "Miroir hanté": "haunted-mirror",
  "Boîte à musique": "music-box",
  "Planche Ouija": "ouija-board",
  "Poupée vaudou torturée": "voodoo-doll",
  "Cercle d’invocation": "summoning-circle",
  "Cartes de tarot": "tarot-cards",
  "Patte de singe": "monkey-paw"
};

const mapCategories = [
  { id: "small", label: "Maps small", description: "Lieux compacts et variantes Restricted" },
  { id: "medium", label: "Maps medium", description: "Lieux étendus et secteurs Restricted" },
  { id: "large", label: "Maps large", description: "Cartes complètes de très grande taille" }
];

const mapPlans = [
  { category: "small", name: "10 Ridgeview Court", image: "ridgeview.webp" },
  { category: "small", name: "42 Edgefield Road", image: "edgefield.webp" },
  { category: "small", name: "Grafton Farmhouse", image: "grafton.webp" },
  { category: "small", name: "Nell’s Diner", image: "nells-diner.webp" },
  { category: "small", name: "Point Hope Restricted", image: "point-hope-restricted.webp" },
  { category: "small", name: "Prison Restricted — plan 1", image: "prison-restricted-a.webp" },
  { category: "small", name: "Prison Restricted — plan 2", image: "prison-restricted-b.webp" },
  { category: "small", name: "6 Tanglewood Drive", image: "tanglewood.webp" },
  { category: "small", name: "13 Willow Street", image: "willow.webp" },
  { category: "small", name: "Camp Woodwind", image: "camp-woodwind.webp" },
  { category: "medium", name: "Bleasdale Farmhouse", image: "bleasdale.webp" },
  { category: "medium", name: "Brownstone High School Restricted — plan 1", image: "brownstone-restricted-a.webp" },
  { category: "medium", name: "Brownstone High School Restricted — plan 2", image: "brownstone-restricted-b.webp" },
  { category: "medium", name: "Brownstone High School Restricted — plan 3", image: "brownstone-restricted-c.webp" },
  { category: "medium", name: "Brownstone High School Restricted — plan 4", image: "brownstone-restricted-d.webp" },
  { category: "medium", name: "Maple Lodge Campsite", image: "maple-lodge.webp" },
  { category: "medium", name: "Point Hope", image: "point-hope.webp" },
  { category: "medium", name: "Prison", image: "prison.webp" },
  { category: "medium", name: "Sunny Meadows Restricted — plan 1", image: "sunny-meadows-restricted-a.webp" },
  { category: "medium", name: "Sunny Meadows Restricted — plan 2", image: "sunny-meadows-restricted-b.webp" },
  { category: "medium", name: "Sunny Meadows Restricted — plan 3", image: "sunny-meadows-restricted-c.webp" },
  { category: "medium", name: "Sunny Meadows Restricted — plan 4", image: "sunny-meadows-restricted-d.webp" },
  { category: "medium", name: "Sunny Meadows Restricted — plan 5", image: "sunny-meadows-restricted-e.webp" },
  { category: "large", name: "Brownstone High School", image: "brownstone.webp" },
  { category: "large", name: "Sunny Meadows", image: "sunny-meadows.webp" }
];

const viewLabels = {
  entities: "Les Entités",
  tips: "Tips divers",
  equipment: "Équipements",
  cursed: "Objets maudits",
  maps: "Maps"
};

const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
let globalSearchIndex = [];
let visibleGlobalResults = [];
let activeGlobalResult = -1;

function buildGlobalSearchIndex() {
  const tipItems = [...document.querySelectorAll('[data-view-panel="tips"] .tips-section')].map((section) => ({
    type: "Conseil",
    title: section.querySelector("h3")?.textContent || "Tips divers",
    description: section.querySelector("header p:last-child")?.textContent || "Tips divers",
    view: "tips",
    targetId: section.id,
    searchText: section.textContent
  }));

  globalSearchIndex = [
    ...entities.map((entity) => ({
      type: "Entité",
      title: entity.name,
      description: `${entity.evidence.join(" · ")} · ${entity.speed}`,
      view: "entities",
      entityName: entity.name,
      searchText: [entity.name, entity.gender, entity.sanity, entity.speed, ...entity.evidence, ...entity.behaviors, ...entity.tests].join(" ")
    })),
    ...equipment.map((item) => ({
      type: "Équipement",
      title: item.name,
      description: item.summary,
      view: "equipment",
      itemName: item.name,
      searchText: [item.name, item.summary, item.tip, ...item.tiers.flat()].join(" ")
    })),
    ...cursedPossessions.map((item) => ({
      type: "Objet maudit",
      title: item.name,
      description: item.summary,
      view: "cursed",
      itemName: item.name,
      searchText: [item.name, item.summary, item.tip, ...item.panels.flatMap((panel) => [panel.title, ...panel.facts])].join(" ")
    })),
    ...mapPlans.map((plan) => ({
      type: "Map",
      title: plan.name,
      description: mapCategories.find((category) => category.id === plan.category)?.label || "Map",
      view: "maps",
      plan,
      searchText: `${plan.name} ${plan.category}`
    })),
    ...tipItems
  ].map((item) => ({ ...item, normalizedSearchText: normalize(`${item.title} ${item.description} ${item.searchText}`) }));
}

function closeGlobalSearch() {
  globalSearchResults.hidden = true;
  globalSearchInput.setAttribute("aria-expanded", "false");
  visibleGlobalResults = [];
  activeGlobalResult = -1;
}

function setActiveGlobalResult(index) {
  const buttons = [...globalSearchResults.querySelectorAll(".global-search-result")];
  if (!buttons.length) return;
  activeGlobalResult = (index + buttons.length) % buttons.length;
  buttons.forEach((button, buttonIndex) => {
    const isActive = buttonIndex === activeGlobalResult;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", isActive);
  });
  buttons[activeGlobalResult].scrollIntoView({ block: "nearest" });
}

function renderGlobalSearchResults() {
  const query = normalize(globalSearchInput.value.trim());
  globalSearchResults.innerHTML = "";
  activeGlobalResult = -1;

  if (!query) {
    closeGlobalSearch();
    return;
  }

  const tokens = query.split(/\s+/).filter(Boolean);
  visibleGlobalResults = globalSearchIndex
    .filter((item) => tokens.every((token) => item.normalizedSearchText.includes(token)))
    .sort((a, b) => {
      const aTitle = normalize(a.title);
      const bTitle = normalize(b.title);
      const aScore = aTitle.startsWith(query) ? 0 : aTitle.includes(query) ? 1 : 2;
      const bScore = bTitle.startsWith(query) ? 0 : bTitle.includes(query) ? 1 : 2;
      return aScore - bScore || a.title.localeCompare(b.title, "fr");
    })
    .slice(0, 10);

  if (!visibleGlobalResults.length) {
    const empty = document.createElement("p");
    empty.className = "global-search-empty";
    empty.textContent = "Aucun résultat dans le guide";
    globalSearchResults.append(empty);
  } else {
    visibleGlobalResults.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "global-search-result";
      button.dataset.resultIndex = index;
      button.setAttribute("role", "option");
      button.setAttribute("aria-selected", "false");
      const title = document.createElement("strong");
      title.textContent = item.title;
      const description = document.createElement("span");
      description.textContent = item.description;
      const type = document.createElement("small");
      type.textContent = item.type;
      button.append(title, description, type);
      globalSearchResults.append(button);
    });
  }

  globalSearchResults.hidden = false;
  globalSearchInput.setAttribute("aria-expanded", "true");
}

function flashSearchTarget(element) {
  if (!element) return;
  element.classList.remove("search-target-flash");
  void element.offsetWidth;
  element.classList.add("search-target-flash");
  window.setTimeout(() => element.classList.remove("search-target-flash"), 1800);
}

function revealEntityFromGlobalSearch(entityName) {
  Object.keys(evidenceStates).forEach((key) => evidenceStates[key] = 0);
  selectedSpeedTiers.clear();
  speedFilters.querySelectorAll(".speed-filter").forEach((button) => button.setAttribute("aria-pressed", "false"));
  sanityFilter.value = "10";
  syncSanityFilter();
  selectedGenders.clear();
  genderFilters.querySelectorAll(".gender-filter").forEach((button) => button.setAttribute("aria-pressed", "false"));
  searchInput.value = entityName;
  renderFilters();
  renderCards();
  const card = [...grid.querySelectorAll(".entity-card")].find((item) => item.dataset.name === entityName);
  card?.scrollIntoView({ behavior: "smooth", block: "center" });
  flashSearchTarget(card);
}

function openGlobalSearchResult(item) {
  closeGlobalSearch();
  showView(item.view);
  window.requestAnimationFrame(() => {
    if (item.view === "entities") {
      revealEntityFromGlobalSearch(item.entityName);
      return;
    }
    if (item.view === "equipment" || item.view === "cursed") {
      const catalog = item.view === "equipment" ? equipmentCatalog : cursedCatalog;
      const card = [...catalog.querySelectorAll(".equipment-card")].find((element) => element.dataset.itemName === item.itemName);
      if (card) card.open = true;
      card?.scrollIntoView({ behavior: "smooth", block: "center" });
      flashSearchTarget(card);
      return;
    }
    if (item.view === "maps") {
      const category = mapCategories.find((entry) => entry.id === item.plan.category);
      openMapDialog(item.plan, category);
      return;
    }
    const target = document.getElementById(item.targetId);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    flashSearchTarget(target);
  });
}

function renderEquipment() {
  equipmentCatalog.innerHTML = "";
  equipmentCount.textContent = equipment.length;

  equipmentCategories.forEach((category) => {
    const items = equipment.filter((item) => item.category === category.id);
    const section = document.createElement("section");
    section.className = "equipment-category";
    section.id = `equipment-${category.id}`;

    const heading = document.createElement("header");
    heading.className = "equipment-category-heading";
    const headingCopy = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = category.label;
    const description = document.createElement("p");
    description.textContent = category.description;
    const count = document.createElement("p");
    count.textContent = `${items.length} équipements`;
    headingCopy.append(title, description);
    heading.append(headingCopy, count);

    const list = document.createElement("div");
    list.className = "equipment-list";

    items.forEach((item) => {
      const card = document.createElement("details");
      card.className = "equipment-card";
      card.dataset.itemName = item.name;

      const summary = document.createElement("summary");
      const summaryCopy = document.createElement("div");
      const kicker = document.createElement("p");
      kicker.className = "equipment-card-kicker";
      kicker.textContent = `${category.itemLabel}${item.starter ? " · équipement de départ" : ""}`;
      const name = document.createElement("h4");
      name.textContent = item.name;
      const itemSummary = document.createElement("p");
      itemSummary.className = "equipment-summary";
      itemSummary.textContent = item.summary;
      summaryCopy.append(kicker, name, itemSummary);
      summary.append(summaryCopy);

      const body = document.createElement("div");
      body.className = "equipment-body";
      const tip = document.createElement("div");
      tip.className = "equipment-tip";
      const tipLabel = document.createElement("strong");
      tipLabel.textContent = "Tip";
      const tipText = document.createElement("p");
      tipText.textContent = item.tip;
      tip.append(tipLabel, tipText);

      const tiers = document.createElement("div");
      tiers.className = "equipment-tiers";
      item.tiers.forEach((facts, index) => {
        const tier = document.createElement("section");
        tier.className = "equipment-tier";
        const image = document.createElement("img");
        image.src = `equipment-images/${equipmentImageSlugs[item.name]}-t${index + 1}.webp`;
        image.alt = `${item.name}, tier ${index + 1}`;
        image.width = 500;
        image.height = 500;
        image.loading = "lazy";
        image.decoding = "async";
        const tierTitle = document.createElement("h5");
        tierTitle.textContent = `Tier ${index + 1}`;
        const level = document.createElement("p");
        level.className = "equipment-level";
        level.textContent = `Niveau requis : ${equipmentLevels[item.name][index]}`;
        const factsList = document.createElement("ul");
        facts.forEach((fact) => {
          const factItem = document.createElement("li");
          factItem.textContent = fact;
          factsList.append(factItem);
        });
        tier.append(image, tierTitle, level, factsList);
        tiers.append(tier);
      });

      body.append(tip, tiers);
      card.append(summary, body);
      list.append(card);
    });

    section.append(heading, list);
    equipmentCatalog.append(section);
  });
}

function renderCursedPossessions() {
  cursedCatalog.innerHTML = "";
  cursedCount.textContent = cursedPossessions.length;

  const section = document.createElement("section");
  section.className = "equipment-category";
  const heading = document.createElement("header");
  heading.className = "equipment-category-heading";
  const headingCopy = document.createElement("div");
  const title = document.createElement("h3");
  title.textContent = "Guide des possessions";
  const description = document.createElement("p");
  description.textContent = "Ouvre une fiche pour consulter ses effets et ses dangers";
  const count = document.createElement("p");
  count.textContent = `${cursedPossessions.length} objets`;
  headingCopy.append(title, description);
  heading.append(headingCopy, count);

  const list = document.createElement("div");
  list.className = "equipment-list cursed-list";

  cursedPossessions.forEach((item) => {
    const card = document.createElement("details");
    card.className = "equipment-card cursed-card";
    card.dataset.itemName = item.name;
    const summary = document.createElement("summary");
    const summaryCopy = document.createElement("div");
    const kicker = document.createElement("p");
    kicker.className = "equipment-card-kicker";
    kicker.textContent = "Objet maudit";
    const name = document.createElement("h4");
    name.textContent = item.name;
    const itemSummary = document.createElement("p");
    itemSummary.className = "equipment-summary";
    itemSummary.textContent = item.summary;
    summaryCopy.append(kicker, name, itemSummary);
    summary.append(summaryCopy);

    const body = document.createElement("div");
    body.className = "equipment-body";
    const imageWrap = document.createElement("div");
    imageWrap.className = "cursed-image-wrap";
    const image = document.createElement("img");
    image.className = "cursed-card-image";
    image.src = `cursed-images/${cursedImageSlugs[item.name]}.webp`;
    image.alt = item.name;
    image.width = 1080;
    image.height = 1080;
    image.loading = "lazy";
    image.decoding = "async";
    imageWrap.append(image);
    const tip = document.createElement("div");
    tip.className = "equipment-tip";
    const tipLabel = document.createElement("strong");
    tipLabel.textContent = "Conseil";
    const tipText = document.createElement("p");
    tipText.textContent = item.tip;
    tip.append(tipLabel, tipText);

    const panels = document.createElement("div");
    panels.className = "equipment-tiers cursed-panels";
    item.panels.forEach((panel) => {
      const panelElement = document.createElement("section");
      panelElement.className = "equipment-tier cursed-panel";
      const panelTitle = document.createElement("h5");
      panelTitle.textContent = panel.title;
      const factsList = document.createElement("ul");
      panel.facts.forEach((fact) => {
        const factItem = document.createElement("li");
        factItem.textContent = fact;
        factsList.append(factItem);
      });
      panelElement.append(panelTitle, factsList);
      panels.append(panelElement);
    });

    body.append(imageWrap, tip, panels);
    card.append(summary, body);
    list.append(card);
  });

  section.append(heading, list);
  cursedCatalog.append(section);
}

function openMapDialog(plan, category) {
  mapDialogTitle.textContent = plan.name;
  mapDialogSize.textContent = category.label;
  mapDialogImage.src = `map-images/${plan.image}`;
  mapDialogImage.alt = `Plan de ${plan.name}`;
  mapDialog.showModal();
  document.body.classList.add("dialog-open");
}

function renderMaps() {
  mapsCatalog.innerHTML = "";
  mapCount.textContent = mapPlans.length;

  mapCategories.forEach((category) => {
    const plans = mapPlans.filter((plan) => plan.category === category.id);
    const section = document.createElement("section");
    section.className = "map-category";
    section.id = `maps-${category.id}`;

    const heading = document.createElement("header");
    heading.className = "equipment-category-heading map-category-heading";
    const headingCopy = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = category.label;
    const description = document.createElement("p");
    description.textContent = category.description;
    const count = document.createElement("p");
    count.textContent = `${plans.length} plans`;
    headingCopy.append(title, description);
    heading.append(headingCopy, count);

    const grid = document.createElement("div");
    grid.className = "map-grid";
    plans.forEach((plan) => {
      const card = document.createElement("button");
      card.className = "map-card";
      card.type = "button";
      card.setAttribute("aria-label", `Ouvrir le plan de ${plan.name}`);
      const imageShell = document.createElement("span");
      imageShell.className = "map-card-image";
      const image = document.createElement("img");
      image.src = `map-images/${plan.image}`;
      image.alt = `Plan de ${plan.name}`;
      image.width = 1700;
      image.height = 970;
      image.loading = "lazy";
      image.decoding = "async";
      imageShell.append(image);
      const copy = document.createElement("span");
      copy.className = "map-card-copy";
      const kicker = document.createElement("span");
      kicker.className = "map-card-kicker";
      kicker.textContent = category.label;
      const name = document.createElement("strong");
      name.textContent = plan.name;
      const action = document.createElement("span");
      action.className = "map-card-action";
      action.textContent = "Voir en grand";
      copy.append(kicker, name, action);
      card.append(imageShell, copy);
      card.addEventListener("click", () => openMapDialog(plan, category));
      grid.append(card);
    });

    section.append(heading, grid);
    mapsCatalog.append(section);
  });
}

mapDialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  mapDialogImage.removeAttribute("src");
});

mapDialog.addEventListener("click", (event) => {
  if (event.target === mapDialog) mapDialog.close();
});

function saveMarks() {
  localStorage.setItem("phasmo-pinned", JSON.stringify([...pinned]));
  localStorage.setItem("phasmo-dismissed", JSON.stringify([...dismissed]));
  persistInvestigation();
}

function persistInvestigation() {
  const timers = Object.fromEntries(Object.entries(timerStates).map(([key, state]) => {
    const status = document.querySelector(`[data-timer="${key}"] .timer-status`);
    return [key, {
      duration: state.duration,
      remainingMs: state.remainingMs,
      running: state.running,
      endAt: state.endAt,
      alerted: [...state.alerted],
      statusText: status?.textContent || ""
    }];
  }));

  localStorage.setItem(investigationStorageKey, JSON.stringify({
    evidenceStates,
    selectedEvidenceCount,
    selectedSpeedTiers: [...selectedSpeedTiers],
    selectedGenders: [...selectedGenders],
    sanity: Number(sanityFilter.value),
    search: searchInput.value,
    selectedMapSize,
    notes: investigationNotes.value,
    notesOpen: investigationNotesPanel.open,
    activeView: viewButtons.find((button) => button.getAttribute("aria-current") === "page")?.dataset.view || "entities",
    pinned: [...pinned],
    dismissed: [...dismissed],
    timers
  }));
}

function restoreInvestigation() {
  sanityFilter.value = String(Math.min(100, Math.max(10, Number(storedInvestigation.sanity) || 10)));
  searchInput.value = typeof storedInvestigation.search === "string" ? storedInvestigation.search : "";
  investigationNotes.value = typeof storedInvestigation.notes === "string" ? storedInvestigation.notes : "";
  investigationNotesPanel.open = Boolean(storedInvestigation.notesOpen || investigationNotes.value);

  speedFilters.querySelectorAll(".speed-filter").forEach((button) => {
    button.setAttribute("aria-pressed", selectedSpeedTiers.has(button.dataset.speed));
  });
  genderFilters.querySelectorAll(".gender-filter").forEach((button) => {
    button.setAttribute("aria-pressed", selectedGenders.has(button.dataset.gender));
  });
  mapSizeOptions.querySelectorAll("[data-map-size]").forEach((button) => {
    button.setAttribute("aria-pressed", button.dataset.mapSize === selectedMapSize);
  });
  timerStates.hunt.duration = huntDurations[selectedMapSize];
  timerDefinitions.hunt.duration = huntDurations[selectedMapSize];
  huntTimerNote.textContent = `Map ${selectedMapSize} · ${timerStates.hunt.duration} s · alerte 20 % avant la fin`;

  let huntExpiredWhileAway = false;
  const now = Date.now();
  Object.entries(timerStates).forEach(([key, state]) => {
    const saved = storedInvestigation.timers?.[key];
    if (!saved) {
      renderTimer(key);
      return;
    }
    state.duration = key === "hunt" ? huntDurations[selectedMapSize] : timerDefinitions[key].duration;
    state.alerted = new Set(Array.isArray(saved.alerted) ? saved.alerted : []);
    state.endAt = Number.isFinite(saved.endAt) ? saved.endAt : null;
    state.running = Boolean(saved.running && state.endAt);
    state.remainingMs = Number.isFinite(saved.remainingMs)
      ? Math.min(state.duration * 1000, Math.max(0, saved.remainingMs))
      : state.duration * 1000;

    if (state.running) {
      state.remainingMs = Math.max(0, state.endAt - now);
      if (state.remainingMs <= 0) {
        state.running = false;
        if (key === "hunt") huntExpiredWhileAway = true;
      }
    }

    const card = document.querySelector(`[data-timer="${key}"]`);
    const status = card.querySelector(".timer-status");
    status.textContent = state.remainingMs <= 0
      ? timerDefinitions[key].completionText
      : (typeof saved.statusText === "string" ? saved.statusText : "");
    card.classList.toggle("alert", Boolean(status.textContent && state.remainingMs > 0));
    renderTimer(key);
  });

  if (huntExpiredWhileAway && !timerStates.huntCooldown.running) {
    const huntEndAt = Number(storedInvestigation.timers?.hunt?.endAt);
    const cooldownEndAt = huntEndAt + timerDefinitions.huntCooldown.duration * 1000;
    const cooldown = timerStates.huntCooldown;
    cooldown.endAt = cooldownEndAt;
    cooldown.remainingMs = Math.max(0, cooldownEndAt - now);
    cooldown.running = cooldown.remainingMs > 0;
    const cooldownStatus = document.querySelector('[data-timer="huntCooldown"] .timer-status');
    cooldownStatus.textContent = cooldown.running ? "" : timerDefinitions.huntCooldown.completionText;
    renderTimer("huntCooldown");
  }

  Object.entries(timerStates).forEach(([key, state]) => {
    if (!state.running) return;
    state.intervalId = window.setInterval(() => updateTimer(key), 200);
    updateTimer(key);
  });

  const requestedView = viewLabels[storedInvestigation.activeView] ? storedInvestigation.activeView : "entities";
  showView(requestedView, false);
}

function formatTimer(milliseconds) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function playTimerTone(isComplete = false) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = isComplete ? 880 : 660;
    gain.gain.setValueAtTime(.001, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(.15, context.currentTime + .02);
    gain.gain.exponentialRampToValueAtTime(.001, context.currentTime + (isComplete ? .38 : .24));
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + (isComplete ? .4 : .26));
    oscillator.addEventListener("ended", () => context.close());
  } catch (_) {
    // L’alerte visuelle reste disponible si le navigateur bloque le son.
  }
}

function renderTimer(key) {
  const state = timerStates[key];
  const card = document.querySelector(`[data-timer="${key}"]`);
  card.querySelector(".timer-display").textContent = formatTimer(state.remainingMs);
  card.querySelector(".timer-toggle").textContent = state.running ? "Pause" : state.remainingMs <= 0 ? "Recommencer" : "Démarrer";
  card.classList.toggle("running", state.running);
  card.classList.toggle("complete", state.remainingMs <= 0);
}

function stopTimer(key) {
  const state = timerStates[key];
  state.running = false;
  state.endAt = null;
  if (state.intervalId !== null) window.clearInterval(state.intervalId);
  state.intervalId = null;
}

function resetTimer(key) {
  const state = timerStates[key];
  stopTimer(key);
  state.remainingMs = state.duration * 1000;
  state.alerted.clear();
  const card = document.querySelector(`[data-timer="${key}"]`);
  card.classList.remove("alert", "complete");
  const status = card.querySelector(".timer-status");
  if (status) status.textContent = "";
  renderTimer(key);
  persistInvestigation();
}

function updateTimer(key) {
  const state = timerStates[key];
  const definition = timerDefinitions[key];
  if (!state.running || state.endAt === null) return;
  state.remainingMs = Math.max(0, state.endAt - Date.now());

  const elapsedSeconds = (state.duration * 1000 - state.remainingMs) / 1000;
  const dueAlerts = (definition.alerts || [])
    .map((alert, index) => ({
      ...alert,
      index,
      triggerAt: alert.elapsed ?? state.duration * alert.elapsedFraction
    }))
    .filter((alert) => !state.alerted.has(alert.index) && elapsedSeconds >= alert.triggerAt);

  if (dueAlerts.length) {
    dueAlerts.forEach((alert) => state.alerted.add(alert.index));
    const latestAlert = dueAlerts.at(-1);
    const card = document.querySelector(`[data-timer="${key}"]`);
    card.classList.add("alert");
    card.querySelector(".timer-status").textContent = latestAlert.text;
    playTimerTone(false);
    persistInvestigation();
  }

  if (state.remainingMs <= 0) {
    stopTimer(key);
    const card = document.querySelector(`[data-timer="${key}"]`);
    card.classList.remove("alert");
    const status = card.querySelector(".timer-status");
    if (status) status.textContent = definition.completionText || "Timer terminé";
    playTimerTone(true);
    persistInvestigation();
  }
  renderTimer(key);
  if (key === "hunt" && state.remainingMs <= 0) {
    resetTimer("huntCooldown");
    toggleTimer("huntCooldown");
  }
}

function toggleTimer(key) {
  const state = timerStates[key];
  if (state.running) {
    state.remainingMs = Math.max(0, state.endAt - Date.now());
    stopTimer(key);
    renderTimer(key);
    persistInvestigation();
    return;
  }
  if (state.remainingMs <= 0) resetTimer(key);
  state.running = true;
  state.endAt = Date.now() + state.remainingMs;
  state.intervalId = window.setInterval(() => updateTimer(key), 200);
  updateTimer(key);
  persistInvestigation();
}

document.querySelector("#timersGrid").addEventListener("click", (event) => {
  const card = event.target.closest(".timer-card");
  if (!card) return;
  if (event.target.closest(".timer-reset")) resetTimer(card.dataset.timer);
  else if (event.target.closest(".timer-toggle")) toggleTimer(card.dataset.timer);
});

mapSizeOptions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-map-size]");
  if (!button) return;
  selectedMapSize = button.dataset.mapSize;
  mapSizeOptions.querySelectorAll("[data-map-size]").forEach((option) => {
    option.setAttribute("aria-pressed", option === button);
  });
  const state = timerStates.hunt;
  state.duration = huntDurations[selectedMapSize];
  huntTimerNote.textContent = `Map ${selectedMapSize} · ${state.duration} s · alerte 20 % avant la fin`;
  resetTimer("hunt");
  persistInvestigation();
});

function setMenuOpen(isOpen) {
  menuButton.setAttribute("aria-expanded", isOpen);
  siteMenu.hidden = !isOpen;
}

function showView(view, shouldPersist = true) {
  viewPanels.forEach((panel) => panel.hidden = panel.dataset.viewPanel !== view);
  viewButtons.forEach((button) => {
    if (button.dataset.view === view) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  });
  brandTitle.textContent = viewLabels[view];
  resultCounterWrap.hidden = view !== "entities";
  setMenuOpen(false);
  if (shouldPersist) persistInvestigation();
}

menuButton.addEventListener("click", () => setMenuOpen(menuButton.getAttribute("aria-expanded") !== "true"));
siteMenu.addEventListener("click", (event) => {
  const button = event.target.closest("[data-view]");
  if (button) showView(button.dataset.view);
});
document.addEventListener("click", (event) => {
  if (!brandNav.contains(event.target)) setMenuOpen(false);
  if (!globalSearch.contains(event.target)) closeGlobalSearch();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuButton.focus();
  }
});

globalSearchInput.addEventListener("input", renderGlobalSearchResults);
globalSearchInput.addEventListener("focus", () => {
  if (globalSearchInput.value.trim()) renderGlobalSearchResults();
});
globalSearchInput.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown") {
    event.preventDefault();
    setActiveGlobalResult(activeGlobalResult + 1);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    setActiveGlobalResult(activeGlobalResult - 1);
  } else if (event.key === "Enter" && visibleGlobalResults.length) {
    event.preventDefault();
    openGlobalSearchResult(visibleGlobalResults[activeGlobalResult >= 0 ? activeGlobalResult : 0]);
  } else if (event.key === "Escape") {
    closeGlobalSearch();
  }
});
globalSearchResults.addEventListener("click", (event) => {
  const button = event.target.closest(".global-search-result");
  if (!button) return;
  openGlobalSearchResult(visibleGlobalResults[Number(button.dataset.resultIndex)]);
});

function makeTag(evidence, bonus = false, required = false) {
  const tag = document.createElement("span");
  tag.className = `evidence-tag${bonus ? " bonus" : ""}${required ? " required" : ""}`;
  const label = document.createElement("span");
  label.textContent = evidence;
  tag.append(label);
  tag.style.color = evidenceColors[evidence];
  tag.style.setProperty("--evidence", evidenceColors[evidence]);
  if (bonus) tag.title = "Preuve supplémentaire, même en mode zéro preuve";
  if (required) {
    const requiredLabel = document.createElement("span");
    requiredLabel.className = "evidence-required-label";
    requiredLabel.textContent = "Obligatoire";
    tag.append(requiredLabel);
    tag.title = `${evidence} est une preuve obligatoire dès qu’au moins une preuve est active`;
    tag.setAttribute("aria-label", `${evidence}, preuve obligatoire`);
  }
  return tag;
}

function combinations(items, count) {
  if (count === 0) return [[]];
  if (count > items.length) return [];
  return items.flatMap((item, index) => combinations(items.slice(index + 1), count - 1)
    .map((combination) => [item, ...combination]));
}

function possibleEvidenceSets(entity) {
  const bonusEvidence = entity.bonusEvidence ? [entity.bonusEvidence] : [];
  const standardEvidence = entity.evidence.filter((evidence) => evidence !== entity.bonusEvidence);
  return combinations(standardEvidence, selectedEvidenceCount)
    .filter((set) => selectedEvidenceCount === 0 || !entity.requiredEvidence || set.includes(entity.requiredEvidence))
    .map((set) => new Set([...set, ...bonusEvidence]));
}

function entityMatchesEvidence(entity, states = evidenceStates) {
  const confirmed = Object.entries(states).filter(([, state]) => state === 1).map(([evidence]) => evidence);
  const excluded = Object.entries(states).filter(([, state]) => state === -1).map(([evidence]) => evidence);
  return possibleEvidenceSets(entity).some((availableEvidence) =>
    confirmed.every((evidence) => availableEvidence.has(evidence))
    && excluded.every((evidence) => !availableEvidence.has(evidence))
  );
}

function canConfirmEvidence(evidence) {
  const simulatedStates = { ...evidenceStates, [evidence]: 1 };
  return entities.some((entity) => entityMatchesEvidence(entity, simulatedStates));
}

function updateEvidenceMode() {
  const noEvidenceMode = selectedEvidenceCount === 0;
  evidenceModeOptions.querySelectorAll("button").forEach((button) => {
    button.setAttribute("aria-pressed", Number(button.dataset.evidenceCount) === selectedEvidenceCount);
  });

  const messages = {
    3: "Mode standard : les trois preuves normales de chaque entité sont disponibles.",
    2: "Deux preuves par entité. Les preuves obligatoires des Deogen, Goryo, Hantu, Moroï et Obake restent garanties.",
    1: "Une seule preuve par entité : celle des Deogen, Goryo, Hantu, Moroï et Obake est obligatoirement celle qui apparaît.",
    0: "Aucune preuve normale. Seules les orbes supplémentaires du Mimic peuvent encore être observées."
  };
  evidenceModeNote.textContent = messages[selectedEvidenceCount];
  document.body.classList.toggle("no-evidence-mode", noEvidenceMode);
  filters.classList.toggle("bonus-only", noEvidenceMode);
  evidenceFilterHelp.textContent = noEvidenceMode
    ? "Mode sans preuve : seuls les orbes supplémentaires du Mimic restent utilisables comme indice."
    : "Clique une fois pour confirmer une preuve, deux fois pour l’exclure. Les preuves incompatibles sont automatiquement désactivées.";
  entitiesTitle.textContent = noEvidenceMode ? "Identification sans preuve" : "Entités compatibles";
  entitiesHeadingHint.textContent = noEvidenceMode
    ? "Comportements et tests distinctifs affichés en priorité"
    : "★ Épingle un suspect · × Écarte une piste";
}

function updateEvidenceFilterAvailability() {
  filters.querySelectorAll(".evidence-filter").forEach((button) => {
    const evidence = button.dataset.evidence;
    const state = evidenceStates[evidence];
    const isUnavailable = state === 0 && !canConfirmEvidence(evidence);
    button.disabled = isUnavailable;
    if (isUnavailable) {
      button.title = "Incompatible avec les preuves actuellement sélectionnées";
      button.setAttribute("aria-label", `${evidence} : incompatible avec les preuves sélectionnées`);
    } else {
      button.removeAttribute("title");
      const labels = { 0: "non définie", 1: "confirmée", "-1": "exclue" };
      button.setAttribute("aria-label", `${evidence} : ${labels[state]}`);
    }
  });
}

function renderFilters() {
  filters.innerHTML = "";
  Object.values(E).forEach((evidence) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "evidence-filter";
    button.textContent = evidence;
    button.dataset.evidence = evidence;
    button.dataset.state = evidenceStates[evidence];
    button.hidden = selectedEvidenceCount === 0 && evidence !== E.orbs;
    button.style.setProperty("--evidence", evidenceColors[evidence]);
    button.setAttribute("aria-label", `${evidence} : non définie`);
    button.addEventListener("click", () => {
      evidenceStates[evidence] = evidenceStates[evidence] === 0 ? 1 : evidenceStates[evidence] === 1 ? -1 : 0;
      button.dataset.state = evidenceStates[evidence];
      const labels = { 0: "non définie", 1: "confirmée", "-1": "exclue" };
      button.setAttribute("aria-label", `${evidence} : ${labels[evidenceStates[evidence]]}`);
      updateEvidenceFilterAvailability();
      renderCards();
      persistInvestigation();
    });
    filters.append(button);
  });
  updateEvidenceFilterAvailability();
}

function matchesFilters(entity) {
  const matchesEvidence = entityMatchesEvidence(entity);
  const matchesSpeed = [...selectedSpeedTiers].every((tier) => entity.speedTiers.includes(tier));
  const matchesSanity = entity.maxHuntSanity >= Number(sanityFilter.value);
  const matchesGender = [...selectedGenders].every((gender) => entity.gender.includes(gender));
  return matchesEvidence && matchesSpeed && matchesSanity && matchesGender;
}

function matchesSearch(entity, query) {
  if (!query) return true;
  const defenses = entity.defenses?.flatMap(({ state, incense, crucifix, salt }) => [state, incense, crucifix, salt]) || [];
  return normalize([entity.name, entity.gender, entity.sanity, entity.speed, ...entity.evidence, ...entity.behaviors, ...defenses, ...entity.tests].join(" ")).includes(query);
}

function setMetricLines(element, value) {
  value.split(" · ").forEach((line) => {
    const item = document.createElement("span");
    item.textContent = line;
    element.append(item);
  });
}

function renderCards() {
  const query = normalize(searchInput.value.trim());
  const matches = entities
    .filter((entity) => matchesFilters(entity) && matchesSearch(entity, query))
    .sort((a, b) => Number(pinned.has(b.name)) - Number(pinned.has(a.name)));

  grid.innerHTML = "";
  matches.forEach((entity) => {
    const noEvidenceMode = selectedEvidenceCount === 0;
    const card = template.content.firstElementChild.cloneNode(true);
    card.dataset.name = entity.name;
    card.classList.toggle("pinned", pinned.has(entity.name));
    card.classList.toggle("dismissed", dismissed.has(entity.name));
    card.classList.toggle("no-evidence-card", noEvidenceMode);
    card.querySelector("h3").textContent = `${entity.name} ${entity.gender}`;
    setMetricLines(card.querySelector(".sanity"), entity.sanity);
    setMetricLines(card.querySelector(".speed"), entity.speed);

    const evidenceList = card.querySelector(".evidence-list");
    if (noEvidenceMode) {
      if (entity.bonusEvidence) {
        const clueLabel = document.createElement("span");
        clueLabel.className = "no-evidence-clue-label";
        clueLabel.textContent = "Indice sans preuve";
        evidenceList.classList.add("no-evidence-clue");
        evidenceList.append(clueLabel, makeTag(entity.bonusEvidence, true));
      } else {
        evidenceList.hidden = true;
      }
    } else {
      entity.evidence.forEach((evidence) => evidenceList.append(makeTag(
        evidence,
        entity.bonusEvidence === evidence,
        entity.requiredEvidence === evidence
      )));
    }

    card.querySelector(".behaviors-title").hidden = !noEvidenceMode;
    const behaviors = card.querySelector(".behaviors");
    const visibleBehaviors = noEvidenceMode
      ? entity.behaviors.filter((behavior) => !behavior.startsWith("Preuve obligatoire"))
      : entity.behaviors;
    visibleBehaviors.forEach((behavior) => {
      const item = document.createElement("li");
      item.textContent = behavior;
      behaviors.append(item);
    });

    const defenseTable = card.querySelector(".defense-table-wrap");
    if (entity.defenses) {
      const body = defenseTable.querySelector("tbody");
      entity.defenses.forEach(({ state, incense, crucifix, salt }) => {
        const row = document.createElement("tr");
        [state, incense, crucifix, salt].forEach((value, index) => {
          const cell = document.createElement(index === 0 ? "th" : "td");
          if (index === 0) cell.scope = "row";
          cell.textContent = value;
          row.append(cell);
        });
        body.append(row);
      });
      defenseTable.hidden = false;
    }

    const tests = card.querySelector(".tests");
    entity.tests.forEach((test) => {
      const item = document.createElement("li");
      item.textContent = test;
      tests.append(item);
    });
    const testsDetails = card.querySelector("details");
    testsDetails.open = noEvidenceMode;
    testsDetails.querySelector("summary").textContent = noEvidenceMode
      ? "Tests d’identification sans preuve"
      : "Tests conseillés";

    const pinButton = card.querySelector(".pin-button");
    pinButton.setAttribute("aria-pressed", pinned.has(entity.name));
    pinButton.addEventListener("click", () => {
      pinned.has(entity.name) ? pinned.delete(entity.name) : pinned.add(entity.name);
      saveMarks();
      renderCards();
    });

    const dismissButton = card.querySelector(".dismiss-button");
    dismissButton.setAttribute("aria-pressed", dismissed.has(entity.name));
    dismissButton.addEventListener("click", () => {
      dismissed.has(entity.name) ? dismissed.delete(entity.name) : dismissed.add(entity.name);
      saveMarks();
      renderCards();
    });

    grid.append(card);
  });

  const possibleCount = matches.filter((entity) => !dismissed.has(entity.name)).length;
  resultCount.textContent = possibleCount;
  emptyState.hidden = matches.length !== 0;
}

searchInput.addEventListener("input", () => {
  renderCards();
  persistInvestigation();
});
investigationNotes.addEventListener("input", persistInvestigation);
investigationNotesPanel.addEventListener("toggle", persistInvestigation);
evidenceModeOptions.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-evidence-count]");
  if (!button) return;
  const nextCount = Number(button.dataset.evidenceCount);
  if (nextCount === selectedEvidenceCount) return;
  selectedEvidenceCount = nextCount;
  Object.keys(evidenceStates).forEach((key) => evidenceStates[key] = 0);
  updateEvidenceMode();
  renderFilters();
  renderCards();
  persistInvestigation();
});

speedFilters.addEventListener("click", (event) => {
  const button = event.target.closest(".speed-filter");
  if (!button) return;
  const tier = button.dataset.speed;
  selectedSpeedTiers.has(tier) ? selectedSpeedTiers.delete(tier) : selectedSpeedTiers.add(tier);
  button.setAttribute("aria-pressed", selectedSpeedTiers.has(tier));
  renderCards();
  persistInvestigation();
});

function syncSanityFilter() {
  const value = Number(sanityFilter.value);
  const progress = ((value - 10) / 90) * 100;
  sanityValue.textContent = `${value} % et +`;
  sanityFilter.style.setProperty("--range-progress", `${progress}%`);
}

sanityFilter.addEventListener("input", () => {
  syncSanityFilter();
  renderCards();
  persistInvestigation();
});

genderFilters.addEventListener("click", (event) => {
  const button = event.target.closest(".gender-filter");
  if (!button) return;
  const gender = button.dataset.gender;
  const wasSelected = selectedGenders.has(gender);
  selectedGenders.clear();
  if (!wasSelected) selectedGenders.add(gender);
  genderFilters.querySelectorAll(".gender-filter").forEach((filterButton) => {
    filterButton.setAttribute("aria-pressed", selectedGenders.has(filterButton.dataset.gender));
  });
  renderCards();
  persistInvestigation();
});

let lastTempoClick = null;
let tempoIntervals = [];

function resetTempo() {
  lastTempoClick = null;
  tempoIntervals = [];
  tempoSpeed.textContent = "—";
  tempoDetails.textContent = "Deux clics minimum pour calculer.";
}

tempoReset.addEventListener("click", resetTempo);

tempoButton.addEventListener("click", () => {
  const now = performance.now();
  const interval = lastTempoClick === null ? null : now - lastTempoClick;

  if (interval === null || interval > 3000) {
    tempoIntervals = [];
    lastTempoClick = now;
    tempoDetails.textContent = tempoSpeed.textContent === "—"
      ? "Premier pas enregistré, clique encore une fois."
      : "Nouvelle mesure commencée, clique encore une fois.";
    return;
  }

  tempoIntervals.push(interval);
  tempoIntervals = tempoIntervals.slice(-8);
  lastTempoClick = now;

  const averageInterval = tempoIntervals.reduce((total, value) => total + value, 0) / tempoIntervals.length;
  const clicksPerMinute = 60000 / averageInterval;
  const metersPerSecond = clicksPerMinute / 67.65;

  tempoSpeed.textContent = metersPerSecond.toFixed(2).replace(".", ",");
  tempoDetails.textContent = `${Math.round(clicksPerMinute)} clics/min · moyenne sur ${tempoIntervals.length + 1} pas`;
});

document.querySelector("#resetButton").addEventListener("click", () => {
  Object.keys(evidenceStates).forEach((key) => evidenceStates[key] = 0);
  selectedEvidenceCount = 3;
  updateEvidenceMode();
  selectedSpeedTiers.clear();
  speedFilters.querySelectorAll(".speed-filter").forEach((button) => button.setAttribute("aria-pressed", "false"));
  sanityFilter.value = "10";
  syncSanityFilter();
  selectedGenders.clear();
  genderFilters.querySelectorAll(".gender-filter").forEach((button) => button.setAttribute("aria-pressed", "false"));
  searchInput.value = "";
  pinned.clear();
  dismissed.clear();
  saveMarks();
  resetTempo();
  renderFilters();
  renderCards();
  investigationNotes.value = "";
  investigationNotesPanel.open = false;
  persistInvestigation();
});

restoreInvestigation();
renderFilters();
updateEvidenceMode();
syncSanityFilter();
renderCards();
renderEquipment();
renderCursedPossessions();
renderMaps();
buildGlobalSearchIndex();

window.addEventListener("beforeunload", persistInvestigation);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") persistInvestigation();
});

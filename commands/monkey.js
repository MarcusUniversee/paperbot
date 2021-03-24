const Discord = require('discord.js')

var monkeyFacts = ['There are currently 264 known monkey species.',
                   'Monkeys can be divided into two groups, Old World monkeys that live in Africa and Asia, and New World monkeys that live in South America.',
                   'A baboon is an example of an Old World monkey, while a marmoset is an example of a New World monkey.',
                   'Apes are not monkeys.',
                   'Al used to be a monkey.',
                   'Some monkeys live on the ground, while others live in trees.',
                   'Different monkey species eat a variety of foods, such as fruit, insects, flowers, leaves and reptiles.',
                   'Most monkeys have tails.',
                   'Groups of monkeys are known as a ‘tribe’, ‘troop’ or ‘mission’.',
                   'The Pygmy Marmoset is the smallest type of monkey, with adults weighing between 120 and 140 grams.',
                   'The Mandrill is the largest type of monkey, with adult males weighing up to 35 kg.',
                   'Capuchin monkeys are believed to be one of the smartest New World monkey species. They have the ability to use tools, learn new skills and show various signs of self-awareness.',
                   'Spider monkeys get their name because of their long arms, legs and tail.',
                   'The monkey is the 9th animal that appears on the Chinese zodiac, appearing as the zodiac sign in 2016.
                   'Monkeys eat bananas, but they peel them and do not eat the skin.  Most monkeys eat both plants and animals, and some also eat dirt.  Yum?
                   'Monkeys show affection to one another by grooming, cuddling, holding hands and lip smacking.  They show aggression by showing their teeth, yawning, head bobbing and jerking their head and shoulders forward.
                   'Howler monkeys are the loudest monkeys.  Their howls can be heard up to two miles away in a dense forest, and over three miles away in an open area.
                   'Tarsiers have enormous eyes — as large as its brain — that enables them to see at night.
                   'Bonobos do not fight — instead they have intercourse — including the same-sex variety.  They believe in having sex to resolve their disputes.  Make love, not war.
                   'Orangutans have the longest childhood of any animal in the world — babies nurse until they are six years old and stay with their mother for several years afterwards.
                   'Rhesus macaques are extremely mischievous.  They have overrun villages in India — breaking into homes to steal food and high-diving off buildings to go swimming.
                   'Chimpanzees are not only the closest living relatives to humans; they also use tools, have complex hierarchies, and can be taught sign language.
                   'There are five endangered primate species including the Roloway monkey, the Javan slow loris, the brown spider monkey, the greater bamboo lemur and blood capuchin.
                   'There's Only One Species of Wild Monkey in Europe
                   'The Color of a Bald Uakari's Face May Reveal Its Health
                   'If there is a lack of food, female monkeys will stop mating until there are better circumstances for getting pregnant. Even when conditions are right, a mother will only give birth once every two years.
                   'Proboscis monkeys only eat unripe fruit. This is because the sugars in ripe fruit ferment. The fermentation causes bloating in the stomach that can kill them.
                   'According to NASA, the first living creature in space was a rhesus monkey named Albert I. His launch took place in White Sands, New Mexico, on June 11, 1948.
                   'The bright blue and red colors on a mandrill's face get brighter when they are excited. They also have pouches in their cheeks where they store food for snacks.
                   'Monkeys can understand written numbers and can even count. They can also understand basic parts of arithmetic and even, in rare cases, multiplication.
                   'To attract a female partner, male capuchin monkeys will urinate in their hands and then rub it thoroughly into their fur
                   'The origins of the word "monkey" are unclear. It appears also to be related to manikin, from the Dutch manneken ("little man"). It could also be derived from the name of a popular medieval beast story  in which the son of an ape is named "Moneke."
                   'A Colombian woman claimed that she was raised by a colony of capuchin monkeys after being kidnapped and abandoned in the jungle when she was just 4 years old.
                   'Raw and cooked brain of dead monkey is widely consumed in China and Malaysia
                   'Scientists observed female monkeys teaching their young how to floss their teeth
                   'The most recently discovered monkey is the lesula monkey. It was discovered in 2007 in the Democratic Republic of the Congo in Africa
                   'Diseases that can spread from monkey to humans include Ebola Reston, B virus (Cercopithecine herpesvirus 1), monkey pox, yellow fever, simian immunodeficiency virus, tuberculosis, and other diseases not yet known or identified.
                   'Uncle Fat is a morbidly obese monkey in Thailand who gorged himself on junk food and soda that tourists had left behind. As the leader of his troop, this gluttonous monkey also had subordinate monkeys bringing him goodies.
                   'An abandoned medical research facility called the New York Blood Center used wild chimpanzees in its vaccination research in the 1970s. When the research facility shut down in 2005, the 66 remaining chimps were set free on a small land mass soon dubbed "Monkey Island."
                   'At the tip of a monkey's tail is a patch of bare skin that acts similar to a human's fingertips. It is sensitive to touch and also has tiny ridges that gives the tail a better grip
                   'In Hindu, Hanuman ("disfigured jaw") is a human-like monkey god who commanded a monkey army. Interestingly, women were not allowed to worship the monkey god
                   'Contrary to popular opinion, humans did not come from monkeys. Rather, humans and monkeys share a common ancestor 25-30 million years ago and then evolved from this animal in various different ways
                   'The fastest primate on Earth is the patas monkey. It can reach speeds of 34 miles per hour (55 km/h).
                   'The uakari is one of the rarest and most unusual-looking of all the New World monkeys. While it looks similar to an orangutan, its face is pink, which often turns bright red when the animal becomes excited or angry. It also makes a noise similar to a human laughing.
                   'The owl monkey (night monkey) is the only nocturnal New World monkey. They are also one of the few monkey species affected by malaria, which means they have been used in non-human primate malaria experiments
                   'Africa's Namib Desert is home to the chacma baboons. One hardy chacma baboon troop survived 116 days without water in the desert by eating figs
                   'The Japanese macaque is the northernmost monkey and is capable of living in more than 3 feet of snow in as temperatures as low as 5 degrees Fahrenheit (-15 degrees Celsius)
                   'The ancient Egyptians considered the Hamadryas Baboon to be sacred. One of their gods, Thoth was regularly drawn as a man with the head of this baboon.
                   'The monkey is the 9th animal in the Chinese zodiac. People born in a year of the monkey are supposedly intelligent, lively, and creative, but might also be selfish and impatient
                   'Monkeys are found almost everywhere on Earth, except for Australia and Antarctica
                   'The Diana monkey was named for the Roman goddess of hunting because the stripe on its forehead resembles Diana bow
                   'Capuchin monkeys are named after the 16th-century monks because the monkey's hair resembles the monks' hooded robes
                   'To identify themselves more easily, squirrel monkeys will smear food on their tails, much like how humans may wear name tags
                   'Due to the loss of trees in their native habitat, only about 1,500 golden lion tamarins exist in the wild
                   'Each year, about 55,000 primates are used as test animals in the U.S., and about 10,000 are used in Great Britain. Japan uses millions of primates
                   'When researchers offered the Japanese macaque sweet potatoes during research in the 1940s, the monkeys didn't like the taste of the dirt on the veggies, so they washed it off. Now, generations later, washing food has become a learned behavior. No other monkeys in the world are known to wash their food before eating
                   'HIV was created in the stomach of a chimp who had eaten two different types of monkeys that had two different viruses.  The two viruses combined to form a hybrid virus, which then spread through the chimp species, and then later was transmitted to humans
                   'White-faced capuchin monkeys rub their fur with the Giant African Millipedes, which acts as a form of insect repellent
                   'After weeks of training, rhesus monkeys learned to recognize themselves in a mirror. The first thing they did was to promptly examined their genitals, every intimate nook and cranny
                   'The "Monkey Orchid" is a flower that has evolved to look like the grinning face of a monkey. Ironically, instead of smelling like bananas, it smells like a ripe orange
                   'Alexander I, the king of Greece, died from sepsis after being bit by one of his pet monkeys. His death led to a war that killed over 100,000 people
                   'A recently discovered monkey, the Burmese sneezing monkey, sneezes whenever it rains.
                   'A group of 15 captive monkeys at a primate research institute in Japan used tree branches to fling themselves over a high voltage electric fence. They were later lured back to the research center with peanuts
                   'To prove that children need a mother's love, scientist Harry Harlow subjected baby monkeys to horrific experiments in what was called the "The Pit of Despair" in which he isolated and tortured baby monkeys
                   'The mustached emperor tamarin is believed to have been named for German Emperor Wilhelm II. Both have impressive mustaches
                   'French surgeon Serge Voronoff (1866-1951) gained notoriety when he grafted monkey testicles into the the scrotum of human patients in an attempt to cure infertility and increase their sex drive
                   'A 22-year-old primate researcher at Emory died after a rhesus monkey infected with the herpes B virus threw a tiny drop of fluid, mostly likely from  urine or feces, at her face as she was transporting the animal.[4]
                   'Italian Professor Sergio Canavero claimed to have conducted the first monkey head transplant without any neurological injury to the animal. However, he did not connect the spinal cord, so the monkey was completely paralyzed. It was only kept alive for only 20 hours after the procedure for ethical reasons
                 ]

module.exports = {
  name: 'monkey',
  description: 'Replies with a monkey fact',
  expectedArgs: '',
  category: 'Facts',
  permissionError: '',
  minArgs: 0,
  maxArgs: 1,
  callback: async (message, paramsCom) => {
    console.log(message.author.tag + ' monkey');
    var monkeyNum = await Math.floor((Math.random() * monkeyFacts.length));
    message.reply(monkeyFacts[monkeyNum]);
  },
  permissions: [],
  requiredRoles: [],
}

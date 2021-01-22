const Discord = require('discord.js')

var whaleFacts = ['The blue whale is the largest animal that ever lived and can grow to 90 or more feet and weigh as much as 24 elephants! That’s more than 330,000 pounds (150,000 kg)',
                  'The sperm whale has the largest brain in the world',
                  'Killer whales can eat moose',
                  'The genitals of male whales are actually tucked inside of them when they aren’t mating, this reduces drag and allows them to swim faster',
                  'Whales sleep with one brain hemisphere at a time, which allows them to continue coming to the surface to breathe',
                  'Bowhead whales (a baleen whale found in the Arctic) can live for more than 200 years',
                  'Killer whales (a toothed whale found in various habitats worldwide) can live for more than 100 years',
                  'The minke whale is the smallest baleen whale in North American waters',
                  'Sperm whales were almost driven to extinction by commercial whalers who sought the whales’ blubber and the unique oil derived from the “spermaceti organ” found in their massive heads.',
                  'Toothed whales (including dolphins and porpoises) all have teeth but the number, size and position, and even purpose of their teeth, varies from species to species',
                  'Some, like Orcas, use their teeth for grabbing while the long tusk of a male narwhal acts as a sensory organ and may help them “taste” the surrounding waters',
                  'Toothed whales do not have molars for chewing their food, they swallow it whole or in large chunks',
                  'Some toothed whales use their tongues as pistons to suck in the food, using their teeth more socially than for feeding',
                  'One thing all toothed whales have in common is their sophisticated sonar systems called echolocation',
                  'The long tusk of a male narwhal acts as a sensory organ and may help them “taste” the surrounding waters',
                  'Orcas also are known to eat sharks and even other marine mammals',
                  'Baleen whales are typically categorized as skimmers, gulpers, or suckers',
                  'Skimmers swim through patches of plankton with their mouths open as the water. Tiny plankton are caught and remain trapped in the their mouths',
                  'Gulpers are rorqual whales',
                  'Rorqual whales have a series of pleats running from their lower jaw to the belly button which expand when they are filled with water',
                  'Gray whales are suckers, they literally suck amphipods from the bottom of the ocean taking in mouthfuls of mud and food before forcing the water',
                  'Blue whales in the Southern Hemisphere are generally larger than those in the Northern Hemisphere',
                  'Female blue whales are larger than male blue whales',
                  'A newborn blue whale is 23 feet (7m) long and weighs up to three tons (5950lbs or 2700kg),which is about the size of a full grown hippo',
                  'The baby can gain up to 10lbs (4.5kg) an hour or over 250lbs (113kg) every day',
                  'The volume of the sperm whale brain is almost 500 cubic inches, which is more than five times the volume of ours - 80 cubic inches',
                  'A sperm whale’s brain weighs up to 9kg (almost 20lbs) which is the weight of a small dog and 6 times heavier than a human brain',
                  'Male humpback whales are the best-known singers. Their songs are beautiful, complex, and ever-evolving',
                  'Songs sung by male humpback whales can last for up to 30 minutes and feature various themes sung in a sequence that is common to all males in the same breeding area that year',
                  'The sounds male humpback whales sing span 7 octaves, nearly the entire range of a piano',
                  'The lowest frequency songs are sung by blue whales',
                  'The sperm whale is the loudest whale',
                  'Hippos are the closest living relatives of whales',
                  'The blue whale is the largest animal ever to have lived on Earth; it is larger than any of the giant dinosaurs were',
                  'The biggest recorded blue whale was a female in the Antarctic Ocean that was 30.5 m long',
                  'The tongue alone of a blue whale can weigh as much as an elephant and an entire football team could stand on it',
                  'The heart of a blue whale is about the size of a VW Beetle car and weighs up to 1000 pounds',
                  'Blue whales are pregnant for 10-12 months',
                  'Blue whales reach maturity at 10-15 years',
                  'A Cuvier\'s beaked whale has been recorded to dive to a depth of 3km for over 2 hours',
                  'No one is quite sure how they make such deep dives',
                  'The bowhead whale, which lives exclusively in the Arctic, has the thickest blubber of all cetaceans',
                  'The bowhead whale\'s blubber can reach a whopping 70cm in thickness',
                  'The southern right whale has the largest testicles in the animal kingdom, each pair weighing around a metric ton',
                  'An individual fin whale pees about 970 litres per day',
                  'The accumulated wax inside of a whale’s ear can be used to tell its age as well as any stresses or toxins it may have encountered',
                  'The genitals of male whales are actually tucked inside of them when they aren’t mating, this reduces drag and allows them to swim faster',
                  'Whales can get sunburns',
                  'There is only one known albino humpback whale in the world',
                  'Many expensive perfumes contain whale poop',
                  'Whales walked on land about 47 million years ago',
                  'Whales are big',
                  'There are whales in Seaworld'
                 ];


module.exports = {
  name: 'whale',
  description: 'Replies with a whale fact',

  async run (client, message, params) {
    console.log(message.author.tag + ' whale');
    var whaleNum = await Math.floor((Math.random() * whaleFacts.length));
    message.reply(whaleFacts[whaleNum]);
  }
}
